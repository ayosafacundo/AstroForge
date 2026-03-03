package main

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"

	"github.com/ayosafacundo/AstroForge/internal/config"
	"github.com/ayosafacundo/AstroForge/internal/handler"
	"github.com/ayosafacundo/AstroForge/internal/storage"
)

func main() {
	// Load env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal(".env couldn't be initialized.")
	}
	cfg := config.Load()
	// get context and db URI
	ctx := context.Background()

	// Connect to DB
	pool, err := pgxpool.New(ctx, cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}
	defer pool.Close()

	// Verify DB Connection
	if err := pool.Ping(ctx); err != nil {
		log.Fatalf("Database unreachable: %v", err)
	}
	log.Println("Successfully connected to PostgreSQL!")

	minio := storage.NewMinio(cfg.Minio)

	router := handler.NewRouter(handler.Dependencies{
		DB: pool,
		//Redis:   redis,
		Minio:  minio,
		Config: cfg,
	})
}
