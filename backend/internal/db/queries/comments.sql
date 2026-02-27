-- name: CreateComment :one
INSERT INTO comments (
    author_id,
    post_id,
    parent_comment_id,
    content
)
VALUES ($1, $2, $3, $4)
RETURNING *;


-- name: GetPostComments :many
SELECT *
FROM comments
WHERE post_id = $1
ORDER BY created_at ASC;
