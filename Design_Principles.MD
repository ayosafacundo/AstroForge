# AstroForge

## Backend Design Principles

### Database

CORE DESIGN PRINCIPLES

Important architectural decisions:

- Products are first-class entities
- Models exist as versioned assets of products
- Posts can reference products
- Products automatically have a "post" representation
- Unified comment system (posts + products)
- Ownership stored independently of downloads
- Versioning isolated from product entity
- License system flexible
- Everything audit-safe
- No duplicated data

Database Engine