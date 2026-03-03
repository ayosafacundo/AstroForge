# Load environment variables from .env file
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

# --- Commands ---

# Run migrations up
migrate-up:
	migrate -path internal/middleware/db/migrations -database "$(DATABASE_URI)" up

# Usage: make force V=5
force:
	migrate -path internal/middleware/db/migrations -database "$(DATABASE_URI)" force $(V)

# Run migrations down (undo 1 step)
migrate-down:
	migrate -path internal/middleware/db/migrations -database "$(DATABASE_URI)" down 1

# Generate Go code with sqlc
sqlc:
	sqlc generate

# The "I'm developing" command: migrate and then generate
dev: migrate-up sqlc

.PHONY: migrate-up migrate-down sqlc dev