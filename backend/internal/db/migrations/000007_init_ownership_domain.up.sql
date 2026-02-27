CREATE TABLE product_ownership (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,

    license_id UUID REFERENCES licenses(id),

    acquired_at TIMESTAMP DEFAULT now(),

    source TEXT CHECK (
        source IN ('purchase', 'free_download', 'gift', 'commission')
    ),

    UNIQUE(user_id, product_id)
);

CREATE INDEX idx_product_ownership_user ON product_ownership(user_id);
CREATE INDEX idx_product_ownership_product ON product_ownership(product_id);

CREATE TABLE download_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    version_id UUID REFERENCES product_versions(id) ON DELETE CASCADE,

    downloaded_at TIMESTAMP DEFAULT now(),

    ip_address INET
);

CREATE INDEX idx_download_history_user ON download_history(user_id);
