# Exquisite Engagement Rings – Fullstack Assignment

A fullstack web application for browsing, filtering, and viewing details of exquisite engagement rings. The app features a modern React frontend with a Node.js/Express backend, real-time gold price integration, and a beautiful, responsive UI.

Note: This project was a fullstack dev assgiment

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Main Components](#main-components)
- [Backend API](#backend-api)
- [Data Model](#data-model)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Tech Stack](#tech-stack)
- [Credits](#credits)

---

## Features

- **Product Grid**: Browse a curated collection of engagement rings.
- **Filtering**: Filter rings by price and popularity.
- **Product Detail**: View detailed information, select gold color, and see dynamic pricing.
- **Real-Time Pricing**: Prices are calculated using real-time gold prices from GoldAPI.
- **Responsive UI**: Modern, mobile-friendly design using Tailwind CSS and shadcn/ui components.
- **Reusable Components**: Modular UI elements for rapid development.

---

## Project Structure

```
Fullstack assgiment/
  ├── Fullstack assgiment/
  │   ├── src/
  │   │   ├── components/        # React UI components
  │   │   ├── data/              # Product data (JSON, types)
  │   │   ├── hooks/             # Custom React hooks (data fetching)
  │   │   ├── lib/               # Utility functions
  │   │   ├── pages/             # Page-level React components
  │   │   ├── server/            # Express backend API
  │   │   ├── services/          # API service layer
  │   │   ├── utils/             # Price calculation, helpers
  │   │   ├── Fonts/             # Custom fonts
  │   │   ├── App.tsx            # Main React app
  │   │   ├── main.tsx           # React entry point
  │   │   └── index.css          # Tailwind & global styles
  │   ├── public/                # Static assets
  │   ├── package.json           # Project dependencies & scripts
  │   └── ...                    # Config files, README, etc.
  └── ...
```

---

## Main Components

### ProductGrid
- Displays the main product listing.
- Includes a filter UI for price and popularity.
- Uses a carousel for browsing products.
- Fetches products from the backend with applied filters.

### ProductCard
- Shows a single product's image, name, price, color picker, and star rating.
- Clicking navigates to the product detail page.

### ProductDetail
- Detailed view for a single product.
- Allows color selection, shows dynamic price, and product attributes.

### ColorPicker
- Lets users select between yellow, rose, or white gold.
- Used in both product cards and detail view.

### StarRating
- Displays a 0–5 star rating based on product popularity.

### UI Components (in `components/ui/`)
- **Carousel**: Embla-powered carousel for product browsing.
- **Button**: Styled button component.
- **Accordion, Toast, Input, ToggleGroup, Tooltip, InputOTP**: Reusable, accessible UI primitives from shadcn/ui and Radix UI.

---

## Backend API

- **Express server** (`src/server/index.js`)
- **Endpoints:**
  - `GET /products`: List all products, supports filtering by price and popularity.
  - `GET /products/:id`: Get details for a single product.
- **Real-Time Gold Price**: Fetches current gold price from [GoldAPI](https://www.goldapi.io/) (requires API key).
- **Product Data**: Loaded from `src/data/products.json`.

---

## Data Model

Example product (from `src/data/products.json`):

```json
{
  "name": "Engagement Ring 1",
  "popularityScore": 0.85,
  "weight": 2.1,
  "images": {
    "yellow": "url-to-yellow-gold-image",
    "rose": "url-to-rose-gold-image",
    "white": "url-to-white-gold-image"
  }
}
```

- **Price Calculation**:  
  \[
  \text{Price} = (\text{Popularity Score} + 1) \times \text{Weight} \times \text{Current Gold Price}
  \]

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone <repo-url>
cd "Fullstack assgiment/Fullstack assgiment"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root with your [GoldAPI](https://www.goldapi.io/) key:

```
GOLD_API_KEY=your_goldapi_key_here
```

### 4. Start the backend server

```bash
node src/server/index.js
```
- The backend runs on [http://localhost:3001](http://localhost:3001) by default.

### 5. Start the frontend (in a new terminal)

```bash
npm run dev
```
- The frontend runs on [http://localhost:8080](http://localhost:8080) by default.

---

## Scripts

- `npm run dev` – Start the frontend in development mode.
- `npm run build` – Build the frontend for production.
- `npm run preview` – Preview the production build.
- `npm run lint` – Lint the codebase.

---

## Tech Stack

- **Frontend**: React, TypeScript, React Router, React Query, Tailwind CSS, shadcn/ui, Radix UI, Embla Carousel
- **Backend**: Node.js, Express, Axios, dotenv
- **Other**: GoldAPI (for real-time gold prices)

---

## Credits

- UI components based on [shadcn/ui](https://ui.shadcn.com/) and [Radix UI](https://www.radix-ui.com/).
- Carousel powered by [Embla Carousel](https://www.embla-carousel.com/).
- Gold price data from [GoldAPI](https://www.goldapi.io/).

---