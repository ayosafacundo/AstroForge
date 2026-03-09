package service

import (
	"github.com/ayosafacundo/AstroForge/internal/repository"
)

type Services struct {
	Auth    *AuthService
	Product *ProductService
}

func NewServices(q *repository.Repositories, JWTSecret string) *Services {
	return &Services{
		Auth:    NewAuthService(q.User, JWTSecret),
		Product: NewProductService(q.Product),
	}
}
