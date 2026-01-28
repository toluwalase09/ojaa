# ojaa – Product Requirements Document (PRD)

## 1. Overview
ojaa is an Africa-first, eco-centric online fashion marketplace where shoppers can discover and buy from multiple clothing lines in one place. Inspired by Fashion Nova’s shopping experience, ojaa focuses on bold, trend-driven fashion while centering African designers, textiles, and sustainable production. The platform offers dedicated storefronts for different clothing lines, rich discovery by category (Women, Men, Kids, Accessories/Other), and an advanced AI try-on experience where users can upload a photo and preview how items will look on their own body.

Goals:
- Build a multi-brand fashion marketplace showcasing African and Africa-inspired clothing lines.
- Provide category-based discovery and brand storefronts similar to Fashion Nova (Women, Men, Curve, Kids, etc.).
- Offer an AI try-on feature that realistically visualizes outfits on the shopper’s own photo.
- Promote eco-conscious fashion through badges, filters, and storytelling (e.g., recycled materials, artisan-made, low-waste production).
- Enable smooth checkout and logistics tailored to African markets (local currencies, local payment methods, delivery partners).

Success Metrics:
- Time-to-first-order for a new user < 15 minutes.
- Product page to checkout conversion rate ≥ 5%.
- At least 40% of active shoppers use AI try-on before purchasing.
- Repeat purchase rate within 60 days ≥ 25%.
- ≥ 70% of products have eco or origin metadata (e.g., fabric, region, artisan, sustainability tags).

## 2. Users and Personas
- **Shopper (Primary)**
  - Wants to discover trendy, African and Afro-inspired fashion by category, style, and brand.
  - Cares about fit, body representation, and how an outfit will look on their skin tone and body type.
  - May be price-sensitive and prefers local payment options and reliable delivery.

- **Brand Partner / Clothing Line Owner**
  - Independent or established brand wanting visibility across Africa and the diaspora.
  - Needs tools to upload products (images, sizes, inventory, pricing), manage orders, and track performance.
  - Wants to highlight eco and cultural story (materials, craft, community impact).

- **Platform Admin / Operations**
  - Manages brand onboarding, catalog quality, compliance, and disputes.
  - Oversees orders, refunds, logistics exceptions, and moderation (inappropriate photos, fake items).
  - Configures featured brands, campaigns, and homepage placements.

- **Stylist / Influencer (Optional, Future)**
  - Curates looks and collections that shoppers can browse and buy in a single click.
  - Collaborates with brands and earns commissions on sales.

## 3. Key Use Cases
1) Shopper browses Women/Men/Kids categories and filters by size, price, eco badges, and brand.
2) Shopper views a product from a specific clothing line, checks photos/videos, sizes, fabric, and care details.
3) Shopper uploads a full-body or half-body photo, selects size, and uses AI try-on to preview how the item might look on them.
4) Shopper follows a favorite clothing line and sees their latest drops and curated collections.
5) Shopper adds items from multiple brands to a single cart and completes checkout with local payment options.
6) Shopper tracks orders, deliveries, and initiates returns/exchanges.
7) Brand partner onboards via self-serve flow, sets up storefront, uploads catalog with variants (size, color), and manages stock.
8) Brand partner views analytics: views, add-to-cart, conversions, returns, try-on engagement.
9) Admin verifies brands, moderates AI try-on content (uploaded photos, generated outputs), and resolves disputes.

## 4. Feature Requirements

### 4.1 Catalog & Discovery
- Categories:
  - Women (subcategories: Dresses, Tops, Bottoms, Sets, Curve/Plus, Lounge, Occasions, etc.).
  - Men (Shirts, Trousers, Native/Traditional, Streetwear, Footwear, etc.).
  - Kids (Baby, Girls, Boys, Teens).
  - Others (Accessories, Shoes, Bags, Jewelry, Beauty, Home).
- Core features:
  - Faceted filters: size, price range, color, brand, region, eco badges, fabric.
  - Search by keyword with suggestions (brands, categories, trends).
  - Sort by most popular, newest, price (low–high, high–low), eco-first.
  - Highlight African-centric themes (e.g., “Made in Lagos”, “Ankara Edit”, “Sustainable Linen”).
  - Infinite scroll or paginated product grids with responsive design.

### 4.2 Brand Storefronts
- Each clothing line gets a branded storefront:
  - Brand logo, banner, description, origin story, sustainability statements.
  - Collections: “New In”, “Best Sellers”, “Eco Collection”, “Sales”.
  - Grid of products with filters and sort.
  - Social proof: ratings, reviews, brand-level score.
- Brand management:
  - Self-serve onboarding: submit documents, bank details/payout method, upload assets.
  - Brand can mark products with eco attributes: organic cotton, recycled materials, locally made, small batch, etc.

### 4.3 Product Detail Page (PDP)
- Rich PDP similar to Fashion Nova:
  - High-quality images (including on diverse African body types and skin tones), optional videos.
  - AI try-on entry point (“Try it on me” button).
  - Size selection with size guide, fit notes, and model stats.
  - Material/fabric details, care instructions, eco badges and impact notes.
  - Price, discount, stock status.
  - Cross-sell: related items, “complete the look”, “more from this brand”.
  - Reviews and Q&A.

### 4.4 Cart, Checkout & Payments
- Cart:
  - Unified cart supporting items from multiple brands.
  - Show per-brand subtotals and overall summary.
  - Apply promo codes, campaign discounts, vouchers.
- Checkout:
  - Multiple delivery addresses with defaults and nickname labels.
  - Shipping options by region (standard, express, pickup points where available).
  - Show estimated delivery dates and shipping fees per order.
- Payments:
  - Local African payment methods (e.g., cards, mobile money, local gateways) plus international cards.
  - Multi-currency support; display prices in local currency while settling to platform/brand currency internally.
  - Save payment methods securely (via PSP tokenization).

### 4.5 Orders, Returns & Logistics
- Orders:
  - Order summary with per-brand breakdown and statuses.
  - Notifications for order placed, shipped, out for delivery, delivered, canceled.
- Returns & exchanges:
  - Allow item-level return/exchange with reasons (size issue, quality, not as described).
  - Return eligibility rules per brand (window, conditions).
  - Refund and store-credit workflows.
- Logistics:
  - Integrations with regional couriers and last-mile providers.
  - Tracking links and status sync from logistics providers.

### 4.6 Accounts, Wishlist & Social Features
- Shopper account:
  - Profile, saved addresses, payment methods, order history.
  - Wishlist/favorites: save products and follow brands.
  - Preference center: sizes, style preferences, eco priorities (e.g., “prefer sustainable”, “prefer local production”).
- Social:
  - Shareable product links and try-on results (with privacy controls).
  - Option to hide face or anonymize try-on output before sharing.

### 4.7 AI Try-On Experience (Advanced)
- Core flow:
  - Shopper uploads a clear photo (guidelines: pose, lighting, clothing constraints).
  - Shopper confirms body type and size profile (height, weight, usual sizes).
  - System generates a rendered preview of the outfit on the user’s photo.
  - User can switch sizes/colors and regenerate previews.
- Technical considerations (conceptual, not implementation detail):
  - Use an external or internal AI try-on service capable of body/fit estimation and cloth draping.
  - Handle image preprocessing (background removal, pose normalization) and post-processing (blending, privacy).
  - Limit generation time (target < 15–25 seconds per try-on).
- Safety & privacy:
  - Explicit consent for using photos; clear retention policy (e.g., delete original and generated images after X days or on request).
  - Moderation of uploaded photos and generated results (no nudity, hate symbols, etc.).
  - Options to blur face or use an avatar-style representation instead of raw user photo.
- Analytics:
  - Track try-on engagements, conversions vs non-try-on users, popular products for try-on.

### 4.8 Eco & Africa-Centric Features
- Product-level eco metadata:
  - Fabric type and sustainability (organic, recycled, deadstock).
  - Production location (city, country), artisan/community info.
  - Batch size (small batch/limited edition).
- Filters and surfacing:
  - “Eco-first” filters and sort options.
  - Collections like “Made in Africa”, “Climate Conscious”, “Artisan Crafted”.
- Storytelling:
  - Content blocks on brand and product pages that explain impact (e.g., number of artisans supported).

## 5. Non-Functional Requirements
- Performance:
  - Sub-2s perceived page load for key pages (home, category, PDP) on typical African mobile networks.
  - AI try-on results returned in under 25 seconds in 90% of cases.
- Reliability:
  - Robust retries and idempotency for order placement and payments.
  - Graceful degradation when AI try-on service is unavailable (fallback UI, no blocking checkout).
- Security & Privacy:
  - Encrypt user and brand-sensitive data at rest; TLS for all network calls.
  - Strong privacy controls for uploaded photos; clear deletion and consent flows.
  - RBAC for admin, ops, and brand users.
- Observability:
  - Structured logging, metrics for checkout success rate, try-on usage and error rates.
  - Alerting on failed payments, AI try-on failures, and logistics sync errors.

## 6. System Architecture (High-Level)
- Frontend:
  - React (Vite, TypeScript, Tailwind) single-page application.
  - Responsive layout similar to Fashion Nova: large hero banners, grids, sticky filters on desktop, mobile-first navigation.
- Backend:
  - Flask API with blueprints and JWT authentication.
  - Separate modules/blueprints for catalog, brands, orders, try-on, and accounts.
- Database:
  - PostgreSQL for users, brands, products, orders, try-on sessions, and media references.
- Integrations:
  - Payment gateway(s) supporting African cards and mobile money.
  - Logistics providers for order tracking.
  - External or internal AI try-on service (could be a separate microservice).

## 7. Recommended Technical Approach
- Monorepo layout:
  - `frontend/` React app on port 5173 (Vite).
  - `backend/` Flask API on port 5002.
- API-first:
  - Define OpenAPI spec for core domains: catalog, brands, cart/checkout, orders, try-on.
  - Stub endpoints first and iterate UI with mock data, then connect to real APIs.
- AI try-on integration:
  - Abstract try-on behind a dedicated service/API, allowing switching providers or models later.
  - Use queued processing for heavy generation while exposing status polling to the frontend.
- Security & compliance:
  - JWT with user IDs as strings; standard error responses.
  - Strong validation and sanitization of uploaded media.
- Testing:
  - End-to-end flows for browse → PDP → try-on → checkout → order tracking.
  - Load testing on PDP and category pages.

## 8. Risks and Challenges
- AI try-on quality and bias:
  - Ensuring realistic previews for diverse African skin tones, body types, and hairstyles.
  - Managing user expectations that try-on is an approximation, not exact fit.
- Photo privacy and safety:
  - Handling sensitive images responsibly and building user trust.
- Logistics across multiple African countries:
  - Varying reliability of last-mile delivery and customs delays.
- Payments:
  - Fragmented payment landscape; potential failures due to network or PSP reliability.
- Brand quality and consistency:
  - Ensuring products match descriptions/photos and managing returns/disputes.

## 9. Data Models (Conceptual)
- **User**
  - id, email, phone, passwordHash, role (shopper/brand/admin), defaultCurrency
  - profile: name, gender (optional), stylePreferences, ecoPreferences, sizeProfile

- **Brand**
  - id, name, slug, description, story, logoUrl, bannerUrl
  - originCountry, city, ecoAttributes[], rating, isVerified, payoutDetails

- **Category**
  - id, name (Women/Men/Kids/Others), slug, parentId (for subcategories), sortOrder

- **Product**
  - id, brandId, categoryId, name, slug, description
  - price, currency, discount, stockStatus
  - ecoAttributes[], fabric, careInstructions, regionTag

- **ProductVariant**
  - id, productId, size, color, sku, stockQuantity, images[]

- **MediaAsset**
  - id, ownerType (product/brand/tryOn/user), ownerId, type (image/video), url, metadata

- **Cart & CartItem**
  - Cart: id, userId, currency, createdAt, updatedAt
  - CartItem: id, cartId, productVariantId, quantity, unitPrice

- **Order & OrderItem**
  - Order: id, userId, status, totalAmount, currency, paymentStatus, shippingAddressId, placedAt
  - OrderItem: id, orderId, productVariantId, quantity, unitPrice, brandId, status

- **Address**
  - id, userId, label, street, city, state, country, postalCode, phone

- **TryOnSession**
  - id, userId, productVariantId, inputPhotoUrl, outputImageUrls[], status, createdAt, completedAt, error

- **Review**
  - id, userId, productId, rating, comment, photos[], createdAt, isVerifiedPurchase

- **WishlistItem**
  - id, userId, productId, createdAt

## 10. API Endpoints (Draft)
- Auth:
  - POST `/api/auth/register`
  - POST `/api/auth/login`
  - POST `/api/auth/logout`

- Catalog:
  - GET `/api/categories`
  - GET `/api/products` (filters: category, brand, size, price, eco, search)
  - GET `/api/products/{id}`

- Brands:
  - GET `/api/brands`
  - GET `/api/brands/{id}`
  - GET `/api/brands/{id}/products`
  - POST `/api/brands` (admin/brand onboarding)

- Cart & Checkout:
  - GET `/api/cart`
  - POST `/api/cart/items`
  - PATCH `/api/cart/items/{id}`
  - DELETE `/api/cart/items/{id}`
  - POST `/api/checkout` (initiates payment, creates order)

- Orders:
  - GET `/api/orders`
  - GET `/api/orders/{id}`
  - POST `/api/orders/{id}/cancel`
  - POST `/api/orders/{id}/return`

- AI Try-On:
  - POST `/api/try-on/sessions` (upload input + productVariant, start generation)
  - GET `/api/try-on/sessions/{id}` (status + results)

- Reviews & Wishlist:
  - POST `/api/products/{id}/reviews`
  - GET `/api/products/{id}/reviews`
  - GET `/api/wishlist`
  - POST `/api/wishlist`
  - DELETE `/api/wishlist/{id}`

## 11. UX Requirements
- Home:
  - Hero banners featuring African brands and themed edits.
  - Quick category entry points (Women, Men, Kids, Others).
  - Featured brands, trending products, eco collections.
- Category pages:
  - Fashion Nova–style grids with sticky filters and sort controls.
  - Clear indicators for eco badges and brand name under each card.
- PDP:
  - Prominent “Try it on me” CTA near add-to-cart.
  - Visual emphasis on fit and fabric; highlight eco and origin info.
- AI Try-on page/modal:
  - Step-by-step guidance for taking/uploading good photos.
  - Loading state and clear result display with disclaimers.

## 12. Try-On Engine Requirements
- Must:
  - Support at least upper-body outfits at launch, with a roadmap for full-body outfits.
  - Handle multiple skin tones and body shapes gracefully.
  - Provide clear error messages and fallback when photos are unsuitable.
- Should:
  - Allow face-blur and background blur options.
  - Allow users to save or delete try-on history.

## 13. Compliance, Content & Risk
- Content:
  - Policies for acceptable user photos and generated content.
  - DMCA and IP handling for stolen product photos.
- Data protection:
  - Compliance with relevant privacy laws where users and servers operate.
  - Clear consent, retention, and deletion flows for photos and try-on outputs.
- Commercial:
  - Clear policies on returns, refunds, and counterfeit/low-quality products.

## 14. Phased Delivery
- Phase 1 (MVP – Marketplace Core):
  - Basic catalog (Women/Men/Kids/Others), brand storefronts, PDPs, cart and checkout with at least one payment gateway.
  - Order tracking, basic returns, and admin tools for brands and products.
  - Eco metadata support and basic eco filters.

- Phase 2 (AI Try-On Beta):
  - Launch AI try-on for selected categories (e.g., dresses, tops).
  - Implement try-on sessions, privacy settings, and moderation pipeline.
  - Add analytics for try-on engagement and impact on conversion.

- Phase 3 (Scale & Experience):
  - Expand AI try-on to more product types and brands.
  - Optimize performance for mobile and lower-bandwidth users.
  - Deeper personalization (recommended products, stylist collections, influencer edits).

- Phase 4 (Ecosystem & International):
  - Cross-border logistics optimization and support for diaspora shoppers.
  - Advanced brand analytics, marketing tools, and collaborations.
  - Mobile app and additional discovery formats (live shopping, lookbooks).

## 15. Open Questions
- Which initial African markets should ojaa launch in (e.g., Nigeria, Ghana, Kenya, South Africa)?
- Which payment gateways and logistics partners will be integrated in phase 1?
- What categories and product types should be prioritized for AI try-on at launch?
- How strict should return policies be per category/brand, especially for intimate items?
- What is the desired retention policy for user photos and try-on outputs (immediate deletion vs. opt-in history)?
