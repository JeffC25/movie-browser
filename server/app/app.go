package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"main/config"
	"main/tmdb"
	"net/http"

	"github.com/go-chi/chi/v5"
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
			Date:   nowPlaying.Results[i].ReleaseDate,
			ID:     int32(nowPlaying.Results[i].ID),
			Name:   nowPlaying.Results[i].Title,
			Poster: nowPlaying.Results[i].PosterPath,
			Rating: float32(nowPlaying.Results[i].VoteAverage),
		})
	}

	resp := MovieList{
		Page:       int32(nowPlaying.Page),
		TotalPages: int32(nowPlaying.TotalPages),
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
			Date:   popular.Results[i].ReleaseDate,
			ID:     int32(popular.Results[i].ID),
			Name:   popular.Results[i].Title,
			Poster: popular.Results[i].PosterPath,
			Rating: float32(popular.Results[i].VoteAverage),
		})
	}

	resp := MovieList{
		Page:       int32(popular.Page),
		TotalPages: int32(popular.TotalPages),
		Results:    results,
	}

	return GetPopularJSON200Response(resp)
}

func (a *App) SearchMovie(w http.ResponseWriter, r *http.Request, params SearchMovieParams) *Response {
	search := tmdb.MovieList{}

	url := "https://api.themoviedb.org/3/search/movie?query=" + params.QueryString + "&include_adult=false&language=en-US&page=" + params.Page
	err := a.GetTMDB("GET", url, &search)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed tmdb search request")
		return SearchMovieJSON502Response(Error{Message: "failed tmdb request"})
	}

	var results = []MoviePreview{}
	for i := range search.Results {
		results = append(results, MoviePreview{
			Date:   search.Results[i].ReleaseDate,
			ID:     int32(search.Results[i].ID),
			Name:   search.Results[i].Title,
			Poster: search.Results[i].PosterPath,
			Rating: float32(search.Results[i].VoteAverage),
		})
	}

	resp := MovieList{
		Page:       int32(search.Page),
		TotalPages: int32(search.TotalPages),
		Results:    results,
	}

	return SearchMovieJSON200Response(resp)
}

func (a *App) GetMovieDetail(w http.ResponseWriter, r *http.Request, movieID string) *Response {
	details := tmdb.MovieDetails{}

	url := "https://api.themoviedb.org/3/movie/" + movieID + "?language=en-US"
	err := a.GetTMDB("GET", url, &details)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed tmdb details request")
		return GetMovieDetailJSON502Response(Error{Message: "failed tmdb request"})
	}

	resp := MovieDetails{
		Backdrop: details.BackdropPath,
		Homepage: details.Homepage,
		Overview: details.Overview,
	}

	return GetMovieDetailJSON200Response(resp)
}

func (a *App) GetMovieReviews(w http.ResponseWriter, r *http.Request, movieID string) *Response {
	reviews := tmdb.ReviewList{}

	url := "https://api.themoviedb.org/3/movie/" + movieID + "/reviews?language=en-US&page=1"
	err := a.GetTMDB("GET", url, &reviews)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed tmdb reviews request")
		return GetMovieReviewsJSON502Response(Error{Message: "failed tmmdb request"})
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
		Page:       int32(reviews.Page),
		TotalPages: int32(reviews.TotalPages),
		Results:    results,
	}
	return GetMovieReviewsJSON200Response(resp)
}

func (a *App) GetMovieCast(w http.ResponseWriter, r *http.Request, movieID string) *Response {
	credits := tmdb.MovieCredits{}

	url := "https://api.themoviedb.org/3/movie/" + string(movieID) + "/credits?language=en-US"
	err := a.GetTMDB("GET", url, &credits)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed tmdb credits request")
		return GetMovieCastJSON502Response(Error{Message: "failed tmdb request"})
	}

	cast := []Person{}
	for i := range credits.Cast {
		cast = append(cast, Person{
			Name:      credits.Cast[i].Name,
			Picture:   credits.Cast[i].ProfilePath,
			Character: credits.Cast[i].Character,
		})
	}

	return GetMovieCastJSON200Response(cast)
}
