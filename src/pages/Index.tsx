
import React from 'react';
import ProductGrid from '../components/ProductGrid';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-wide">
            Exquisite Engagement Rings
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Crafted with precision and designed to celebrate your unique love story. 
            Each piece reflects timeless elegance and exceptional quality.
          </p>
        </div>
      </div>

      {/* Products Section */}
      <ProductGrid />
    </div>
  );
};

export default Index;
