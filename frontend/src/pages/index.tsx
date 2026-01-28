import Link from "next/link";
import { ArrowRight, Leaf, Sparkles, Camera, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShopLayout } from "@/components/shop/ShopLayout";
import { BRANDS, PRODUCTS, SHOP_DEMO, formatMoney } from "@/data/shopMock";

function EcoBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
      <Leaf className="mr-1 h-3 w-3" />
      {label}
    </span>
  );
}

export default function HomePage() {
  const newIn = PRODUCTS.filter((p) => p.isNew).slice(0, 8);

  return (
    <ShopLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--accent))_0%,transparent_45%),radial-gradient(circle_at_80%_0%,rgba(0,0,0,0.12)_0%,transparent_40%)]" />

        <div className="container relative px-4 py-16 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Afrocentric fashion, global energy
                </Badge>
                <EcoBadge label="Eco-first edits" />
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
                Wear the culture.
                <span className="text-primary"> Own the room.</span>
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                Shop bold African brands, small-batch drops, and clean silhouettes.
                Discover pieces that look like you — and feel like you.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/shop/women">
                  <Button size="lg" className="gap-2">
                    Shop New In
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="gap-2">
                  <Camera className="h-4 w-4" />
                  Try-on (Preview)
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Flame className="h-4 w-4 text-primary" /> Trending: Ankara, Adire,
                  Linen Co-ords
                </span>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border bg-card shadow-card">
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-black/5 to-black/0">
                  <img
                    src={SHOP_DEMO.hero}
                    alt="Featured look"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-4 -left-4 hidden rounded-2xl border bg-background/80 p-4 shadow-card md:block">
                <div className="text-xs text-muted-foreground">Featured brand</div>
                <div className="text-sm font-semibold">{BRANDS[0].name}</div>
                <div className="text-xs text-muted-foreground">{BRANDS[0].tagline}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-t bg-white">
        <div className="container px-4 py-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Shop by category
              </h2>
              <p className="text-sm text-muted-foreground">
                Women, Men, Kids, and accessories — curated with African flavor.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              { href: "/shop/women", title: "Women", caption: "Ankara, Adire, co-ords" },
              { href: "/shop/men", title: "Men", caption: "Native fits, streetwear" },
              { href: "/shop/kids", title: "Kids", caption: "Culture-ready sets" },
              { href: "/shop/others", title: "Others", caption: "Accessories, bags, more" },
            ].map((c) => (
              <Link key={c.href} href={c.href}>
                <Card className="group overflow-hidden rounded-2xl border bg-card p-5 shadow-card card-hover-effect hover:shadow-card-hover">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-lg font-extrabold">{c.title}</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {c.caption}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                  <div className="mt-6 h-24 rounded-xl bg-gradient-to-br from-primary/15 via-accent/60 to-transparent" />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New In */}
      <section className="bg-background">
        <div className="container px-4 py-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">New in</h2>
              <p className="text-sm text-muted-foreground">
                Fresh drops from brands across Africa and the diaspora.
              </p>
            </div>
            <Link href="/shop/women" className="text-sm font-semibold hover:text-primary">
              View all
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {newIn.map((p) => (
              <Card
                key={p.id}
                className="group overflow-hidden rounded-2xl border bg-card shadow-card card-hover-effect hover:shadow-card-hover"
              >
                <div className="relative aspect-[4/5] w-full bg-muted">
                  {/* primary image */}
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-0"
                  />
                  {/* hover swap */}
                  {p.secondaryImageUrl && (
                    <img
                      src={p.secondaryImageUrl}
                      alt={p.name}
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  )}
                  <div className="absolute left-3 top-3 flex flex-col gap-1">
                    {p.isNew && (
                      <span className="rounded-full bg-black px-2.5 py-1 text-[11px] font-semibold text-white">
                        NEW
                      </span>
                    )}
                    {p.compareAtPrice && p.compareAtPrice > p.price && (
                      <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
                        Sale&nbsp;
                        {`-${Math.round(
                          ((p.compareAtPrice - p.price) / p.compareAtPrice) * 100,
                        )}%`}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 p-4">
                  <div className="text-xs text-muted-foreground">{p.brand.name}</div>
                  <div className="line-clamp-2 text-sm font-semibold">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.caption}</div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-extrabold">
                      {formatMoney(p.price, p.currency)}
                    </div>
                    {p.compareAtPrice ? (
                      <div className="text-xs text-muted-foreground line-through">
                        {formatMoney(p.compareAtPrice, p.currency)}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {p.ecoTags.slice(0, 2).map((t) => (
                      <EcoBadge
                        key={t}
                        label={
                          t === "MadeInAfrica"
                            ? "Made in Africa"
                            : t === "SmallBatch"
                              ? "Small batch"
                              : t === "ArtisanMade"
                                ? "Artisan made"
                                : t === "Recycled"
                                  ? "Recycled"
                                  : t === "Organic"
                                    ? "Organic"
                                    : "Deadstock"
                        }
                      />
                    ))}
                  </div>

                  <div className="pt-2">
                    <Button className="w-full" variant="outline">
                      Quick view
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </ShopLayout>
  );
}
