import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { Home, ArrowLeft } from 'lucide-react';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-500 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={() => router.push('/')}
            className="w-full"
            size="lg"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => router.back()}
            className="w-full"
            size="lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
