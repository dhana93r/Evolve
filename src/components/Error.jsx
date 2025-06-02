import { Box, Alert } from '@mui/material';
import PropTypes from 'prop-types';
export default function Error({ message }) {
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
      <Alert severity="error">{message}</Alert>
    </Box>
  );
}
Error.propTypes = {
  message: PropTypes.string.isRequired,
};
