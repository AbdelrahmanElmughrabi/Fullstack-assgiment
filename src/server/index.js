import express from 'express';
import cors from 'cors';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.GOLD_API_KEY;

if (!API_KEY) {
  console.error('Missing GOLD_API_KEY environment variable');
  process.exit(1);
}

app.use(cors());

// Serve React’s build
const distPath = path.resolve(__dirname, '../../dist');
app.use(express.static(distPath));

async function fetchGoldPrice() {
  try {
    const res = await axios.get('https://www.goldapi.io/api/XAU/USD', {
      headers: { 'x-access-token': API_KEY }
    });
    return res.data.price / 31.1035;
  } catch (e) {
    console.error('[GoldAPI] Error fetching gold price:', e.message);
    return 75;
  }
}

function calculatePrice(popularityScore, weight, goldPrice) {
  return (popularityScore + 1) * weight * goldPrice;
}

app.get('/products/:id', async (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8'));
    const goldPrice = await fetchGoldPrice();
    const enriched = products.map((p, i) => ({
      ...p, id: i + 1,
      price: Number(calculatePrice(p.popularityScore, p.weight, goldPrice).toFixed(2)),
      goldPrice: Number(goldPrice.toFixed(2))
    }));
    const product = enriched.find(p => p.id === +req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8'));
    const goldPrice = await fetchGoldPrice();
    let enriched = products.map((p, i) => ({
      ...p, id: i + 1,
      price: Number(calculatePrice(p.popularityScore, p.weight, goldPrice).toFixed(2)),
      goldPrice: Number(goldPrice.toFixed(2))
    }));

    const { minPrice, maxPrice, minPopularity, maxPopularity } = req.query;
    if (minPrice) enriched = enriched.filter(p => p.price >= +minPrice);
    if (maxPrice) enriched = enriched.filter(p => p.price <= +maxPrice);
    if (minPopularity) enriched = enriched.filter(p => p.popularityScore >= +minPopularity);
    if (maxPopularity) enriched = enriched.filter(p => p.popularityScore <= +maxPopularity);

    res.json(enriched);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// **New RegExp catch‑all for SPA (bypasses path-to-regexp)**
app.get(/^(?!\/products).*/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
