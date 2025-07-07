import React from 'react';

interface StarRatingProps {
  rating: number;
  className?: string;
}

const StarRating = ({ rating, className = '' }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <svg
          key={`full-${index}`}
          className="w-4 h-4 text-yellow-400 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      
      {/* Half star */}
      {hasHalfStar && (
        <svg
          className="w-4 h-4 text-yellow-400"
          viewBox="0 0 24 24"
        >
          <defs>
            <linearGradient id="half-star">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half-star)"
            stroke="currentColor"
            strokeWidth="1"
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      )}
      
      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <svg
          key={`empty-${index}`}
          className="w-4 h-4 text-gray-300"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      
      <span className="ml-2 font-avenir-book-14 text-gray-600">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default StarRating;
