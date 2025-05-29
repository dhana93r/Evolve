```javascript
import React, { useEffect, useState } from 'react';

const Stocks = () => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        fetch('stocks.json')
            .then(response => response.json())
            .then(data => setStocks(data))
            .catch(error => console.error('Error fetching the stocks data:', error));
    }, []);

    return (
        <div>
            <h1>Stocks Information</h1>
            <ul>
                {stocks.map(stock => (
                    <li key={stock.symbol}>
                        {stock.name} ({stock.symbol}): ${stock.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Stocks;
```