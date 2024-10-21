package profile

import "net/http"


func GetProfileHandler(w http.ResponseWriter, r *http.Request) {

}

func CreateProfileHandler(w http.ResponseWriter, r *http.Request) {

}

func DeleteProfileHandler(w http.ResponseWriter, r *http.Request) {

}

func RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /profile/{id}", GetProfileHandler)
	mux.HandleFunc("POST /profile", CreateProfileHandler)
	mux.HandleFunc("DELETE /profile/{id}", DeleteProfileHandler)
}