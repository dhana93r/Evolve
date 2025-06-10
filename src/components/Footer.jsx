import React from 'react';
import { Typography, Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => (
  <AntFooter style={{ width: '100%', textAlign: 'center', fontSize: '0.95rem', color: '#888', background: '#fff', padding: 16 }}>
    <Typography.Text type="secondary">
      © {new Date().getFullYear()} Evolve. All rights reserved.
    </Typography.Text>
  </AntFooter>
);

export default Footer;
