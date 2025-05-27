import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box as MuiBox, Typography as MuiTypography } from '@mui/material';
import EvolveButton from './EvolveButton';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('/src/stocks.json')
      .then((res) => res.json())
      .then(setStocks)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: { xs: 1, sm: 2 },
        width: '100vw',
        boxSizing: 'border-box',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          px: { xs: 0.5, sm: 2 },
        }}
      >
        {loading ? (
          <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 6 }}>
            <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2, mx: 'auto' }} />
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} variant="rectangular" width="100%" height={48} sx={{ mb: 1, borderRadius: 2 }} />
            ))}
          </Box>
        ) : (
          <>
            <Typography variant="h4" fontWeight={700} gutterBottom align="center" sx={{ fontSize: { xs: '1.5rem', sm: '2.1rem' } }}>
              All NSE India Stocks
            </Typography>
            <TableContainer
              component={Paper}
              sx={{
                width: '100%',
                maxWidth: 600,
                mx: 'auto',
                boxShadow: 2,
                overflowX: 'auto',
                borderRadius: { xs: 2, sm: 3 },
              }}
            >
              <Table size="small" sx={{ minWidth: 350 }}>
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
                      <TableCell align="center" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' }, px: { xs: 0.5, sm: 2 } }}>{stock.name}</TableCell>
                      <TableCell align="center" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' }, px: { xs: 0.5, sm: 2 } }}>{stock.industry}</TableCell>
                      <TableCell align="center" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' }, px: { xs: 0.5, sm: 2 } }}>{stock.price}</TableCell>
                      <TableCell align="center" sx={{ px: { xs: 0.5, sm: 2 } }}>
                        <EvolveButton sx={{ mt: 1 }} onClick={() => navigate(`/stocks/${stock.symbol}`)}>
  View Details
</EvolveButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Stocks;
