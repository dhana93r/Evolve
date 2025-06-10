import React from 'react';
import { Typography, Layout } from 'antd';
import PropTypes from 'prop-types';
export default function Error({ message }) {
  return (
    <Layout style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Typography.Text type="danger">{message}</Typography.Text>
      </div>
    </Layout>
  );
}
Error.propTypes = {
  message: PropTypes.string.isRequired,
};
