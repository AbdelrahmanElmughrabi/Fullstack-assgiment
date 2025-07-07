import { useQuery } from '@tanstack/react-query';
import { api, ProductsQueryParams } from '../services/api';
import { Product } from '../data/types';

// useProducts.ts
// Custom React hooks for fetching product data from the backend API using React Query.
// Exports: useProducts (for product list), useProduct (for single product by ID)

// Fetch a list of products, optionally filtered by query params
export const useProducts = (params?: ProductsQueryParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const response = await api.getProducts(params);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Fetch a single product by its ID
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await api.getProductById(id);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
