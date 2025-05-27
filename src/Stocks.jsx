import React, { useEffect, useState } from 'react';
import { Container, Typography, Box as MuiBox, Typography as MuiTypography } from '@mui/material';
import EvolveTable from './EvolveTable';
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

  const columns = [
    { id: 'name', label: 'Name', align: 'center', sx: { fontSize: { xs: '0.95rem', sm: '1rem' }, px: { xs: 0.5, sm: 2 } } },
    { id: 'industry', label: 'Industry', align: 'center', sx: { fontSize: { xs: '0.95rem', sm: '1rem' }, px: { xs: 0.5, sm: 2 } } },
    { id: 'price', label: 'Current Price', align: 'center', sx: { fontSize: { xs: '0.95rem', sm: '1rem' }, px: { xs: 0.5, sm: 2 } } },
  ];

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
            <EvolveTable
              columns={columns}
              rows={stocks}
              getRowKey={(row) => row.symbol}
              renderActions={(row) => (
                <EvolveButton sx={{ mt: 1 }} onClick={() => navigate(`/stocks/${row.symbol}`)}>
                  View Details
                </EvolveButton>
              )}
              loading={loading}
              emptyMessage="No stocks found."
              enableStriped={true}
              enableHover={true}
            />
          </>
        )}
      </Container>
    </Box>
  );
};

export default Stocks;
