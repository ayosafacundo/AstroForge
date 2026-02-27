CREATE TABLE product_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,

    version_number TEXT NOT NULL,
    changelog TEXT,

    is_latest BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT now(),

    UNIQUE(product_id, version_number)
);

CREATE INDEX idx_product_versions_product ON product_versions(product_id);
CREATE INDEX idx_product_versions_latest ON product_versions(product_id, is_latest);

CREATE TABLE version_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    version_id UUID NOT NULL REFERENCES product_versions(id) ON DELETE CASCADE,

    file_url TEXT NOT NULL,
    file_name TEXT,
    file_size BIGINT,

    file_type TEXT,
    checksum TEXT,

    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE version_metadata (
    version_id UUID PRIMARY KEY REFERENCES product_versions(id) ON DELETE CASCADE,

    print_time_estimate TEXT,
    material TEXT,
    supports_required BOOLEAN,
    infill TEXT,
    dimensions TEXT,
    resolution TEXT
);
