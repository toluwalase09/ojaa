import { useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Heart,
  ShoppingBag,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  Star,
  ChevronLeft,
  ChevronDown,
  Camera,
  Check,
  Minus,
  Plus,
  Ruler,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ShopLayout } from "@/components/shop/ShopLayout";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ColorSwatch, EcoTagBadge } from "@/components/shop/ProductCard";
import { TryOnButton } from "@/components/shop/VirtualTryOnWidget";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import type { Product, ProductColor, ProductSize } from "@/types/shop";
import { formatMoney, calculateDiscountPercentage } from "@/types/shop";

interface ProductPageProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductPage({ product, relatedProducts }: ProductPageProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const hasDiscount = product.compareAtPrice && product.compareAtPrice.amount > product.price.amount;
  const discountPercent = hasDiscount
    ? calculateDiscountPercentage(product.compareAtPrice!.amount, product.price.amount)
    : 0;

  // Image gallery navigation
  const images = product.media.filter((m) => m.type === "image");
  const currentImage = images[currentImageIndex] || { url: product.primaryImageUrl, alt: product.name };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Add to cart handler
  const handleAddToCart = () => {
    if (!selectedSize) {
      // TODO: Show error - size required
      return;
    }
    // TODO: Add to cart logic
    console.log("Adding to cart:", { product, selectedColor, selectedSize, quantity });
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
          <li>
            <Link href={`/shop/${product.categoryPath[0]}`} className="hover:text-primary capitalize">
              {product.categoryPath[0]}
            </Link>
          </li>
          <ChevronRight className="h-4 w-4" />
          <li className="font-medium text-foreground truncate max-w-[200px]">{product.name}</li>
        </ol>
      </nav>

      {/* Product Section */}
      <div className="container px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted">
              <img
                src={currentImage.url}
                alt={currentImage.alt}
                className="w-full h-full object-cover"
              />

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-black text-white">NEW</Badge>
                )}
                {hasDiscount && (
                  <Badge className="bg-primary text-primary-foreground">-{discountPercent}%</Badge>
                )}
                {product.isLimitedEdition && (
                  <Badge variant="secondary">LIMITED</Badge>
                )}
              </div>

              {/* Wishlist */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-lg transition-colors"
              >
                <Heart
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                  )}
                />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    "shrink-0 w-20 aspect-square rounded-lg overflow-hidden border-2 transition-colors",
                    index === currentImageIndex ? "border-primary" : "border-transparent hover:border-muted"
                  )}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Virtual Try-On Card */}
            {product.virtualTryOn.isEnabled && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-accent to-primary/10 border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Camera className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Virtual Try-On</p>
                      <p className="text-sm text-muted-foreground">See how it looks on you</p>
                    </div>
                  </div>
                  <TryOnButton product={product} />
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Title */}
            <div>
              <Link
                href={`/brand/${product.brand.slug}`}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {product.brand.name}
              </Link>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
                {product.name}
              </h1>
            </div>

            {/* Rating & Sales */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.ratings.averageRating.toFixed(1)}</span>
                <span className="text-muted-foreground">({product.ratings.totalReviews} reviews)</span>
              </div>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">{product.salesCount}+ sold</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold">{formatMoney(product.price)}</span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatMoney(product.compareAtPrice!)}
                  </span>
                  <Badge variant="destructive">-{discountPercent}% OFF</Badge>
                </>
              )}
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Color: {selectedColor.name}</span>
              </div>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <ColorSwatch
                    key={color.id}
                    color={color}
                    size="lg"
                    selected={selectedColor.id === color.id}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Size: {selectedSize?.name || "Select a size"}</span>
                <button className="text-sm text-primary flex items-center gap-1 hover:underline">
                  <Ruler className="h-4 w-4" />
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-4 py-2 rounded-lg border font-medium transition-colors",
                      selectedSize?.id === size.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background hover:border-primary/50"
                    )}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <span className="font-medium">Quantity</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 hover:bg-muted transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.totalInventory} in stock
                </span>
              </div>
            </div>

            {/* Add to Cart / Buy Now */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 gap-2"
                onClick={handleAddToCart}
                disabled={!selectedSize}
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="secondary" className="flex-1">
                Buy Now
              </Button>
              <Button size="lg" variant="outline" className="shrink-0">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Shipping & Returns */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-muted/50">
              <div className="text-center">
                <Truck className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">Over ₦15,000</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">14-Day Returns</p>
                <p className="text-xs text-muted-foreground">Easy returns</p>
              </div>
              <div className="text-center">
                <Shield className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">Secure Payment</p>
                <p className="text-xs text-muted-foreground">SSL encrypted</p>
              </div>
            </div>

            {/* Eco Tags */}
            {product.ecoTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.ecoTags.map((tag) => (
                  <EcoTagBadge key={tag} tag={tag} size="md" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="container px-4 py-8">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="size-guide"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
            >
              Size Guide
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
            >
              Reviews ({product.ratings.totalReviews})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="py-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          </TabsContent>

          <TabsContent value="details" className="py-6">
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-muted-foreground">Brand</dt>
                <dd className="font-medium">{product.brand.name}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Category</dt>
                <dd className="font-medium capitalize">{product.categoryPath.join(" > ")}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">SKU</dt>
                <dd className="font-medium">{product.id.toUpperCase()}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Available Colors</dt>
                <dd className="font-medium">{product.colors.length}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Available Sizes</dt>
                <dd className="font-medium">{product.sizes.map((s) => s.name).join(", ")}</dd>
              </div>
              {product.virtualTryOn.isEnabled && (
                <div>
                  <dt className="text-sm text-muted-foreground">Virtual Try-On</dt>
                  <dd className="font-medium text-primary flex items-center gap-1">
                    <Check className="h-4 w-4" /> Available
                  </dd>
                </div>
              )}
            </dl>
          </TabsContent>

          <TabsContent value="size-guide" className="py-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Size</th>
                    <th className="text-left py-2 px-4">Bust</th>
                    <th className="text-left py-2 px-4">Waist</th>
                    <th className="text-left py-2 px-4">Hips</th>
                  </tr>
                </thead>
                <tbody>
                  {product.sizes.map((size) => (
                    <tr key={size.id} className="border-b">
                      <td className="py-2 px-4 font-medium">{size.name}</td>
                      <td className="py-2 px-4">{size.measurements?.bust || "-"}</td>
                      <td className="py-2 px-4">{size.measurements?.waist || "-"}</td>
                      <td className="py-2 px-4">{size.measurements?.hips || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="py-6">
            {/* Rating Summary */}
            <div className="flex gap-8 mb-8 pb-8 border-b">
              <div className="text-center">
                <div className="text-5xl font-extrabold">{product.ratings.averageRating.toFixed(1)}</div>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-4 w-4",
                        star <= Math.round(product.ratings.averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted"
                      )}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {product.ratings.totalReviews} reviews
                </p>
              </div>

              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = product.ratings.ratingDistribution[rating as keyof typeof product.ratings.ratingDistribution];
                  const percent = (count / product.ratings.totalReviews) * 100;
                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm w-3">{rating}</span>
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <Progress value={percent} className="flex-1 h-2" />
                      <span className="text-sm text-muted-foreground w-8">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Fit Feedback */}
            <div className="mb-8">
              <h3 className="font-medium mb-3">Fit Feedback</h3>
              <div className="flex items-center gap-2">
                <Progress
                  value={
                    (product.ratings.fitDistribution.runs_small /
                      (product.ratings.fitDistribution.runs_small +
                        product.ratings.fitDistribution.true_to_size +
                        product.ratings.fitDistribution.runs_large)) *
                    100
                  }
                  className="h-2"
                />
                <span className="text-xs text-muted-foreground w-20">Runs Small</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Progress
                  value={
                    (product.ratings.fitDistribution.true_to_size /
                      (product.ratings.fitDistribution.runs_small +
                        product.ratings.fitDistribution.true_to_size +
                        product.ratings.fitDistribution.runs_large)) *
                    100
                  }
                  className="h-2"
                />
                <span className="text-xs text-muted-foreground w-20">True to Size</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Progress
                  value={
                    (product.ratings.fitDistribution.runs_large /
                      (product.ratings.fitDistribution.runs_small +
                        product.ratings.fitDistribution.true_to_size +
                        product.ratings.fitDistribution.runs_large)) *
                    100
                  }
                  className="h-2"
                />
                <span className="text-xs text-muted-foreground w-20">Runs Large</span>
              </div>
            </div>

            {/* Sample Reviews */}
            <div className="space-y-6">
              <div className="p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">Absolutely stunning!</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  The fabric quality is amazing and the fit is perfect. The virtual try-on
                  feature helped me pick the right color!
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>Adaeze O.</span>
                  <span>Size: M</span>
                  <Badge variant="secondary" className="text-[10px]">Verified Purchase</Badge>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Load More Reviews
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container px-4 py-8 border-t">
          <h2 className="text-2xl font-extrabold tracking-tight mb-6">You May Also Like</h2>
          <ProductGrid products={relatedProducts} columns={4} />
        </section>
      )}
    </ShopLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  // Find product by slug
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return { notFound: true };
  }

  // Get related products (same category, different product)
  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && p.categoryPath[0] === product.categoryPath[0]
  ).slice(0, 4);

  return {
    props: {
      product,
      relatedProducts,
    },
  };
};
