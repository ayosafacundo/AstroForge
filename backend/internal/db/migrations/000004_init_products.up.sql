CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    title TEXT NOT NULL,
    description TEXT,

    price NUMERIC(10,2) DEFAULT 0,
    is_free BOOLEAN DEFAULT FALSE,

    is_physical BOOLEAN DEFAULT FALSE,

    visibility TEXT NOT NULL DEFAULT 'public'
        CHECK (visibility IN ('public', 'unlisted', 'private')),

    thumbnail_url TEXT,

    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    deleted_at TIMESTAMP
);

CREATE INDEX idx_products_creator ON products(creator_id);
CREATE INDEX idx_products_visibility ON products(visibility);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,

    url TEXT NOT NULL,

    position INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE product_categories (
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,

    PRIMARY KEY(product_id, category_id)
);
