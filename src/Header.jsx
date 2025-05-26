import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AnimatedLogo = () => (
  <Typography
    variant="h5"
    fontWeight={900}
    sx={{
      letterSpacing: 2,
      color: 'primary.main',
      fontFamily: 'Inter, Roboto, Arial, sans-serif',
      userSelect: 'none',
      animation: 'evolveLogoPulse 2s infinite',
      cursor: 'pointer',
      '@keyframes evolveLogoPulse': {
        '0%': { textShadow: '0 0 0 #1976d2' },
        '50%': { textShadow: '0 0 16px #1976d2' },
        '100%': { textShadow: '0 0 0 #1976d2' },
      },
    }}
  >
    Evolve
  </Typography>
);

const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" color="default" elevation={2} sx={{ mb: 2, bgcolor: 'background.paper' }}>
      <Toolbar sx={{ justifyContent: 'center', minHeight: 72 }}>
        <Box onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <AnimatedLogo />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
