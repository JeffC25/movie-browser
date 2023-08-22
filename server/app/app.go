package main

import (
	"encoding/json"
	"errors"
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

// relies on dev using the correct tmdbStruct for the url
// not sure if that's good or bad design
func (a *App) GetTMDB(method string, url string, tmdbStruct tmdb.Struct) error {
	req, err := http.NewRequest(method, url, nil)
	if err != nil {
		a.log.Warn().Err(err).Msg("error creating new request")
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
	page := params.Page
	url := "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page" + page

	var nowPlaying = tmdb.MovieList{}
	err := a.GetTMDB("GET", url, &nowPlaying)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed tmdb request")
	}

	var results []MoviePreview
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
	page := params.Page
	url := "https://api.themoviedb.org/3/movie/popular?language=en-US&page" + page

	var popular = tmdb.MovieList{}
	err := a.GetTMDB("GET", url, &popular)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed tmdb request")
	}

	var results []MoviePreview
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

func (a *App) GetMovieDetail(w http.ResponseWriter, r *http.Request, movieID int) *Response {
	return nil
}

func (a *App) GetMovieReviews(w http.ResponseWriter, r *http.Request, movieID int) (resp *Response) {
	return nil
}

func (a *App) SearchMovie(w http.ResponseWriter, r *http.Request, params SearchMovieParams) *Response {
	return nil
}
