-- name: CreateOrder :one
INSERT INTO orders (
    buyer_id,
    total,
    status
)
VALUES ($1, $2, $3)
RETURNING *;


-- name: CreateOrderItem :one
INSERT INTO order_items (
    order_id,
    product_id,
    license_id,
    price
)
VALUES ($1, $2, $3, $4)
RETURNING *;
