package repository

import (
	db "github.com/ayosafacundo/AstroForge/internal/db/dbgen"
)

type Repositories struct {
	User    *UserRepository
	Product *ProductRepository
}

func NewRepository(q *db.Queries) *Repositories {
	return &Repositories{
		User:    NewUserRepository(q),
		Product: NewProductRepository(q),
	}
}

/*
// ExecTx grabs the Store struct, creates a new Store and executes the function.
// If any of the queries inside fails AND the error is returned, the full transaction rolls back.
// If everything goes according to plan, it gets committed.
// Usage:
// ExecTx(ctx, func(q db.Queries){ queries inside with q.queries.whatever() })
func (s *Repositories) ExecTx(ctx context.Context, fn func(*db.Queries) error) error {
	tx, err := s.Begin(ctx)
	if err != nil {
		return err
	}

	// Use the generated WithTx to create queries scoped to this transaction
	qtx := s.Queries.WithTx(tx)

	err = fn(qtx)
	if err != nil {
		if rbErr := tx.Rollback(ctx); rbErr != nil {
			return fmt.Errorf("tx err: %v, rb err: %v", err, rbErr)
		}
		return err
	}

	return tx.Commit(ctx)
}*/
