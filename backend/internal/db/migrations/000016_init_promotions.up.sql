CREATE TABLE promotions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_id UUID REFERENCES products(id),
    creator_id UUID REFERENCES users(id),

    starts_at TIMESTAMP,
    ends_at TIMESTAMP,

    budget NUMERIC(10,2),

    created_at TIMESTAMP DEFAULT now()
);
