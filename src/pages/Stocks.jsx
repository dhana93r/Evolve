import React, { useEffect, useState } from 'react';
import { Typography, Input, Select, Pagination, Table, Row, Col, Layout } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useStocks } from '../hooks/useStocks';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Rupee from '../components/Rupee';
import { formatRupee } from '../utils/rupee';

const { Option } = Select;
const { Content } = Layout;

const Stocks = () => {
  const { stocks, loading, error } = useStocks();
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const navigate = useNavigate();

  // Get unique industries for filter dropdown
  const industries = React.useMemo(() => {
    const inds = new Set(stocks.map((s) => s.industry).filter(Boolean));
    return Array.from(inds).sort();
  }, [stocks]);

  // Filtered and paginated stocks
  const filteredStocks = React.useMemo(() => {
    let filtered = stocks;
    if (search) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (industry) {
      filtered = filtered.filter((s) => s.industry === industry);
    }
    return filtered;
  }, [stocks, search, industry]);

  const pageCount = Math.ceil(filteredStocks.length / rowsPerPage);
  const paginatedStocks = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredStocks.slice(start, start + rowsPerPage);
  }, [filteredStocks, page, rowsPerPage]);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', align: 'center' },
    { title: 'Industry', dataIndex: 'industry', key: 'industry', align: 'center' },
    { title: 'Current Price', dataIndex: 'price', key: 'price', align: 'center', render: (price) => <><Rupee size={15} /> {formatRupee(price)}</> },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, row) => (
        <button className="ant-btn ant-btn-default" style={{ margin: 0 }} onClick={() => navigate(`/stocks/${row.symbol}`)}>
          View
        </button>
      ),
    },
  ];

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <Content style={{ width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', background: '#fff' }}>
        <Row justify="center" style={{ width: '100%' }}>
          <Col xs={24} sm={20} md={16} lg={12} xl={10} style={{ marginTop: 40 }}>
            <Typography.Title level={4} style={{ textAlign: 'center', marginBottom: 32, fontWeight: 700 }}>
              All NSE India Stocks
            </Typography.Title>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 16, marginBottom: 24, width: '100%', justifyContent: 'center' }}>
              <Input
                placeholder="Search by name or symbol"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                prefix={<SearchOutlined />}
                style={{ minWidth: 200 }}
                allowClear
              />
              <Select
                value={industry}
                onChange={value => { setIndustry(value); setPage(1); }}
                style={{ minWidth: 180 }}
                placeholder="All Industries"
                allowClear
              >
                <Option value="">All Industries</Option>
                {industries.map((ind) => (
                  <Option key={ind} value={ind}>{ind}</Option>
                ))}
              </Select>
            </div>
            <Table
              columns={columns}
              dataSource={paginatedStocks}
              rowKey={row => `${row.symbol}_${row.name}`}
              pagination={false}
              bordered
              size="middle"
              style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #f0f1f2', margin: '0 auto' }}
              locale={{ emptyText: 'No stocks found.' }}
            />
            {pageCount > 1 && (
              <div style={{ marginTop: 24, textAlign: 'center' }}>
                <Pagination
                  current={page}
                  total={filteredStocks.length}
                  pageSize={rowsPerPage}
                  onChange={setPage}
                  showSizeChanger={false}
                />
              </div>
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Stocks;
