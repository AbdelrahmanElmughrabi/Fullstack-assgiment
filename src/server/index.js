import express from 'express';
import cors from 'cors';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Serve static files from the frontend build
const distPath = path.join(__dirname, '../../dist');
app.use(express.static(distPath));

// Fetch gold price (USD/gram) from GoldAPI
async function fetchGoldPrice() {
  const apiKey = process.env.GOLD_API_KEY;
  const url = 'https://www.goldapi.io/api/XAU/USD';
  try {
    const response = await axios.get(url, {
      headers: {
        'x-access-token': apiKey,
        'Content-Type': 'application/json',
      },
    });
    const pricePerOunce = response.data.price;
    const pricePerGram = pricePerOunce / 31.1035;
    console.log(`[GoldAPI] Real-time gold price per gram: $${pricePerGram.toFixed(2)}`);
    return pricePerGram;
  } catch (error) {
    console.error('[GoldAPI] Error fetching gold price, using fallback:', error.message);
    return 75; // fallback value
  }
}

// Calculate product price
function calculatePrice(popularityScore, weight, goldPrice) {
  return (popularityScore + 1) * weight * goldPrice;
}

// Get a single product by id
app.get('/products/:id', async (req, res) => {
  try {
    const productsPath = path.join(__dirname, '..', 'data', 'products.json');
    let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    const goldPrice = await fetchGoldPrice();

    products = products.map((product, idx) => ({
      ...product,
      id: idx + 1,
      price: Number(calculatePrice(product.popularityScore, product.weight, goldPrice).toFixed(2)),
      goldPrice: Number(goldPrice.toFixed(2)),
    }));

    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Products endpoint with optional filtering
app.get('/products', async (req, res) => {
  try {
    const productsPath = path.join(__dirname, '..', 'data', 'products.json');
    let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    const goldPrice = await fetchGoldPrice();

    products = products.map((product, idx) => ({
      ...product,
      id: idx + 1,
      price: Number(calculatePrice(product.popularityScore, product.weight, goldPrice).toFixed(2)),
      goldPrice: Number(goldPrice.toFixed(2)),
    }));

    const { minPrice, maxPrice, minPopularity, maxPopularity } = req.query;
    if (minPrice) products = products.filter(p => p.price >= Number(minPrice));
    if (maxPrice) products = products.filter(p => p.price <= Number(maxPrice));
    if (minPopularity) products = products.filter(p => p.popularityScore >= Number(minPopularity));
    if (maxPopularity) products = products.filter(p => p.popularityScore <= Number(maxPopularity));

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Catch-all: serve index.html for any non-API route (for React Router)
app.get('*', (req, res) => {
  // If the request starts with /products, skip to next (API route)
  if (req.path.startsWith('/products')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});