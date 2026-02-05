package users

import (
	"encoding/json"
	"net/http"

	"github.com/ayosafacundo/AstroForge/internal/middleware/logger"
)

type User struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

var users []User

func getUsers(res http.ResponseWriter, req *http.Request) {
	logger.Logf("Gotten GET request from %s", req.Host)
	json.NewEncoder(res).Encode(users)
}

func createUser(res http.ResponseWriter, req *http.Request) {
	logger.Logf("Gotten POST request from %s", req.Host)
	var newUser User
	_ = json.NewDecoder(req.Body).Decode(&newUser)
	users = append(users, newUser)
	json.NewEncoder(res).Encode(newUser)
}
