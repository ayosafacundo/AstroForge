-- name: CreateConversation :one
INSERT INTO conversations (
    is_commission
)
VALUES ($1)
RETURNING *;


-- name: AddConversationParticipant :exec
INSERT INTO conversation_participants (
    conversation_id,
    user_id
)
VALUES ($1, $2);
