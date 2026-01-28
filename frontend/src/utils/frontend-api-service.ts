// Frontend API Service for Lasherd Backend
// This file shows how to integrate with your backend API

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5002';
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1';

// API Client Class
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.loadToken();
  }

  // Load JWT token from localStorage
  private loadToken() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem(process.env.NEXT_PUBLIC_JWT_STORAGE_KEY || 'lasherd_token');
    }
  }

  // Set JWT token
  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem(process.env.NEXT_PUBLIC_JWT_STORAGE_KEY || 'lasherd_token', token);
    }
  }

  // Clear token (logout)
  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(process.env.NEXT_PUBLIC_JWT_STORAGE_KEY || 'lasherd_token');
    }
  }

  // Make HTTP request
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async register(userData: {
    email: string;
    password: string;
    password_confirmation: string;
    first_name: string;
    last_name: string;
  }) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.access_token) {
      this.setToken(response.access_token);
    }
    
    return response;
  }

  async logout() {
    try {
      await this.request('/api/auth/logout', { method: 'POST' });
    } finally {
      this.clearToken();
    }
  }

  async getProfile() {
    return this.request('/api/auth/profile');
  }

  // Google OAuth
  async googleLogin() {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
    
    if (!googleClientId) {
      throw new Error('Google Client ID not configured');
    }

    const params = new URLSearchParams({
      client_id: googleClientId,
      redirect_uri: redirectUri || `${window.location.origin}/auth/google/callback`,
      response_type: 'code',
      scope: 'openid email profile',
    });

    window.location.href = `https://accounts.google.com/oauth/authorize?${params.toString()}`;
  }

  // Market data endpoints
  async getMarketData(symbol: string) {
    return this.request(`/api/market-data/quote/${symbol}`);
  }

  async getMarketIndices() {
    return this.request('/api/market-data/indices');
  }

  async getMarketNews() {
    return this.request('/api/market-data/news');
  }

  // Health check
  async healthCheck() {
    return this.request('/');
  }

  // API documentation
  getSwaggerUrl() {
    return `${this.baseURL}/api/docs`;
  }
}

// Create singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export types
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  profile_picture?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  user: User;
  message: string;
}

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  change_percent: number;
  volume: number;
  market_cap?: number;
}

// Usage examples:
/*
// In your React components:

import { apiClient } from './utils/api';

// Login
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await apiClient.login({ email, password });
    console.log('Login successful:', response.user);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Get market data
const fetchMarketData = async (symbol: string) => {
  try {
    const data = await apiClient.getMarketData(symbol);
    console.log('Market data:', data);
  } catch (error) {
    console.error('Failed to fetch market data:', error);
  }
};

// Google OAuth
const handleGoogleLogin = () => {
  apiClient.googleLogin();
};
*/
