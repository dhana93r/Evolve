import * as React from 'react';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function EvolveAlert({ id, severity = 'warning', title, children, sx, onClose }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  React.useEffect(() => {
    setOpen(true);
  }, [id]);

  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        sx={sx}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {title && <strong>{title}</strong>}
        {children}
      </Alert>
    </Collapse>
  );
}
