import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import { EvolveAlert } from '../components';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Welcome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [alertOpen, setAlertOpen] = React.useState(true);
  const [dialogExited, setDialogExited] = React.useState(false);

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
        overflowX: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 480,
          minWidth: { xs: '90vw', sm: 400 },
          mx: 'auto',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Dialog
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          maxWidth="xs"
          fullWidth
          TransitionProps={{ onExited: () => setDialogExited(true) }}
        >
          <DialogContent sx={{ p: 0 }}>
            <EvolveAlert
              id="welcome-risk"
              severity="warning"
              sx={{ borderRadius: 2 }}
              title="Market Risk Disclaimer: "
              onClose={() => setAlertOpen(false)}
            >
              Investing in Indian stock markets involves significant risk, including the possible loss of principal. Past performance is not indicative of future results. Please consult a SEBI-registered investment advisor before making any investment decisions.
            </EvolveAlert>
          </DialogContent>
        </Dialog>
        {(dialogExited || !alertOpen) && (
          <Box sx={{ width: '100%', maxWidth: 480, textAlign: 'center', px: { xs: 1, sm: 0 } }}>
            <Typography variant="h3" fontWeight={700} gutterBottom>Evolve</Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>Empowering Smarter Investing</Typography>
            <Button variant="contained" size="large" sx={{ mt: 4 }} onClick={() => navigate('/stocks')}>Get Started</Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Welcome;

// No currency values to update in this file. No changes needed for Rupee or formatRupee.
