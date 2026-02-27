CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    username CITEXT UNIQUE NOT NULL,
    email CITEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,

    display_name TEXT,
    bio TEXT,

    avatar_url TEXT,
    banner_url TEXT,

    is_verified BOOLEAN DEFAULT FALSE,
    is_creator BOOLEAN DEFAULT FALSE,
    is_banned BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TYPE dm_permission AS ENUM (
    'everyone',
    'mutuals',
    'followers',
    'no_one'
);

CREATE TABLE user_settings (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,

    -- Privacy
    is_profile_public BOOLEAN DEFAULT TRUE,
    show_email BOOLEAN DEFAULT FALSE,
    allow_dm_from dm_permission NOT NULL DEFAULT 'everyone', -- everyone | followers | no_one

    -- Notifications
    notify_likes BOOLEAN DEFAULT TRUE,
    notify_comments BOOLEAN DEFAULT TRUE,
    notify_follows BOOLEAN DEFAULT TRUE,
    notify_sales BOOLEAN DEFAULT TRUE,
    notify_commissions BOOLEAN DEFAULT TRUE,

    -- Email notifications
    email_notify_sales BOOLEAN DEFAULT TRUE,
    email_notify_comments BOOLEAN DEFAULT FALSE,

    -- Feed preferences
    show_nsfw BOOLEAN DEFAULT FALSE,
    show_following_only BOOLEAN DEFAULT FALSE,

    -- Download visibility
    show_downloads_public BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE user_followers (
    follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID REFERENCES users(id) ON DELETE CASCADE,

    created_at TIMESTAMP DEFAULT now(),

    PRIMARY KEY (follower_id, following_id)
);

CREATE INDEX idx_user_followers_following ON user_followers(following_id);
CREATE INDEX idx_user_followers_follower ON user_followers(follower_id);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_user_settings_updated_at
BEFORE UPDATE ON user_settings
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE OR REPLACE FUNCTION create_default_user_settings()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_settings (user_id)
    VALUES (NEW.id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_create_user_settings
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION create_default_user_settings();

CREATE OR REPLACE FUNCTION prevent_self_follow()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.follower_id = NEW.following_id THEN
        RAISE EXCEPTION 'Users cannot follow themselves';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_self_follow
BEFORE INSERT ON user_followers
FOR EACH ROW
EXECUTE FUNCTION prevent_self_follow();

CREATE OR REPLACE FUNCTION prevent_duplicate_follow()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM user_followers
        WHERE follower_id = NEW.follower_id
        AND following_id = NEW.following_id
    ) THEN
        RETURN NULL;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_duplicate_follow
BEFORE INSERT ON user_followers
FOR EACH ROW
EXECUTE FUNCTION prevent_duplicate_follow();

CREATE OR REPLACE FUNCTION prevent_username_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.username <> NEW.username THEN
        RAISE EXCEPTION 'Username cannot be changed';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_username_change
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION prevent_username_change();

CREATE OR REPLACE FUNCTION prevent_banned_user_follow()
RETURNS TRIGGER AS $$
DECLARE
    banned BOOLEAN;
BEGIN
    SELECT is_banned INTO banned
    FROM users
    WHERE id = NEW.follower_id;

    IF banned THEN
        RAISE EXCEPTION 'Banned users cannot follow others';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_banned_follow
BEFORE INSERT ON user_followers
FOR EACH ROW
EXECUTE FUNCTION prevent_banned_user_follow();