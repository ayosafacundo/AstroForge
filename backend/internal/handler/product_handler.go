package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	db "github.com/ayosafacundo/AstroForge/internal/db/dbgen"
	"github.com/ayosafacundo/AstroForge/internal/service"
	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

type ProductHandler struct {
	service *service.ProductService
}

func NewProductHandler(service *service.ProductService) *ProductHandler {
	return &ProductHandler{service: service}
}

func (h *ProductHandler) Create(w http.ResponseWriter, r *http.Request) {

	userID := r.Context().Value("user_id").(pgtype.UUID)

	var req db.CreateProductParams
	req.CreatorID = userID

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "invalid request", http.StatusBadRequest)
		return
	}

	product, err := h.service.CreateProduct(
		r.Context(),
		req,
	)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(product)
}

func (h *ProductHandler) List(w http.ResponseWriter, r *http.Request) {

	limitStr := r.URL.Query().Get("limit")
	offsetStr := r.URL.Query().Get("offset")

	limit := 20
	offset := 0

	if limitStr != "" {
		if l, err := strconv.Atoi(limitStr); err == nil {
			limit = l
		}
	}

	if offsetStr != "" {
		if o, err := strconv.Atoi(offsetStr); err == nil {
			offset = o
		}
	}

	products, err := h.service.ListProducts(
		r.Context(),
		limit,
		offset,
	)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	json.NewEncoder(w).Encode(products)
}

func (h *ProductHandler) Get(w http.ResponseWriter, r *http.Request) {

	idParam := chi.URLParam(r, "id")
	var productID pgtype.UUID
	err := productID.Scan(idParam)

	if err != nil {
		http.Error(w, "invalid product id", 400)
		return
	}

	product, err := h.service.GetProduct(
		r.Context(),
		productID,
	)

	if err != nil {

		if service.IsNotFound(err) {
			http.Error(w, "product not found", 404)
			return
		}

		http.Error(w, err.Error(), 500)
		return
	}

	json.NewEncoder(w).Encode(product)
}
