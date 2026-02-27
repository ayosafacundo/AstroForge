-- name: CreateProductVersion :one
INSERT INTO product_versions (
    product_id,
    version_number,
    changelog,
    is_latest
)
VALUES ($1, $2, $3, $4)
RETURNING *;


-- name: GetLatestVersion :one
SELECT *
FROM product_versions
WHERE product_id = $1
AND is_latest = true;


-- name: GetProductVersions :many
SELECT *
FROM product_versions
WHERE product_id = $1
ORDER BY created_at DESC;
