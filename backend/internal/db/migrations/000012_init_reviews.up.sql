CREATE TABLE product_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID REFERENCES users(id),
    product_id UUID REFERENCES products(id),

    rating INT CHECK (rating BETWEEN 1 AND 5),

    content TEXT,

    created_at TIMESTAMP DEFAULT now(),

    UNIQUE(user_id, product_id)
);

CREATE TABLE creator_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    reviewer_id UUID REFERENCES users(id),
    creator_id UUID REFERENCES users(id),

    rating INT CHECK (rating BETWEEN 1 AND 5),

    content TEXT,

    created_at TIMESTAMP DEFAULT now()
);
