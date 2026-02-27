CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    buyer_id UUID REFERENCES users(id),

    total NUMERIC(10,2) NOT NULL,

    status TEXT CHECK (
        status IN ('pending', 'completed', 'refunded', 'cancelled')
    ),

    created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_orders_buyer ON orders(buyer_id);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),

    license_id UUID REFERENCES licenses(id),

    price NUMERIC(10,2) NOT NULL
);

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    order_id UUID REFERENCES orders(id),

    provider TEXT,
    provider_payment_id TEXT,

    amount NUMERIC(10,2),

    status TEXT,

    created_at TIMESTAMP DEFAULT now()
);