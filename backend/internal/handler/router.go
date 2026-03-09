package handler

import (
	"net/http"

	"github.com/ayosafacundo/AstroForge/internal/config"
	"github.com/ayosafacundo/AstroForge/internal/middleware"
	"github.com/ayosafacundo/AstroForge/internal/repository"
	"github.com/ayosafacundo/AstroForge/internal/service"
	"github.com/ayosafacundo/AstroForge/internal/storage"
	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Dependencies struct {
	DB           *pgxpool.Pool
	Minio        *storage.Minio
	Config       *config.Config
	Repositories *repository.Repositories
	Services     *service.Services
	Middleware   *middleware.Middleware
}

func NewRouter(dep Dependencies) http.Handler {

	r := chi.NewRouter()

	authHandler := NewAuthHandler(dep.Services.Auth)
	auth := middleware.NewAuthMiddleware(dep.Repositories.User, dep.Config.JWTSecret)
	Handler := NewHandler(dep.Services, dep.Config)

	r.Post("/auth/login", authHandler.Login)
	r.Post("/auth/register", authHandler.Register)

	r.Route("/products", func(r chi.Router) {
		r.With(auth.Handler).Post("/", Handler.Product.Create)
		r.Get("/", Handler.Product.List)
		r.Get("/{id}", Handler.Product.Get)
	})

	return r
}
