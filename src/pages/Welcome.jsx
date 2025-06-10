import React from 'react';
import { Button, Typography, Modal, Skeleton, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EvolveAlert } from '../components';
import Loading from '../components/Loading';
import Error from '../components/Error';

const { Content } = Layout;

const Welcome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [alertOpen, setAlertOpen] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Skeleton active paragraph={false} title={{ width: 180 }} style={{ marginBottom: 16 }} />
        <Skeleton active paragraph={false} title={{ width: 240 }} style={{ marginBottom: 16 }} />
        <Skeleton.Button active style={{ width: 160, height: 48, borderRadius: 12 }} />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <Content style={{ width: '100%', maxWidth: 480, margin: '0 auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 32 }}>
        <Modal
          open={alertOpen}
          onCancel={() => setAlertOpen(false)}
          footer={null}
          centered
        >
          <EvolveAlert
            severity="warning"
            title="Market Risk Disclaimer: "
            onClose={() => setAlertOpen(false)}
          >
            Investing in Indian stock markets involves significant risk, including the possible loss of principal. Past performance is not indicative of future results. Please consult a SEBI-registered investment advisor before making any investment decisions.
          </EvolveAlert>
        </Modal>
        {!alertOpen && (
          <>
            <Typography.Title level={1} style={{ fontWeight: 700, marginBottom: 16 }}>Evolve</Typography.Title>
            <Typography.Title level={4} style={{ color: '#888', marginBottom: 16 }}>Empowering Smarter Investing</Typography.Title>
            <Button type="primary" size="large" style={{ marginTop: 32 }} onClick={() => navigate('/stocks')}>Get Started</Button>
          </>
        )}
      </Content>
    </Layout>
  );
};

export default Welcome;

// No currency values to update in this file. No changes needed for Rupee or formatRupee.
