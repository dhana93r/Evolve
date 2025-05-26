// Utility for fair value calculation
export function calculateFairValue(stock, mode = 'pe10') {
  if (!stock) return 0;
  if (mode === 'pe10') return stock.pe10 * stock.eps;
  if (mode === 'pe5') return stock.pe5 * stock.eps;
  return 0;
}

export function isConsidered(stock) {
  if (!stock) return false;
  const fairValue10 = calculateFairValue(stock, 'pe10');
  const fairValue5 = calculateFairValue(stock, 'pe5');
  return stock.price < fairValue10 || stock.price < fairValue5;
}

export function getRecommendation(stock) {
  if (!stock) return { label: 'Avoid', icon: '🚫', color: '#f44336' };
  const fairValue10 = calculateFairValue(stock, 'pe10');
  const fairValue5 = calculateFairValue(stock, 'pe5');
  if (stock.price < fairValue10 || stock.price < fairValue5) {
    return { label: 'Consider', icon: '✅', color: 'success' };
  }
  return { label: 'Avoid', icon: '🚫', color: '#f44336' };
}
