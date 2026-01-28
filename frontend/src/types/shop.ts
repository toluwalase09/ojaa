// ============================================================================
// SHOP DATA SCHEMAS & TYPES
// Supports Shein-style offering + virtual try-on metadata
// ============================================================================

// ----------------------------------------------------------------------------
// Currency & Localization
// ----------------------------------------------------------------------------

export type Currency = "NGN" | "GHS" | "KES" | "ZAR" | "USD";

export interface MoneyAmount {
  amount: number;
  currency: Currency;
}

export const CURRENCY_CONFIG: Record<Currency, { symbol: string; name: string; locale: string }> = {
  NGN: { symbol: "₦", name: "Nigerian Naira", locale: "en-NG" },
  GHS: { symbol: "GH₵", name: "Ghanaian Cedi", locale: "en-GH" },
  KES: { symbol: "KSh", name: "Kenyan Shilling", locale: "en-KE" },
  ZAR: { symbol: "R", name: "South African Rand", locale: "en-ZA" },
  USD: { symbol: "$", name: "US Dollar", locale: "en-US" },
};

// ----------------------------------------------------------------------------
// Categories & Taxonomy
// ----------------------------------------------------------------------------

export type TopLevelCategory = "women" | "men" | "kids" | "accessories" | "beauty";

export interface Category {
  id: string;
  slug: string;
  name: string;
  parentId: string | null;
  level: number; // 0 = top level, 1 = subcategory, 2 = sub-subcategory
  imageUrl?: string;
  iconName?: string;
  description?: string;
  productCount: number;
  isActive: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  children?: Category[];
}

export interface CategoryTree {
  women: Category;
  men: Category;
  kids: Category;
  accessories: Category;
  beauty: Category;
}

// ----------------------------------------------------------------------------
// Product Attributes
// ----------------------------------------------------------------------------

export type EcoTag =
  | "MadeInAfrica"
  | "SmallBatch"
  | "ArtisanMade"
  | "Recycled"
  | "Organic"
  | "Deadstock"
  | "FairTrade"
  | "Vegan"
  | "ZeroWaste";

export const ECO_TAG_LABELS: Record<EcoTag, string> = {
  MadeInAfrica: "Made in Africa",
  SmallBatch: "Small Batch",
  ArtisanMade: "Artisan Made",
  Recycled: "Recycled",
  Organic: "Organic",
  Deadstock: "Deadstock",
  FairTrade: "Fair Trade",
  Vegan: "Vegan",
  ZeroWaste: "Zero Waste",
};

export interface ProductColor {
  id: string;
  name: string;
  hexCode: string;
  swatchUrl?: string;
}

export interface ProductSize {
  id: string;
  name: string; // "XS", "S", "M", "L", "XL", "XXL", "6", "8", "10", etc.
  displayOrder: number;
  measurements?: {
    bust?: string;
    waist?: string;
    hips?: string;
    length?: string;
    inseam?: string;
  };
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  colorId: string;
  sizeId: string;
  price: MoneyAmount;
  compareAtPrice?: MoneyAmount;
  inventoryQuantity: number;
  inventoryPolicy: "deny" | "continue"; // deny = can't oversell
  weight?: number; // in grams
  isDefault: boolean;
}

// ----------------------------------------------------------------------------
// Product Media
// ----------------------------------------------------------------------------

export type MediaType = "image" | "video" | "360spin";

export interface ProductMedia {
  id: string;
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  alt: string;
  sortOrder: number;
  colorId?: string; // If media is specific to a color variant
  isVirtualTryOnReady: boolean; // If this image can be used for try-on
}

// ----------------------------------------------------------------------------
// Virtual Try-On Metadata
// ----------------------------------------------------------------------------

export type TryOnCategory = "tops" | "dresses" | "bottoms" | "outerwear" | "accessories";

export interface VirtualTryOnMetadata {
  isEnabled: boolean;
  category: TryOnCategory;
  garmentType: string; // "maxi-dress", "crop-top", "blazer", etc.
  modelImageUrl?: string; // Pre-rendered model wearing this item
  garmentMaskUrl?: string; // Segmented garment for try-on engine
  anchorPoints?: {
    shoulders?: [number, number];
    waist?: [number, number];
    hips?: [number, number];
    hemline?: [number, number];
  };
  supportedPoses: ("front" | "side" | "back")[];
  processingPriority: "instant" | "standard" | "complex";
  lastUpdated: string; // ISO date
}

// ----------------------------------------------------------------------------
// Product Reviews
// ----------------------------------------------------------------------------

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title?: string;
  body: string;
  images?: string[];
  purchasedSize?: string;
  usualSize?: string;
  fitFeedback?: "runs_small" | "true_to_size" | "runs_large";
  usedVirtualTryOn: boolean;
  helpfulCount: number;
  verifiedPurchase: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductRatingsSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  fitDistribution: {
    runs_small: number;
    true_to_size: number;
    runs_large: number;
  };
}

// ----------------------------------------------------------------------------
// Brand
// ----------------------------------------------------------------------------

export interface Brand {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string;
  bannerUrl?: string;
  origin: string; // "Lagos, NG"
  tagline: string;
  description?: string;
  foundedYear?: number;
  isVerified: boolean;
  isFeatured: boolean;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
  ecoCredentials?: EcoTag[];
  productCount: number;
}

// ----------------------------------------------------------------------------
// Product (Main Entity)
// ----------------------------------------------------------------------------

export type ProductStatus = "draft" | "active" | "archived" | "out_of_stock";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string;

  // Categorization
  categoryId: string;
  categoryPath: string[]; // ["women", "dresses", "maxi-dresses"]
  brandId: string;
  brand: Brand;
  tags: string[];
  ecoTags: EcoTag[];

  // Pricing (base price, variants may override)
  price: MoneyAmount;
  compareAtPrice?: MoneyAmount;

  // Media
  media: ProductMedia[];
  primaryImageUrl: string;
  secondaryImageUrl?: string;

  // Variants
  colors: ProductColor[];
  sizes: ProductSize[];
  variants: ProductVariant[];

  // Virtual Try-On
  virtualTryOn: VirtualTryOnMetadata;

  // Reviews & Ratings
  ratings: ProductRatingsSummary;

  // Status & Visibility
  status: ProductStatus;
  isNew: boolean;
  isFeatured: boolean;
  isBestseller: boolean;
  isLimitedEdition: boolean;

  // Inventory (aggregate)
  totalInventory: number;
  lowStockThreshold: number;

  // Sales Data (for trending/popularity)
  salesCount: number;
  viewCount: number;

  // SEO
  seoTitle?: string;
  seoDescription?: string;

  // Timestamps
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;

  // Related Products
  relatedProductIds?: string[];
  complementaryProductIds?: string[]; // "Complete the look"
}

// ----------------------------------------------------------------------------
// Collection (Curated Groups)
// ----------------------------------------------------------------------------

export type CollectionType =
  | "manual" // Hand-picked products
  | "automated" // Rule-based (e.g., all products with tag X)
  | "seasonal" // Time-limited
  | "editorial"; // Story-driven

export interface CollectionRule {
  field: "tag" | "category" | "brand" | "price" | "ecoTag" | "tryOnEnabled";
  operator: "equals" | "contains" | "greaterThan" | "lessThan";
  value: string | number | boolean;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;

  type: CollectionType;

  // Visual
  heroImageUrl?: string;
  thumbnailUrl?: string;
  backgroundColor?: string;

  // Products
  productIds?: string[]; // For manual collections
  rules?: CollectionRule[]; // For automated collections
  productCount: number;

  // Display
  isActive: boolean;
  isFeatured: boolean;
  showOnHomepage: boolean;
  sortOrder: number;

  // Dates
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;

  // SEO
  seoTitle?: string;
  seoDescription?: string;
}

// Predefined collection examples
export type FeaturedCollection =
  | "new-arrivals"
  | "bestsellers"
  | "trending"
  | "aso-ebi-ready"
  | "office-elegance"
  | "weekend-vibes"
  | "street-style"
  | "try-on-ready"
  | "eco-conscious";

// ----------------------------------------------------------------------------
// Promotions & Discounts
// ----------------------------------------------------------------------------

export type PromotionType =
  | "percentage" // 20% off
  | "fixed_amount" // ₦2000 off
  | "buy_x_get_y" // Buy 2 get 1 free
  | "free_shipping"
  | "bundle"; // Bundle discount

export type PromotionAppliesTo =
  | "all" // Entire order
  | "specific_products"
  | "specific_categories"
  | "specific_brands"
  | "specific_collections"
  | "minimum_quantity"
  | "minimum_amount";

export interface PromotionCondition {
  type: PromotionAppliesTo;
  ids?: string[]; // Product IDs, category IDs, etc.
  minimumQuantity?: number;
  minimumAmount?: MoneyAmount;
}

export interface Promotion {
  id: string;
  code?: string; // Promo code (optional - can be automatic)
  title: string;
  description?: string;

  type: PromotionType;

  // Discount value
  percentageOff?: number;
  fixedAmountOff?: MoneyAmount;
  buyQuantity?: number;
  getQuantity?: number;

  // Conditions
  conditions: PromotionCondition[];
  appliesTo: PromotionAppliesTo;

  // Limits
  usageLimit?: number; // Total uses allowed
  usageLimitPerCustomer?: number;
  currentUsageCount: number;

  // Validity
  isActive: boolean;
  startDate: string;
  endDate?: string;

  // Display
  showBanner: boolean;
  bannerText?: string;
  bannerColor?: string;

  // Stacking
  isStackable: boolean;
  priority: number; // Higher = applied first

  createdAt: string;
  updatedAt: string;
}

// ----------------------------------------------------------------------------
// Flash Sale
// ----------------------------------------------------------------------------

export interface FlashSaleProduct {
  productId: string;
  originalPrice: MoneyAmount;
  salePrice: MoneyAmount;
  quantityLimit: number;
  quantitySold: number;
}

export interface FlashSale {
  id: string;
  title: string;
  description?: string;
  products: FlashSaleProduct[];
  startTime: string;
  endTime: string;
  isActive: boolean;
}

// ----------------------------------------------------------------------------
// Cart & Wishlist
// ----------------------------------------------------------------------------

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  price: MoneyAmount;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: ProductSize;
  addedAt: string;
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  subtotal: MoneyAmount;
  discountAmount?: MoneyAmount;
  appliedPromotionIds: string[];
  shippingEstimate?: MoneyAmount;
  total: MoneyAmount;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  selectedColorId?: string;
  selectedSizeId?: string;
  addedAt: string;
  notifyOnSale: boolean;
  notifyOnRestock: boolean;
}

export interface Wishlist {
  id: string;
  userId: string;
  items: WishlistItem[];
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

// ----------------------------------------------------------------------------
// Saved Virtual Try-On
// ----------------------------------------------------------------------------

export interface SavedTryOn {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  selectedColorId: string;
  selectedSizeId?: string;
  userPhotoUrl: string; // User's original photo
  resultImageUrl: string; // Generated try-on result
  thumbnailUrl: string;
  createdAt: string;
  isShared: boolean;
  shareUrl?: string;
}

// ----------------------------------------------------------------------------
// Filters & Sorting
// ----------------------------------------------------------------------------

export type SortOption =
  | "popular"
  | "newest"
  | "price_asc"
  | "price_desc"
  | "rating"
  | "bestselling"
  | "most_reviewed";

export interface ProductFilters {
  categories?: string[];
  brands?: string[];
  colors?: string[];
  sizes?: string[];
  priceMin?: number;
  priceMax?: number;
  ecoTags?: EcoTag[];
  hasVirtualTryOn?: boolean;
  isOnSale?: boolean;
  isNew?: boolean;
  inStock?: boolean;
  rating?: number; // Minimum rating
}

export interface ProductSearchParams {
  query?: string;
  filters: ProductFilters;
  sort: SortOption;
  page: number;
  limit: number;
}

export interface ProductSearchResult {
  products: Product[];
  totalCount: number;
  page: number;
  totalPages: number;
  filters: {
    availableColors: ProductColor[];
    availableSizes: ProductSize[];
    availableBrands: Brand[];
    priceRange: { min: number; max: number };
    availableEcoTags: EcoTag[];
  };
}

// ----------------------------------------------------------------------------
// Shipping & Delivery
// ----------------------------------------------------------------------------

export interface ShippingZone {
  id: string;
  name: string;
  countries: string[];
  states?: string[];
}

export interface ShippingRate {
  id: string;
  name: string;
  description?: string;
  zoneId: string;
  price: MoneyAmount;
  minDeliveryDays: number;
  maxDeliveryDays: number;
  freeAbove?: MoneyAmount;
}

// ----------------------------------------------------------------------------
// Order Status
// ----------------------------------------------------------------------------

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "refunded"
  | "return_requested"
  | "returned";

export interface OrderStatusUpdate {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

// ----------------------------------------------------------------------------
// Utility Functions
// ----------------------------------------------------------------------------

export function formatMoney(money: MoneyAmount): string {
  const config = CURRENCY_CONFIG[money.currency];
  return `${config.symbol}${money.amount.toLocaleString()}`;
}

export function calculateDiscountPercentage(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100);
}

export function isProductInStock(product: Product): boolean {
  return product.totalInventory > 0 && product.status === "active";
}

export function getVariantByColorAndSize(
  product: Product,
  colorId: string,
  sizeId: string
): ProductVariant | undefined {
  return product.variants.find((v) => v.colorId === colorId && v.sizeId === sizeId);
}

export function getTryOnReadyProducts(products: Product[]): Product[] {
  return products.filter((p) => p.virtualTryOn.isEnabled);
}
