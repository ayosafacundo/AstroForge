CREATE TABLE licenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_id UUID REFERENCES products(id) ON DELETE CASCADE,

    name TEXT NOT NULL,
    description TEXT,

    allows_commercial BOOLEAN DEFAULT FALSE,
    allows_modification BOOLEAN DEFAULT TRUE,
    allows_redistribution BOOLEAN DEFAULT FALSE,

    price_modifier NUMERIC(10,2) DEFAULT 0,

    created_at TIMESTAMP DEFAULT now()
);
