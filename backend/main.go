package main

import (
	"log"
	"net/http"

	"github.com/joho/godotenv"

	"github.com/ayosafacundo/AstroForge/internal/middleware/logger"
	"github.com/ayosafacundo/AstroForge/internal/router"
	"github.com/ayosafacundo/AstroForge/internal/users"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(".env couldn't be initialized.")
	}
	users.RegisterFeature()
	logger.Log("Feature Users added.")
	server := router.RegisterRoutes()
	logger.Logf("Routes registered: %d.\n", len(router.Routes))
	log.Fatal(http.ListenAndServe(":6445", server))
}
