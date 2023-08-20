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

	// r.Get("/", func(w http.ResponseWriter, r *http.Request) {
	// 	w.Write([]byte("Hello World!"))
	// })

	handler := Handler(a, WithRouter(r), WithServerBaseURL("/api"))
	return http.ListenAndServe(":8080", handler)
}

func (a *App) GetNowPlaying(w http.ResponseWriter, r *http.Request, params GetNowPlayingParams) *Response {
	url := "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		a.log.Warn().Err(err).Msg("error creating new request")
	}

	req.Header.Add("accept", "application/json")
	req.Header.Add("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTE2N2U2ZDA1NWMwN2Q1MTJiMTNjNmRhY2Q1MDcwYyIsInN1YiI6IjY0ZDUyNmQzZjQ5NWVlMDI5MzUzNjA3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jlbH8gQdp8Kreq-ltU08E5aOLfxVHLrrajciIUsSTbc")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed to get request")
	}

	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed to read tmdb response")
	}

	var resp = tmdb.NowPlaying{}
	err = json.Unmarshal(body, &resp)
	if err != nil {
		a.log.Warn().Err(err).Msg("failed to unmarshal tmdb response")
	}

	result := MovieList{}

	return GetNowPlayingJSON200Response(result)
}

func (a *App) GetPopular(w http.ResponseWriter, r *http.Request, params GetPopularParams) *Response {
	return nil
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
