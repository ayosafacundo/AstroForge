package handler

import (
	"github.com/ayosafacundo/AstroForge/internal/config"
	"github.com/ayosafacundo/AstroForge/internal/service"
)

type Handler struct {
	Auth    *AuthHandler
	Product *ProductHandler
}

func NewHandler(service *service.Services, config *config.Config) *Handler {
	return &Handler{
		Auth:    NewAuthHandler(service.Auth),
		Product: NewProductHandler(service.Product),
	}
}
