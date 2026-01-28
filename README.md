# Market Mosaic - Trading Intelligence Platform

<div align="center">
  <img src="public/logo.svg" alt="Market Mosaic Logo" width="300" height="90"/>
  
  <p align="center">
    <strong>Professional trading platform with real-time market data, automated bots, multi-asset support, and advanced market analysis</strong>
  </p>
  
  [![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Next.js-blue)](frontend/)
  [![Backend](https://img.shields.io/badge/Backend-Flask%20%2B%20Python-green)](api/backend/)
  [![API](https://img.shields.io/badge/API-Polygon.io-orange)](https://polygon.io/)
  [![Database](https://img.shields.io/badge/Database-PostgreSQL-purple)](https://postgresql.org/)
</div>

## 🚀 Features

- **Real-time Market Data**: Live quotes for stocks, forex, and cryptocurrencies
- **Trading Bots**: Automated trading strategies and bot management
- **Multi-Asset Support**: Stocks, Forex, Crypto, Options, and Indices
- **Advanced Analytics**: Technical analysis tools and market insights
- **Portfolio Management**: Track and manage your trading portfolio
- **Market News**: Latest financial news with sentiment analysis
- **Responsive Design**: Modern, mobile-friendly interface
- **JWT Authentication**: Secure user authentication and authorization

## 🏗️ Architecture

```
market-mosaic-online-0099/
├── frontend/                 # Next.js React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Next.js pages
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
├── api/backend/            # Flask Python backend
│   ├── blueprints/         # API route blueprints
│   ├── utils/              # Utility functions
│   └── docs/               # API documentation
└── resources/              # Project documentation
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with SSR
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Lucide React** - Beautiful icons

### Backend
- **Flask** - Python web framework
- **SQLAlchemy** - ORM for database operations
- **PostgreSQL** - Primary database
- **JWT** - Authentication and authorization
- **Polygon.io** - Real-time market data API

## 📋 Prerequisites

- Node.js 18+ and npm
- Python 3.11.3+
- PostgreSQL 12+
- Polygon.io API key (required for market data)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <YOUR_GIT_URL>
cd market-mosaic-online-0099
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`

### 3. Backend Setup

```bash
# Create and activate conda environment
conda create -n vcp python=3.11.3 -y
conda activate vcp

# Navigate to backend
cd api/backend

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp sample.env .env
# Edit .env with your actual values (especially POLYGON_API_KEY)

# Run the application
python main.py
```

Backend will be available at `http://localhost:5002`

## 🔑 Environment Variables

Create a `.env` file in `api/backend/` with the following variables:

```env
# Database
DATABASE_URL=postgresql://vcp_user:vcp_password@localhost:5432/vcp_database

# Polygon.io (REQUIRED)
POLYGON_API_KEY=your-polygon-api-key-here

# JWT Secrets
SECRET_KEY=your-super-secret-key
JWT_SECRET_KEY=your-jwt-secret-key

# Flask Configuration
PORT=5002
DEBUG=False
```

## 📊 API Endpoints

### Market Data
- `GET /api/market-data/stocks/quotes` - Stock quotes
- `GET /api/market-data/forex/quotes` - Forex quotes
- `GET /api/market-data/crypto/quotes` - Crypto quotes
- `GET /api/market-data/indices` - Market indices
- `GET /api/market-data/news` - Market news
- `GET /api/market-data/dashboard` - Dashboard data

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh token

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run build
npm run test
```

### Backend Testing
```bash
cd api/backend
conda activate vcp
python test_polygon_api.py
```

### API Testing
Import the Postman collection from `api/backend/docs/postman_collection.json`

## 📚 Documentation

- **Frontend**: Component documentation in `frontend/src/components/`
- **Backend**: API documentation in `api/backend/README.md`
- **Postman Collection**: Complete API testing collection
- **Architecture**: Blueprint-based Flask architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
1. Check the troubleshooting section in the backend README
2. Review the API documentation
3. Check the Postman collection for endpoint examples

---

<div align="center">
  <p>Built with ❤️ using modern web technologies</p>
  <p>Market Mosaic - Your Trading Intelligence Platform</p>
</div>

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a8baea9a-97ae-4008-b023-5de63357c0e2) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a8baea9a-97ae-4008-b023-5de63357c0e2) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
