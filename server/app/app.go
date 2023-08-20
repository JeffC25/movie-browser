package main

import (
	"errors"
	"main/config"
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
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World!"))
	})

	handler := Handler(a, WithRouter(r), WithServerBaseURL("/api"))
	return http.ListenAndServe(":8080", handler)
}

func (a *App) GetMovieDetail(w http.ResponseWriter, r *http.Request, movieID int) (resp *Response) {
	return nil
}

func (a *App) GetNowPlaying(w http.ResponseWriter, r *http.Request) (resp *Response) {
	return nil
}

func (a *App) GetPopular(w http.ResponseWriter, r *http.Request) (resp *Response) {
	return nil
}

func (a *App) GetMovieReviews(w http.ResponseWriter, r *http.Request, movieID int) (resp *Response) {
	return nil
}

func (a *App) SearchMovie(w http.ResponseWriter, r *http.Request, params SearchMovieParams) (resp *Response) {
	return nil
}
