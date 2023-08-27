package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"main/config"
	"main/tmdb"
	"net/http"
	"strings"

	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
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
}

func (a *App) Run(c config.Config, log zerolog.Logger) error {
	r := chi.NewRouter()
	r.Use(middleware.RedirectSlashes)
	r.Use(cors.Handler(cors.Options{AllowedOrigins: []string{"http://localhost:5173"}}))

	handler := Handler(a, WithRouter(r), WithServerBaseURL("/api"))
	return http.ListenAndServe(":8080", handler)
}

func (a *App) GetTMDB(method string, url string, tmdbStruct tmdb.Struct) error {
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

	err = json.Unmarshal(body, &tmdbStruct)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed to unmarshal tmdb response")
		return err
	}

	return err
}

func (a *App) GetNowPlaying(w http.ResponseWriter, r *http.Request, params GetNowPlayingParams) *Response {
	nowPlaying := tmdb.MovieList{}

	url := "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=" + params.Page
	err := a.GetTMDB("GET", url, &nowPlaying)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed tmdb now-playing request")
		return GetNowPlayingJSON502Response(Error{Message: "failed tmdb request"})
	}

	results := []MoviePreview{}
	for i := range nowPlaying.Results {
		results = append(results, MoviePreview{
			Date:     nowPlaying.Results[i].ReleaseDate,
			ID:       nowPlaying.Results[i].ID,
			Name:     nowPlaying.Results[i].Title,
			Poster:   tmdb.ImagePath + nowPlaying.Results[i].PosterPath,
			Rating:   nowPlaying.Results[i].VoteAverage,
			Overview: nowPlaying.Results[i].Overview,
		})
	}

	resp := MovieList{
		Page:       nowPlaying.Page,
		TotalPages: nowPlaying.TotalPages,
		Results:    results,
	}

	return GetNowPlayingJSON200Response(resp)
}

func (a *App) GetPopular(w http.ResponseWriter, r *http.Request, params GetPopularParams) *Response {
	popular := tmdb.MovieList{}

	url := "https://api.themoviedb.org/3/movie/popular?language=en-US&page=" + params.Page
	err := a.GetTMDB("GET", url, &popular)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed tmdb popular request")
		return GetPopularJSON502Response(Error{Message: "failed tmdb request"})
	}

	results := []MoviePreview{}
	for i := range popular.Results {
		results = append(results, MoviePreview{
			Date:     popular.Results[i].ReleaseDate,
			ID:       popular.Results[i].ID,
			Name:     popular.Results[i].Title,
			Poster:   tmdb.ImagePath + popular.Results[i].PosterPath,
			Rating:   popular.Results[i].VoteAverage,
			Overview: popular.Results[i].Overview,
		})
	}

	resp := MovieList{
		Page:       popular.Page,
		TotalPages: popular.TotalPages,
		Results:    results,
	}

	return GetPopularJSON200Response(resp)
}

func (a *App) GetTopRated(w http.ResponseWriter, r *http.Request, params GetTopRatedParams) *Response {
	toprated := tmdb.MovieList{}

	url := "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=" + params.Page
	err := a.GetTMDB("GET", url, &toprated)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed tmdb toprated request")
		return GetTopRatedJSON502Response(Error{Message: "failed tmdb request"})
	}

	results := []MoviePreview{}
	for i := range toprated.Results {
		results = append(results, MoviePreview{
			Date:     toprated.Results[i].ReleaseDate,
			ID:       toprated.Results[i].ID,
			Name:     toprated.Results[i].Title,
			Poster:   tmdb.ImagePath + toprated.Results[i].PosterPath,
			Rating:   toprated.Results[i].VoteAverage,
			Overview: toprated.Results[i].Overview,
		})
	}

	resp := MovieList{
		Page:       toprated.Page,
		TotalPages: toprated.TotalPages,
		Results:    results,
	}

	return GetTopRatedJSON200Response(resp)
}

func (a *App) GetUpcoming(w http.ResponseWriter, r *http.Request, params GetUpcomingParams) *Response {
	upcoming := tmdb.MovieList{}

	url := "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=" + params.Page
	err := a.GetTMDB("GET", url, &upcoming)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed tmdb upcoming request")
		return GetUpcomingJSON502Response(Error{Message: "failed tmdb request"})
	}

	results := []MoviePreview{}
	for i := range upcoming.Results {
		results = append(results, MoviePreview{
			Date:     upcoming.Results[i].ReleaseDate,
			ID:       upcoming.Results[i].ID,
			Name:     upcoming.Results[i].Title,
			Poster:   tmdb.ImagePath + upcoming.Results[i].PosterPath,
			Rating:   upcoming.Results[i].VoteAverage,
			Overview: upcoming.Results[i].Overview,
		})
	}

	resp := MovieList{
		Page:       upcoming.Page,
		TotalPages: upcoming.TotalPages,
		Results:    results,
	}

	return GetUpcomingJSON200Response(resp)
}

func (a *App) SearchMovie(w http.ResponseWriter, r *http.Request, params SearchMovieParams) *Response {
	search := tmdb.MovieList{}

	url := "https://api.themoviedb.org/3/search/movie?query=" + params.QueryString + "&include_adult=false&language=en-US&page=" + params.Page
	err := a.GetTMDB("GET", url, &search)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed tmdb search request")
		return SearchMovieJSON502Response(Error{Message: "failed tmdb request"})
	}

	results := []MoviePreview{}
	for i := range search.Results {
		results = append(results, MoviePreview{
			Date:   search.Results[i].ReleaseDate,
			ID:     search.Results[i].ID,
			Name:   search.Results[i].Title,
			Poster: tmdb.ImagePath + search.Results[i].PosterPath,
			Rating: search.Results[i].VoteAverage,
		})
	}

	resp := MovieList{
		Page:       search.Page,
		TotalPages: search.TotalPages,
		Results:    results,
	}

	return SearchMovieJSON200Response(resp)
}

func (a *App) GetMovieDetails(w http.ResponseWriter, r *http.Request, movieID string) *Response {
	details := tmdb.MovieDetails{}

	url := "https://api.themoviedb.org/3/movie/" + movieID + "?language=en-US"
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

func (a *App) GetMovieReviews(w http.ResponseWriter, r *http.Request, movieID string, params GetMovieReviewsParams) *Response {
	reviews := tmdb.ReviewList{}

	url := "https://api.themoviedb.org/3/movie/" + movieID + "/reviews?language=en-US&page=" + params.Page
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

func (a *App) GetMovieVideos(w http.ResponseWriter, r *http.Request, movieID string) *Response {
	videos := tmdb.VideoList{}

	url := "https://api.themoviedb.org/3/movie/" + movieID + "/videos?language=en-US"
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

func (a *App) GetMovieCast(w http.ResponseWriter, r *http.Request, movieID string) *Response {
	credits := tmdb.MovieCredits{}

	url := "https://api.themoviedb.org/3/movie/" + string(movieID) + "/credits?language=en-US"
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
