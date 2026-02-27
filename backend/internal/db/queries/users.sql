-- name: CreateUser :one
INSERT INTO users (
    username,
    email,
    password_hash,
    display_name
)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetUserByID :one
SELECT * FROM users
WHERE id = $1;


-- name: GetUserByUsername :one
SELECT * FROM users
WHERE username = $1;


-- name: GetUserByEmail :one
SELECT * FROM users
WHERE email = $1;

-- name: UsernameExists :one
SELECT EXISTS (
    SELECT 1 FROM users WHERE username = $1
);

-- name: EmailExists :one
SELECT EXISTS (
    SELECT 1 FROM users WHERE email = $1
);

-- name: UpdateUserProfile :one
UPDATE users
SET
    display_name = $2,
    bio = $3,
    avatar_url = $4,
    banner_url = $5,
    updated_at = now()
WHERE id = $1
RETURNING *;


-- name: UpdateUsername :one
UPDATE users
SET
    username = $2,
    updated_at = now()
WHERE id = $1
RETURNING *;

-- name: UpdateEmail :one
UPDATE users
SET
    email = $2,
    updated_at = now()
WHERE id = $1
RETURNING *;

-- name: UpdatePassword :exec
UPDATE users
SET
    password_hash = $2,
    updated_at = now()
WHERE id = $1;

-- name: UpdateUserAvatar :exec
UPDATE users
SET
    avatar_url = $2,
    updated_at = now()
WHERE id = $1;

-- name: UpdateUserBanner :exec
UPDATE users
SET
    banner_url = $2,
    updated_at = now()
WHERE id = $1;

-- name: VerifyUser :exec
UPDATE users
SET
    is_verified = TRUE,
    updated_at = now()
WHERE id = $1;

-- name: UnverifyUser :exec
UPDATE users
SET
    is_verified = FALSE,
    updated_at = now()
WHERE id = $1;

-- name: PromoteToCreator :exec
UPDATE users
SET
    is_creator = TRUE,
    updated_at = now()
WHERE id = $1;

-- name: DemoteCreator :exec
UPDATE users
SET
    is_creator = FALSE,
    updated_at = now()
WHERE id = $1;

-- name: BanUser :exec
UPDATE users
SET
    is_banned = TRUE,
    updated_at = now()
WHERE id = $1;

-- name: UnbanUser :exec
UPDATE users
SET
    is_banned = FALSE,
    updated_at = now()
WHERE id = $1;

-- name: SoftDeleteUser :exec
UPDATE users
SET
    is_banned = TRUE,
    email = CONCAT('deleted_', id, '@deleted.local'),
    username = CONCAT('deleted_', id),
    password_hash = '',
    display_name = NULL,
    bio = NULL,
    avatar_url = NULL,
    banner_url = NULL,
    updated_at = now()
WHERE id = $1;

-- name: DANGER_HardDeleteUser :exec
DELETE FROM users
WHERE id = $1;

-- name: ListUsers :many
SELECT *
FROM users
ORDER BY created_at DESC
LIMIT $1 OFFSET $2;

-- name: SearchUsersByUsername :many
SELECT *
FROM users
WHERE username ILIKE '%' || $1 || '%'
AND is_banned = FALSE
ORDER BY created_at DESC
LIMIT $2 OFFSET $3;

-- name: GetPublicUserProfile :one
SELECT
    id,
    username,
    display_name,
    bio,
    avatar_url,
    banner_url,
    is_verified,
    is_creator,
    created_at
FROM users
WHERE id = $1
AND is_banned = FALSE;