package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"

	"github.com/ayosafacundo/AstroForge/internal/config"
	db "github.com/ayosafacundo/AstroForge/internal/db/dbgen"
	"github.com/ayosafacundo/AstroForge/internal/handler"
	"github.com/ayosafacundo/AstroForge/internal/middleware"
	"github.com/ayosafacundo/AstroForge/internal/repository"
	"github.com/ayosafacundo/AstroForge/internal/service"
)

func main() {
	//type Dependencies struct {
	//	DB           *pgxpool.Pool
	//	Minio        *storage.Minio
	//	Config       *config.Config
	//	Repositories *repository.Repositories
	//	Services     *service.Services
	//		Middleware   *middleware.Middleware
	//	}
	Dep := &handler.Dependencies{}

	// Load env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal(".env couldn't be initialized.")
	}
	Dep.Config = config.Load()

	// get context and db URI
	ctx := context.Background()

	// Connect to DB
	config, err := pgxpool.ParseConfig(Dep.Config.DatabaseURL)
	if err != nil {
		log.Fatalf("Error on database config parse: %v", err)
	}
	Dep.DB, err = pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}
	defer Dep.DB.Close()

	// Verify DB Connection
	if err := Dep.DB.Ping(ctx); err != nil {
		log.Fatalf("Database unreachable: %v", err)
	}
	log.Println("Successfully connected to PostgreSQL!")

	// Dep.Minio = storage.NewMinio(Dep.Config.Minio)

	Dep.Repositories = repository.NewRepository(db.New(Dep.DB))
	Dep.Services = service.NewServices(Dep.Repositories, Dep.Config.JWTSecret)
	Dep.Middleware = middleware.NewMiddleware(Dep.Repositories, Dep.Config.JWTSecret)

	router := handler.NewRouter(*Dep)

	log.Printf("Server listening on port %s\n", os.Getenv("PORT"))
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), router))
}
