package middleware

import (
	"github.com/ayosafacundo/AstroForge/internal/repository"
)

type Middleware struct {
	Auth *AuthMiddleware
	//Product *ProductRepository
}

func NewMiddleware(repo *repository.Repositories, JWTSecret string) *Middleware {
	return &Middleware{
		Auth: NewAuthMiddleware(repo.User, JWTSecret),
	}
}
