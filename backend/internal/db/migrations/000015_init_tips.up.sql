CREATE TABLE tips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    sender_id UUID REFERENCES users(id),
    receiver_id UUID REFERENCES users(id),

    amount NUMERIC(10,2),

    message TEXT,

    created_at TIMESTAMP DEFAULT now()
);
