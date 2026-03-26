# Mobi_Comp

A production-ready Next.js app to compare current prices of mobiles and laptops across top Indian e-commerce platforms: Amazon India, Flipkart, Croma, Vijay Sales, and Reliance Digital.

## Features

- Mobile/Laptop toggle
- Autocomplete search
- Filters by brand, RAM, storage, and processor
- Price comparison table with lowest-price highlight
- Parallel data fetching with caching
- Offers (bank, EMI, exchange) extraction-ready

## Tech Stack

- Next.js App Router (TypeScript)
- Tailwind CSS
- API routes for `/api/search-products` and `/api/compare-prices`

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## API

### `GET /api/search-products`
Query parameters:
- `category`: `mobile` or `laptop`
- `query`
- `brand`, `ram`, `storage`, `storageType`, `processor`

### `GET /api/compare-prices`
Query parameters:
- `category`: `mobile` or `laptop`
- `product`: product id

## Notes on Real-Time Pricing

This build uses mock data to demonstrate the full UX and architecture. The provider adapters in `src/lib/providers.ts` are structured so you can plug in compliant scraping or affiliate feeds for real-time prices without changing the UI.

## Deployment (Vercel)

1. Push to GitHub
2. Import the repo into Vercel
3. Deploy

Vercel will detect Next.js automatically.
