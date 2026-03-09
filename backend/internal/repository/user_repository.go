package repository

import (
	"context"
	"errors"

	db "github.com/ayosafacundo/AstroForge/internal/db/dbgen"
	"github.com/jackc/pgx/v5/pgtype"
)

type UserRepository struct {
	queries *db.Queries
}

func NewUserRepository(q *db.Queries) *UserRepository {
	return &UserRepository{q}
}

func (r *UserRepository) CreateUser(ctx context.Context, name string, email string, passwordhash string, displayname *string) (db.User, error) {
	newuser := db.CreateUserParams{
		Username:     name,
		Email:        email,
		PasswordHash: passwordhash,
		DisplayName:  displayname,
	}
	return r.queries.CreateUser(ctx, newuser)
}

// GetByUsername requests a context and a full Username as string.
// It returns either (the result, nil) or (nil, an error)
func (r *UserRepository) GetByID(ctx context.Context, ID pgtype.UUID) (db.User, error) {
	return r.queries.GetUserByID(ctx, ID)
}

// GetByUsername requests a context and a full Username as string.
// It returns either (the result, nil) or (nil, an error)
func (r *UserRepository) GetByUsername(ctx context.Context, Username string) (db.User, error) {
	return r.queries.GetUserByUsername(ctx, Username)
}

// GetByEmail requests a context and a full email as string.
// It returns either (the result, nil) or (nil, an error)
func (r *UserRepository) GetByEmail(ctx context.Context, email string) (db.User, error) {
	return r.queries.GetUserByEmail(ctx, email)
}

func (r *UserRepository) FollowUser(ctx context.Context, host string, following string) error {
	hostUser, err1 := r.queries.GetUserByUsername(ctx, host)
	followingUser, err2 := r.queries.GetUserByUsername(ctx, following)
	if err1 != nil || err2 != nil {
		return errors.New("Missing either follower or following user")
	}
	FollowUserParams := db.FollowUserParams{
		FollowerID:  hostUser.ID,
		FollowingID: followingUser.ID,
	}
	return r.queries.FollowUser(ctx, FollowUserParams)
}

func (r *UserRepository) UpdateUserProfile(ctx context.Context, displayname *string, bio *string, avatar_url *string, banner_url *string) (db.User, error) {
	args := db.UpdateUserProfileParams{
		DisplayName: displayname,
		Bio:         bio,
		AvatarUrl:   avatar_url,
		BannerUrl:   banner_url,
	}
	return r.queries.UpdateUserProfile(ctx, args)
}

func (r *UserRepository) UpdateEmail(ctx context.Context, username string, email string) (db.User, error) {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		return db.User{}, err
	}
	params := db.UpdateEmailParams{
		ID:    user.ID,
		Email: email,
	}
	return r.queries.UpdateEmail(ctx, params)
}

func (r *UserRepository) UpdatePassword(ctx context.Context, username string, passwordHash string) error {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		return err
	}
	params := db.UpdatePasswordParams{
		ID:           user.ID,
		PasswordHash: passwordHash,
	}
	return r.queries.UpdatePassword(ctx, params)
}

func (r *UserRepository) UpdateUserBanner(ctx context.Context, username string, banner_url string) error {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		return err
	}
	params := db.UpdateUserBannerParams{
		ID:        user.ID,
		BannerUrl: &banner_url,
	}
	return r.queries.UpdateUserBanner(ctx, params)
}

func (r *UserRepository) UpdateUserAvatar(ctx context.Context, username string, avatar_url string) error {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		return err
	}
	params := db.UpdateUserAvatarParams{
		ID:        user.ID,
		AvatarUrl: &avatar_url,
	}
	return r.queries.UpdateUserAvatar(ctx, params)
}

func (r *UserRepository) VerifyUser(ctx context.Context, username string) error {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		return err
	}
	return r.queries.VerifyUser(ctx, user.ID)
}

func (r *UserRepository) UnverifyUser(ctx context.Context, username string) error {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		return err
	}
	return r.queries.UnverifyUser(ctx, user.ID)
}

func (r *UserRepository) PromoteUserToCreator(ctx context.Context, username string) error {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		return err
	}
	return r.queries.PromoteToCreator(ctx, user.ID)
}

func (r *UserRepository) DemoteUserFromCreator(ctx context.Context, username string) error {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		return err
	}
	return r.queries.DemoteCreator(ctx, user.ID)
}

func (r *UserRepository) BanUser(ctx context.Context, username string) error {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		return err
	}
	return r.queries.BanUser(ctx, user.ID)
}

func (r *UserRepository) UnbanUser(ctx context.Context, username string) error {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		return err
	}
	return r.queries.UnbanUser(ctx, user.ID)
}

func (r *UserRepository) SoftDeleteUser(ctx context.Context, username string) error {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		return err
	}
	return r.queries.SoftDeleteUser(ctx, user.ID)
}

func (r *UserRepository) ListUsers(ctx context.Context, limit int32, offset int32) ([]db.User, error) {
	arg := db.ListUsersParams{
		Limit:  limit,
		Offset: offset,
	}
	return r.queries.ListUsers(ctx, arg)
}

func (r *UserRepository) SearchUsersByUsername(ctx context.Context, username string, limit int32, offset int32) ([]db.User, error) {
	arg := db.SearchUsersByUsernameParams{
		Column1: &username,
		Limit:   limit,
		Offset:  offset,
	}
	return r.queries.SearchUsersByUsername(ctx, arg)
}

func (r *UserRepository) GetPublicUserProfile(ctx context.Context, username string) (db.GetPublicUserProfileRow, error) {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		return db.GetPublicUserProfileRow{}, err
	}
	return r.queries.GetPublicUserProfile(ctx, user.ID)
}
