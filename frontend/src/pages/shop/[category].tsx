import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { ChevronRight, SlidersHorizontal, Grid2X2, Grid3X3, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShopLayout } from "@/components/shop/ShopLayout";
import { ProductGrid, ProductGridSkeleton } from "@/components/shop/ProductGrid";
import { FilterPanel, MobileFilterSheet, ActiveFilterPills } from "@/components/shop/FilterPanel";
import { MOCK_PRODUCTS, MOCK_BRANDS, MOCK_COLORS, MOCK_SIZES } from "@/data/mockProducts";
import type { Product, ProductFilters, SortOption } from "@/types/shop";

// Category configuration
const CATEGORY_CONFIG: Record<string, { title: string; description: string; subcategories: string[] }> = {
  women: {
    title: "Women",
    description: "Discover bold African prints and modern silhouettes for every occasion.",
    subcategories: ["Dresses", "Tops", "Bottoms", "Sets", "Outerwear"],
  },
  men: {
    title: "Men",
    description: "Contemporary African style meets streetwear sophistication.",
    subcategories: ["Shirts", "T-Shirts", "Pants", "Sets", "Outerwear"],
  },
  kids: {
    title: "Kids",
    description: "Culture-ready styles for the little ones.",
    subcategories: ["Girls", "Boys", "Baby", "Sets"],
  },
  accessories: {
    title: "Accessories",
    description: "Complete your look with bags, jewelry, and more.",
    subcategories: ["Bags", "Jewelry", "Headwear", "Footwear"],
  },
  others: {
    title: "Others",
    description: "Discover unique finds and lifestyle pieces.",
    subcategories: ["Home", "Beauty", "Gifts"],
  },
};

interface ShopCategoryPageProps {
  category: string;
  initialProducts: Product[];
  totalCount: number;
}

export default function ShopCategoryPage({
  category,
  initialProducts,
  totalCount,
}: ShopCategoryPageProps) {
  const router = useRouter();
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.others;

  // State
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [sort, setSort] = useState<SortOption>("popular");
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4>(4);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(products.length < totalCount);
  const [page, setPage] = useState(1);

  // Filter products based on current filters
  const filteredProducts = applyFilters(MOCK_PRODUCTS.filter(p =>
    p.categoryPath[0] === category || category === "others"
  ), filters);

  // Sort products
  const sortedProducts = sortProducts(filteredProducts, sort);

  // Calculate available filter options
  const availableFilters = {
    colors: MOCK_COLORS,
    sizes: MOCK_SIZES,
    brands: MOCK_BRANDS,
    priceRange: {
      min: Math.min(...sortedProducts.map(p => p.price.amount), 0),
      max: Math.max(...sortedProducts.map(p => p.price.amount), 100000),
    },
    ecoTags: ["MadeInAfrica", "SmallBatch", "ArtisanMade", "Recycled", "Organic", "Deadstock"] as const,
  };

  // Infinite scroll handler
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPage(prev => prev + 1);
      setIsLoading(false);
    }, 500);
  }, [isLoading, hasMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.getElementById("load-more-sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  // Handle filter changes
  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  // Handle sort changes
  const handleSortChange = (value: string) => {
    setSort(value as SortOption);
    setPage(1);
  };

  return (
    <ShopLayout>
      {/* Breadcrumb */}
      <nav className="container px-4 py-3 text-sm">
        <ol className="flex items-center gap-2 text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary">Home</Link>
          </li>
          <ChevronRight className="h-4 w-4" />
          <li className="font-medium text-foreground">{config.title}</li>
        </ol>
      </nav>

      {/* Category Header */}
      <header className="container px-4 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">{config.title}</h1>
        <p className="text-muted-foreground mt-1">{config.description}</p>

        {/* Subcategory Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full"
          >
            All
          </Button>
          {config.subcategories.map((sub) => (
            <Button
              key={sub}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              {sub}
            </Button>
          ))}
        </div>
      </header>

      {/* Filter Bar */}
      <div className="sticky top-16 z-30 bg-background border-y">
        <div className="container px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Filter button (mobile) + Result count */}
            <div className="flex items-center gap-3">
              <div className="md:hidden">
                <MobileFilterSheet
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  availableColors={availableFilters.colors}
                  availableSizes={availableFilters.sizes}
                  availableBrands={availableFilters.brands}
                  availableEcoTags={[...availableFilters.ecoTags]}
                  priceRange={availableFilters.priceRange}
                  currencySymbol="₦"
                  productCount={sortedProducts.length}
                />
              </div>
              <span className="text-sm text-muted-foreground">
                {sortedProducts.length} products
              </span>
            </div>

            {/* Right: Sort + Grid toggle */}
            <div className="flex items-center gap-3">
              <Select value={sort} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[160px] h-9">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="bestselling">Best Selling</SelectItem>
                </SelectContent>
              </Select>

              {/* Grid toggle (desktop only) */}
              <div className="hidden md:flex items-center border rounded-md">
                <button
                  onClick={() => setGridColumns(2)}
                  className={cn(
                    "p-2 transition-colors",
                    gridColumns === 2 ? "bg-muted" : "hover:bg-muted/50"
                  )}
                >
                  <Grid2X2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setGridColumns(3)}
                  className={cn(
                    "p-2 transition-colors",
                    gridColumns === 3 ? "bg-muted" : "hover:bg-muted/50"
                  )}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setGridColumns(4)}
                  className={cn(
                    "p-2 transition-colors",
                    gridColumns === 4 ? "bg-muted" : "hover:bg-muted/50"
                  )}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          <div className="mt-3">
            <ActiveFilterPills
              filters={filters}
              onFiltersChange={handleFiltersChange}
              availableColors={availableFilters.colors}
              availableSizes={availableFilters.sizes}
              availableBrands={availableFilters.brands}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-6">
        <div className="flex gap-8">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-36">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                availableColors={availableFilters.colors}
                availableSizes={availableFilters.sizes}
                availableBrands={availableFilters.brands}
                availableEcoTags={[...availableFilters.ecoTags]}
                priceRange={availableFilters.priceRange}
                currencySymbol="₦"
              />
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <ProductGrid
              products={sortedProducts}
              columns={gridColumns}
              showQuickAdd={true}
              showTryOn={true}
            />

            {/* Load More Sentinel */}
            {hasMore && (
              <div id="load-more-sentinel" className="py-8">
                {isLoading && <ProductGridSkeleton count={4} />}
              </div>
            )}

            {/* No Results */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg font-medium">No products found</p>
                <p className="text-muted-foreground mt-1">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setFilters({})}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </ShopLayout>
  );
}

// Server-side props
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const category = params?.category as string;

  // Validate category
  const validCategories = ["women", "men", "kids", "accessories", "others"];
  if (!validCategories.includes(category)) {
    return { notFound: true };
  }

  // Filter products by category
  const categoryProducts = MOCK_PRODUCTS.filter(
    (p) => p.categoryPath[0] === category || (category === "others" && !["women", "men", "kids", "accessories"].includes(p.categoryPath[0]))
  );

  return {
    props: {
      category,
      initialProducts: categoryProducts,
      totalCount: categoryProducts.length,
    },
  };
};

// Helper: Apply filters to products
function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  return products.filter((product) => {
    // Size filter
    if (filters.sizes?.length) {
      const hasMatchingSize = product.sizes.some((s) => filters.sizes!.includes(s.id));
      if (!hasMatchingSize) return false;
    }

    // Color filter
    if (filters.colors?.length) {
      const hasMatchingColor = product.colors.some((c) => filters.colors!.includes(c.id));
      if (!hasMatchingColor) return false;
    }

    // Brand filter
    if (filters.brands?.length) {
      if (!filters.brands.includes(product.brandId)) return false;
    }

    // Price filter
    if (filters.priceMin !== undefined && product.price.amount < filters.priceMin) {
      return false;
    }
    if (filters.priceMax !== undefined && product.price.amount > filters.priceMax) {
      return false;
    }

    // Eco tags filter
    if (filters.ecoTags?.length) {
      const hasMatchingTag = product.ecoTags.some((t) => filters.ecoTags!.includes(t));
      if (!hasMatchingTag) return false;
    }

    // Virtual try-on filter
    if (filters.hasVirtualTryOn && !product.virtualTryOn.isEnabled) {
      return false;
    }

    // On sale filter
    if (filters.isOnSale && !product.compareAtPrice) {
      return false;
    }

    // New arrivals filter
    if (filters.isNew && !product.isNew) {
      return false;
    }

    // In stock filter
    if (filters.inStock === false) {
      // This means show out of stock only
    } else if (filters.inStock !== undefined && product.totalInventory <= 0) {
      return false;
    }

    return true;
  });
}

// Helper: Sort products
function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "popular":
      return sorted.sort((a, b) => b.viewCount - a.viewCount);
    case "newest":
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "price_asc":
      return sorted.sort((a, b) => a.price.amount - b.price.amount);
    case "price_desc":
      return sorted.sort((a, b) => b.price.amount - a.price.amount);
    case "rating":
      return sorted.sort((a, b) => b.ratings.averageRating - a.ratings.averageRating);
    case "bestselling":
      return sorted.sort((a, b) => b.salesCount - a.salesCount);
    case "most_reviewed":
      return sorted.sort((a, b) => b.ratings.totalReviews - a.ratings.totalReviews);
    default:
      return sorted;
  }
}
