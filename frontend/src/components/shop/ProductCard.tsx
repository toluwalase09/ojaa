import Link from "next/link";
import { Heart, ShoppingBag, Camera, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product, ProductColor } from "@/types/shop";
import { formatMoney, calculateDiscountPercentage } from "@/types/shop";

interface ProductCardProps {
  product: Product;
  showQuickAdd?: boolean;
  showTryOn?: boolean;
  onAddToWishlist?: (productId: string) => void;
  onQuickAdd?: (productId: string) => void;
  onTryOn?: (productId: string) => void;
  className?: string;
}

export function ProductCard({
  product,
  showQuickAdd = true,
  showTryOn = true,
  onAddToWishlist,
  onQuickAdd,
  onTryOn,
  className,
}: ProductCardProps) {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice.amount > product.price.amount;
  const discountPercent = hasDiscount
    ? calculateDiscountPercentage(product.compareAtPrice!.amount, product.price.amount)
    : 0;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToWishlist?.(product.id);
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickAdd?.(product.id);
  };

  const handleTryOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onTryOn?.(product.id);
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <article
        className={cn(
          "group relative overflow-hidden rounded-xl border bg-card transition-all duration-300",
          "hover:shadow-lg hover:border-primary/20",
          className
        )}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
          {/* Primary Image */}
          <img
            src={product.primaryImageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />

          {/* Secondary Image (hover) */}
          {product.secondaryImageUrl && (
            <img
              src={product.secondaryImageUrl}
              alt={`${product.name} - alternate view`}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}

          {/* Badges - Top Left */}
          <div className="absolute left-2 top-2 flex flex-col gap-1.5">
            {product.isNew && (
              <Badge className="bg-black text-white text-[10px] px-2 py-0.5">NEW</Badge>
            )}
            {hasDiscount && (
              <Badge className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5">
                -{discountPercent}%
              </Badge>
            )}
            {product.isLimitedEdition && (
              <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
                LIMITED
              </Badge>
            )}
          </div>

          {/* Wishlist Button - Top Right */}
          <button
            onClick={handleWishlistClick}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-all hover:bg-white hover:scale-110"
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
          </button>

          {/* Virtual Try-On Badge - Bottom Left */}
          {product.virtualTryOn.isEnabled && showTryOn && (
            <button
              onClick={handleTryOnClick}
              className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-[11px] font-medium shadow-sm transition-all hover:bg-white hover:scale-105"
            >
              <Camera className="h-3.5 w-3.5 text-primary" />
              <span>Try On</span>
            </button>
          )}

          {/* Quick Add Overlay - Appears on Hover */}
          {showQuickAdd && (
            <div className="absolute inset-x-2 bottom-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
              {/* Size Quick Select */}
              <div className="mb-2 flex justify-center gap-1">
                {product.sizes.slice(0, 5).map((size) => (
                  <button
                    key={size.id}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // TODO: Add to cart with size
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-white/95 text-xs font-medium shadow-sm transition-all hover:bg-primary hover:text-white"
                  >
                    {size.name}
                  </button>
                ))}
              </div>
              <Button
                onClick={handleQuickAddClick}
                className="w-full gap-2 shadow-lg"
                size="sm"
              >
                <ShoppingBag className="h-4 w-4" />
                Quick Add
              </Button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-3 space-y-1.5">
          {/* Brand */}
          <p className="text-xs text-muted-foreground truncate">{product.brand.name}</p>

          {/* Product Name */}
          <h3 className="font-medium text-sm leading-tight line-clamp-2">{product.name}</h3>

          {/* Rating */}
          {product.ratings.totalReviews > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{product.ratings.averageRating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({product.ratings.totalReviews})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">{formatMoney(product.price)}</span>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">
                {formatMoney(product.compareAtPrice!)}
              </span>
            )}
          </div>

          {/* Color Swatches */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1 pt-1">
              {product.colors.slice(0, 5).map((color) => (
                <ColorSwatch key={color.id} color={color} size="sm" />
              ))}
              {product.colors.length > 5 && (
                <span className="text-xs text-muted-foreground">+{product.colors.length - 5}</span>
              )}
            </div>
          )}

          {/* Eco Tags */}
          {product.ecoTags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {product.ecoTags.slice(0, 2).map((tag) => (
                <EcoTagBadge key={tag} tag={tag} />
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

// Color Swatch Component
interface ColorSwatchProps {
  color: ProductColor;
  size?: "sm" | "md" | "lg";
  selected?: boolean;
  onClick?: () => void;
}

export function ColorSwatch({ color, size = "md", selected = false, onClick }: ColorSwatchProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <button
      onClick={onClick}
      title={color.name}
      className={cn(
        "rounded-full border-2 transition-all",
        sizeClasses[size],
        selected ? "border-primary ring-2 ring-primary/30" : "border-gray-200 hover:border-gray-400"
      )}
      style={{ backgroundColor: color.hexCode }}
      aria-label={`Select ${color.name}`}
    />
  );
}

// Eco Tag Badge Component
import { Leaf, Recycle, Hand, Globe, Sprout } from "lucide-react";
import type { EcoTag } from "@/types/shop";
import { ECO_TAG_LABELS } from "@/types/shop";

interface EcoTagBadgeProps {
  tag: EcoTag;
  size?: "sm" | "md";
}

export function EcoTagBadge({ tag, size = "sm" }: EcoTagBadgeProps) {
  const icons: Record<EcoTag, typeof Leaf> = {
    MadeInAfrica: Globe,
    SmallBatch: Hand,
    ArtisanMade: Hand,
    Recycled: Recycle,
    Organic: Sprout,
    Deadstock: Recycle,
    FairTrade: Globe,
    Vegan: Leaf,
    ZeroWaste: Recycle,
  };

  const Icon = icons[tag] || Leaf;
  const label = ECO_TAG_LABELS[tag];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-accent px-2 py-0.5 font-medium text-accent-foreground",
        size === "sm" ? "text-[10px] gap-1" : "text-xs gap-1.5"
      )}
    >
      <Icon className={size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3"} />
      {label}
    </span>
  );
}
