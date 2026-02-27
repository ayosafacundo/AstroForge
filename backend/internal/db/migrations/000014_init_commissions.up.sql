CREATE TABLE commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    client_id UUID REFERENCES users(id),
    creator_id UUID REFERENCES users(id),

    conversation_id UUID REFERENCES conversations(id),

    product_id UUID REFERENCES products(id),

    status TEXT CHECK (
        status IN ('requested', 'accepted', 'completed', 'delivered', 'cancelled')
    ),

    price NUMERIC(10,2),

    created_at TIMESTAMP DEFAULT now()
);
