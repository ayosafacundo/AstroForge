-- name: SendMessage :one
INSERT INTO messages (
    conversation_id,
    sender_id,
    content,
    attachment_url
)
VALUES ($1, $2, $3, $4)
RETURNING *;


-- name: GetMessages :many
SELECT *
FROM messages
WHERE conversation_id = $1
ORDER BY created_at ASC;
