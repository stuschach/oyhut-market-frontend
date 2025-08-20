# Oyhut Market Frontend Deployment Guide

## Running Locally (Static Mode)

The app is configured to run without a backend. When you see proxy errors like:
```
[vite] http proxy error: /api/...
Error: connect ECONNREFUSED ::1:5001
```

**This is normal and expected!** The app automatically detects no backend and uses static data.

### Start Development Server
```bash
cd frontend
npm install
npm run dev
```

The app will:
1. Check for backend availability (fails gracefully)
2. Load static product data from `/public/data/`
3. Hide login/account features
4. Show "Call to Order" instead of online checkout
5. Hide bakery cart icon

## Deploy to Vercel

### Option 1: CLI Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts, accept defaults
```

### Option 2: GitHub Integration
1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Click Deploy (auto-detects Vite)

## Features in Static Mode

### ✅ Working Features
- Browse all products
- View product details
- Browse bakery items
- Add items to cart (localStorage)
- Search and filter products
- View store information
- Call-to-order buttons

### ⏸️ Disabled Features (No Backend)
- User login/registration (hidden)
- Online checkout (shows "Call to Order")
- Bakery cart ordering (hidden)
- Order tracking
- Payment processing

## Adding Backend Later

When you're ready to add the backend:

1. Deploy your backend (MongoDB + Express)
2. Set environment variable in Vercel:
   ```
   VITE_API_URL=https://your-backend-api.com
   ```
3. Redeploy - all features automatically re-enable!

## Static Data Files

Product catalogs are in `/public/data/`:
- `products.json` - Main store products
- `bakery-products.json` - Bakery items
- `categories.json` - Product categories

## Troubleshooting

### "Backend not available" in console
This is expected! The app is designed to work without a backend.

### Products not showing
Check that the JSON files exist in `/public/data/`

### Build warnings about chunk size
Normal for a full e-commerce app. Consider code-splitting in production.

## Contact Info for Static Mode

The app displays these contact details when backend is unavailable:
- Phone: (360) 555-1234
- Email: orders@oyhutmarket.com
- Address: 123 Coastal Highway, Ocean Park, WA

Update these in:
- `CheckoutPage.jsx`
- `StaticBakeryNotice.jsx`
- `apiWrapper.js`