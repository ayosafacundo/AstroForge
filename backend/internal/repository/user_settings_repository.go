package repository

import (
	"context"

	db "github.com/ayosafacundo/AstroForge/internal/db/dbgen"
)

func (r *UserRepository) GetUserSettings(ctx context.Context, username string) (db.UserSetting, error) {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		return db.UserSetting{}, err
	}
	return r.queries.GetUserSettings(ctx, user.ID)
}

func (r *UserRepository) UpdatePrivacySettings(ctx context.Context, username string, isProfilePublic *bool, ShowEmail *bool, AllowDmFrom db.DmPermission, ShowDownloadsPublic *bool) (db.UserSetting, error) {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		return db.UserSetting{}, err
	}
	params := db.UpdatePrivacySettingsParams{
		UserID:              user.ID,
		IsProfilePublic:     isProfilePublic,
		ShowEmail:           ShowEmail,
		AllowDmFrom:         AllowDmFrom,
		ShowDownloadsPublic: ShowDownloadsPublic,
	}
	return r.queries.UpdatePrivacySettings(ctx, params)
}

func (r *UserRepository) UpdateEmailNotificationSettings(ctx context.Context, username string, EmailNotifySales *bool, EmailNotifyComments *bool) (db.UserSetting, error) {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		return db.UserSetting{}, err
	}
	params := db.UpdateEmailNotificationSettingsParams{
		UserID:              user.ID,
		EmailNotifySales:    EmailNotifySales,
		EmailNotifyComments: EmailNotifyComments,
	}
	return r.queries.UpdateEmailNotificationSettings(ctx, params)
}

func (r *UserRepository) UpdateFeedPreferences(ctx context.Context, username string, show_nsfw *bool, show_following_only *bool) (db.UserSetting, error) {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		return db.UserSetting{}, err
	}
	params := db.UpdateFeedPreferencesParams{
		UserID:            user.ID,
		ShowNsfw:          show_nsfw,
		ShowFollowingOnly: show_following_only,
	}
	return r.queries.UpdateFeedPreferences(ctx, params)
}

func (r *UserRepository) UpdateDMPermission(ctx context.Context, username string, allow_dm_from db.DmPermission) error {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		return err
	}
	params := db.UpdateDMPermissionParams{
		UserID:      user.ID,
		AllowDmFrom: allow_dm_from,
	}
	return r.queries.UpdateDMPermission(ctx, params)
}

func (r *UserRepository) ToggleNSFW(ctx context.Context, username string, show_nsfw *bool) (*bool, error) {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		fal := false
		return &fal, err
	}
	return r.queries.ToggleNSFW(ctx, user.ID)
}

func (r *UserRepository) IsProfilePublic(ctx context.Context, username string) (*bool, error) {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		fal := false
		return &fal, err
	}
	return r.queries.IsProfilePublic(ctx, user.ID)
}

func (r *UserRepository) GetDMPermission(ctx context.Context, username string) (db.DmPermission, error) {
	user, err := r.queries.GetUserByUsername(ctx, username)
	if err != nil {
		return db.DmPermissionNoOne, err
	}
	return r.queries.GetDMPermission(ctx, user.ID)
}

// TODO: GetSettingsForUsers
// IDK what does that mean.
