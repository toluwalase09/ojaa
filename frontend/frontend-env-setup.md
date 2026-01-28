# 🌐 Frontend Environment Variables Setup

## 📁 **Files to Create**

### 1. **frontend/.env.local** (Local Development)
```env
# Lasherd Frontend - Environment Configuration
# This file is for local development only

# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5002
NEXT_PUBLIC_API_VERSION=v1

# Authentication Configuration
NEXT_PUBLIC_JWT_STORAGE_KEY=lasherd_token
NEXT_PUBLIC_REFRESH_TOKEN_KEY=lasherd_refresh_token

# Google OAuth Configuration (for frontend)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

# Application Configuration
NEXT_PUBLIC_APP_NAME=Lasherd
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_DESCRIPTION=Trading Intelligence Platform

# Market Data Configuration
NEXT_PUBLIC_DEFAULT_CURRENCY=USD
NEXT_PUBLIC_DEFAULT_TIMEZONE=America/New_York
NEXT_PUBLIC_MARKET_HOURS_START=09:30
NEXT_PUBLIC_MARKET_HOURS_END=16:00

# Feature Flags
NEXT_PUBLIC_ENABLE_GOOGLE_AUTH=true
NEXT_PUBLIC_ENABLE_REAL_TIME_DATA=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false

# Development Configuration
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_LOG_LEVEL=debug
```

### 2. **frontend/.env.example** (Template)
```env
# Lasherd Frontend - Environment Configuration
# Copy this file to .env.local and update with your actual values

# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5002
NEXT_PUBLIC_API_VERSION=v1

# Authentication Configuration
NEXT_PUBLIC_JWT_STORAGE_KEY=lasherd_token
NEXT_PUBLIC_REFRESH_TOKEN_KEY=lasherd_refresh_token

# Google OAuth Configuration (for frontend)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

# Application Configuration
NEXT_PUBLIC_APP_NAME=Lasherd
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_DESCRIPTION=Trading Intelligence Platform

# Market Data Configuration
NEXT_PUBLIC_DEFAULT_CURRENCY=USD
NEXT_PUBLIC_DEFAULT_TIMEZONE=America/New_York
NEXT_PUBLIC_MARKET_HOURS_START=09:30
NEXT_PUBLIC_MARKET_HOURS_END=16:00

# Feature Flags
NEXT_PUBLIC_ENABLE_GOOGLE_AUTH=true
NEXT_PUBLIC_ENABLE_REAL_TIME_DATA=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false

# Development Configuration
NEXT_PUBLIC_DEBUG_MODE=false
NEXT_PUBLIC_LOG_LEVEL=info

# Instructions:
# 1. Copy this file to .env.local: cp .env.example .env.local
# 2. Update all placeholder values with your actual credentials
# 3. Never commit the .env.local file to version control
# 4. The NEXT_PUBLIC_ prefix makes variables available in the browser
```

### 3. **frontend/.env.production** (Production)
```env
# Lasherd Frontend - Production Environment
# This file is for production deployment

# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain.com
NEXT_PUBLIC_API_VERSION=v1

# Authentication Configuration
NEXT_PUBLIC_JWT_STORAGE_KEY=lasherd_token
NEXT_PUBLIC_REFRESH_TOKEN_KEY=lasherd_refresh_token

# Google OAuth Configuration (for frontend)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-production-google-client-id
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=https://your-frontend-domain.com/auth/google/callback

# Application Configuration
NEXT_PUBLIC_APP_NAME=Lasherd
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_DESCRIPTION=Trading Intelligence Platform

# Market Data Configuration
NEXT_PUBLIC_DEFAULT_CURRENCY=USD
NEXT_PUBLIC_DEFAULT_TIMEZONE=America/New_York
NEXT_PUBLIC_MARKET_HOURS_START=09:30
NEXT_PUBLIC_MARKET_HOURS_END=16:00

# Feature Flags
NEXT_PUBLIC_ENABLE_GOOGLE_AUTH=true
NEXT_PUBLIC_ENABLE_REAL_TIME_DATA=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# Production Configuration
NEXT_PUBLIC_DEBUG_MODE=false
NEXT_PUBLIC_LOG_LEVEL=error
```

## 🔧 **How to Use These Variables**

### **In Your React Components:**
```typescript
// Access environment variables
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const appName = process.env.NEXT_PUBLIC_APP_NAME;

// Example API call
const response = await fetch(`${apiBaseUrl}/api/users/profile`);
```

### **In Your API Service:**
```typescript
// utils/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5002';

export const apiClient = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};
```

## 🚀 **Setup Instructions**

1. **Create the files:**
   ```bash
   cd frontend
   cp .env.example .env.local
   ```

2. **Update with your values:**
   - Replace `your-google-client-id` with your actual Google OAuth client ID
   - Update API URLs for production deployment

3. **Add to .gitignore:**
   ```gitignore
   # Environment variables
   .env.local
   .env.production
   ```

4. **Restart your development server:**
   ```bash
   npm run dev
   ```

## 🔐 **Security Notes**

- **NEXT_PUBLIC_ prefix**: Makes variables available in the browser
- **Never put secrets** in NEXT_PUBLIC_ variables
- **Use server-side** environment variables for sensitive data
- **Keep .env.local** out of version control

## 📋 **Backend CORS Configuration**

Make sure your backend `.env` includes the frontend URL:

```env
# In api/backend/.env
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,https://your-frontend-domain.com
```

This ensures your frontend can communicate with the backend! 🎉
