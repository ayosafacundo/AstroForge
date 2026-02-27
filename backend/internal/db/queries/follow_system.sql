-- name: FollowUser :exec
INSERT INTO user_followers (
    follower_id,
    following_id
)
VALUES ($1, $2)
ON CONFLICT DO NOTHING;


-- name: UnfollowUser :exec
DELETE FROM user_followers
WHERE follower_id = $1
AND following_id = $2;


-- name: GetFollowers :many
SELECT users.*
FROM users
JOIN user_followers
ON users.id = user_followers.follower_id
WHERE user_followers.following_id = $1;

-- name: GetFollowing :many
SELECT u.*
FROM user_followers uf
JOIN users u ON u.id = uf.following_id
WHERE uf.follower_id = $1
AND u.is_banned = FALSE
ORDER BY uf.created_at DESC
LIMIT $2 OFFSET $3;

-- name: IsFollowing :one
SELECT EXISTS (
    SELECT 1
    FROM user_followers
    WHERE follower_id = $1
    AND following_id = $2
);

-- name: CountFollowers :one
SELECT COUNT(*)
FROM user_followers
WHERE following_id = $1;

-- name: CountFollowing :one
SELECT COUNT(*)
FROM user_followers
WHERE follower_id = $1;

-- name: IsMutualFollow :one
SELECT EXISTS (
    SELECT 1
    FROM user_followers f1
    JOIN user_followers f2
      ON f1.follower_id = f2.following_id
     AND f1.following_id = f2.follower_id
    WHERE f1.follower_id = $1
      AND f1.following_id = $2
);

-- name: GetMutualFollows :many
SELECT u.*
FROM user_followers f1
JOIN user_followers f2
  ON f1.follower_id = f2.following_id
 AND f1.following_id = f2.follower_id
JOIN users u
  ON u.id = f1.following_id
WHERE f1.follower_id = $1
AND u.is_banned = FALSE
LIMIT $2 OFFSET $3;