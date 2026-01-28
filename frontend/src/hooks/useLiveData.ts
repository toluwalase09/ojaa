// Custom hooks for fetching live data from the backend API
import { useState, useEffect, useCallback } from 'react';
import { apiService, StockQuote, MarketIndex, NewsItem, MarketOverview, CurrencyPair } from '@/utils/apiService';

// Hook for live stock data
export function useLiveStocks(symbols: string[], updateInterval = 10000) {
  const [stocks, setStocks] = useState<StockQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchStocks = useCallback(async () => {
    try {
      setError(null);
      const response = await apiService.getMultipleStockQuotes(symbols);
      setStocks(response.data || []);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stock data');
      console.error('Error fetching stocks:', err);
    } finally {
      setLoading(false);
    }
  }, [symbols]);

  useEffect(() => {
    fetchStocks();
    
    const interval = setInterval(fetchStocks, updateInterval);
    return () => clearInterval(interval);
  }, [fetchStocks, updateInterval]);

  return { stocks, loading, error, lastUpdate, refetch: fetchStocks };
}

// Hook for live market indices
export function useLiveIndices(updateInterval = 15000) {
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchIndices = useCallback(async () => {
    try {
      setError(null);
      const response = await apiService.getMarketIndices();
      setIndices(response.data || []);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market indices');
      console.error('Error fetching indices:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIndices();
    
    const interval = setInterval(fetchIndices, updateInterval);
    return () => clearInterval(interval);
  }, [fetchIndices, updateInterval]);

  return { indices, loading, error, lastUpdate, refetch: fetchIndices };
}

// Hook for live news data
export function useLiveNews(limit = 10, updateInterval = 30000) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      setError(null);
      const response = await apiService.getMarketNews(limit);
      setNews(response.data || []);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchNews();
    
    const interval = setInterval(fetchNews, updateInterval);
    return () => clearInterval(interval);
  }, [fetchNews, updateInterval]);

  return { news, loading, error, lastUpdate, refetch: fetchNews };
}

// Hook for live market overview
export function useLiveMarketOverview(updateInterval = 20000) {
  const [overview, setOverview] = useState<MarketOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchOverview = useCallback(async () => {
    try {
      setError(null);
      const response = await apiService.getMarketOverview();
      setOverview(response.data || null);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market overview');
      console.error('Error fetching overview:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOverview();
    
    const interval = setInterval(fetchOverview, updateInterval);
    return () => clearInterval(interval);
  }, [fetchOverview, updateInterval]);

  return { overview, loading, error, lastUpdate, refetch: fetchOverview };
}

// Hook for live currency data
export function useLiveCurrencies(updateInterval = 25000) {
  const [currencies, setCurrencies] = useState<CurrencyPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchCurrencies = useCallback(async () => {
    try {
      setError(null);
      const response = await apiService.getCurrencyRates();
      setCurrencies(response.data || []);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch currency data');
      console.error('Error fetching currencies:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrencies();
    
    const interval = setInterval(fetchCurrencies, updateInterval);
    return () => clearInterval(interval);
  }, [fetchCurrencies, updateInterval]);

  return { currencies, loading, error, lastUpdate, refetch: fetchCurrencies };
}

// Hook for complete dashboard data
export function useLiveDashboardData() {
  const [data, setData] = useState<{
    stocks: StockQuote[];
    indices: MarketIndex[];
    news: NewsItem[];
    overview: MarketOverview | null;
    currencies: CurrencyPair[];
    tradingBalance: number;
    activeBots: number;
    dailyPL: number;
  }>({
    stocks: [],
    indices: [],
    news: [],
    overview: null,
    currencies: [],
    tradingBalance: 0,
    activeBots: 0,
    dailyPL: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setError(null);
      // Fetch dashboard data and metrics in parallel
      const [dashboardData, metricsResponse] = await Promise.all([
        apiService.getDashboardData(),
        apiService.getDashboardMetrics()
      ]);
      setData({
        ...dashboardData,
        tradingBalance: metricsResponse?.data?.trading_balance ?? 0,
        activeBots: metricsResponse?.data?.active_bots ?? 0,
        dailyPL: metricsResponse?.data?.daily_pl ?? 0
      });
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
      console.error('Error fetching dashboard data:', err);
      // Set fallback data when API fails
      setData({
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
        overview: null,
        currencies: [],
        tradingBalance: 0,
        activeBots: 0,
        dailyPL: 0
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
    
  // Update every 2 minutes to further reduce rate limiting
  const interval = setInterval(fetchDashboardData, 120000);
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  return { 
    data, 
    loading, 
    error, 
    lastUpdate, 
    refetch: fetchDashboardData 
  };
}

// Utility hook for checking API health
export function useApiHealth() {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = useCallback(async () => {
    try {
      setError(null);
      await apiService.healthCheck();
      setIsHealthy(true);
    } catch (err) {
      setIsHealthy(false);
      setError(err instanceof Error ? err.message : 'API health check failed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
    
    // Check health every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, [checkHealth]);

  return { isHealthy, loading, error, checkHealth };
}
