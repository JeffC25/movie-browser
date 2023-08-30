package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"

	config "main/config"
	log "main/log"

	"github.com/redis/go-redis/v9"
)

func main() {
	notifyCh := make(chan os.Signal, 1)
	listenCh := make(chan error)
	signal.Notify(notifyCh, os.Interrupt)

	c, err := config.GetConfig()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	log := log.Logger(c.LogLevel)

	ctx := context.Background()

	rdb := redis.NewClient(&redis.Options{
		Addr:     c.RedisHost + ":" + c.RedisPort,
		Password: "",
		DB:       0,
	})

	a := App{
		log: log,
		c:   c,
		rdb: rdb,
		ctx: ctx,
	}

	go func() {
		listenCh <- a.Run(c, log)
	}()

	select {
	case <-notifyCh:
		log.Info().Msg("recieved interrupt signal")
	case err = <-listenCh:
		log.Info().Err(err).Msg("recieved value from http.ListenAndServe()")
	}
}
