import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

// ProductGrid.tsx
// Displays the main product listing with a filter UI and carousel for browsing products.
// Fetches products from the backend using filters and renders them as cards in a carousel.

const ProductGrid = () => {
  // Local state for filter inputs (user input before search)
  const [inputMinPrice, setInputMinPrice] = useState<string>('');
  const [inputMaxPrice, setInputMaxPrice] = useState<string>('');
  const [inputMinPopularity, setInputMinPopularity] = useState<string>('');
  const [inputMaxPopularity, setInputMaxPopularity] = useState<string>('');

  // State for actual filter params (used for fetching)
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [minPopularity, setMinPopularity] = useState<number | undefined>();
  const [maxPopularity, setMaxPopularity] = useState<number | undefined>();

  const { data: products, isLoading, isError } = useProducts({ minPrice, maxPrice, minPopularity, maxPopularity });

  // Handler for search button
  const handleSearch = () => {
    setMinPrice(inputMinPrice ? Number(inputMinPrice) : undefined);
    setMaxPrice(inputMaxPrice ? Number(inputMaxPrice) : undefined);
    setMinPopularity(inputMinPopularity ? Number(inputMinPopularity) : undefined);
    setMaxPopularity(inputMaxPopularity ? Number(inputMaxPopularity) : undefined);
  };

  if (isLoading) {
    // Show loading state while fetching products
    return <div className="text-center py-20">Loading products...</div>;
  }
  if (isError || !products) {
    // Show error state if fetch fails
    return <div className="text-center py-20 text-red-500">Failed to load products.</div>;
  }

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-wide">
            Our Collection
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Discover our curated selection of engagement rings, where traditional craftsmanship 
            meets contemporary design. Each piece is meticulously crafted to capture the essence of your commitment.
          </p>
        </div>

        {/* Minimal Filter UI */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center items-end">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Min Price ($)</label>
            <input
              type="number"
              min={0}
              value={inputMinPrice}
              onChange={e => setInputMinPrice(e.target.value)}
              className="border rounded px-2 py-1 w-24 text-sm"
              placeholder="Any"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Max Price ($)</label>
            <input
              type="number"
              min={0}
              value={inputMaxPrice}
              onChange={e => setInputMaxPrice(e.target.value)}
              className="border rounded px-2 py-1 w-24 text-sm"
              placeholder="Any"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Min Popularity (0-100)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={inputMinPopularity}
              onChange={e => setInputMinPopularity(e.target.value)}
              className="border rounded px-2 py-1 w-24 text-sm"
              placeholder="Any"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Max Popularity (0-100)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={inputMaxPopularity}
              onChange={e => setInputMaxPopularity(e.target.value)}
              className="border rounded px-2 py-1 w-24 text-sm"
              placeholder="Any"
            />
          </div>
          <button
            onClick={handleSearch}
            className="ml-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 text-sm"
          >
            Search
          </button>
        </div>

        {/* Product Carousel */}
        <div className="max-w-7xl mx-auto font-avenir-book-45">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {products.map((product, index) => (
                <CarouselItem key={product.id ?? index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <ProductCard product={product} productIndex={product.id ?? index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white hover:bg-gray-50 border-gray-200 text-gray-700" />
            <CarouselNext className="right-4 bg-white hover:bg-gray-50 border-gray-200 text-gray-700" />
          </Carousel>
        </div>

        {/* Pricing Info */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-3xl p-12 max-w-4xl mx-auto border border-gray-100">
            <h3 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
              Transparent Pricing
            </h3>
            <p className="text-gray-600 leading-relaxed font-light max-w-2xl mx-auto">
              Our pricing reflects real-time gold market values, ensuring fair and transparent costs. 
              Each ring is priced using our formula: <span className="font-medium">(Popularity Score + 1) × Weight × Current Gold Price</span>, 
              providing you with honest, market-based pricing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
