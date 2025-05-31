import React, { useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import * as anime from 'animejs';

const AnimatedLogo = () => {
  const logoRef = useRef(null);
  // useEffect(() => {
  //   if (logoRef.current && anime && typeof anime === 'object' && typeof anime.anime === 'function') {
  //     anime.anime({
  //       targets: logoRef.current,
  //       scale: [1, 1.15, 1],
  //       color: [
  //         '#1976d2',
  //         '#64b5f6',
  //         '#1976d2',
  //       ],
  //       textShadow: [
  //         '0 0 0 #1976d2',
  //         '0 0 24px #64b5f6',
  //         '0 0 0 #1976d2',
  //       ],
  //       duration: 2000,
  //       easing: 'easeInOutSine',
  //       loop: true,
  //     });
  //   }
  // }, []);
  return (
    <Typography
      ref={logoRef}
      variant="h5"
      fontWeight={900}
      sx={{
        letterSpacing: 2,
        color: 'primary.main',
        fontFamily: 'Inter, Roboto, Arial, sans-serif',
        userSelect: 'none',
        cursor: 'pointer',
        transition: 'color 0.3s',
      }}
    >
      Evolve
    </Typography>
  );
};

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
