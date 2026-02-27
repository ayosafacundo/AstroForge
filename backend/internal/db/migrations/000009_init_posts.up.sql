CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    author_id UUID REFERENCES users(id) ON DELETE CASCADE,

    product_id UUID REFERENCES products(id) ON DELETE SET NULL,

    content TEXT,

    visibility TEXT DEFAULT 'public'
        CHECK (visibility IN ('public', 'followers', 'private')),

    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    deleted_at TIMESTAMP
);

CREATE INDEX idx_posts_author_created ON posts(author_id, created_at DESC);
CREATE INDEX idx_posts_created ON posts(created_at DESC);

CREATE TABLE post_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,

    media_url TEXT NOT NULL,
    media_type TEXT,

    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE post_likes (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,

    created_at TIMESTAMP DEFAULT now(),

    PRIMARY KEY(user_id, post_id)
);

CREATE TABLE reposts (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,

    comment TEXT,

    created_at TIMESTAMP DEFAULT now(),

    PRIMARY KEY(user_id, post_id)
);
