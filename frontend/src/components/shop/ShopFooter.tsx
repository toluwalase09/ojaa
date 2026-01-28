import Link from "next/link";

export function ShopFooter() {
  return (
    <footer className="border-t bg-black text-white">
      <div className="container grid gap-8 px-4 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img src="/logo-square.svg?v=1" alt="ojaa" className="h-8 w-8" />
            <span className="text-lg font-extrabold tracking-tight">ojaa</span>
          </div>
          <p className="text-sm text-white/70">
            Africa-first fashion marketplace — eco-centric edits, bold drops, and
            brands you’ll want to wear on repeat.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-white/90">
            Shop
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/shop/women" className="hover:text-white">
                Women
              </Link>
            </li>
            <li>
              <Link href="/shop/men" className="hover:text-white">
                Men
              </Link>
            </li>
            <li>
              <Link href="/shop/kids" className="hover:text-white">
                Kids
              </Link>
            </li>
            <li>
              <Link href="/shop/others" className="hover:text-white">
                Others
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-white/90">
            Afrocentric Edits
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Made in Africa</li>
            <li>Small Batch</li>
            <li>Artisan Crafted</li>
            <li>Eco-first</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-white/90">
            Support
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Returns & Exchanges</li>
            <li>Shipping</li>
            <li>Help Center</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/60">
        © {new Date().getFullYear()} ojaa. All rights reserved.
      </div>
    </footer>
  );
}

