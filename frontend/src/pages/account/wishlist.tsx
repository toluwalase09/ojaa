import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Trash2,
  Bell,
  Share2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ShopLayout } from "@/components/shop/ShopLayout";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ColorSwatch } from "@/components/shop/ProductCard";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import type { Product } from "@/types/shop";
import { formatMoney, calculateDiscountPercentage } from "@/types/shop";

// Mock wishlist data
const initialWishlistItems = MOCK_PRODUCTS.slice(0, 6).map((product) => ({
  id: `wl_${product.id}`,
  product,
  selectedColorId: product.colors[0]?.id,
  selectedSizeId: undefined as string | undefined,
  addedAt: new Date().toISOString(),
  notifyOnSale: false,
  notifyOnRestock: false,
}));

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((selected) =>
      selected.includes(itemId)
        ? selected.filter((id) => id !== itemId)
        : [...selected, itemId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map((i) => i.id));
    }
  };

  const removeItem = (itemId: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== itemId));
    setSelectedItems((selected) => selected.filter((id) => id !== itemId));
  };

  const removeSelected = () => {
    setWishlistItems((items) => items.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const moveToCart = (itemId: string) => {
    // TODO: Add to cart logic
    console.log("Moving to cart:", itemId);
    removeItem(itemId);
  };

  const moveSelectedToCart = () => {
    // TODO: Add selected to cart
    console.log("Moving selected to cart:", selectedItems);
    removeSelected();
  };

  if (wishlistItems.length === 0) {
    return (
      <ShopLayout>
        <div className="container px-4 py-16 text-center">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-extrabold mb-2">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-6">
            Start adding items you love to your wishlist.
          </p>
          <Link href="/">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      </ShopLayout>
    );
  }

  return (
    <ShopLayout>
      <div className="container px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              My Wishlist ({wishlistItems.length} items)
            </h1>
            <p className="text-muted-foreground mt-1">
              Items you've saved for later.
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share Wishlist
          </Button>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg mb-6">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={selectedItems.length === wishlistItems.length}
              onCheckedChange={toggleSelectAll}
            />
            <span className="text-sm">
              {selectedItems.length > 0
                ? `${selectedItems.length} selected`
                : "Select All"}
            </span>
          </div>
          {selectedItems.length > 0 && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={removeSelected} className="gap-2">
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
              <Button size="sm" onClick={moveSelectedToCart} className="gap-2">
                <ShoppingBag className="h-4 w-4" />
                Move to Cart
              </Button>
            </div>
          )}
        </div>

        {/* Wishlist Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => {
            const hasDiscount = item.product.compareAtPrice &&
              item.product.compareAtPrice.amount > item.product.price.amount;
            const discountPercent = hasDiscount
              ? calculateDiscountPercentage(
                  item.product.compareAtPrice!.amount,
                  item.product.price.amount
                )
              : 0;
            const isOutOfStock = item.product.totalInventory <= 0;

            return (
              <Card key={item.id} className="group overflow-hidden">
                {/* Image */}
                <div className="relative aspect-[3/4] bg-muted">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => toggleItemSelection(item.id)}
                    className="absolute top-3 left-3 z-10 bg-white"
                  />

                  <img
                    src={item.product.primaryImageUrl}
                    alt={item.product.name}
                    className={cn(
                      "w-full h-full object-cover transition-opacity",
                      isOutOfStock && "opacity-50"
                    )}
                  />

                  {/* Out of Stock Overlay */}
                  {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Badge variant="secondary" className="text-sm">
                        Out of Stock
                      </Badge>
                    </div>
                  )}

                  {/* Discount Badge */}
                  {hasDiscount && !isOutOfStock && (
                    <Badge className="absolute top-3 right-3 bg-primary">
                      -{discountPercent}%
                    </Badge>
                  )}

                  {/* Virtual Try-On Badge */}
                  {item.product.virtualTryOn.isEnabled && (
                    <Badge variant="secondary" className="absolute bottom-3 left-3 gap-1">
                      Try-On
                    </Badge>
                  )}

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">{item.product.brand.name}</p>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="font-medium line-clamp-2 hover:text-primary"
                    >
                      {item.product.name}
                    </Link>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{formatMoney(item.product.price)}</span>
                    {hasDiscount && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatMoney(item.product.compareAtPrice!)}
                      </span>
                    )}
                  </div>

                  {/* Color Swatches */}
                  {item.product.colors.length > 1 && (
                    <div className="flex items-center gap-1">
                      {item.product.colors.slice(0, 4).map((color) => (
                        <ColorSwatch
                          key={color.id}
                          color={color}
                          size="sm"
                          selected={item.selectedColorId === color.id}
                        />
                      ))}
                      {item.product.colors.length > 4 && (
                        <span className="text-xs text-muted-foreground">
                          +{item.product.colors.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    {isOutOfStock ? (
                      <Button variant="outline" className="flex-1 gap-2" size="sm">
                        <Bell className="h-4 w-4" />
                        Notify Me
                      </Button>
                    ) : (
                      <Button
                        className="flex-1 gap-2"
                        size="sm"
                        onClick={() => moveToCart(item.id)}
                      >
                        <ShoppingBag className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recommendations */}
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold tracking-tight mb-6">
            Based on Your Wishlist
          </h2>
          <ProductGrid
            products={MOCK_PRODUCTS.slice(4, 8)}
            columns={4}
          />
        </section>
      </div>
    </ShopLayout>
  );
}
