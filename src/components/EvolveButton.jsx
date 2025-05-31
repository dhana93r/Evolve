import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const CustomButton = styled(Button)(({ theme }) => ({
  fontFamily: 'inherit',
  fontWeight: 600,
  fontSize: '1rem',
  padding: '0.6em 1.5em',
  borderRadius: '8px',
  border: 'none',
  color: '#fff',
  background: '#1976d2',
  boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)',
  cursor: 'pointer',
  transition: 'background 0.2s, box-shadow 0.2s',
  minWidth: 120,
  '@media (max-width:600px)': {
    fontSize: '0.95rem',
    padding: '0.5em 1em',
    minWidth: 90,
  },
  '&:hover': {
    background: '#1565c0',
    boxShadow: '0 4px 16px rgba(25, 118, 210, 0.16)',
  },
  '&:active': {
    background: '#115293',
  },
  '&:disabled': {
    background: '#bdbdbd',
    color: '#eee',
    cursor: 'not-allowed',
  },
}));

export default function EvolveButton(props) {
  return <CustomButton {...props}>{props.children}</CustomButton>;
}
