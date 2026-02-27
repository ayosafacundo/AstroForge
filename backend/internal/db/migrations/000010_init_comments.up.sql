CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    author_id UUID REFERENCES users(id) ON DELETE CASCADE,

    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,

    parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,

    content TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_comments_post ON comments(post_id);
