package service

import (
	"context"

	"github.com/ayosafacundo/AstroForge/internal/repository"
	"github.com/ayosafacundo/AstroForge/internal/utils"
)

type AuthService struct {
	users *repository.UserRepository
}

func NewAuthService(users *repository.UserRepository) *AuthService {
	return &AuthService{users}
}

func (s *AuthService) Login(
	ctx context.Context,
	email string,
	password string,
) (string, error) {

	user, err := s.users.GetByEmail(ctx, email)

	if err != nil {
		return "", err
	}

	err = utils.CheckPassword(password, user.PasswordHash)

	if err != nil {
		return "", err
	}

	token := utils.GenerateJWT(user.ID)

	return token, nil
}
