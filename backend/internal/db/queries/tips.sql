-- name: SendTip :one
INSERT INTO tips (
    sender_id,
    receiver_id,
    amount,
    message
)
VALUES ($1, $2, $3, $4)
RETURNING *;
