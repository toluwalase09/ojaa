import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Collection } from "@/types/shop";

interface CollectionCardProps {
  collection: Collection;
  variant?: "default" | "large" | "featured";
  className?: string;
}

export function CollectionCard({ collection, variant = "default", className }: CollectionCardProps) {
  if (variant === "featured") {
    return (
      <Link href={`/collection/${collection.slug}`}>
        <Card
          className={cn(
            "group relative overflow-hidden rounded-2xl border-0",
            "aspect-[16/9] md:aspect-[21/9]",
            className
          )}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${collection.heroImageUrl || "/demo/collection-placeholder.svg"})` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center p-8 md:p-12">
            <div className="max-w-lg space-y-4">
              <h2 className="text-2xl md:text-4xl font-extrabold text-white">
                {collection.title}
              </h2>
              {collection.subtitle && (
                <p className="text-white/80 text-sm md:text-base">
                  {collection.subtitle}
                </p>
              )}
              <Button
                variant="secondary"
                className="gap-2 group-hover:gap-3 transition-all"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  if (variant === "large") {
    return (
      <Link href={`/collection/${collection.slug}`}>
        <Card
          className={cn(
            "group relative overflow-hidden rounded-2xl border-0",
            "aspect-[3/4] md:aspect-[4/5]",
            className
          )}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${collection.heroImageUrl || "/demo/collection-placeholder.svg"})` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">
              {collection.title}
            </h3>
            {collection.subtitle && (
              <p className="text-white/80 text-sm mb-4 line-clamp-2">
                {collection.subtitle}
              </p>
            )}
            <span className="inline-flex items-center gap-2 text-white font-medium text-sm group-hover:gap-3 transition-all">
              Shop Now
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Card>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/collection/${collection.slug}`}>
      <Card
        className={cn(
          "group overflow-hidden rounded-xl border bg-card shadow-sm",
          "hover:shadow-lg transition-all",
          className
        )}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${collection.thumbnailUrl || collection.heroImageUrl || "/demo/collection-placeholder.svg"})` }}
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold">{collection.title}</h3>
          {collection.subtitle && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
              {collection.subtitle}
            </p>
          )}
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-muted-foreground">
              {collection.productCount} items
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </Card>
    </Link>
  );
}

// Collection Grid Component
interface CollectionGridProps {
  collections: Collection[];
  variant?: "default" | "large";
  columns?: 2 | 3 | 4;
  className?: string;
}

export function CollectionGrid({ collections, variant = "default", columns = 4, className }: CollectionGridProps) {
  const columnClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4", columnClasses[columns], className)}>
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          variant={variant}
        />
      ))}
    </div>
  );
}

// Featured Collection Banner
interface FeaturedCollectionBannerProps {
  collection: Collection;
  className?: string;
}

export function FeaturedCollectionBanner({ collection, className }: FeaturedCollectionBannerProps) {
  return (
    <section className={cn("container px-4", className)}>
      <CollectionCard collection={collection} variant="featured" />
    </section>
  );
}
