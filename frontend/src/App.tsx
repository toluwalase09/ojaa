
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthWrapper } from "@/components/AuthWrapper";
import { useRouter } from "next/router";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: any) => {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthWrapper>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Component {...pageProps} />
        </TooltipProvider>
      </AuthWrapper>
    </QueryClientProvider>
  );
};

export default App;
