import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Trash2, Minus, Plus, Heart, ArrowRight, Tag, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ShopLayout } from "@/components/shop/ShopLayout";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/types/shop";

export default function CartPage() {
  const { items: cartItems, removeItem, updateQuantity, currency } = useCart();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Initialize selected items when cart loads
  useEffect(() => {
    if (cartItems.length > 0) {
      setSelectedItems(cartItems.map((i) => i.id));
    }
  }, [cartItems]);

  const freeShippingThreshold = 15000;
  const selectedSubtotal = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price.amount * item.quantity, 0);
  const shipping = selectedSubtotal >= freeShippingThreshold ? 0 : 2500;
  const discount = promoApplied ? Math.round(selectedSubtotal * 0.1) : 0;
  const total = selectedSubtotal - discount + shipping;

  const progressToFreeShipping = Math.min((selectedSubtotal / freeShippingThreshold) * 100, 100);
  const amountToFreeShipping = Math.max(freeShippingThreshold - selectedSubtotal, 0);

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + delta);
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
    setSelectedItems((selected) => selected.filter((id) => id !== itemId));
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((selected) =>
      selected.includes(itemId)
        ? selected.filter((id) => id !== itemId)
        : [...selected, itemId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((i) => i.id));
    }
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoApplied(true);
    }
  };

  if (cartItems.length === 0) {
    return (
      <ShopLayout>
        <div className="container px-4 py-16 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-extrabold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link href="/">
            <Button size="lg">Start Shopping</Button>
          </Link>

          {/* Recommended Products */}
          <section className="mt-16 text-left">
            <h2 className="text-2xl font-extrabold tracking-tight mb-6">Popular Products</h2>
            <ProductGrid products={MOCK_PRODUCTS.slice(0, 4)} columns={4} />
          </section>
        </div>
      </ShopLayout>
    );
  }

  return (
    <ShopLayout>
      <div className="container px-4 py-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-8">
          Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
        </h1>

        {/* Free Shipping Progress */}
        {selectedSubtotal < freeShippingThreshold && selectedSubtotal > 0 && (
          <div className="mb-6 p-4 rounded-lg bg-accent/50 border">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">
                Add {formatMoney({ amount: amountToFreeShipping, currency: currency })} more for FREE shipping!
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>
        )}

        {selectedSubtotal >= freeShippingThreshold && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                You've unlocked FREE shipping!
              </span>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Select All */}
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Checkbox
                checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <span className="text-sm font-medium">Select All ({cartItems.length} items)</span>
            </div>

            {/* Items */}
            {cartItems.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => toggleItemSelection(item.id)}
                    className="mt-1"
                  />

                  {/* Product Image */}
                  <Link href={`/product/${item.product.slug}`} className="shrink-0">
                    <div className="w-24 h-32 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={item.product.primaryImageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="font-medium hover:text-primary line-clamp-2"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.product.brand.name}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-sm">
                      <span>Color: {item.selectedColor.name}</span>
                      <span className="text-muted-foreground">|</span>
                      <span>Size: {item.selectedSize.name}</span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          className="p-2 hover:bg-muted transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold">
                          {formatMoney({ amount: item.price.amount * item.quantity, currency: item.price.currency })}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-muted-foreground">
                            {formatMoney(item.price)} each
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                        <Heart className="h-4 w-4" />
                        <span className="hidden sm:inline">Save for Later</span>
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                      {item.product.virtualTryOn?.isEnabled && (
                        <Link
                          href={`/try-on?product=${item.product.id}`}
                          className="flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          Try Again
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="pl-9"
                      disabled={promoApplied}
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={applyPromoCode}
                    disabled={promoApplied || !promoCode}
                  >
                    Apply
                  </Button>
                </div>
                {promoApplied && (
                  <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                    <Badge variant="secondary" className="gap-1">
                      WELCOME10
                      <button onClick={() => setPromoApplied(false)}>×</button>
                    </Badge>
                    <span>10% off applied!</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Try "WELCOME10" for 10% off your first order
                </p>
              </div>

              {/* Totals */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({selectedItems.length} items)</span>
                  <span>{formatMoney({ amount: selectedSubtotal, currency: currency })}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatMoney({ amount: discount, currency: currency })}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                    {shipping === 0 ? "FREE" : formatMoney({ amount: shipping, currency: currency })}
                  </span>
                </div>
                <div className="pt-3 border-t flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatMoney({ amount: total, currency: currency })}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button
                  size="lg"
                  className="w-full mt-6 gap-2"
                  disabled={selectedItems.length === 0}
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              {selectedItems.length === 0 && (
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Select items to proceed to checkout
                </p>
              )}

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 mt-6 text-xs text-muted-foreground">
                <span>🔒 Secure checkout</span>
                <span>↩️ 14-day returns</span>
              </div>
            </Card>
          </div>
        </div>

        {/* You Might Also Like */}
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold tracking-tight mb-6">You Might Also Like</h2>
          <ProductGrid products={MOCK_PRODUCTS.slice(0, 4)} columns={4} />
        </section>
      </div>
    </ShopLayout>
  );
}
