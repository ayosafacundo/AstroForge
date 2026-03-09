package repository

import (
	"context"

	db "github.com/ayosafacundo/AstroForge/internal/db/dbgen"
	"github.com/jackc/pgx/v5/pgtype"
)

type ProductRepository struct {
	queries *db.Queries
}

func NewProductRepository(q *db.Queries) *ProductRepository {
	return &ProductRepository{q}
}

// CreateProduct
func (r ProductRepository) CreateProduct(ctx context.Context, CreatorID pgtype.UUID, Title string, Description string, Price pgtype.Numeric, Visibility string, ThumbnailUrl *string) (db.Product, error) {

	price, err := Price.Float64Value()
	IsFree := true
	if err == nil && price.Valid && price.Float64 > 0.0 {
		IsFree = false
	}

	productParams := db.CreateProductParams{
		CreatorID:    CreatorID,
		Title:        Title,
		Description:  &Description,
		Price:        Price,
		IsFree:       &IsFree,
		Visibility:   Visibility,
		ThumbnailUrl: ThumbnailUrl,
	}

	return r.queries.CreateProduct(ctx, productParams)
}

// ListProducts
func (r ProductRepository) ListProducts(ctx context.Context, limit int32, offset int32) ([]db.Product, error) {

	getProductParams := db.GetPublicProductsParams{
		Limit:  limit,
		Offset: offset,
	}

	return r.queries.GetPublicProducts(ctx, getProductParams)
}

// GetProduct
func (r ProductRepository) GetProducts(ctx context.Context, id pgtype.UUID) (db.Product, error) {
	return r.queries.GetProductByID(ctx, id)
}
