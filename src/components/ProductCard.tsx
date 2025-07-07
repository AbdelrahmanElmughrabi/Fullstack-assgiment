import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../data/types';
import { formatPrice, convertPopularityToStars } from '../utils/priceCalculator';
import StarRating from './StarRating';
import ColorPicker from './ColorPicker';

type ColorOption = 'yellow' | 'rose' | 'white';

interface ProductCardProps {
  product: Product;
  productIndex: number;
}

const ProductCard = ({ product, productIndex }: ProductCardProps) => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState<ColorOption>('yellow');

  const calculatedPrice = product.price;
  const starRating = convertPopularityToStars(product.popularityScore);

  const handleProductClick = () => {
    navigate(`/product/${productIndex}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group cursor-pointer border border-gray-100">
      {/* Image Container */}
      <div 
        className="relative aspect-square overflow-hidden bg-gray-50"
        onClick={handleProductClick}
      >
        <img
          src={product.images[selectedColor]}
          alt={`${product.name} in ${selectedColor} gold`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 text-base font-normal text-gray-900" style={{ fontFamily: 'initial', fontSize: 'initial' }}>
        {/* Product Name */}
        <h3 
          className="font-montserrat-medium-15 group-hover:text-gray-700 transition-colors duration-200 cursor-pointer tracking-wide"
          onClick={handleProductClick}
        >
          {product.name}
        </h3>

        {/* Price */}
        <div className="text-left">
          <p className="font-montserrat-regular-15">
            {formatPrice(calculatedPrice)}
          </p>
        </div>

        {/* Color Picker */}
        <ColorPicker
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
          className="justify-start"
        />

        {/* Color Label */}
        <p className="font-avenir-book-12 text-gray-500 capitalize tracking-wide">
          {selectedColor} Gold
        </p>

        {/* Star Rating */}
        <StarRating rating={starRating} />
      </div>
    </div>
  );
};

export default ProductCard;
