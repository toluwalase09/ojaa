import React, { useState, useEffect } from 'react';
import { 
  useLiveDashboardData, useApiHealth
} from '@/hooks/useLiveData';
import { mockCryptos, generatePriceHistory } from '@/utils/stocksApi';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { StockCard } from '@/components/stocks/StockCard';
import { StockChart } from '@/components/stocks/StockChart';
import { MarketOverview } from '@/components/markets/MarketOverview';
import { CurrencyExchange } from '@/components/currencies/CurrencyExchange';
import { NewsCard } from '@/components/news/NewsCard';
import { StatsCard } from '@/components/ui/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, TrendingDown, TrendingUp, Wallet2, Bot, DollarSign, 
  Activity, Globe, Zap, RefreshCw, AlertCircle, CheckCircle, 
  Clock, Target, PieChart, ArrowUpRight, ArrowDownRight,
  Menu, X, ChevronDown, ChevronUp, Calendar, Bell, Star, Plus, Settings
} from 'lucide-react';

export function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('stocks');
  const [showMobileAssetList, setShowMobileAssetList] = useState(false);
  
  // Use live data hooks
  const { data: liveData, loading, error, lastUpdate, refetch } = useLiveDashboardData();
  const { isHealthy, loading: healthLoading } = useApiHealth();
  
  // Set selected asset when data loads
  useEffect(() => {
    if (liveData.stocks && liveData.stocks.length > 0 && !selectedAsset) {
      setSelectedAsset(liveData.stocks[0]);
    }
  }, [liveData.stocks, selectedAsset]);
  
  // Fallback for static generation and loading states
  const fallbackAsset = {
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
  };
  
  const displayAsset = selectedAsset || fallbackAsset;
  
  // Use live data or fallback to empty arrays
  const stocks = Array.isArray(liveData.stocks) ? liveData.stocks : [];
  const indices = Array.isArray(liveData.indices) ? liveData.indices : [];
  const currencies = Array.isArray(liveData.currencies) ? liveData.currencies : [];
  const news = Array.isArray(liveData.news) ? liveData.news : [];
  const overview = liveData.overview;
  
  // Show loading state during initial load
  if (loading && (!liveData.stocks || liveData.stocks.length === 0)) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading market data...</p>
        </div>
      </div>
    );
  }
  // Defensive: If stocks/news/indices/currencies are empty, show fallback UI
  if (!Array.isArray(stocks) || stocks.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">No stock data available.</p>
        </div>
      </div>
    );
  }
  if (!Array.isArray(news)) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">No news data available.</p>
        </div>
      </div>
    );
  }
  const cryptos = mockCryptos; // Keep crypto as mock for now
  
  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error('Failed to refresh data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // Generate chart data for the selected asset
  const displayAssetHistory = displayAsset?.price ? generatePriceHistory(30, displayAsset.price, 2) : [];
  
  // Generate chart data for asset cards
  const stocksWithHistory = stocks.map(stock => ({
      ...stock,
      priceHistory: generatePriceHistory(30, stock.price, 2)
  }));
  
  const cryptosWithHistory = cryptos.map(crypto => ({
    ...crypto,
    priceHistory: generatePriceHistory(30, crypto.price, 3)
  }));
  
  // Calculate trading metrics
  // These will come from backend API soon
  const tradingBalance = liveData.tradingBalance ?? 0;
  const dailyPL = liveData.dailyPL ?? 0;
  const activeBots = liveData.activeBots ?? 0;
  const bestPair = currencies.find(c => c.symbol === 'EUR/USD') || currencies[0];
  
  // Market overview data
  const marketCap = overview?.total_market_cap || 0;
  const marketChange = overview?.market_change || 0;
  const marketChangePercent = overview?.market_change_percent || 0;
  const activeStocks = overview?.active_stocks || 0;
  
  // Calculate market statistics - fix property names
  const gainers = stocks.filter(stock => stock.change_percent > 0);
  const losers = stocks.filter(stock => stock.change_percent < 0);
  
  const topGainer = [...stocks].sort((a, b) => b.change_percent - a.change_percent)[0];
  const topLoser = [...stocks].sort((a, b) => a.change_percent - b.change_percent)[0];
  
  const totalMarketCap = stocks.reduce((sum, stock) => sum + (stock.market_cap || 0), 0);
  const totalVolume = stocks.reduce((sum, stock) => sum + stock.volume, 0);
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };
  

  // Mobile asset list component
  const MobileAssetList = () => (
    <div className="lg:hidden fixed inset-0 z-50 bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Select Asset</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowMobileAssetList(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="forex">Forex</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stocks" className="space-y-3">
            {stocksWithHistory.slice(0, 8).map((stock) => (
              <div 
                key={stock.symbol} 
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  displayAsset?.symbol === stock.symbol ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white'
                }`}
                onClick={() => {
                  setSelectedAsset(stock);
                  setShowMobileAssetList(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{stock.symbol}</p>
                    <p className="text-xs text-gray-600">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${stock.price.toFixed(2)}</p>
                    <p className={`text-xs ${stock.change_percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change_percent >= 0 ? '+' : ''}{stock.change_percent.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="forex" className="space-y-3">
            {currencies.slice(0, 8).map((currency) => (
              <div 
                key={currency.symbol}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  displayAsset?.symbol === currency.symbol ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white'
                }`}
                onClick={() => {
                  setSelectedAsset(currency);
                  setShowMobileAssetList(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{currency.symbol}</p>
                    <p className="text-xs text-gray-600">{currency.from_currency}/{currency.to_currency}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{currency.rate.toFixed(4)}</p>
                    <p className={`text-xs ${currency.change_percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {currency.change_percent >= 0 ? '+' : ''}{currency.change_percent.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="crypto" className="space-y-3">
            {cryptosWithHistory.slice(0, 8).map((crypto) => (
              <div 
                key={crypto.symbol}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  displayAsset?.symbol === crypto.symbol ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white'
                }`}
                onClick={() => {
                  setSelectedAsset(crypto);
                  setShowMobileAssetList(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{crypto.symbol}</p>
                    <p className="text-xs text-gray-600">{crypto.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${crypto.price.toFixed(2)}</p>
                    <p className={`text-xs ${crypto.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {crypto.changePercent >= 0 ? '+' : ''}{crypto.changePercent.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
  
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 flex min-h-0">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        </div>
        
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={toggleMobileMenu}>
            <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Menu</h2>
                <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4">
                <Sidebar isCollapsed={false} onToggle={() => {}} />
              </div>
            </div>
          </div>
        )}
        
        <main className="flex-1 transition-all duration-300 overflow-y-auto">
          <div className="container max-w-full p-3 sm:p-4 lg:p-6">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="p-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              <Button 
                onClick={handleRefresh} 
                disabled={isRefreshing}
                variant="ghost"
                size="sm"
                className="p-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Trading Dashboard</h1>
                <p className="text-gray-600 mt-2 text-lg">
                  {loading ? 'Loading market data...' : 
                   error ? 'Failed to load data' :
                   `Real-time market data and analytics • Last updated: ${lastUpdate?.toLocaleTimeString() || 'Never'}`}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Market Status</p>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      healthLoading ? 'bg-yellow-500' :
                      isHealthy ? 'bg-green-500 animate-pulse' : 
                      'bg-red-500'
                    }`}></div>
                    <span className={`text-sm font-medium ${
                      healthLoading ? 'text-yellow-600' :
                      isHealthy ? 'text-green-600' : 
                      'text-red-600'
                    }`}>
                      {healthLoading ? 'Checking...' :
                       isHealthy ? 'Live' : 
                       'Offline'}
                    </span>
                  </div>
                </div>
                <Button 
                  onClick={handleRefresh} 
                  disabled={isRefreshing || loading}
                  variant="outline"
                  size="sm"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Updating...' : 'Refresh'}
                </Button>
              </div>
            </div>
            
            {/* Error State */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <p className="text-red-700 font-medium">Failed to load market data</p>
                </div>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh}
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            )}

            {/* Key Metrics Row - Responsive */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-blue-100 text-sm lg:text-base font-medium">Trading Balance</p>
                      <p className="text-2xl lg:text-3xl font-bold">
                        {loading ? '...' : `$${tradingBalance.toLocaleString()}`}
                      </p>
                      <p className="text-blue-100 text-sm hidden lg:block">
                        {loading ? 'Loading...' : '+2.3% from yesterday'}
                      </p>
                    </div>
                    <Wallet2 className="h-8 w-8 lg:h-10 lg:w-10 text-blue-200 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-green-100 text-sm lg:text-base font-medium">Active Bots</p>
                      <p className="text-2xl lg:text-3xl font-bold">{activeBots} Running</p>
                      <p className="text-green-100 text-sm hidden lg:block">All systems operational</p>
                    </div>
                    <Bot className="h-8 w-8 lg:h-10 lg:w-10 text-green-200 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-purple-100 text-sm lg:text-base font-medium">Best Pair</p>
                      <p className="text-2xl lg:text-3xl font-bold">
                        {loading ? '...' : bestPair.symbol}
                      </p>
                      <p className="text-purple-100 text-sm hidden lg:block">
                        {loading ? 'Loading...' : `${bestPair.change_percent >= 0 ? '+' : ''}${bestPair.change_percent.toFixed(2)}% today`}
                      </p>
                    </div>
                    <Target className="h-8 w-8 lg:h-10 lg:w-10 text-purple-200 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>

              <Card className={`bg-gradient-to-r ${dailyPL >= 0 ? 'from-emerald-500 to-emerald-600' : 'from-red-500 to-red-600'} text-white`}>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm lg:text-base font-medium ${dailyPL >= 0 ? 'text-emerald-100' : 'text-red-100'}`}>Daily P/L</p>
                      <p className="text-2xl lg:text-3xl font-bold">
                        {loading ? '...' : `${dailyPL >= 0 ? '+' : ''}$${dailyPL.toLocaleString()}`}
                      </p>
                      <p className={`text-sm ${dailyPL >= 0 ? 'text-emerald-100' : 'text-red-100'} hidden lg:block`}>
                        {loading ? 'Loading...' : (dailyPL >= 0 ? 'Profit today' : 'Loss today')}
                      </p>
                    </div>
                    {dailyPL >= 0 ? (
                      <ArrowUpRight className="h-8 w-8 lg:h-10 lg:w-10 text-emerald-200 flex-shrink-0" />
                    ) : (
                      <ArrowDownRight className="h-8 w-8 lg:h-10 lg:w-10 text-red-200 flex-shrink-0" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content Layout - Mobile First */}
            <div className="space-y-4 lg:space-y-6">
              {/* Mobile Asset Selector */}
              <div className="lg:hidden">
                <Button
                  onClick={() => setShowMobileAssetList(true)}
                  variant="outline"
                  className="w-full justify-between"
                >
                  <span>Selected: {displayAsset?.symbol || 'None'}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>

              {/* Chart Section - Mobile Only */}
              <div className="lg:hidden">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-lg truncate">{displayAsset?.symbol || 'No Asset Selected'}</CardTitle>
                        <CardDescription className="truncate">
                          {displayAsset?.name || 'Select an asset'} • {displayAsset?.price ? displayAsset.price.toFixed(2) : displayAsset?.rate?.toFixed(4) || '0.00'}
                          {displayAsset && (
                            <span className={`ml-2 ${displayAsset.change_percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {displayAsset.change_percent >= 0 ? '+' : ''}{displayAsset.change_percent.toFixed(2)}%
                            </span>
                          )}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="flex items-center flex-shrink-0">
                        <Clock className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      {displayAsset && (
                        <StockChart 
                          symbol={displayAsset.symbol} 
                          name={displayAsset.name} 
                          currentPrice={displayAsset.price || displayAsset.rate}
                          volatility={2.5}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-4 gap-6">
                {/* Left column - Asset list + Stats boxes */}
                <div className="lg:col-span-1 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Activity className="w-5 h-5 mr-2" />
                        Live Markets
                      </CardTitle>
                      <CardDescription>Real-time asset prices</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="stocks">Stocks</TabsTrigger>
                          <TabsTrigger value="forex">Forex</TabsTrigger>
                          <TabsTrigger value="crypto">Crypto</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="stocks" className="space-y-3 mt-4">
                          {stocksWithHistory.slice(0, 4).map((stock) => (
                            <div 
                              key={stock.symbol} 
                              className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                                displayAsset?.symbol === stock.symbol ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white'
                              }`}
                              onClick={() => setSelectedAsset(stock)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold text-sm">{stock.symbol}</p>
                                  <p className="text-xs text-gray-600">{stock.name}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold">${stock.price.toFixed(2)}</p>
                                  <p className={`text-xs ${stock.change_percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {stock.change_percent >= 0 ? '+' : ''}{stock.change_percent.toFixed(2)}%
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </TabsContent>
                        
                        <TabsContent value="forex" className="space-y-3 mt-4">
                          {currencies.slice(0, 4).map((currency) => (
                            <div 
                              key={currency.symbol}
                              className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                                displayAsset?.symbol === currency.symbol ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white'
                              }`}
                              onClick={() => setSelectedAsset(currency)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold text-sm">{currency.symbol}</p>
                                  <p className="text-xs text-gray-600">{currency.from_currency}/{currency.to_currency}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold">{currency.rate.toFixed(4)}</p>
                                  <p className={`text-xs ${currency.change_percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {currency.change_percent >= 0 ? '+' : ''}{currency.change_percent.toFixed(2)}%
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </TabsContent>
                        
                        <TabsContent value="crypto" className="space-y-3 mt-4">
                          {cryptosWithHistory.slice(0, 4).map((crypto) => (
                            <div 
                              key={crypto.symbol}
                              className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                                displayAsset?.symbol === crypto.symbol ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white'
                              }`}
                              onClick={() => setSelectedAsset(crypto)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold text-sm">{crypto.symbol}</p>
                                  <p className="text-xs text-gray-600">{crypto.name}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold">${crypto.price.toFixed(2)}</p>
                                  <p className={`text-xs ${crypto.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {crypto.changePercent >= 0 ? '+' : ''}{crypto.changePercent.toFixed(2)}%
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>

                  {/* Market Indices - Moved to Left Column */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Market Indices
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {indices.slice(0, 4).map((index) => (
                          <div key={index.symbol} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                            <div>
                              <p className="font-semibold text-sm">{index.symbol}</p>
                              <p className="text-xs text-gray-600">{index.name}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-sm">{index.value.toFixed(2)}</p>
                              <p className={`text-xs ${index.change_percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {index.change_percent >= 0 ? '+' : ''}{index.change_percent.toFixed(2)}%
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Stats - Moved to Left Column */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <PieChart className="w-5 h-5 mr-2" />
                        Quick Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Gainers</span>
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            {gainers.length}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Losers</span>
                          <Badge variant="destructive">
                            {losers.length}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Top Gainer</span>
                          <span className="text-sm font-semibold text-green-600">
                            {topGainer.symbol} +{topGainer.change_percent.toFixed(2)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Top Loser</span>
                          <span className="text-sm font-semibold text-red-600">
                            {topLoser.symbol} {topLoser.change_percent.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Trading Status - Moved to Left Column */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Trading Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Market Status</span>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-sm text-green-600">Open</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Connection</span>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-sm text-green-600">Stable</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Data Feed</span>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-sm text-green-600">Live</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Market Hours - Moved to Left Column */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        Market Hours
                      </CardTitle>
                      <CardDescription>Global trading sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { market: 'New York', status: 'Open', time: '09:30 - 16:00', color: 'green' },
                          { market: 'London', status: 'Closed', time: '08:00 - 17:00', color: 'red' },
                          { market: 'Tokyo', status: 'Closed', time: '09:00 - 15:00', color: 'red' },
                          { market: 'Sydney', status: 'Open', time: '10:00 - 17:00', color: 'green' }
                        ].map((session, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${
                                session.color === 'green' ? 'bg-green-500' : 'bg-red-500'
                              }`}></div>
                              <div>
                                <p className="font-medium text-sm">{session.market}</p>
                                <p className="text-xs text-gray-500">{session.time}</p>
                              </div>
                            </div>
                            <Badge variant={session.color === 'green' ? 'default' : 'destructive'} className="text-xs">
                              {session.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions - Moved to Left Column */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Quick Actions
                      </CardTitle>
                      <CardDescription>Common trading tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="h-10">
                          <Plus className="h-4 w-4 mr-1" />
                          New Order
                        </Button>
                        <Button variant="outline" size="sm" className="h-10">
                          <Bot className="h-4 w-4 mr-1" />
                          Create Bot
                        </Button>
                        <Button variant="outline" size="sm" className="h-10">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Analysis
                        </Button>
                        <Button variant="outline" size="sm" className="h-10">
                          <Settings className="h-4 w-4 mr-1" />
                          Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Middle column - Chart and analysis */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Chart for Desktop */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-xl">{displayAsset?.symbol || 'No Asset Selected'}</CardTitle>
                          <CardDescription>
                            {displayAsset?.name || 'Select an asset'} • {displayAsset?.price ? displayAsset.price.toFixed(2) : displayAsset?.rate?.toFixed(4) || '0.00'}
                            {displayAsset && (
                              <span className={`ml-2 ${displayAsset.change_percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {displayAsset.change_percent >= 0 ? '+' : ''}{displayAsset.change_percent.toFixed(2)}%
                              </span>
                            )}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Live
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-96">
                        {displayAsset && (
                          <StockChart 
                            symbol={displayAsset.symbol} 
                            name={displayAsset.name} 
                            currentPrice={displayAsset.price || displayAsset.rate}
                            volatility={2.5}
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Market Overview for Desktop */}
                  <MarketOverview indices={indices.map(index => ({
                    symbol: index.symbol,
                    name: index.name,
                    value: index.value,
                    change: index.change,
                    changePercent: index.change_percent,
                    region: index.region,
                    lastUpdated: new Date(index.last_updated)
                  }))} />

                  {/* Market Sentiment */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Activity className="w-5 h-5 mr-2" />
                        Market Sentiment
                      </CardTitle>
                      <CardDescription>Current market mood and trader behavior</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Fear & Greed Index</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '65%'}}></div>
                            </div>
                            <span className="text-sm font-bold text-green-600">65</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Bullish Sentiment</span>
                          <span className="text-sm font-bold text-green-600">72%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Volume Trend</span>
                          <span className="text-sm font-bold text-blue-600">+15%</span>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-800 font-medium">Market is showing strong bullish momentum</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Trading Signals */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Trading Signals
                      </CardTitle>
                      <CardDescription>AI-powered trading recommendations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { symbol: 'EUR/USD', signal: 'BUY', strength: 'Strong', confidence: 87, price: '1.0845' },
                          { symbol: 'GBP/USD', signal: 'SELL', strength: 'Medium', confidence: 72, price: '1.2650' },
                          { symbol: 'USD/JPY', signal: 'HOLD', strength: 'Weak', confidence: 45, price: '149.20' },
                          { symbol: 'BTC/USD', signal: 'BUY', strength: 'Strong', confidence: 91, price: '42,350' }
                        ].map((signal, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${
                                signal.signal === 'BUY' ? 'bg-green-500' : 
                                signal.signal === 'SELL' ? 'bg-red-500' : 'bg-yellow-500'
                              }`}></div>
                              <div>
                                <p className="font-medium text-sm">{signal.symbol}</p>
                                <p className="text-xs text-gray-500">{signal.price}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`text-sm font-bold ${
                                signal.signal === 'BUY' ? 'text-green-600' : 
                                signal.signal === 'SELL' ? 'text-red-600' : 'text-yellow-600'
                              }`}>
                                {signal.signal}
                              </p>
                              <p className="text-xs text-gray-500">{signal.confidence}% confidence</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Economic Calendar */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Today's Events
                      </CardTitle>
                      <CardDescription>Important economic releases and events</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { time: '14:30', event: 'US Non-Farm Payrolls', impact: 'High', currency: 'USD' },
                          { time: '15:00', event: 'ISM Manufacturing PMI', impact: 'Medium', currency: 'USD' },
                          { time: '16:00', event: 'ECB Interest Rate Decision', impact: 'High', currency: 'EUR' },
                          { time: '18:30', event: 'FOMC Meeting Minutes', impact: 'High', currency: 'USD' }
                        ].map((event, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="text-center">
                                <p className="text-xs font-bold text-gray-900">{event.time}</p>
                                <p className="text-xs text-gray-500">{event.currency}</p>
                              </div>
                              <div>
                                <p className="font-medium text-sm">{event.event}</p>
                                <Badge variant={event.impact === 'High' ? 'destructive' : 'secondary'} className="text-xs">
                                  {event.impact} Impact
                                </Badge>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              <Bell className="h-3 w-3 mr-1" />
                              Alert
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Right column - News and additional content */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Market News - Desktop */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Globe className="w-5 h-5 mr-2" />
                        Market News
                      </CardTitle>
                      <CardDescription>Latest market updates and analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <NewsCard news={news.slice(0, 4).map(newsItem => ({
                    id: newsItem.id,
                    title: newsItem.title,
                    summary: newsItem.summary,
                    source: newsItem.source,
                    url: newsItem.url,
                    imageUrl: newsItem.image_url,
                    publishedAt: new Date(newsItem.published_at),
                    relatedSymbols: newsItem.related_symbols
                  }))} />
                    </CardContent>
                  </Card>

                  {/* Top Movers */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Top Movers
                      </CardTitle>
                      <CardDescription>Biggest price movements today</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { symbol: 'AAPL', name: 'Apple Inc.', change: '+5.2%', price: '$195.50', volume: '45.2M' },
                          { symbol: 'TSLA', name: 'Tesla Inc.', change: '-3.8%', price: '$248.75', volume: '38.7M' },
                          { symbol: 'NVDA', name: 'NVIDIA Corp.', change: '+7.1%', price: '$485.20', volume: '52.1M' },
                          { symbol: 'MSFT', name: 'Microsoft Corp.', change: '+2.3%', price: '$378.90', volume: '28.4M' }
                        ].map((mover, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                {mover.symbol.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-sm">{mover.symbol}</p>
                                <p className="text-xs text-gray-500">{mover.name}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`text-sm font-bold ${mover.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                {mover.change}
                              </p>
                              <p className="text-xs text-gray-500">{mover.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Watchlist */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Star className="w-5 h-5 mr-2" />
                        Watchlist
                      </CardTitle>
                      <CardDescription>Your monitored assets</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { symbol: 'EUR/USD', price: '1.0845', change: '+0.12%', trend: 'up' },
                          { symbol: 'GBP/USD', price: '1.2650', change: '-0.08%', trend: 'down' },
                          { symbol: 'BTC/USD', price: '42,350', change: '+2.45%', trend: 'up' },
                          { symbol: 'ETH/USD', price: '2,650', change: '+1.87%', trend: 'up' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${item.trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              <div>
                                <p className="font-medium text-sm">{item.symbol}</p>
                                <p className="text-xs text-gray-500">{item.price}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`text-sm font-bold ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                {item.change}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                </div>
              </div>
              
              {/* Mobile Bottom Section */}
              <div className="lg:hidden space-y-4">
                {/* Market News */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Market News
                    </CardTitle>
                    <CardDescription>Latest market updates and analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {news.slice(0, 3).map((newsItem, index) => (
                        <div key={newsItem.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm line-clamp-2">{newsItem.title}</h4>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{newsItem.summary}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-500">{newsItem.source}</span>
                              <span className="text-xs text-gray-500">
                                {new Date(newsItem.published_at).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats - Mobile */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Market Indices</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {indices.slice(0, 2).map((index) => (
                          <div key={index.symbol} className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-xs">{index.symbol}</p>
                              <p className="text-xs text-gray-600">{index.value.toFixed(2)}</p>
                            </div>
                            <p className={`text-xs ${index.change_percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {index.change_percent >= 0 ? '+' : ''}{index.change_percent.toFixed(2)}%
                            </p>
                          </div>
                        ))}
              </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Gainers</span>
                          <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                            {gainers.length}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Losers</span>
                          <Badge variant="destructive" className="text-xs">
                            {losers.length}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Top Gainer</span>
                          <span className="text-xs font-semibold text-green-600">
                            {topGainer.symbol}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Asset List Modal */}
      {showMobileAssetList && <MobileAssetList />}
    </div>
  );
}