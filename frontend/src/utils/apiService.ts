// API Service for connecting frontend to Lasherd backend
// This service handles all API calls to fetch live data from Polygon.io

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5002';

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: 'success' | 'error';
}

export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  change_percent: number;
  volume: number;
  market_cap?: number;
  high?: number;
  low?: number;
  open?: number;
  previous_close?: number;
  high_52_week?: number;
  low_52_week?: number;
  pe_ratio?: number;
  dividend_yield?: number;
  last_updated: string;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  change_percent: number;
  region: string;
  last_updated: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  image_url?: string;
  published_at: string;
  related_symbols?: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface CurrencyPair {
  symbol: string;
  from_currency: string;
  to_currency: string;
  rate: number;
  change: number;
  change_percent: number;
  last_updated: string;
}

export interface MarketOverview {
  total_market_cap: number;
  market_change: number;
  market_change_percent: number;
  active_stocks: number;
  advancing_stocks: number;
  declining_stocks: number;
  unchanged_stocks: number;
  last_updated: string;
}

class ApiService {
  // Get dashboard metrics for current user
  async getDashboardMetrics(): Promise<ApiResponse<{ trading_balance: number; active_bots: number; daily_pl: number; status: string }>> {
    return this.request<{ trading_balance: number; active_bots: number; daily_pl: number; status: string }>('/api/market-data/dashboard/metrics', { skipAuth: true });
  }
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.loadToken();
  }

  private loadToken() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem(process.env.NEXT_PUBLIC_JWT_STORAGE_KEY || 'lasherd_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem(process.env.NEXT_PUBLIC_JWT_STORAGE_KEY || 'lasherd_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(process.env.NEXT_PUBLIC_JWT_STORAGE_KEY || 'lasherd_token');
    }
  }

  private async request<T>(endpoint: string, options: RequestInit & { skipAuth?: boolean } = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const { skipAuth, ...requestOptions } = options;
    
    const config: RequestInit = {
      ...requestOptions,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && !skipAuth && { Authorization: `Bearer ${this.token}` }),
        ...requestOptions.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<any>> {
    return this.request('/');
  }

  // Market Data Endpoints - Live Data Only (No Authentication Required)
  async getStockQuote(symbol: string): Promise<ApiResponse<StockQuote>> {
    return this.request(`/api/market-data/quote/${symbol}`, { skipAuth: true });
  }

  async getMarketIndices(): Promise<ApiResponse<MarketIndex[]>> {
    return this.request('/api/market-data/indices', { skipAuth: true });
  }

  async getMarketNews(limit: number = 10): Promise<ApiResponse<NewsItem[]>> {
    return this.request(`/api/market-data/news?limit=${limit}`, { skipAuth: true });
  }

  async getMarketOverview(): Promise<ApiResponse<MarketOverview>> {
    return this.request('/api/market-data/overview', { skipAuth: true });
  }

  async getCurrencyRates(): Promise<ApiResponse<CurrencyPair[]>> {
    return this.request('/api/market-data/currencies', { skipAuth: true });
  }

  // Get multiple stock quotes at once
  async getMultipleStockQuotes(symbols: string[]): Promise<ApiResponse<StockQuote[]>> {
    const symbolString = symbols.join(',');
    return this.request(`/api/market-data/quotes?symbols=${symbolString}`, { skipAuth: true });
  }

  // Get market data for dashboard
  async getDashboardData(): Promise<{
    stocks: StockQuote[];
    indices: MarketIndex[];
    news: NewsItem[];
    overview: MarketOverview;
    currencies: CurrencyPair[];
  }> {
    try {
      const [stocksResponse, indicesResponse, newsResponse, overviewResponse, currenciesResponse] = await Promise.all([
        this.getMultipleStockQuotes(['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'TSLA', 'META', 'V']),
        this.getMarketIndices(),
        this.getMarketNews(5),
        this.getMarketOverview(),
        this.getCurrencyRates()
      ]);

      return {
        stocks: stocksResponse.data || [],
        indices: indicesResponse.data || [],
        news: newsResponse.data || [],
        overview: overviewResponse.data || {} as MarketOverview,
        currencies: currenciesResponse.data || []
      };
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      
      // Return fallback data when API fails
      return {
        stocks: [
          {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            price: 150.00,
            change: 0,
            change_percent: 0,
            volume: 0,
            market_cap: 0,
            high: 155,
            low: 145,
            open: 152,
            previous_close: 150,
            last_updated: new Date().toISOString()
          }
        ],
        indices: [],
        news: [],
        overview: {
          total_market_cap: 45000000000000,
          market_change: 0,
          market_change_percent: 0,
          active_stocks: 0,
          advancing_stocks: 0,
          declining_stocks: 0,
          unchanged_stocks: 0,
          last_updated: new Date().toISOString()
        },
        currencies: []
      };
    }
  }

  // Authentication endpoints
  async login(credentials: { email: string; password: string }): Promise<ApiResponse<any>> {
    const response = await this.request<any>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.data?.access_token) {
      this.setToken(response.data.access_token);
    }
    
    return response;
  }

  async register(userData: {
    email: string;
    password: string;
    password_confirmation: string;
    first_name: string;
    last_name: string;
  }): Promise<ApiResponse<any>> {
    return this.request<any>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getProfile(): Promise<ApiResponse<any>> {
    return this.request<any>('/api/auth/profile');
  }

  async logout(): Promise<void> {
    try {
      await this.request<any>('/api/auth/logout', { method: 'POST' });
    } finally {
      this.clearToken();
    }
  }

  async updateProfile(profileData: any): Promise<ApiResponse<any>> {
    return this.request<any>('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(passwordData: { current_password: string; new_password: string }): Promise<ApiResponse<any>> {
    return this.request<any>('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  }

  // Google OAuth - initiates redirect to Google
  async loginWithGoogle(): Promise<void> {
    window.location.href = `${this.baseURL}/api/auth/google`;
  }

  // Handle Google OAuth callback
  async handleGoogleCallback(code: string): Promise<ApiResponse<any>> {
    const response = await this.request<any>('/api/auth/google/callback', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });

    if (response.data?.access_token) {
      this.setToken(response.data.access_token);
    }

    return response;
  }

  // Forgot Password - send reset email
  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Reset Password - set new password with token
  async resetPassword(token: string, password: string, passwordConfirmation: string): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({
        token,
        password,
        password_confirmation: passwordConfirmation
      }),
    });
  }

  async uploadProfilePicture(file: File): Promise<ApiResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.baseURL}/api/auth/profile/picture`;
    
    const config: RequestInit = {
      method: 'POST',
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Profile picture upload failed:', error);
      throw error;
    }
  }

  // Get Swagger documentation URL
  getSwaggerUrl(): string {
    return `${this.baseURL}/api/docs`;
  }

}

// Create singleton instance
export const apiService = new ApiService(API_BASE_URL);

// Types are already exported above as interfaces
