import React from 'react';
import { Box, Typography } from '@mui/material';

export default function CompanyGroupProfile() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: 2 }}>
      <Typography variant="h4" fontWeight={700} mb={2} align="center">
        Company Group Profile
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary">
        This page will display grouped company profiles and analytics. (Coming soon)
      </Typography>
    </Box>
  );
}
