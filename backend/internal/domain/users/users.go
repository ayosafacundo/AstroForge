package users

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/ayosafacundo/AstroForge/internal/config"
	dbgen "github.com/ayosafacundo/AstroForge/internal/db/dbgen"
	"github.com/ayosafacundo/AstroForge/internal/middleware/logger"
	"github.com/ayosafacundo/AstroForge/internal/repository"
	"github.com/jackc/pgx/v5"
)

type Server struct {
	userService *repository.UserRepository
}

func InitUserDomain(pool *dbgen.Queries, config config.Config) *Server {
	return &Server{
		userService: repository.NewUserRepository(pool),
	}
}

func NewUserService(queries *dbgen.Queries) *repository.UserRepository {
	return repository.NewUserRepository(queries)
}

func (s *Server) RegisterUser(ctx context.Context, email string, name string, passwordHash string, displayName string) (dbgen.User, error) {
	u, err := s.userService.GetByEmail(ctx, email)
	if err == nil {
		if u.Username == name {
			return dbgen.User{}, errors.New("Username already registered")
		}
		if u.Email == email {
			return dbgen.User{}, errors.New("Email already registered")
		}
	}
	if errors.Is(err, pgx.ErrNoRows) {
		user, er := s.userService.CreateUser(ctx, name, email, passwordHash, &displayName)
		return user, er
	}
	return dbgen.User{}, err
}

func (s *Server) GetUserByUsername(ctx context.Context, username string) (dbgen.User, error) {
	user, err := s.userService.GetByUsername(ctx, username)
	if err != nil {
		return dbgen.User{}, err
	}
	return user, err
}

func (s *Server) GetUserList(ctx context.Context, limit int32, offset int32) ([]dbgen.User, error) {
	user, err := s.userService.ListUsers(ctx, limit, offset)
	if err != nil {
		return []dbgen.User{}, err
	}
	return user, err
}

func (s *Server) getUsers(res http.ResponseWriter, req *http.Request) {
	logger.Logf("Gotten GET request from %s", req.Host)

	limitStr := req.URL.Query().Get("limit")
	offsetStr := req.URL.Query().Get("offset")

	limit, _ := strconv.Atoi(limitStr)
	if limit <= 0 {
		limit = 10 // Default
	}

	offset, _ := strconv.Atoi(offsetStr)

	users, err := s.GetUserList(req.Context(), int32(limit), int32(offset))

	if err != nil {
		http.Error(res, "Failed to fetch users", http.StatusInternalServerError)
		return
	}
	res.Header().Set("Content-Type", "application/json")
	json.NewEncoder(res).Encode(users)
	return
}

func (s *Server) createUser(res http.ResponseWriter, req *http.Request) {
	logger.Logf("Gotten POST request from %s", req.Host)
	var newUser dbgen.User
	_ = json.NewDecoder(req.Body).Decode(&newUser)
	user, err := s.RegisterUser(req.Context(), newUser.Email, newUser.Username, newUser.PasswordHash, *newUser.DisplayName)
	if err != nil {
		http.Error(res, err.Error(), http.StatusConflict)
	}
	json.NewEncoder(res).Encode(user)
}
