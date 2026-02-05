package users

import (
	"github.com/ayosafacundo/AstroForge/internal/router"
)

func RegisterFeature() {
	router.AddRoute("/users", getUsers, router.GET)
	router.AddRoute("/users", createUser, router.POST)
}
