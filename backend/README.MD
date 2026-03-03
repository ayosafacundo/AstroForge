# Astroforge Backend

## Commands

### make migrate-up
Run migrations up.

### make migrate-down
Run migrations down to undo steps.

### make force V=n

* n is any number  

force migration "n".

### make sqlc
generate Go code with sqlc

### make dev
Run migrations up, then generates Go code.  
same as:  
`make migrate-up`  
`make sqlc`  

## How to set up and run everything.

- Install latest go release.
- Run in sequence:
    - `go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest`
    - `make dev`
    - ``