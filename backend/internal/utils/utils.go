package utils

import (
	"github.com/jackc/pgx/v5/pgtype"
)

func CheckPassword(password string, PasswordHash string) error {
	return nil
}

func GenerateJWT(ID pgtype.UUID) string {
	return "todo"
}
