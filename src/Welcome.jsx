import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 480, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>Evolve</Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>Empowering Smarter Investing</Typography>
        <Button variant="contained" size="large" sx={{ mt: 4 }} onClick={() => navigate('/stocks')}>Get Started</Button>
      </Box>
    </Box>
  );
};

export default Welcome;
