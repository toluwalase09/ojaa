import type { AppProps } from 'next/app';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import { ShopNavbar } from "@/components/shop/ShopNavbar";
import { CartProvider } from "@/context/CartContext";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  // Import AuthProvider here to wrap the app
  // ...existing code...
  const { AuthProvider } = require('@/context/AuthContext');
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <ShopNavbar />
            <Component {...pageProps} />
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}


