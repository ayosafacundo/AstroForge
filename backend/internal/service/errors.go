package service

import (
	"errors"

	"github.com/jackc/pgx/v5"
)

func IsNotFound(err error) bool {
	if err == nil {
		return false
	}
	// Check if the error is (or wraps) pgx.ErrNoRows
	return errors.Is(err, pgx.ErrNoRows)
}
