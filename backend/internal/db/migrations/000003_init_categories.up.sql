CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,

    parent_id UUID REFERENCES categories(id),

    created_at TIMESTAMP DEFAULT now()
);
