package main

import (
	"keyeasy-backend/internal/profile"
	"net/http"
)


func main() {
	mux := http.NewServeMux()

	profile.RegisterRoutes(mux)

	http.ListenAndServe("localhost:8080", mux)
}
