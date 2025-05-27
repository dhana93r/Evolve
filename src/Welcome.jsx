import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600); // Simulate loading for demo
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Skeleton variant="text" width={180} height={60} sx={{ mb: 2 }} />
        <Skeleton variant="text" width={240} height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width={160} height={48} sx={{ borderRadius: 3 }} />
      </Box>
    );
  }
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
      <Box
        sx={{
          width: '100%',
          maxWidth: 480,
          textAlign: 'center',
          px: { xs: 1, sm: 0 },
        }}
      >
        <Typography variant="h3" fontWeight={700} gutterBottom>Evolve</Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>Empowering Smarter Investing</Typography>
        <Button variant="contained" size="large" sx={{ mt: 4 }} onClick={() => navigate('/stocks')}>Get Started</Button>
      </Box>
    </Box>
  );
};

export default Welcome;
