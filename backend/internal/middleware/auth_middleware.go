package middleware

import (
	"context"
	"errors"
	"net/http"
	"strings"

	"github.com/ayosafacundo/AstroForge/internal/repository"
	"github.com/ayosafacundo/AstroForge/internal/utils"
	"github.com/jackc/pgx/v5"
)

type AuthMiddleware struct {
	repo      *repository.UserRepository
	JWTSecret string
}

func NewAuthMiddleware(repo *repository.UserRepository, JWTSecret string) *AuthMiddleware {
	return &AuthMiddleware{
		repo:      repo,
		JWTSecret: JWTSecret,
	}
}

func (m *AuthMiddleware) Handler(next http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		authHeader := r.Header.Get("Authorization")

		if authHeader == "" {
			http.Error(w, "missing authorization header", http.StatusUnauthorized)
			return
		}

		parts := strings.Split(authHeader, " ")

		if len(parts) != 2 || parts[0] != "Bearer" {
			http.Error(w, "invalid authorization format", http.StatusUnauthorized)
			return
		}

		tokenString := parts[1]

		claims, err := utils.ParseJWT(tokenString, m.JWTSecret)

		if err != nil {
			http.Error(w, "invalid token", http.StatusUnauthorized)
			return
		}

		user, err := m.repo.GetByID(r.Context(), claims.UserID)

		if err != nil {

			if errors.Is(err, pgx.ErrNoRows) {
				http.Error(w, "user not found", http.StatusUnauthorized)
				return
			}

			http.Error(w, "database error", http.StatusInternalServerError)
			return
		}

		if user.IsBanned != nil || *user.IsBanned == true {
			http.Error(w, "user banned", http.StatusForbidden)
			return
		}

		ctx := context.WithValue(
			r.Context(),
			UserIDKey,
			user.ID,
		)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
