-- name: CreatePost :one
INSERT INTO posts (
    author_id,
    product_id,
    content,
    visibility
)
VALUES ($1, $2, $3, $4)
RETURNING *;


-- name: GetPostByID :one
SELECT *
FROM posts
WHERE id = $1;


-- name: GetFeed :many
SELECT posts.*
FROM posts
JOIN user_followers
ON posts.author_id = user_followers.following_id
WHERE user_followers.follower_id = $1
ORDER BY posts.created_at DESC
LIMIT $2 OFFSET $3;


-- name: GetUserPosts :many
SELECT *
FROM posts
WHERE author_id = $1
ORDER BY created_at DESC;
