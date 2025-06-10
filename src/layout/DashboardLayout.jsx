import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, TableOutlined, InfoCircleOutlined, TeamOutlined, ReadOutlined } from '@ant-design/icons';
import React from 'react';

const { Sider, Content, Header } = Layout;

const navItems = [
  { label: 'Home', icon: <HomeOutlined />, path: '/' },
  { label: 'Stocks', icon: <TableOutlined />, path: '/stocks' },
  { label: 'Company Details', icon: <InfoCircleOutlined />, path: '/company-details' },
  { label: 'Company Group Profile', icon: <TeamOutlined />, path: '/company-group-profile' },
  { label: 'Learn', icon: <ReadOutlined />, path: '/learn' },
];

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = window.location;
  const selectedKey = navItems.find(item => location.pathname.startsWith(item.path))?.path || '/';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={220} style={{ minHeight: '100vh' }}>
        <div style={{ height: 64, margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <HomeOutlined style={{ fontSize: 32, color: '#1890ff', marginRight: 8, verticalAlign: 'middle' }} />
          <span style={{ fontWeight: 700, fontSize: 20, color: '#1890ff', verticalAlign: 'middle', letterSpacing: 1 }}>Evolve</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => navigate(key)}
          items={navItems.map(item => ({
            key: item.path,
            icon: item.icon,
            label: item.label,
          }))}
        />
      </Sider>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: 0, textAlign: 'center', fontWeight: 700, fontSize: 18, minHeight: 64, lineHeight: '64px' }}>Evolve Dashboard</Header>
        <Content style={{ margin: 0, padding: 0, height: '100%', minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
