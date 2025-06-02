import { Box, CircularProgress } from '@mui/material';
export default function Loading() {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      width: '100vw',
      height: '100vh',
      maxWidth: 480,
      mx: 'auto',
      boxSizing: 'border-box',
    }}>
      <CircularProgress />
    </Box>
  );
}
