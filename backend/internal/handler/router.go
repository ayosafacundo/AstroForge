package handler

import (
	"net/http"

	"github.com/ayosafacundo/AstroForge/internal/config"
	"github.com/ayosafacundo/AstroForge/internal/repository"
	"github.com/ayosafacundo/AstroForge/internal/service"
	"github.com/ayosafacundo/AstroForge/internal/storage"
	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Dependencies struct {
	DB      *pgxpool.Pool
	Minio   *storage.Minio
	Config  *config.Config
	repo    *repository.UserRepository
	service *service.AuthService
}

func NewRouter(dep Dependencies) http.Handler {

	r := chi.NewRouter()

	authHandler := NewAuthHandler(dep)

	r.Post("/auth/login", authHandler.Login)
	r.Post("/auth/register", authHandler.Register)

	r.Route("/products", func(r chi.Router) {

		r.Post("/", dep.AuthMiddleware, dep.ProductHandler.Create)

		r.Get("/", dep.ProductHandler.List)

		r.Get("/{id}", dep.ProductHandler.Get)

	})

	return r
}
