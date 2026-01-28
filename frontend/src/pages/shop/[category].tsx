import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, Filter, Leaf } from "lucide-react";
import { ShopLayout } from "@/components/shop/ShopLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  PRODUCTS,
  type ShopCategory,
  getCategoryTitle,
  formatMoney,
} from "@/data/shopMock";

function EcoPill({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
      <Leaf className="mr-1 h-3 w-3" />
      {text}
    </span>
  );
}

const validCategories: ShopCategory[] = ["women", "men", "kids", "others"];

export const getServerSideProps: GetServerSideProps<{
  category: ShopCategory;
}> = async (ctx) => {
  const raw = String(ctx.params?.category ?? "");
  if (!validCategories.includes(raw as ShopCategory)) {
    return { notFound: true };
  }
  return { props: { category: raw as ShopCategory } };
};

export default function ShopCategoryPage({ category }: { category: ShopCategory }) {
  const products = useMemo(
    () => PRODUCTS.filter((p) => p.category === category),
    [category],
  );

  const title = getCategoryTitle(category);

  return (
    <ShopLayout>
      <div className="border-b bg-white">
        <div className="container px-4 py-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <Badge variant="secondary">Shop</Badge>
              <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
              <p className="max-w-2xl text-sm text-muted-foreground">
                Afrocentric fits curated for your timeline — with eco signals you can
                actually filter by.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <EcoPill text="Made in Africa" />
              <EcoPill text="Small batch" />
              <EcoPill text="Artisan made" />
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {products.length} items
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <Card
              key={p.id}
              className="group overflow-hidden rounded-2xl border bg-card shadow-card card-hover-effect hover:shadow-card-hover"
            >
              <div className="relative aspect-[4/5] w-full bg-muted">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-0"
                />
                {p.secondaryImageUrl && (
                  <img
                    src={p.secondaryImageUrl}
                    alt={p.name}
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                )}
                <div className="absolute left-3 top-3 flex flex-col gap-1">
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

                <div className="flex items-center justify-between pt-2">
                  <Link
                    href="/"
                    className="inline-flex items-center text-xs font-semibold text-primary hover:underline"
                  >
                    Try it on
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                  <Button size="sm" variant="outline">
                    Add
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ShopLayout>
  );
}

