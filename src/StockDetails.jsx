import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StockDetails = () => {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);
  const [year, setYear] = useState(null);
  const [quarter, setQuarter] = useState(null);

  useEffect(() => {
    fetch('stocks.json')
      .then((res) => res.json())
      .then((data) => {
        const s = data.find((x) => x.symbol === symbol);
        setStock(s);
        if (s && s.quarters && s.quarters.length) {
          setYear(s.quarters[0].year);
          setQuarter(s.quarters[0].quarter);
        }
      });
  }, [symbol]);

  if (!stock) return <div>Loading...</div>;

  return (
    <div>
      <h1>{stock.name} ({stock.symbol})</h1>
      <h2>Stock Details</h2>
      <div>
        <strong>Year:</strong> {year}
      </div>
      <div>
        <strong>Quarter:</strong> {quarter}
      </div>
      {/* Add more stock details as needed */}
    </div>
  );
};

export default StockDetails;