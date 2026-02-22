# AstroForge
Made by Ayosa Facundo Ezequiel.  

# Tech Stack

## Frontend

Core:
- React
- React Router Dom (v7)
- React Redux
- Vite

State Management & Validation
- Redux Toolkit
- Tanstack Query (with Nuqs)
- Zod

Styling
- Tailwindcss
- Lucide React
- Next themes

Specialized components:
- React Hook Form (Using Zod for validation)
- Date-fns
- React Day Picker
- React Resizable Panels
- Vaul
- recharts
- sonner
- Embla Carousel React
- Command Pallette
 

# Feature list:

## FrontEnd
[X] - **Dynamic Checkout Flow**: Multi-step wizard using React Hook Form for physical vs. digital fulfillment.  
[ ] - **Commission Workspace**: A dedicated dashboard for creators to manage "Request -> Quote -> Delivery" states.  
[ ] - **License Key Management**: UI for users to view, copy, and rotate their cryptographically signed license keys.  
[ ] - **Version History UI**: A "Changelog" component on product pages allowing users to download specific past versions of an asset.  
[ ] - **Stripe/Payment Elements Integration**: Secure hosted fields for PCI-compliant data entry.  
[ ] - **Real-time DM Interface**: A chat-style UI with optimistic updates via Tanstack Query for instant feedback.  
[X] - **Media Upload Pipeline**: Progress bars for MinIO uploads with client-side image compression/previewing.  
[X] - **Activity Feed (Twitter-style)**: Infinite scroll implementation using useInfiniteQuery for the global and following feeds.  
[ ] - **Notification Center**: A "Sonner-powered" toast system for real-time events (new sales, commission requests).  
[ ] - **Secure Asset Previews**: Watermarking logic or low-res placeholder generation for unpurchased content.  
[ ] - **RBAC (Role-Based Access Control)**: UI-level guarding for Creator-only or Admin-only routes and buttons.  
[ ] - **Search Filtering (Meilisearch)**: Advanced faceted search using Nuqs to sync filters (category, price, rating) directly to the URL.  
[ ] - **Ownership Verification**: "Purchased" badges on comments and product pages to build social proof.  

## Backend 
Core:
- Golang
- sqlc
- pgx

Storage:
- PostgreSQL
- MinIO

Cache:
- Redis

Search:
- Meilisearch

Payments:
- TBD

Reverse proxy:
- Nginx/Caddy

## Backend
[X] - **Complete and Secured Rest Api**    
[ ] - **Multi-tier Licensing Engine**: Generate and validate cryptographically signed license keys for digital assets.    
[ ] - **Payment Gateway Integration**: Implementation of Payment Gateway webhooks for asynchronous order processing.    
[ ] - **Idempotent Transaction System**: Ensure users aren't double-charged on flaky connections.    
[ ] - **Commission Workflow State Machine**: Logic to handle Request -> Quote -> Payment -> Delivery -> Revision cycles.  
[ ] - **Automated Payouts**: Logic for handling platform fees vs. creator earnings  
[ ] - **Presigned URL Service**: Securely serve private MinIO assets with time-limited access tokens.    
[ ] - **Asset Versioning Middleware**: Logic to handle "Versioned Products" by mapping file hashes to specific product releases.  
[ ] - **Rate Limiting**: Using Redis to protect expensive endpoints (Search, Auth, DM) from abuse.  
[ ] - **Media Processing Pipeline**: Background workers to generate thumbnails and optimize images upon MinIO upload.  
[ ] - **Ownership-based Access Control**: Middleware to verify "Download ownership history" before allowing file streams.  
[ ] - **Unified Commenting Engine**: Recursive or flattened nested comment logic with moderation flags.  
[ ] - **Meilisearch Sync Worker**: Background jobs to keep the PostgreSQL state and Search index in parity.  
[ ] - **Audit Logging**: Tracking sensitive creator changes (price updates, bank info) for security.  
[ ] - **Health & Telemetry**: OpenTelemetry for monitoring Go routine health and DB latency.  