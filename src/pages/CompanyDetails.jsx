import React from 'react';
import { Typography, Input, Layout } from 'antd';
import { EvolveTable, EvolveButton, Loading, Error } from '../components';
import { useNavigate } from 'react-router-dom';
import { useStocks } from '../hooks/useStocks';
import Rupee from '../components/Rupee';
import { formatRupee } from '../utils/rupee';

const { Content } = Layout;

const columns = [
  { id: 'name', label: 'Name', align: 'center' },
  { id: 'symbol', label: 'Symbol', align: 'center' },
  { id: 'industry', label: 'Industry', align: 'center' },
  { id: 'price', label: 'Current Price', align: 'center', render: row => <><Rupee size={15} /> {formatRupee(row.price)}</> },
];

export default function CompanyDetails() {
  const [query, setQuery] = React.useState('');
  const { stocks: results, loading, error } = useStocks();
  const navigate = useNavigate();

  const filteredResults = React.useMemo(() => {
    if (!query) return results;
    return results.filter(
      (stock) =>
        stock.name.toLowerCase().includes(query.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, results]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw', background: '#fff' }}>
      <Content style={{ width: '100%', maxWidth: 480, margin: '0 auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 32 }}>
        <Typography.Title level={4} style={{ textAlign: 'center', marginBottom: 32, fontWeight: 700 }}>
          Company Details
        </Typography.Title>
        <Input
          placeholder="Search by name or symbol"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ marginBottom: 24, maxWidth: 400 }}
          allowClear
        />
        <EvolveTable
          columns={columns}
          rows={filteredResults}
          getRowKey={row => `${row.symbol}_${row.name}`}
          emptyMessage="No companies found."
          renderActions={row => (
            <EvolveButton style={{ margin: 0 }} onClick={() => navigate(`/stocks/${row.symbol}`)} aria-label={`View details for ${row.name}`}>
              View
            </EvolveButton>
          )}
        />
      </Content>
    </Layout>
  );
}
