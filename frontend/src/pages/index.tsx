import Link from "next/link";
import { ArrowRight, Leaf, Sparkles, Camera, Flame, Star, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShopLayout } from "@/components/shop/ShopLayout";
import { HeroCarousel, defaultHeroSlides } from "@/components/shop/HeroCarousel";
import { FlashDeals } from "@/components/shop/FlashDeals";
import { TryOnSpotlight } from "@/components/shop/VirtualTryOnWidget";
import { CollectionCard, CollectionGrid } from "@/components/shop/CollectionCard";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { EcoTagBadge } from "@/components/shop/ProductCard";
import {
  MOCK_PRODUCTS,
  MOCK_BRANDS,
  MOCK_COLLECTIONS,
  MOCK_FLASH_SALE,
  getNewArrivals,
  getFlashDealProducts,
  getHomepageCollections,
  getTryOnReadyProducts,
  getFeaturedProducts,
} from "@/data/mockProducts";

export default function HomePage() {
  const newArrivals = getNewArrivals(8);
  const flashDealProducts = getFlashDealProducts();
  const homepageCollections = getHomepageCollections();
  const tryOnReadyProducts = getTryOnReadyProducts(4);
  const featuredProducts = getFeaturedProducts(8);
  const trendingProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <ShopLayout>
      {/* Hero Carousel */}
      <HeroCarousel slides={defaultHeroSlides} />

      {/* Flash Deals */}
      <FlashDeals
        products={flashDealProducts}
        endTime={new Date(MOCK_FLASH_SALE.endTime)}
        className="border-b"
      />

      {/* Shop by Category */}
      <section className="border-b bg-white">
        <div className="container px-4 py-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Shop by Category
              </h2>
              <p className="text-sm text-muted-foreground">
                Women, Men, Kids, and accessories — curated with African flavor.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              { href: "/shop/women", title: "Women", caption: "Ankara, Adire, co-ords", image: "/demo/cat-women.svg" },
              { href: "/shop/men", title: "Men", caption: "Native fits, streetwear", image: "/demo/cat-men.svg" },
              { href: "/shop/kids", title: "Kids", caption: "Culture-ready sets", image: "/demo/cat-kids.svg" },
              { href: "/shop/accessories", title: "Accessories", caption: "Bags, jewelry, more", image: "/demo/cat-accessories.svg" },
            ].map((c) => (
              <Link key={c.href} href={c.href}>
                <Card className="group overflow-hidden rounded-2xl border bg-card shadow-card card-hover-effect hover:shadow-card-hover">
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/10 via-accent/30 to-transparent">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary/20">{c.title[0]}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-lg font-extrabold">{c.title}</div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {c.caption}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Try-On Spotlight */}
      <TryOnSpotlight />

      {/* New Arrivals */}
      <section className="bg-background">
        <div className="container px-4 py-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-extrabold tracking-tight">New Arrivals</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Fresh drops from brands across Africa and the diaspora.
              </p>
            </div>
            <Link href="/collection/new-arrivals" className="text-sm font-semibold hover:text-primary flex items-center gap-1">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ProductGrid
            products={newArrivals}
            columns={4}
            showQuickAdd={true}
            showTryOn={true}
          />
        </div>
      </section>

      {/* Trending in Your Region */}
      <section className="bg-muted/30 border-y">
        <div className="container px-4 py-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-extrabold tracking-tight">Trending in Lagos</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                What's hot in your region right now.
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              Change location
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {trendingProducts.map((product, i) => (
              <Link key={product.id} href={`/product/${product.slug}`}>
                <Card className="group overflow-hidden rounded-xl border bg-card">
                  <div className="relative aspect-square bg-muted">
                    <img
                      src={product.primaryImageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-black/70 px-2 py-1 text-white">
                      <Flame className="h-3.5 w-3.5 text-orange-400" />
                      <span className="text-xs font-medium">{245 - i * 47} trending</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{product.ratings.averageRating}</span>
                      <span className="text-xs text-muted-foreground">({product.ratings.totalReviews})</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Collections */}
      <section className="bg-background">
        <div className="container px-4 py-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Curated Collections
              </h2>
              <p className="text-sm text-muted-foreground">
                Explore our handpicked edits for every occasion.
              </p>
            </div>
            <Link href="/collections" className="text-sm font-semibold hover:text-primary flex items-center gap-1">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {homepageCollections.slice(0, 4).map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                variant="large"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured African Brands */}
      <section className="border-t bg-white">
        <div className="container px-4 py-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Featured African Brands
              </h2>
              <p className="text-sm text-muted-foreground">
                Discover the makers behind the magic.
              </p>
            </div>
            <Link href="/brands" className="text-sm font-semibold hover:text-primary flex items-center gap-1">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {MOCK_BRANDS.map((brand) => (
              <Link key={brand.id} href={`/brand/${brand.slug}`}>
                <Card className="group overflow-hidden rounded-xl border bg-card p-4 text-center hover:shadow-lg transition-shadow">
                  <div className="h-16 w-16 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">{brand.name[0]}</span>
                  </div>
                  <h3 className="font-semibold text-sm">{brand.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{brand.origin}</p>
                  {brand.isVerified && (
                    <Badge variant="secondary" className="mt-2 text-[10px]">
                      Verified
                    </Badge>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Eco-Conscious Picks */}
      <section className="bg-gradient-to-br from-green-50 via-accent/30 to-green-50">
        <div className="container px-4 py-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-full bg-green-100">
                  <Leaf className="h-4 w-4 text-green-600" />
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight">
                  Eco-Conscious Picks
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Fashion that cares — sustainable, ethical, and made with love.
              </p>
            </div>
            <Link href="/collection/eco-conscious" className="text-sm font-semibold hover:text-primary flex items-center gap-1">
              Learn more
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Eco Tags Legend */}
          <div className="flex flex-wrap gap-2 mb-6">
            <EcoTagBadge tag="MadeInAfrica" size="md" />
            <EcoTagBadge tag="ArtisanMade" size="md" />
            <EcoTagBadge tag="Organic" size="md" />
            <EcoTagBadge tag="Recycled" size="md" />
            <EcoTagBadge tag="SmallBatch" size="md" />
          </div>

          <ProductGrid
            products={MOCK_PRODUCTS.filter(p => p.ecoTags.length > 0).slice(0, 4)}
            columns={4}
            showQuickAdd={true}
            showTryOn={true}
          />
        </div>
      </section>

      {/* Try-On Ready Products */}
      <section className="bg-background border-t">
        <div className="container px-4 py-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-full bg-primary/10">
                  <Camera className="h-4 w-4 text-primary" />
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight">
                  Try-On Ready
                </h2>
                <Badge className="bg-primary text-primary-foreground text-[10px]">NEW</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                See how these pieces look on you with virtual try-on.
              </p>
            </div>
            <Link href="/collection/try-on-ready" className="text-sm font-semibold hover:text-primary flex items-center gap-1">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ProductGrid
            products={tryOnReadyProducts}
            columns={4}
            showQuickAdd={true}
            showTryOn={true}
          />
        </div>
      </section>

      {/* Newsletter / App Download CTA */}
      <section className="bg-black text-white">
        <div className="container px-4 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-extrabold">
              Get 10% Off Your First Order
            </h2>
            <p className="text-white/70">
              Sign up for exclusive drops, early access, and style inspiration
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="lg" className="shrink-0">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-white/50">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>
      </section>
    </ShopLayout>
  );
}
