import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/src/stocks.json')
      .then((res) => res.json())
      .then(setStocks);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 700, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={700} gutterBottom align="center" sx={{ fontSize: { xs: '1.5rem', sm: '2.1rem' } }}>
          All NSE India Stocks
        </Typography>
        <TableContainer component={Paper} sx={{ width: '100%', maxWidth: 600, mx: 'auto', boxShadow: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Industry</TableCell>
                <TableCell align="center">Current Price</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.map((stock) => (
                <TableRow key={stock.symbol}>
                  <TableCell align="center">{stock.name}</TableCell>
                  <TableCell align="center">{stock.industry}</TableCell>
                  <TableCell align="center">{stock.price}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" size="small" onClick={() => navigate(`/stocks/${stock.symbol}`)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Stocks;
