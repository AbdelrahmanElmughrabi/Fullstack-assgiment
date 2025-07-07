export const formatPrice = (price: number): string => {
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const convertPopularityToStars = (popularityScore: number): number => {
  // Convert popularity score (0-1) to a 0-5 star rating with 1 decimal place
  return Math.round((popularityScore * 5) * 10) / 10;
};
