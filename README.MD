# AstroForge 🚀
AstroForge is a full-stack, distributed 3D printing ecosystem that seamlessly bridges a specialized e-commerce marketplace with a high-throughput social infrastructure. Engineered with a localized, decentralized philosophy, the platform enables creators to securely store, version, and monetize 3D printable files while fostering organic engagement through a real-time, microblogging community framework.

---

## 🛠️ Core Architectural Pillars

### 📦 Git-Like 3D Asset Versioning System
* **Immutable Asset Tracking:** Built an internal version control layout optimized for large binary objects (`.STL`, `.OBJ`, `.3MF`), tracking structural changes, parameter tweaks, and print-setting optimizations across a model's lifecycle.
* **Deterministic Delta Commits:** Implemented a structured commit-and-tag workflow allowing creators to push model revisions, track breaking design fixes, and let end-users download legacy versions matching specific printer configurations.

### 💳 Specialized 3D Printing E-Commerce Marketplace
* **Asynchronous File Delivery:** Engineered a secure asset pipelines that abstracts storage mechanisms, generating time-expiring download tokens upon validated transactional verification.
* **Metadata & Print Telemetry:** Designed an extensible relational database schema capable of indexing complex asset metadata (print times, filament types, infill densities, and printer compatibility arrays).

### 💬 High-Throughput Microblogging (Twitter-like) Framework
* **Real-Time Social Graph:** Architected a low-latency relational feed delivery mechanism processing user interactions, post dispatches, nested threading, and media attachments.
* **Event-Driven Feed Architecture:** Optimized database indexing and query layouts to pull chronological, highly-relational timelines combining creator system updates (new model versions) with social user interactions.

---

## ⚡ Technical Highlights & System Design

* **Full-Stack Decoupling:** Structured with a distinct separation of concerns—leveraging an optimized backend API to enforce access controls, resource isolation, and business logic, alongside a highly responsive, state-driven user interface.
* **Optimized Object Storage & Caching:** Utilized Redis caching layers for instant feed delivery and MinIO/S3 object storage for binary 3D assets.
* **Secure Sandbox Deliverables:** Enforces absolute file integrity checks via cryptographic hashing (SHA-256) to eliminate data corruption during multi-part model downloads.

---

## 🚀 Getting Started

### Prerequisites
* Ensure you have [Docker & Docker Compose](https://www.docker.com/) installed.
* Ensure you have the corresponding runtime environments configured for both the frontend and backend service instances.

### Quickstart Installation
1. **Clone the repository:**
  ```bash
  git clone [https://github.com/ayosafacundo/AstroForge.git](https://github.com/ayosafacundo/AstroForge.git)
  cd AstroForge
  ```
2. **Configure Environment Variables:**  
Create a .env file in both the ``backend` and `/frontend` directories using the provided `.env.example` templates.

3. **Spin up the localized infrastructure:**
```bash
docker-compose up --build -d
```
### 💡 Tech Stack Customization Note
This layout highlights that you aren't just building a simple CRUD app; you are handling complex concepts like binary asset handling, file integrity, and data indexing!

---

# 🛠️ Tech Stack

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