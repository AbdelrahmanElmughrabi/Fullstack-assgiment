import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { formatPrice, convertPopularityToStars } from '../utils/priceCalculator';
import StarRating from '../components/StarRating';
import ColorPicker from '../components/ColorPicker';
import { ArrowLeft } from 'lucide-react';

type ColorOption = 'yellow' | 'rose' | 'white';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState<ColorOption>('yellow');

  const productId = parseInt(id || '0');
  const { data: product, isLoading, isError } = useProduct(productId);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading product...</div>;
  }
  if (isError || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const starRating = convertPopularityToStars(product.popularityScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-rose-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft size={20} />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Product Image */}
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={product.images[selectedColor]}
              alt={`${product.name} in ${selectedColor} gold`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="font-montserrat-medium-32 mb-4">{product.name}</h1>
              <StarRating rating={starRating} className="mb-6" />
            </div>

            {/* Color Picker */}
            <ColorPicker
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              className="mt-2"
            />
            <p className="font-avenir-book-12 text-gray-500 capitalize tracking-wide mt-1">
              {selectedColor} Gold
            </p>

            {/* Price */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <p className="font-montserrat-regular-15 mb-2">
                {formatPrice(product.price)}
              </p>
              <p className="text-gray-600">
                {product.weight}g • {(product.popularityScore * 100).toFixed(0)}% popularity
              </p>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Weight:</span>
                  <span className="ml-2 text-gray-600">{product.weight}g</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Popularity:</span>
                  <span className="ml-2 text-gray-600">{(product.popularityScore * 100).toFixed(0)}%</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Rating:</span>
                  <span className="ml-2 font-avenir-book-14 text-gray-600">{starRating.toFixed(1)}/5</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Colors:</span>
                  <span className="ml-2 text-gray-600">3 options</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
