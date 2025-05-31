// Custom hook for stock recommendation gauge
import { calculateFairValue } from './calc';

export function useGaugeState(stock) {
  if (!stock) return { label: 'Avoid', color: '#f44336', icon: '🚫' };
  const fairValue10 = calculateFairValue(stock, 'pe10');
  const fairValue5 = calculateFairValue(stock, 'pe5');
  if (stock.price < Math.min(fairValue10, fairValue5) * 0.8) {
    return { label: 'Must Consider', color: '#388e3c', icon: '⭐' };
  }
  if (stock.price < fairValue10 || stock.price < fairValue5) {
    return { label: 'Consider', color: '#1976d2', icon: '✅' };
  }
  return { label: 'Avoid', color: '#f44336', icon: '🚫' };
}
