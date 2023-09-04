package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"main/config"
	"main/tmdb"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog"
)

var (
	ErrServer         = errors.New("server error")
	ErrInvalidJSON    = errors.New("could not decode JSON")
	ErrInvalidRequest = errors.New("could not validate request")
)

type App struct {
	log zerolog.Logger
	c   config.Config
	rdb *redis.Client
	ctx context.Context
}

func (a *App) Run(c config.Config, log zerolog.Logger) error {
	router := chi.NewRouter()
	router.Use(middleware.RedirectSlashes)
	router.Use(cors.Handler(cors.Options{AllowedOrigins: []string{c.Client}}))

	// status check
	testList := tmdb.MovieList{}
	a.GetTMDB("GET", "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", &testList)

	a.log.Info().Msg(fmt.Sprint(testList))

	handler := Handler(a, WithRouter(router), WithServerBaseURL("/api"))
	return http.ListenAndServe(":8080", handler)
}

func (a *App) GetTMDB(method string, url string, tmdbStruct tmdb.Struct) error {
	// read from cache
	cached, err := a.rdb.Get(a.ctx, url).Result()
	if err == nil {
		a.log.Info().Msg("reading " + url + " from cache")
		err = json.Unmarshal([]byte(cached), &tmdbStruct)
		if err != nil {
			a.log.Warn().Err(err).Msg("failed to unmarshal tmdb response")
		}
		return err

	} else if err == redis.Nil {
		a.log.Info().Msg(url + " not in cache")

	} else {
		a.log.Warn().Err(err).Msg("failed reading from cache")
		a.log.Info().Msg(a.c.RedisURL)
	}

	// fetch from API if not in cache
	req, err := http.NewRequest(method, url, nil)
	if err != nil {
		a.log.Warn().Err(err).Msg("error creating new request")
		return err
	}

	req.Header.Add("accept", "application/json")
	req.Header.Add("Authorization", "Bearer "+a.c.Token)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed to fetch tmdb")
		return err
	}

	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed to read tmdb response")
		return err
	}

	a.rdb.Set(a.ctx, url, body, time.Minute).Err()
	a.log.Info().Msg("caching " + url)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed to cache tmdb response")
	}

	err = json.Unmarshal(body, &tmdbStruct)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed to unmarshal tmdb response")
		return err
	}

	return err
}

func (a *App) GetCategory(w http.ResponseWriter, r *http.Request, category string, params GetCategoryParams) *Response {
	movieList := tmdb.MovieList{}

	url := "https://api.themoviedb.org/3/movie/" + category + "?language=en-US&page=" + strconv.Itoa(params.Page)
	err := a.GetTMDB("GET", url, &movieList)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed tmdb now-playing request")
		return GetCategoryJSON500Response(Error{Message: "failed tmdb request"})
	}

	results := []MoviePreview{}
	for i := range movieList.Results {
		results = append(results, MoviePreview{
			Date:     movieList.Results[i].ReleaseDate,
			ID:       movieList.Results[i].ID,
			Name:     movieList.Results[i].Title,
			Poster:   tmdb.ImagePath + movieList.Results[i].PosterPath,
			Rating:   movieList.Results[i].VoteAverage,
			Overview: movieList.Results[i].Overview,
		})
	}

	resp := MovieList{
		Page:       movieList.Page,
		TotalPages: movieList.TotalPages,
		Results:    results,
	}

	return GetCategoryJSON200Response(resp)
}

func (a *App) SearchMovie(w http.ResponseWriter, r *http.Request, params SearchMovieParams) *Response {
	search := tmdb.MovieList{}

	url := "https://api.themoviedb.org/3/search/movie?query=" + strings.ReplaceAll(params.QueryString, " ", "%20") + "&include_adult=false&language=en-US&page=" + strconv.Itoa(params.Page)
	err := a.GetTMDB("GET", url, &search)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed tmdb search request")
		return SearchMovieJSON502Response(Error{Message: "failed tmdb request"})
	}

	results := []MoviePreview{}
	for i := range search.Results {
		results = append(results, MoviePreview{
			Date:     search.Results[i].ReleaseDate,
			ID:       search.Results[i].ID,
			Name:     search.Results[i].Title,
			Overview: search.Results[i].Overview,
			Poster:   tmdb.ImagePath + search.Results[i].PosterPath,
			Rating:   search.Results[i].VoteAverage,
		})
	}

	resp := MovieList{
		Page:       search.Page,
		TotalPages: search.TotalPages,
		Results:    results,
	}

	return SearchMovieJSON200Response(resp)
}

func (a *App) GetMovieDetails(w http.ResponseWriter, r *http.Request, movieID int) *Response {
	details := tmdb.MovieDetails{}

	url := "https://api.themoviedb.org/3/movie/" + strconv.Itoa(movieID) + "?language=en-US"
	err := a.GetTMDB("GET", url, &details)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed tmdb details request")
		return GetMovieDetailsJSON502Response(Error{Message: "failed tmdb request"})
	}

	genres := []string{}
	for i := range details.Genres {
		genres = append(genres, details.Genres[i].Name)
	}

	resp := MovieDetails{
		Backdrop: tmdb.ImagePath + details.BackdropPath,
		Date:     details.ReleaseDate,
		Genres:   genres,
		Homepage: details.Homepage,
		Name:     details.Title,
		Overview: details.Overview,
		Poster:   tmdb.ImagePath + details.PosterPath,
		Rating:   details.VoteAverage,
		Runtime:  details.Runtime,
	}

	return GetMovieDetailsJSON200Response(resp)
}

func (a *App) GetMovieReviews(w http.ResponseWriter, r *http.Request, movieID int, params GetMovieReviewsParams) *Response {
	reviews := tmdb.ReviewList{}

	url := "https://api.themoviedb.org/3/movie/" + strconv.Itoa(movieID) + "/reviews?language=en-US&page=" + strconv.Itoa(params.Page)
	err := a.GetTMDB("GET", url, &reviews)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed tmdb reviews request")
		return GetMovieReviewsJSON502Response(Error{Message: "failed tmdb request"})
	}

	var results = []Review{}
	for i := range reviews.Results {

		// This is REALLY jank but going with it for now
		// TODO: properly unmarshal/assert this
		rating := fmt.Sprint(reviews.Results[i].AuthorDetails.Rating)
		if rating == "<nil>" {
			rating = "none"
		}

		results = append(results, Review{
			Content: reviews.Results[i].Content,
			Rating:  rating,
		})
	}

	resp := ReviewList{
		Page:       reviews.Page,
		TotalPages: reviews.TotalPages,
		Results:    results,
	}
	return GetMovieReviewsJSON200Response(resp)
}

func (a *App) GetMovieVideos(w http.ResponseWriter, r *http.Request, movieID int) *Response {
	videos := tmdb.VideoList{}

	url := "https://api.themoviedb.org/3/movie/" + strconv.Itoa(movieID) + "/videos?language=en-US"
	err := a.GetTMDB("GET", url, &videos)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed tmdb videos request")
		return GetMovieReviewsJSON502Response(Error{Message: "failed tmdb request"})
	}

	var results = []Video{}
	for i := range videos.Results {
		isTrailer := false
		if strings.Contains(videos.Results[i].Type, "Teaser") || strings.Contains(videos.Results[i].Type, "Trailer") {
			isTrailer = true
		}
		results = append(results, Video{
			Link:    tmdb.VideoPath + videos.Results[i].Key,
			Title:   videos.Results[i].Name,
			Trailer: isTrailer,
		})
	}

	return GetMovieVideosJSON200Response(results)
}

func (a *App) GetMovieCast(w http.ResponseWriter, r *http.Request, movieID int) *Response {
	credits := tmdb.MovieCredits{}

	url := "https://api.themoviedb.org/3/movie/" + strconv.Itoa(movieID) + "/credits?language=en-US"
	err := a.GetTMDB("GET", url, &credits)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed tmdb credits request")
		return GetMovieCastJSON502Response(Error{Message: "failed tmdb request"})
	}

	results := []Person{}
	for i := range credits.Cast {
		results = append(results, Person{
			Name:      credits.Cast[i].Name,
			Picture:   tmdb.ImagePath + credits.Cast[i].ProfilePath,
			Character: credits.Cast[i].Character,
		})
	}

	return GetMovieCastJSON200Response(results)
}
