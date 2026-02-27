-- name: GrantOwnership :one
INSERT INTO product_ownership (
    user_id,
    product_id,
    license_id,
    source
)
VALUES ($1, $2, $3, $4)
RETURNING *;


-- name: CheckOwnership :one
SELECT *
FROM product_ownership
WHERE user_id = $1
AND product_id = $2;


-- name: GetUserLibrary :many
SELECT products.*
FROM products
JOIN product_ownership
ON products.id = product_ownership.product_id
WHERE product_ownership.user_id = $1
ORDER BY product_ownership.acquired_at DESC;
