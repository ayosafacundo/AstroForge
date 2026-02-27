-- name: AddDownloadHistory :exec
INSERT INTO download_history (
    user_id,
    version_id,
    ip_address
)
VALUES ($1, $2, $3);


-- name: GetDownloadHistory :many
SELECT *
FROM download_history
WHERE user_id = $1
ORDER BY downloaded_at DESC;


-- name: DeleteDownloadHistoryEntry :exec
DELETE FROM download_history
WHERE id = $1
AND user_id = $2;
