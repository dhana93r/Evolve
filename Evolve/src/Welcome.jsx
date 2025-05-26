import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>Evolve</Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>Empowering Smarter Investing</Typography>
      </Box>
      <Button variant="contained" size="large" onClick={() => navigate('/stocks')}>Get Started</Button>
    </Container>
  );
};

export default Welcome;
