package main

import (
	"log"
	"net/http"
	"time"
)

type API struct {
	config config
}

type config struct {
	addr string
}

func (api *API) mount() *http.ServeMux{
	mux := http.NewServeMux()

	mux.HandleFunc("GET /v1/highscore", api.highscoreHandler)

	return mux
}

func (api *API) run(mux * http.ServeMux) error {
	
	srv := &http.Server{
		Addr: api.config.addr,
		Handler: mux,
		WriteTimeout: time.Second * 30,
		ReadTimeout: time.Second * 10,
		IdleTimeout: time.Minute,
	}

	log.Printf("server has started at %s", api.config.addr)

	return srv.ListenAndServe()
}