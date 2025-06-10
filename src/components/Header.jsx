import React from 'react';
import { Typography, Layout } from 'antd';

const { Header: AntHeader } = Layout;

const Header = () => (
  <AntHeader style={{ background: '#fff', padding: 0, textAlign: 'center', fontWeight: 900, fontSize: 24, letterSpacing: 2, color: '#1890ff', userSelect: 'none', cursor: 'pointer', minHeight: 64, lineHeight: '64px' }}>
    <Typography.Title level={3} style={{ margin: 0, color: '#1890ff', fontWeight: 900, letterSpacing: 2, background: 'transparent' }}>
      Evolve
    </Typography.Title>
  </AntHeader>
);

export default Header;
