import * as React from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

export default function EvolveAlert({ id, severity = 'warning', title, children, onClose }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  React.useEffect(() => {
    setOpen(true);
  }, [id]);

  if (!open) return null;

  return (
    <Alert
      message={title}
      description={children}
      type={severity}
      closable={!!onClose}
      onClose={handleClose}
      showIcon
      closeIcon={false} // Force only one close icon
    />
  );
}

EvolveAlert.propTypes = {
  severity: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
};
