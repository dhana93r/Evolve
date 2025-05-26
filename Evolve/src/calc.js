// Utility for fair value calculation
export function calculateFairValue(stock, mode = 'pe10') {
  if (!stock) return 0;
  if (mode === 'pe10') return stock.pe10 * stock.eps;
  if (mode === 'pe5') return stock.pe5 * stock.eps;
  return 0;
}
