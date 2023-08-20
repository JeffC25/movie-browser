package main

import (
	"os"
	"os/signal"

	app "main/app"
	config "main/config"
	log "main/log"
)

func main() {
	notifyCh := make(chan os.Signal, 1)
	listenCh := make(chan error)
	signal.Notify(notifyCh, os.Interrupt)

	c, err := config.GetConfig()
	if err != nil {
		os.Exit(1)
	}

	log := log.Logger(c.LogLevel)

	go func() {
		listenCh <- app.Run(c, log)
	}()

	select {
	case <-notifyCh:
		log.Info().Msg("recieved interrupt signal")
	case err = <-listenCh:
		log.Info().Err(err).Msg("recieved value from http.ListenAndServe()")
	}
}
