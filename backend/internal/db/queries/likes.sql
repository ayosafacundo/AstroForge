-- name: LikePost :exec
INSERT INTO post_likes (
    user_id,
    post_id
)
VALUES ($1, $2)
ON CONFLICT DO NOTHING;


-- name: UnlikePost :exec
DELETE FROM post_likes
WHERE user_id = $1
AND post_id = $2;
