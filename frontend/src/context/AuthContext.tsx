import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '@/utils/apiService';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture?: string;
  phone?: string;
  date_of_birth?: string;
  bio?: string;
  location?: string;
  website?: string;
  timezone: string;
  currency: string;
  language: string;
  trading_experience?: string;
  risk_tolerance?: string;
  investment_goals?: string;
  email_notifications?: boolean;
  sms_notifications?: boolean;
  push_notifications?: boolean;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  loginWithGoogle: () => Promise<void>;
  handleGoogleCallback: (code: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<{ success: boolean; message: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (token: string, password: string, passwordConfirmation: string) => Promise<{ success: boolean; message: string }>;
  uploadProfilePicture: (file: File) => Promise<{ success: boolean; message: string; profile_picture?: string }>;
}

interface RegisterData {
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Return a safe fallback during SSR
      return {
        user: null,
        loading: false,
        login: async () => ({ success: false, message: 'Authentication context not available' }),
        loginWithGoogle: async () => {},
        handleGoogleCallback: async () => ({ success: false, message: 'Authentication context not available' }),
        register: async () => ({ success: false, message: 'Authentication context not available' }),
        logout: () => {},
        updateProfile: async () => ({ success: false, message: 'Authentication context not available' }),
        changePassword: async () => ({ success: false, message: 'Authentication context not available' }),
        forgotPassword: async () => ({ success: false, message: 'Authentication context not available' }),
        resetPassword: async () => ({ success: false, message: 'Authentication context not available' }),
        uploadProfilePicture: async () => ({ success: false, message: 'Authentication context not available' })
      };
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if user is logged in on mount
  useEffect(() => {
    if (!isClient) return;

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem(process.env.NEXT_PUBLIC_JWT_STORAGE_KEY || 'lasherd_token');
        if (token) {
          const response = await apiService.getProfile();
          if (response.data) {
            setUser(response.data);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid token
        localStorage.removeItem(process.env.NEXT_PUBLIC_JWT_STORAGE_KEY || 'lasherd_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [isClient]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await apiService.login({ email, password });
      console.log('Login response:', response);
      if (response.data && response.data.user) {
        setUser(response.data.user);
        return { success: true, message: 'Login successful' };
      } else {
        console.warn('Login failed, response:', response);
        return { success: false, message: 'Login failed' };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, message: error.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await apiService.loginWithGoogle();
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleGoogleCallback = async (code: string) => {
    try {
      setLoading(true);
      const response = await apiService.handleGoogleCallback(code);
      if (response.data && response.data.user) {
        setUser(response.data.user);
        return { success: true, message: 'Google login successful' };
      } else {
        return { success: false, message: 'Google login failed' };
      }
    } catch (error: any) {
      console.error('Google callback error:', error);
      return { success: false, message: error.message || 'Google login failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setLoading(true);
      const response = await apiService.register(userData);
      
      if (response.data && response.data.user) {
        setUser(response.data.user);
        return { success: true, message: 'Registration successful' };
      } else {
        return { success: false, message: 'Registration failed' };
      }
    } catch (error: any) {
      return { success: false, message: error.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem(process.env.NEXT_PUBLIC_JWT_STORAGE_KEY || 'lasherd_token');
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      setLoading(true);
      const response = await apiService.updateProfile(profileData);
      
      if (response.data) {
        setUser(response.data);
        return { success: true, message: 'Profile updated successfully' };
      } else {
        return { success: false, message: 'Profile update failed' };
      }
    } catch (error: any) {
      return { success: false, message: error.message || 'Profile update failed' };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      setLoading(true);
      await apiService.changePassword({ current_password: currentPassword, new_password: newPassword });
      return { success: true, message: 'Password changed successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Password change failed' };
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      await apiService.forgotPassword(email);
      return { success: true, message: 'Password reset email sent' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to send reset email' };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string, passwordConfirmation: string) => {
    try {
      setLoading(true);
      await apiService.resetPassword(token, password, passwordConfirmation);
      return { success: true, message: 'Password reset successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Password reset failed' };
    } finally {
      setLoading(false);
    }
  };

  const uploadProfilePicture = async (file: File) => {
    try {
      setLoading(true);
      const response = await apiService.uploadProfilePicture(file);
      
      if (response.data && response.data.profile_picture) {
        setUser(prev => prev ? { ...prev, profile_picture: response.data.profile_picture } : null);
        return { 
          success: true, 
          message: 'Profile picture uploaded successfully',
          profile_picture: response.data.profile_picture
        };
      } else {
        return { success: false, message: 'Profile picture upload failed' };
      }
    } catch (error: any) {
      return { success: false, message: error.message || 'Profile picture upload failed' };
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    loginWithGoogle,
    handleGoogleCallback,
    register,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    uploadProfilePicture
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
