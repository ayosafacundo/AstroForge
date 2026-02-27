-- name: CreateProduct :one
INSERT INTO products (
    creator_id,
    title,
    description,
    price,
    is_free,
    visibility,
    thumbnail_url
)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;


-- name: GetProductByID :one
SELECT * FROM products
WHERE id = $1;


-- name: GetProductsByCreator :many
SELECT *
FROM products
WHERE creator_id = $1
ORDER BY created_at DESC;


-- name: GetPublicProducts :many
SELECT *
FROM products
WHERE visibility = 'public'
ORDER BY created_at DESC
LIMIT $1 OFFSET $2;
