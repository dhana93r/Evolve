import { useState, useEffect } from 'react';

export function useStocks() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetch('/stocks.json')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(setStocks)
      .catch(() => setError('Failed to load stock data.'))
      .finally(() => setLoading(false));
  }, []);

  return { stocks, loading, error };
}
