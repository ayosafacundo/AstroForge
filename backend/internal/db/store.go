package db

import (
	dbgen "github.com/ayosafacundo/AstroForge/internal/db/dbgen"
	"github.com/jackc/pgx/v5/pgxpool"
)

// Store provides all functions to execute DB queries and transactions
type Store struct {
	Queries *dbgen.Queries
	db      *pgxpool.Pool
}

func NewStore(db *pgxpool.Pool) *Store {
	return &Store{
		Queries: dbgen.New(db),
		db:      db,
	}
}
