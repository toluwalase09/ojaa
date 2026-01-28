import React, { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';

interface AuthWrapperProps {
  children: ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  // Always render AuthProvider - it handles client-side detection internally
  return <AuthProvider>{children}</AuthProvider>;
};
