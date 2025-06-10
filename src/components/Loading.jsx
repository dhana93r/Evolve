import React from 'react';
import { Typography, Layout } from 'antd';

export default function Loading() {
  return (
    <Layout style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Typography.Text>Loading...</Typography.Text>
      </div>
    </Layout>
  );
}
