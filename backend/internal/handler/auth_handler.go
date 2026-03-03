package handler

import (
	"encoding/json"
	"net/http"

	"github.com/ayosafacundo/AstroForge/internal/service"
)

type AuthHandler struct {
	service *service.AuthService
}

func NewAuthHandler(authService *service.AuthService) *AuthHandler {
	return &AuthHandler{authService}
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {

	var req struct {
		Email    string
		Password string
	}

	json.NewDecoder(r.Body).Decode(&req)

	token, err := h.service.Login(
		r.Context(),
		req.Email,
		req.Password,
	)

	if err != nil {
		http.Error(w, err.Error(), 401)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"token": token,
	})
}

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {

	var req struct {
		Name        string
		Email       string
		Password    string
		DisplayName string
	}

	json.NewDecoder(r.Body).Decode(&req)

	token, err := h.service.Login(
		r.Context(),
		req.Email,
		req.Password,
	)

	if err != nil {
		http.Error(w, err.Error(), 401)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"token": token,
	})
}
