import Link from "next/link";
import { Search, ShoppingBag, Sparkles, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ShopNavbarProps {
  className?: string;
}

export function ShopNavbar({ className }: ShopNavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70",
        className,
      )}
    >
      {/* Top announcement bar */}
      <div className="border-b bg-black text-white">
        <div className="container flex items-center justify-center gap-2 py-2 text-xs tracking-wide">
          <Sparkles className="h-4 w-4" />
          <span className="text-center">
            Afrocentric drops. Eco-first edits. Try-on coming through.
          </span>
        </div>
      </div>

      <div className="container flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90">
            <img src="/logo-square.svg?v=1" alt="ojaa" className="h-8 w-8" />
            <span className="text-lg font-extrabold tracking-tight">ojaa</span>
          </Link>

          <nav className="hidden items-center gap-4 text-sm font-medium md:flex">
            <Link href="/shop/women" className="hover:text-primary">
              Women
            </Link>
            <Link href="/shop/men" className="hover:text-primary">
              Men
            </Link>
            <Link href="/shop/kids" className="hover:text-primary">
              Kids
            </Link>
            <Link href="/shop/others" className="hover:text-primary">
              Others
            </Link>
          </nav>
        </div>

        <div className="hidden flex-1 md:flex">
          <div className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search ankara, adire, linen, streetwear, brands..."
              className="h-10 pl-9"
              aria-label="Search products"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Desktop Sign in button */}
          <Link href="/signin">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:inline-flex"
            >
              Sign in
            </Button>
          </Link>
          {/* Mobile Sign in button (icon only) */}
          <Link href="/signin" className="md:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button size="sm" className="gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
          </Button>
        </div>
      </div>

      {/* Mobile category strip */}
      <div className="border-t md:hidden">
        <div className="container flex gap-2 overflow-x-auto px-4 py-2 text-sm font-medium">
          <Link
            href="/shop/women"
            className="shrink-0 rounded-full bg-muted px-3 py-1 hover:bg-muted/80"
          >
            Women
          </Link>
          <Link
            href="/shop/men"
            className="shrink-0 rounded-full bg-muted px-3 py-1 hover:bg-muted/80"
          >
            Men
          </Link>
          <Link
            href="/shop/kids"
            className="shrink-0 rounded-full bg-muted px-3 py-1 hover:bg-muted/80"
          >
            Kids
          </Link>
          <Link
            href="/shop/others"
            className="shrink-0 rounded-full bg-muted px-3 py-1 hover:bg-muted/80"
          >
            Others
          </Link>
        </div>
      </div>
    </header>
  );
}

