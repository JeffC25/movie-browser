package main

import (
	"context"
	"fmt"
	config "main/config"
	log "main/log"
	"main/tmdb"
	"testing"

	"github.com/redis/go-redis/v9"
)

var app = func() App {
	c, err := config.GetConfig()
	if err != nil {
		fmt.Sprintln(err)
	}

	log := log.Logger(c.LogLevel)

	ctx := context.Background()

	rdb := redis.NewClient(&redis.Options{
		Addr:     c.RedisURL,
		Password: "",
		DB:       0,
	})

	a := App{
		log: log,
		c:   c,
		rdb: rdb,
		ctx: ctx,
	}

	return a
}

var testApp = app()

///////////////////////////////////////////////////////////////////////

func TestGetTMDB(t *testing.T) {
	t.Log("testing TMDB")
	movieList := tmdb.MovieList{}
	err := testApp.GetTMDB("GET", "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", &movieList)
	if err != nil {
		t.Error(fmt.Sprint(err))
	}
	t.Log(movieList)
}
