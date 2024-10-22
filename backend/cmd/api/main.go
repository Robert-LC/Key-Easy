package main

import (
	"log"
)


func main() {
	cfg := config{
		addr: ":8080",
	}

	api:= &API{
		config: cfg,
	}

	mux := api.mount()

	log.Fatal(api.run(mux))
} 
