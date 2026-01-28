import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/shop";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4 | 5;
  showQuickAdd?: boolean;
  showTryOn?: boolean;
  onAddToWishlist?: (productId: string) => void;
  onQuickAdd?: (productId: string) => void;
  onTryOn?: (productId: string) => void;
  className?: string;
}

export function ProductGrid({
  products,
  columns = 4,
  showQuickAdd = true,
  showTryOn = true,
  onAddToWishlist,
  onQuickAdd,
  onTryOn,
  className,
}: ProductGridProps) {
  const columnClasses = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-muted-foreground">
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm mt-1">Try adjusting your filters or search terms</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4", columnClasses[columns], className)}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          showQuickAdd={showQuickAdd}
          showTryOn={showTryOn}
          onAddToWishlist={onAddToWishlist}
          onQuickAdd={onQuickAdd}
          onTryOn={onTryOn}
        />
      ))}
    </div>
  );
}

// Skeleton loader for products
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[3/4] bg-muted rounded-xl" />
          <div className="p-3 space-y-2">
            <div className="h-3 bg-muted rounded w-1/3" />
            <div className="h-4 bg-muted rounded w-2/3" />
            <div className="h-3 bg-muted rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
