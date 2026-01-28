import type {
  Product,
  Brand,
  Category,
  Collection,
  ProductColor,
  ProductSize,
  FlashSale,
} from "@/types/shop";

// ============================================================================
// MOCK BRANDS
// ============================================================================

export const MOCK_BRANDS: Brand[] = [
  {
    id: "adire_atelier",
    slug: "adire-atelier",
    name: "Adire Atelier",
    logoUrl: "/demo/brands/adire-atelier.svg",
    origin: "Abeokuta, NG",
    tagline: "Indigo stories. Modern silhouettes.",
    description: "Handcrafted indigo-dyed fabrics meeting contemporary design.",
    foundedYear: 2018,
    isVerified: true,
    isFeatured: true,
    ecoCredentials: ["MadeInAfrica", "ArtisanMade", "SmallBatch"],
    productCount: 45,
  },
  {
    id: "kente_studio",
    slug: "kente-studio",
    name: "Kente Studio",
    logoUrl: "/demo/brands/kente-studio.svg",
    origin: "Kumasi, GH",
    tagline: "Heritage woven into everyday drip.",
    description: "Traditional Kente weaving techniques in modern fashion.",
    foundedYear: 2020,
    isVerified: true,
    isFeatured: true,
    ecoCredentials: ["MadeInAfrica", "FairTrade"],
    productCount: 32,
  },
  {
    id: "sahara_street",
    slug: "sahara-street",
    name: "Sahara Street",
    logoUrl: "/demo/brands/sahara-street.svg",
    origin: "Nairobi, KE",
    tagline: "Streetwear with sun-baked confidence.",
    description: "East African streetwear for the modern urbanite.",
    foundedYear: 2019,
    isVerified: true,
    isFeatured: false,
    ecoCredentials: ["Recycled"],
    productCount: 28,
  },
  {
    id: "cape_couture",
    slug: "cape-couture",
    name: "Cape Couture",
    logoUrl: "/demo/brands/cape-couture.svg",
    origin: "Cape Town, ZA",
    tagline: "Minimal. Sculpted. Effortless.",
    description: "South African minimalism with sustainable practices.",
    foundedYear: 2017,
    isVerified: true,
    isFeatured: true,
    ecoCredentials: ["Organic", "ZeroWaste"],
    productCount: 52,
  },
  {
    id: "uzuri_wear",
    slug: "uzuri-wear",
    name: "Uzuri Wear",
    logoUrl: "/demo/brands/uzuri-wear.svg",
    origin: "Dar es Salaam, TZ",
    tagline: "Beauty in every stitch.",
    description: "Tanzanian craftsmanship for global style.",
    foundedYear: 2021,
    isVerified: false,
    isFeatured: false,
    ecoCredentials: ["MadeInAfrica", "SmallBatch"],
    productCount: 18,
  },
];

// ============================================================================
// MOCK COLORS
// ============================================================================

export const MOCK_COLORS: ProductColor[] = [
  { id: "sunset_orange", name: "Sunset Orange", hexCode: "#E85A2C" },
  { id: "indigo", name: "Indigo", hexCode: "#3F51B5" },
  { id: "kente_gold", name: "Kente Gold", hexCode: "#FFD700" },
  { id: "sahara_sand", name: "Sahara Sand", hexCode: "#C2B280" },
  { id: "ocean_blue", name: "Ocean Blue", hexCode: "#006994" },
  { id: "forest_green", name: "Forest Green", hexCode: "#228B22" },
  { id: "terracotta", name: "Terracotta", hexCode: "#E2725B" },
  { id: "charcoal", name: "Charcoal", hexCode: "#36454F" },
  { id: "ivory", name: "Ivory", hexCode: "#FFFFF0" },
  { id: "black", name: "Black", hexCode: "#000000" },
  { id: "white", name: "White", hexCode: "#FFFFFF" },
  { id: "burgundy", name: "Burgundy", hexCode: "#800020" },
];

// ============================================================================
// MOCK SIZES
// ============================================================================

export const MOCK_SIZES: ProductSize[] = [
  { id: "xs", name: "XS", displayOrder: 1, measurements: { bust: "32\"", waist: "24\"", hips: "34\"" } },
  { id: "s", name: "S", displayOrder: 2, measurements: { bust: "34\"", waist: "26\"", hips: "36\"" } },
  { id: "m", name: "M", displayOrder: 3, measurements: { bust: "36\"", waist: "28\"", hips: "38\"" } },
  { id: "l", name: "L", displayOrder: 4, measurements: { bust: "38\"", waist: "30\"", hips: "40\"" } },
  { id: "xl", name: "XL", displayOrder: 5, measurements: { bust: "40\"", waist: "32\"", hips: "42\"" } },
  { id: "xxl", name: "XXL", displayOrder: 6, measurements: { bust: "42\"", waist: "34\"", hips: "44\"" } },
];

// ============================================================================
// MOCK PRODUCTS
// ============================================================================

const brandMap = Object.fromEntries(MOCK_BRANDS.map((b) => [b.id, b]));

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "ankara-bodycon-midi-dress",
    name: "Ankara Bodycon Midi Dress",
    description: "A stunning bodycon midi dress featuring authentic Ankara print fabric. Perfect for night outs, date nights, or any occasion where you want to make a statement.",
    shortDescription: "Bold print, clean lines — made for night outs in Lagos.",
    categoryId: "women-dresses",
    categoryPath: ["women", "dresses", "midi-dresses"],
    brandId: "adire_atelier",
    brand: brandMap["adire_atelier"],
    tags: ["ankara", "bodycon", "midi", "party", "date-night"],
    ecoTags: ["SmallBatch", "MadeInAfrica"],
    price: { amount: 28500, currency: "NGN" },
    compareAtPrice: { amount: 35000, currency: "NGN" },
    media: [
      { id: "m1", type: "image", url: "/demo/ankara-dress.svg", alt: "Ankara Bodycon Midi Dress - Front", sortOrder: 0, isVirtualTryOnReady: true },
      { id: "m2", type: "image", url: "/demo/adire-wrap-top.svg", alt: "Ankara Bodycon Midi Dress - Back", sortOrder: 1, isVirtualTryOnReady: false },
    ],
    primaryImageUrl: "/demo/ankara-dress.svg",
    secondaryImageUrl: "/demo/adire-wrap-top.svg",
    colors: [MOCK_COLORS[0], MOCK_COLORS[1], MOCK_COLORS[6]],
    sizes: MOCK_SIZES.slice(0, 5),
    variants: [],
    virtualTryOn: {
      isEnabled: true,
      category: "dresses",
      garmentType: "midi-dress",
      supportedPoses: ["front", "side"],
      processingPriority: "standard",
      lastUpdated: "2024-01-15T00:00:00Z",
    },
    ratings: {
      averageRating: 4.7,
      totalReviews: 128,
      ratingDistribution: { 1: 2, 2: 5, 3: 10, 4: 35, 5: 76 },
      fitDistribution: { runs_small: 15, true_to_size: 95, runs_large: 18 },
    },
    status: "active",
    isNew: true,
    isFeatured: true,
    isBestseller: true,
    isLimitedEdition: false,
    totalInventory: 150,
    lowStockThreshold: 10,
    salesCount: 543,
    viewCount: 2340,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    publishedAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "p2",
    slug: "adire-wrap-top-indigo",
    name: "Adire Wrap Top (Indigo)",
    description: "Hand-dyed using traditional Adire techniques, this wrap top brings authentic Nigerian craftsmanship to modern style.",
    shortDescription: "Hand-dyed indigo energy. Pair with denim or a maxi skirt.",
    categoryId: "women-tops",
    categoryPath: ["women", "tops", "wrap-tops"],
    brandId: "adire_atelier",
    brand: brandMap["adire_atelier"],
    tags: ["adire", "wrap", "indigo", "handmade", "traditional"],
    ecoTags: ["ArtisanMade", "MadeInAfrica"],
    price: { amount: 19000, currency: "NGN" },
    media: [
      { id: "m3", type: "image", url: "/demo/adire-wrap-top.svg", alt: "Adire Wrap Top - Front", sortOrder: 0, isVirtualTryOnReady: true },
    ],
    primaryImageUrl: "/demo/adire-wrap-top.svg",
    secondaryImageUrl: "/demo/ankara-dress.svg",
    colors: [MOCK_COLORS[1], MOCK_COLORS[4]],
    sizes: MOCK_SIZES.slice(0, 5),
    variants: [],
    virtualTryOn: {
      isEnabled: true,
      category: "tops",
      garmentType: "wrap-top",
      supportedPoses: ["front"],
      processingPriority: "instant",
      lastUpdated: "2024-01-10T00:00:00Z",
    },
    ratings: {
      averageRating: 4.5,
      totalReviews: 67,
      ratingDistribution: { 1: 1, 2: 3, 3: 8, 4: 22, 5: 33 },
      fitDistribution: { runs_small: 8, true_to_size: 52, runs_large: 7 },
    },
    status: "active",
    isNew: true,
    isFeatured: false,
    isBestseller: false,
    isLimitedEdition: false,
    totalInventory: 80,
    lowStockThreshold: 10,
    salesCount: 234,
    viewCount: 1120,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
    publishedAt: "2024-01-06T00:00:00Z",
  },
  {
    id: "p3",
    slug: "kente-panel-shirt",
    name: "Kente Panel Shirt",
    description: "A classic fit shirt with authentic Kente fabric panel accents. Perfect transition from office to weekend.",
    shortDescription: "Classic fit with a heritage pop — office to weekend.",
    categoryId: "men-shirts",
    categoryPath: ["men", "shirts", "casual-shirts"],
    brandId: "kente_studio",
    brand: brandMap["kente_studio"],
    tags: ["kente", "shirt", "office", "casual", "heritage"],
    ecoTags: ["MadeInAfrica", "SmallBatch"],
    price: { amount: 320, currency: "GHS" },
    media: [
      { id: "m4", type: "image", url: "/demo/kente-panel-shirt.svg", alt: "Kente Panel Shirt", sortOrder: 0, isVirtualTryOnReady: true },
    ],
    primaryImageUrl: "/demo/kente-panel-shirt.svg",
    secondaryImageUrl: "/demo/street-cargo.svg",
    colors: [MOCK_COLORS[2], MOCK_COLORS[7], MOCK_COLORS[8]],
    sizes: MOCK_SIZES,
    variants: [],
    virtualTryOn: {
      isEnabled: true,
      category: "tops",
      garmentType: "shirt",
      supportedPoses: ["front", "side"],
      processingPriority: "standard",
      lastUpdated: "2024-01-08T00:00:00Z",
    },
    ratings: {
      averageRating: 4.8,
      totalReviews: 89,
      ratingDistribution: { 1: 0, 2: 2, 3: 5, 4: 20, 5: 62 },
      fitDistribution: { runs_small: 5, true_to_size: 78, runs_large: 6 },
    },
    status: "active",
    isNew: true,
    isFeatured: true,
    isBestseller: true,
    isLimitedEdition: false,
    totalInventory: 120,
    lowStockThreshold: 15,
    salesCount: 312,
    viewCount: 1560,
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-08T00:00:00Z",
    publishedAt: "2024-01-04T00:00:00Z",
  },
  {
    id: "p4",
    slug: "sahara-street-utility-cargo",
    name: "Sahara Street Utility Cargo",
    description: "Heavy rotation piece made from recycled materials. Built to move, built to last.",
    shortDescription: "Heavy rotation piece. Built to move, built to last.",
    categoryId: "men-pants",
    categoryPath: ["men", "pants", "cargo"],
    brandId: "sahara_street",
    brand: brandMap["sahara_street"],
    tags: ["cargo", "streetwear", "utility", "sustainable"],
    ecoTags: ["Recycled"],
    price: { amount: 5400, currency: "KES" },
    media: [
      { id: "m5", type: "image", url: "/demo/street-cargo.svg", alt: "Sahara Street Utility Cargo", sortOrder: 0, isVirtualTryOnReady: false },
    ],
    primaryImageUrl: "/demo/street-cargo.svg",
    secondaryImageUrl: "/demo/kente-panel-shirt.svg",
    colors: [MOCK_COLORS[3], MOCK_COLORS[7], MOCK_COLORS[5]],
    sizes: MOCK_SIZES,
    variants: [],
    virtualTryOn: {
      isEnabled: false,
      category: "bottoms",
      garmentType: "cargo-pants",
      supportedPoses: ["front"],
      processingPriority: "complex",
      lastUpdated: "2024-01-05T00:00:00Z",
    },
    ratings: {
      averageRating: 4.3,
      totalReviews: 45,
      ratingDistribution: { 1: 1, 2: 2, 3: 6, 4: 18, 5: 18 },
      fitDistribution: { runs_small: 3, true_to_size: 38, runs_large: 4 },
    },
    status: "active",
    isNew: false,
    isFeatured: false,
    isBestseller: false,
    isLimitedEdition: false,
    totalInventory: 65,
    lowStockThreshold: 10,
    salesCount: 156,
    viewCount: 890,
    createdAt: "2023-12-15T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
    publishedAt: "2023-12-16T00:00:00Z",
  },
  {
    id: "p5",
    slug: "kids-dashiki-set-2pc",
    name: "Kids Dashiki Set (2pc)",
    description: "Play-ready comfort with culture in every stitch. This 2-piece dashiki set is perfect for special occasions or everyday wear.",
    shortDescription: "Play-ready comfort with culture in every stitch.",
    categoryId: "kids-sets",
    categoryPath: ["kids", "sets", "traditional"],
    brandId: "adire_atelier",
    brand: brandMap["adire_atelier"],
    tags: ["dashiki", "kids", "set", "traditional", "comfort"],
    ecoTags: ["MadeInAfrica", "SmallBatch"],
    price: { amount: 18000, currency: "NGN" },
    media: [
      { id: "m6", type: "image", url: "/demo/kids-dashiki-set.svg", alt: "Kids Dashiki Set", sortOrder: 0, isVirtualTryOnReady: false },
    ],
    primaryImageUrl: "/demo/kids-dashiki-set.svg",
    colors: [MOCK_COLORS[0], MOCK_COLORS[1], MOCK_COLORS[2]],
    sizes: [
      { id: "2y", name: "2Y", displayOrder: 1 },
      { id: "4y", name: "4Y", displayOrder: 2 },
      { id: "6y", name: "6Y", displayOrder: 3 },
      { id: "8y", name: "8Y", displayOrder: 4 },
    ],
    variants: [],
    virtualTryOn: {
      isEnabled: false,
      category: "tops",
      garmentType: "dashiki",
      supportedPoses: [],
      processingPriority: "standard",
      lastUpdated: "2024-01-01T00:00:00Z",
    },
    ratings: {
      averageRating: 4.9,
      totalReviews: 34,
      ratingDistribution: { 1: 0, 2: 0, 3: 1, 4: 4, 5: 29 },
      fitDistribution: { runs_small: 2, true_to_size: 30, runs_large: 2 },
    },
    status: "active",
    isNew: true,
    isFeatured: false,
    isBestseller: false,
    isLimitedEdition: false,
    totalInventory: 45,
    lowStockThreshold: 5,
    salesCount: 89,
    viewCount: 456,
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
    publishedAt: "2024-01-09T00:00:00Z",
  },
  {
    id: "p6",
    slug: "beaded-statement-earrings",
    name: "Beaded Statement Earrings",
    description: "Bright beads, big mood — these handcrafted earrings finish any look instantly.",
    shortDescription: "Bright beads, big mood — finish the look instantly.",
    categoryId: "accessories-jewelry",
    categoryPath: ["accessories", "jewelry", "earrings"],
    brandId: "kente_studio",
    brand: brandMap["kente_studio"],
    tags: ["earrings", "beaded", "handmade", "statement"],
    ecoTags: ["ArtisanMade", "SmallBatch"],
    price: { amount: 95, currency: "GHS" },
    media: [
      { id: "m7", type: "image", url: "/demo/beaded-earrings.svg", alt: "Beaded Statement Earrings", sortOrder: 0, isVirtualTryOnReady: false },
    ],
    primaryImageUrl: "/demo/beaded-earrings.svg",
    colors: [MOCK_COLORS[0], MOCK_COLORS[2], MOCK_COLORS[4], MOCK_COLORS[11]],
    sizes: [{ id: "one-size", name: "One Size", displayOrder: 1 }],
    variants: [],
    virtualTryOn: {
      isEnabled: false,
      category: "accessories",
      garmentType: "earrings",
      supportedPoses: [],
      processingPriority: "instant",
      lastUpdated: "2024-01-01T00:00:00Z",
    },
    ratings: {
      averageRating: 4.6,
      totalReviews: 52,
      ratingDistribution: { 1: 1, 2: 2, 3: 4, 4: 15, 5: 30 },
      fitDistribution: { runs_small: 0, true_to_size: 52, runs_large: 0 },
    },
    status: "active",
    isNew: false,
    isFeatured: true,
    isBestseller: false,
    isLimitedEdition: false,
    totalInventory: 200,
    lowStockThreshold: 20,
    salesCount: 178,
    viewCount: 678,
    createdAt: "2023-11-20T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
    publishedAt: "2023-11-21T00:00:00Z",
  },
  {
    id: "p7",
    slug: "cape-couture-linen-co-ord",
    name: "Cape Couture Linen Co-ord",
    description: "Soft linen with a sculpted fit — perfect for day parties, brunches, or any occasion that calls for effortless elegance.",
    shortDescription: "Soft linen with a sculpted fit — day parties approved.",
    categoryId: "women-sets",
    categoryPath: ["women", "sets", "co-ords"],
    brandId: "cape_couture",
    brand: brandMap["cape_couture"],
    tags: ["linen", "co-ord", "set", "minimal", "summer"],
    ecoTags: ["Organic"],
    price: { amount: 1299, currency: "ZAR" },
    media: [
      { id: "m8", type: "image", url: "/demo/linen-coord.svg", alt: "Cape Couture Linen Co-ord", sortOrder: 0, isVirtualTryOnReady: true },
    ],
    primaryImageUrl: "/demo/linen-coord.svg",
    colors: [MOCK_COLORS[8], MOCK_COLORS[3], MOCK_COLORS[9]],
    sizes: MOCK_SIZES.slice(0, 5),
    variants: [],
    virtualTryOn: {
      isEnabled: true,
      category: "tops",
      garmentType: "co-ord-set",
      supportedPoses: ["front", "side"],
      processingPriority: "complex",
      lastUpdated: "2024-01-10T00:00:00Z",
    },
    ratings: {
      averageRating: 4.4,
      totalReviews: 28,
      ratingDistribution: { 1: 0, 2: 1, 3: 3, 4: 10, 5: 14 },
      fitDistribution: { runs_small: 3, true_to_size: 22, runs_large: 3 },
    },
    status: "active",
    isNew: false,
    isFeatured: true,
    isBestseller: false,
    isLimitedEdition: true,
    totalInventory: 35,
    lowStockThreshold: 5,
    salesCount: 67,
    viewCount: 345,
    createdAt: "2023-12-01T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
    publishedAt: "2023-12-02T00:00:00Z",
  },
  {
    id: "p8",
    slug: "afro-print-headwrap",
    name: "Afro-Print Headwrap",
    description: "Wrap it. Own it. Elevate any outfit in seconds with this versatile headwrap made from deadstock fabric.",
    shortDescription: "Wrap it. Own it. Elevate any outfit in seconds.",
    categoryId: "accessories-headwear",
    categoryPath: ["accessories", "headwear", "headwraps"],
    brandId: "adire_atelier",
    brand: brandMap["adire_atelier"],
    tags: ["headwrap", "afro-print", "versatile", "deadstock"],
    ecoTags: ["Deadstock", "SmallBatch"],
    price: { amount: 7500, currency: "NGN" },
    media: [
      { id: "m9", type: "image", url: "/demo/headwrap.svg", alt: "Afro-Print Headwrap", sortOrder: 0, isVirtualTryOnReady: false },
    ],
    primaryImageUrl: "/demo/headwrap.svg",
    colors: [MOCK_COLORS[0], MOCK_COLORS[1], MOCK_COLORS[2], MOCK_COLORS[5]],
    sizes: [{ id: "one-size", name: "One Size", displayOrder: 1 }],
    variants: [],
    virtualTryOn: {
      isEnabled: false,
      category: "accessories",
      garmentType: "headwrap",
      supportedPoses: [],
      processingPriority: "instant",
      lastUpdated: "2024-01-01T00:00:00Z",
    },
    ratings: {
      averageRating: 4.7,
      totalReviews: 41,
      ratingDistribution: { 1: 0, 2: 1, 3: 3, 4: 12, 5: 25 },
      fitDistribution: { runs_small: 0, true_to_size: 41, runs_large: 0 },
    },
    status: "active",
    isNew: true,
    isFeatured: false,
    isBestseller: false,
    isLimitedEdition: false,
    totalInventory: 100,
    lowStockThreshold: 10,
    salesCount: 123,
    viewCount: 567,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    publishedAt: "2024-01-11T00:00:00Z",
  },
];

// ============================================================================
// MOCK COLLECTIONS
// ============================================================================

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "c1",
    slug: "new-arrivals",
    title: "New Arrivals",
    subtitle: "Fresh drops from brands across Africa",
    description: "Discover the latest additions to our collection.",
    type: "automated",
    heroImageUrl: "/demo/collection-new-arrivals.svg",
    thumbnailUrl: "/demo/collection-new-arrivals-thumb.svg",
    rules: [{ field: "tag", operator: "equals", value: "new" }],
    productCount: 24,
    isActive: true,
    isFeatured: true,
    showOnHomepage: true,
    sortOrder: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "c2",
    slug: "aso-ebi-ready",
    title: "Aso-Ebi Ready",
    subtitle: "Wedding season essentials",
    description: "Coordinated looks perfect for Nigerian weddings and celebrations.",
    type: "manual",
    heroImageUrl: "/demo/collection-aso-ebi.svg",
    thumbnailUrl: "/demo/collection-aso-ebi-thumb.svg",
    productIds: ["p1", "p2", "p6"],
    productCount: 18,
    isActive: true,
    isFeatured: true,
    showOnHomepage: true,
    sortOrder: 2,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
  },
  {
    id: "c3",
    slug: "street-style",
    title: "Street Style",
    subtitle: "Urban energy meets African soul",
    description: "Contemporary streetwear with African influences.",
    type: "automated",
    heroImageUrl: "/demo/collection-street.svg",
    thumbnailUrl: "/demo/collection-street-thumb.svg",
    rules: [{ field: "tag", operator: "contains", value: "streetwear" }],
    productCount: 32,
    isActive: true,
    isFeatured: false,
    showOnHomepage: true,
    sortOrder: 3,
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "c4",
    slug: "office-elegance",
    title: "Office Elegance",
    subtitle: "Power dressing with African flair",
    description: "Professional pieces that make a statement.",
    type: "manual",
    heroImageUrl: "/demo/collection-office.svg",
    thumbnailUrl: "/demo/collection-office-thumb.svg",
    productIds: ["p2", "p3"],
    productCount: 15,
    isActive: true,
    isFeatured: false,
    showOnHomepage: true,
    sortOrder: 4,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-08T00:00:00Z",
  },
  {
    id: "c5",
    slug: "try-on-ready",
    title: "Try-On Ready",
    subtitle: "See it on you before you buy",
    description: "All items with virtual try-on enabled.",
    type: "automated",
    heroImageUrl: "/demo/collection-tryon.svg",
    thumbnailUrl: "/demo/collection-tryon-thumb.svg",
    rules: [{ field: "tryOnEnabled", operator: "equals", value: true }],
    productCount: 45,
    isActive: true,
    isFeatured: true,
    showOnHomepage: false,
    sortOrder: 5,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "c6",
    slug: "eco-conscious",
    title: "Eco-Conscious",
    subtitle: "Fashion that cares",
    description: "Sustainable and ethically made pieces.",
    type: "automated",
    heroImageUrl: "/demo/collection-eco.svg",
    thumbnailUrl: "/demo/collection-eco-thumb.svg",
    rules: [{ field: "ecoTag", operator: "equals", value: "any" }],
    productCount: 38,
    isActive: true,
    isFeatured: false,
    showOnHomepage: true,
    sortOrder: 6,
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-11T00:00:00Z",
  },
];

// ============================================================================
// MOCK FLASH SALE
// ============================================================================

export const MOCK_FLASH_SALE: FlashSale = {
  id: "fs1",
  title: "Weekend Flash Sale",
  description: "Up to 50% off select items",
  products: [
    { productId: "p1", originalPrice: { amount: 35000, currency: "NGN" }, salePrice: { amount: 28500, currency: "NGN" }, quantityLimit: 50, quantitySold: 35 },
    { productId: "p2", originalPrice: { amount: 25000, currency: "NGN" }, salePrice: { amount: 19000, currency: "NGN" }, quantityLimit: 30, quantitySold: 12 },
    { productId: "p7", originalPrice: { amount: 1599, currency: "ZAR" }, salePrice: { amount: 1299, currency: "ZAR" }, quantityLimit: 20, quantitySold: 8 },
  ],
  startTime: new Date().toISOString(),
  endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
  isActive: true,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getProductsByCategory(categoryPath: string[]): Product[] {
  return MOCK_PRODUCTS.filter((p) =>
    categoryPath.every((cat, index) => p.categoryPath[index] === cat)
  );
}

export function getNewArrivals(limit: number = 8): Product[] {
  return MOCK_PRODUCTS
    .filter((p) => p.isNew)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getTryOnReadyProducts(limit: number = 8): Product[] {
  return MOCK_PRODUCTS
    .filter((p) => p.virtualTryOn.isEnabled)
    .slice(0, limit);
}

export function getFeaturedProducts(limit: number = 8): Product[] {
  return MOCK_PRODUCTS
    .filter((p) => p.isFeatured)
    .slice(0, limit);
}

export function getBestsellers(limit: number = 8): Product[] {
  return MOCK_PRODUCTS
    .filter((p) => p.isBestseller)
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, limit);
}

export function getFlashDealProducts(): Product[] {
  const flashProductIds = MOCK_FLASH_SALE.products.map((p) => p.productId);
  return MOCK_PRODUCTS.filter((p) => flashProductIds.includes(p.id));
}

export function getHomepageCollections(): Collection[] {
  return MOCK_COLLECTIONS
    .filter((c) => c.showOnHomepage && c.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
