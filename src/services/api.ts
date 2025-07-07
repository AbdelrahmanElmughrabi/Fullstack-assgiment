// File: src/services/api.ts

import { Product } from '../data/types';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Query params for filtering products
export interface ProductsQueryParams {
  minPrice?: number;
  maxPrice?: number;
  minPopularity?: number;
  maxPopularity?: number;
  limit?: number;
  offset?: number;
}

// 🔑 Use Vite’s env var here instead of localhost
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const api = {
  // GET /products
  getProducts: async (
    params?: ProductsQueryParams
  ): Promise<ApiResponse<Product[]>> => {
    const url = new URL(`${API_BASE}/products`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) url.searchParams.append(key, String(value));
      });
    }
    const res = await fetch(url.toString());
    const data = await res.json();
    return {
      data,
      status: res.status,
      message: 'Products retrieved successfully',
    };
  },

  // GET /products/:id
  getProductById: async (id: number): Promise<ApiResponse<Product | null>> => {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (res.status === 404) {
      return { data: null, status: 404, message: 'Product not found' };
    }
    const data: Product = await res.json();
    return { data, status: 200, message: 'Product retrieved successfully' };
  },
};
