import type { ReactNode } from "react";
import { ShopNavbar } from "./ShopNavbar";

interface ShopLayoutProps {
  children: ReactNode;
}

export function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ShopNavbar />
      <main>{children}</main>
    </div>
  );
}

