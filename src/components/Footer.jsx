import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box component="footer" sx={{
    width: '100%',
    py: 2,
    bgcolor: 'background.paper',
    textAlign: 'center',
    borderTop: '1px solid #eee',
    mt: 'auto',
    fontSize: '0.95rem',
    color: 'text.secondary',
  }}>
    <Typography variant="body2">
      © {new Date().getFullYear()} Evolve. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
