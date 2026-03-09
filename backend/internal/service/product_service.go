package service

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"

	db "github.com/ayosafacundo/AstroForge/internal/db/dbgen"
	"github.com/ayosafacundo/AstroForge/internal/repository"
)

type ProductService struct {
	repository *repository.ProductRepository
}

func NewProductService(repo *repository.ProductRepository) *ProductService {
	return &ProductService{repo}
}

func (s *ProductService) CreateProduct(ctx context.Context, req db.CreateProductParams) (db.Product, error) {
	return s.repository.CreateProduct(ctx, req.CreatorID, req.Title, *req.Description, req.Price, req.Visibility, nil)
}

func (s *ProductService) ListProducts(ctx context.Context, limit int, offset int) ([]db.Product, error) {
	return s.repository.ListProducts(ctx, int32(limit), int32(offset))
}

func (s *ProductService) GetProduct(ctx context.Context, id pgtype.UUID) (db.Product, error) {
	return s.repository.GetProducts(ctx, id)
}
