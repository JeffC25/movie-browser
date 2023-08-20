package main

import (
	"os"
	"os/signal"

	"server/config"
)

func main() {
	// r := chi.NewRouter()
	// r.Get("/", func(w http.ResponseWriter, r *http.Request) {
	// 	w.Write([]byte("Hello World!"))
	// })
	// http.ListenAndServe(":8080", r)

	notifyCh := make(chan os.Signal, 1)
	listenCh := make(chan error)
	signal.Notify(notifyCh, os.Interrupt)

	c, err := config.GetConfig()
}
