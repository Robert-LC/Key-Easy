package main

import "net/http"

func (api *API) highscoreHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("highscore"))
}