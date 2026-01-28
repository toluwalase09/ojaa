# ojaa — Product Requirements Document (PRD)

## 1. Product Summary
**ojaa** is an Africa-first, eco-centric online fashion marketplace where shoppers discover and buy from multiple clothing lines in one place. The experience should feel similar to Fashion Nova: trend-forward merchandising, fast browsing, strong product pages, and an easy checkout. ojaa differentiates with:
- **Africa eco-centric positioning** (local brands, African textiles, sustainability signals and storytelling)
- **Multi-brand storefronts** (each clothing line has its own shop within the platform)
- **Advanced AI Try-On** (users upload a photo and preview clothing on themselves before purchasing)

## 2. Goals & Success Metrics
### 2.1 Goals
- Build a multi-brand fashion marketplace centered on African designers and eco-conscious production.
- Enable category-led and trend-led discovery (Women, Men, Kids, Others).
- Provide realistic AI try-on to reduce fit uncertainty and increase conversion.
- Support African payment methods and logistics realities across target markets.

### 2.2 Success Metrics (initial targets)
- **Time-to-first-order**: < 15 minutes for a new user.
- **PDP → Checkout conversion**: ≥ 5%.
- **AI try-on adoption**: ≥ 40% of active shoppers use try-on pre-purchase.
- **Repeat purchase rate (60 days)**: ≥ 25%.
- **Eco/origin metadata coverage**: ≥ 70% of listed products have eco/origin tags.

## 3. Scope
### 3.1 In Scope (MVP → Scale)
- Marketplace catalog + discovery (categories, search, filters)
- Brand storefronts and brand onboarding (admin-assisted or self-serve)
- Product detail pages with variants (size, color) and rich media
- Cart, checkout, payments, order management, basic returns
- Reviews, wishlist, follow brands (at least wishlist in MVP)
- AI try-on (Beta in Phase 2; advanced approach)
- Eco metadata, eco badges, and “Made in Africa” storytelling blocks

### 3.2 Out of Scope (for now)
- Live shopping / livestream commerce
- Fully automated cross-border taxes/customs optimization
- 3D full-body scanning hardware integrations
- Custom on-demand manufacturing workflows

## 4. Target Users & Personas
### 4.1 Shopper (Primary)
- Wants fast browsing, clear fit guidance, local payments, reliable delivery.
- Values representation across African skin tones and body types.

### 4.2 Brand Partner / Clothing Line Owner
- Needs a storefront, product management, inventory, and order workflows.
- Wants performance analytics and a way to communicate sustainability story.

### 4.3 Admin / Operations
- Verifies brands, manages catalog quality, moderates try-on content, resolves disputes.
- Oversees refunds/returns, logistics exceptions, and policy enforcement.

### 4.4 Stylist / Influencer (Future)
- Curates collections/looks, drives traffic, earns commissions.

## 5. Core User Journeys
### 5.1 Browse → Product → Try-On → Purchase
1) User browses category (Women/Men/Kids/Others) and applies filters (size, price, eco, brand).
2) User opens a product page, chooses variant (size/color), checks size guide and reviews.
3) User selects **Try it on me**, uploads a photo, and views try-on result.
4) User adds to cart, checks out, and receives order confirmation and tracking.

### 5.2 Brand Onboarding → Storefront → Orders
1) Brand applies / is invited, submits verification details and payout info.
2) Brand sets up storefront visuals and story.
3) Brand uploads products with variants, inventory, eco/origin metadata.
4) Brand fulfills orders, handles returns per policy, reviews analytics.

## 6. Functional Requirements

### 6.1 Information Architecture & Categories
- **Top-level categories**: Women, Men, Kids, Others.
- **Subcategories** (examples):
  - Women: Dresses, Tops, Bottoms, Sets, Curve/Plus, Occasion, Lounge.
  - Men: Shirts, Trousers, Native/Traditional, Streetwear, Footwear.
  - Kids: Baby, Girls, Boys, Teens.
  - Others: Accessories, Shoes, Bags, Jewelry, Beauty, Home.
- Category pages must support **filters, sort, and pagination/infinite scroll**.

### 6.2 Search & Discovery
- Keyword search with typeahead suggestions (brands, categories, trending terms).
- Faceted filters:
  - Size, price range, color, brand, country/region tags, eco badges, fabric.
- Sorting:
  - Most popular, New in, Price (low–high, high–low), Eco-first.
- Merchandising:
  - Featured collections (“Ankara Edit”, “Made in Lagos”, “Eco Collection”, etc.).

### 6.3 Brand Storefronts
- Brand profile:
  - Logo, banner, description, origin story, sustainability statements, rating.
- Brand shop:
  - Brand products grid with filters/sort and curated collections.
- Brand onboarding:
  - Admin review/verification flow.
  - Payout details management (bank/mobile money where applicable).

### 6.4 Product Detail Page (PDP)
- Must include:
  - Product title, brand, price/discount, stock status.
  - Variant selector (size, color), SKU-level inventory.
  - Size guide + fit notes + model stats where provided.
  - Fabric/material + care instructions.
  - Eco/origin badges and short impact notes.
  - Reviews (and optionally Q&A).
  - Strong CTA placement: **Add to cart** and **Try it on me**.
- Rich media:
  - Multiple images; optional video.
  - Display diverse models where possible (encourage brands to upload).

### 6.5 Cart & Checkout
- Unified cart supports **multiple brands** simultaneously.
- Display:
  - Per-brand subtotals + overall total, shipping estimates, discounts.
- Checkout:
  - Address selection (multiple saved addresses), shipping options by region.
  - Promo codes and vouchers.
- Payments:
  - Support local African payment methods + international cards.
  - Payment tokenization handled by payment provider (no raw card storage).

### 6.6 Orders, Returns, Logistics
- Orders:
  - Order statuses: placed, paid, processing, shipped, delivered, canceled.
  - Per-item/per-brand fulfillment visibility (if split shipments).
- Returns/exchanges:
  - Item-level return initiation with reasons.
  - Policy rules by brand/category (window, condition).
- Logistics:
  - Courier integration(s) with tracking status sync.
  - Customer notifications (email/SMS/WhatsApp optional).

### 6.7 Accounts, Wishlist, Following
- Shopper:
  - Profile, saved addresses, order history, wishlist.
  - Optional: preference center (sizes, style, eco preferences).
- Wishlist:
  - Save products; later expand to “save looks”.
- Follow brands:
  - User can follow a clothing line to see new drops.

### 6.8 Reviews & Ratings
- Verified-purchase reviews (where possible).
- Rating + comment + optional photos.
- Basic moderation tooling (admin).

### 6.9 AI Try-On (Advanced)
#### 6.9.1 UX Requirements
- Entry points:
  - PDP “Try it on me” button.
- Flow:
  - Upload photo (clear guidelines), confirm size profile (height/weight/usual size optional).
  - Generate try-on preview for selected variant.
  - Allow switching size/color and regenerate.
- Performance target:
  - 90% of try-ons complete in **≤ 25 seconds**.

#### 6.9.2 Privacy & Safety Requirements
- Explicit user consent for photo processing.
- Clear retention controls:
  - Default retention window (configurable) + “delete now” option.
- Moderation:
  - Block nudity, hate symbols, and disallowed content.
- Sharing controls:
  - Option to blur face / anonymize before sharing.

#### 6.9.3 Technical Requirements (Product-level)
- Asynchronous generation with status:
  - “Queued / Processing / Completed / Failed”.
- Store try-on session metadata and outputs.
- Fallback behavior when service is down:
  - Try-on disabled gracefully; shopping continues normally.

### 6.10 Eco & Africa-Centric Signals
- Eco metadata at product level:
  - Organic/recycled/deadstock, artisan-made, small batch, locally made.
- Origin tags:
  - City/country, textile type (e.g., Ankara, Aso Oke), artisan/community.
- Surfacing:
  - Eco-first filters and collections.
- Storytelling:
  - Brand pages include “impact/story” sections; product pages include short “why it matters”.

## 7. Roles & Permissions (RBAC)
- **Shopper**: browse, purchase, review, wishlist, try-on.
- **Brand**: manage storefront, products, variants, inventory, orders (assigned), returns (assigned).
- **Admin/Ops**: manage brands verification, catalog moderation, try-on moderation, disputes, global promotions.

## 8. Non-Functional Requirements
- **Performance**:
  - Optimize for mobile-first and lower-bandwidth networks.
  - Category browsing and PDP should feel “instant” with caching and image optimization.
- **Reliability**:
  - Idempotent payment/order creation; retries on transient failures.
- **Security**:
  - Strong auth, secure file uploads, least-privilege access, audit logging for admin actions.
- **Observability**:
  - Metrics for conversion funnel, payment success, try-on success/fail rates, logistics sync health.

## 9. Technical Architecture (High-Level)
### 9.1 Frontend
- **Next.js** (TypeScript), responsive UI with modern merchandising patterns.
- Key pages:
  - Home, Category, Product Detail, Brand Storefront, Cart, Checkout, Orders, Account, Wishlist, Try-On.
- SEO:
  - Server-rendered or statically generated pages for catalog/brand/product where appropriate.

### 9.2 Backend
- **Python API** (recommended: FastAPI; acceptable: Flask) with modular routing.
- Domains/modules:
  - Auth, Users, Brands, Catalog, Cart/Checkout, Orders, Payments, Logistics, Try-On, Reviews.
- File/media handling:
  - Object storage for product media and try-on images (store URLs + metadata in DB).

### 9.3 Data Store
- **PostgreSQL** for core entities: users, brands, products, variants, carts, orders, try-on sessions.

### 9.4 Integrations
- Payments: local gateways + cards.
- Logistics: courier tracking APIs.
- AI Try-On: external provider or internal service with asynchronous jobs.

## 10. Data Model (Conceptual)
- User, Brand, Category, Product, ProductVariant, MediaAsset
- Cart, CartItem
- Order, OrderItem
- Address
- TryOnSession
- Review
- WishlistItem

## 11. API (Draft)
- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Catalog: `GET /api/categories`, `GET /api/products`, `GET /api/products/{id}`
- Brands: `GET /api/brands`, `GET /api/brands/{id}`, `GET /api/brands/{id}/products`
- Cart: `GET /api/cart`, `POST /api/cart/items`, `PATCH /api/cart/items/{id}`, `DELETE /api/cart/items/{id}`
- Checkout: `POST /api/checkout`
- Orders: `GET /api/orders`, `GET /api/orders/{id}`, `POST /api/orders/{id}/cancel`, `POST /api/orders/{id}/return`
- Try-On: `POST /api/try-on/sessions`, `GET /api/try-on/sessions/{id}`
- Reviews: `POST /api/products/{id}/reviews`, `GET /api/products/{id}/reviews`
- Wishlist: `GET /api/wishlist`, `POST /api/wishlist`, `DELETE /api/wishlist/{id}`

## 12. Phased Delivery Plan
### Phase 1 — Marketplace Core (MVP)
- Catalog, categories, search/filters
- Brand storefronts (admin-assisted onboarding acceptable)
- PDP with variants and rich media
- Cart + checkout + at least one payment integration
- Orders + tracking basics + basic returns tooling
- Eco metadata + eco filters (basic)

### Phase 2 — AI Try-On Beta
- Try-on sessions, async processing, privacy controls
- Moderation pipeline
- Try-on analytics + funnel impact reporting

### Phase 3 — Scale & Personalization
- Expand try-on coverage (more product types/brands)
- Performance optimization for mobile + low bandwidth
- Personalization (recommended products, curated edits)

### Phase 4 — Ecosystem Expansion
- Strong cross-border experience for diaspora shoppers
- Advanced brand analytics + marketing tools
- Mobile app and richer discovery formats

## 13. Risks & Mitigations
- **Try-on realism/bias**: test across diverse African skin tones/body shapes; set user expectations; continuously evaluate.
- **Photo privacy**: strict consent/retention, user controls, encryption, moderation.
- **Logistics variability**: start with limited markets and trusted partners; build exception handling.
- **Payment fragmentation**: support multiple gateways; robust retry and reconciliation.
- **Brand quality**: verification, content standards, dispute handling, ratings and enforcement.

## 14. Open Questions
- Initial launch markets (country/city) and languages?
- Preferred payment providers per launch market?
- Preferred logistics partners per launch market?
- Which product types should be prioritized for try-on at launch (dresses, tops, sets, etc.)?
- Default retention policy for user photos and generated try-on outputs?
