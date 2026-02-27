-- name: CreateUserSettings :one
INSERT INTO user_settings (user_id)
VALUES ($1)
RETURNING *;

-- name: GetUserSettings :one
SELECT *
FROM user_settings
WHERE user_id = $1;

-- name: UpdatePrivacySettings :one
UPDATE user_settings
SET
    is_profile_public = $2,
    show_email = $3,
    allow_dm_from = $4,
    show_downloads_public = $5,
    updated_at = now()
WHERE user_id = $1
RETURNING *;

-- name: UpdateNotificationSettings :one
UPDATE user_settings
SET
    notify_likes = $2,
    notify_comments = $3,
    notify_follows = $4,
    notify_sales = $5,
    notify_commissions = $6,
    updated_at = now()
WHERE user_id = $1
RETURNING *;

-- name: UpdateEmailNotificationSettings :one
UPDATE user_settings
SET
    email_notify_sales = $2,
    email_notify_comments = $3,
    updated_at = now()
WHERE user_id = $1
RETURNING *;

-- name: UpdateFeedPreferences :one
UPDATE user_settings
SET
    show_nsfw = $2,
    show_following_only = $3,
    updated_at = now()
WHERE user_id = $1
RETURNING *;

-- name: UpdateDMPermission :exec
UPDATE user_settings
SET
    allow_dm_from = $2,
    updated_at = now()
WHERE user_id = $1;

-- name: ToggleNSFW :one
UPDATE user_settings
SET
    show_nsfw = NOT show_nsfw,
    updated_at = now()
WHERE user_id = $1
RETURNING show_nsfw;

-- name: DANGER_DeleteUserSettings :exec
DELETE FROM user_settings
WHERE user_id = $1;

-- name: IsProfilePublic :one
SELECT is_profile_public
FROM user_settings
WHERE user_id = $1;

-- name: GetDMPermission :one
SELECT allow_dm_from
FROM user_settings
WHERE user_id = $1;

-- name: GetSettingsForUsers :many
SELECT *
FROM user_settings
WHERE user_id = ANY($1::uuid[]);