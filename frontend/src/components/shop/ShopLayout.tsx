import type { ReactNode } from "react";

interface ShopLayoutProps {
  children: ReactNode;
}

export function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>{children}</main>
    </div>
  );
}

