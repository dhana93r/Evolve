import * as React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { EvolveTable, EvolveButton, Loading, Error } from '../components';
import { useNavigate } from 'react-router-dom';
import { useStocks } from '../hooks/useStocks';
import Rupee from '../components/Rupee';
import { formatRupee } from '../utils/rupee';

const columns = [
  { id: 'name', label: 'Name', align: 'center', sx: { fontSize: { xs: '0.95rem', sm: '1rem' }, px: { xs: 0.5, sm: 2 } } },
  { id: 'symbol', label: 'Symbol', align: 'center', sx: { fontSize: { xs: '0.95rem', sm: '1rem' }, px: { xs: 0.5, sm: 2 } } },
  { id: 'industry', label: 'Industry', align: 'center', sx: { fontSize: { xs: '0.95rem', sm: '1rem' }, px: { xs: 0.5, sm: 2 } } },
  { id: 'price', label: 'Current Price', align: 'center', sx: { fontSize: { xs: '0.95rem', sm: '1rem' }, px: { xs: 0.5, sm: 2 } }, render: row => <><Rupee size={15} /> {formatRupee(row.price)}</> },
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
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: { xs: 1, sm: 2 },
        width: '100vw',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 480,
          minWidth: { xs: '90vw', sm: 400 },
          mx: 'auto',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={2}>
          Company Details
        </Typography>
        <TextField
          label="Search by name or symbol"
          variant="outlined"
          fullWidth
          value={query}
          onChange={e => setQuery(e.target.value)}
          sx={{ mb: 3, maxWidth: 400 }}
        />
        <EvolveTable
          columns={columns}
          rows={filteredResults}
          getRowKey={row => `${row.symbol}_${row.name}`}
          emptyMessage="No companies found."
          enableStriped={true}
          enableHover={true}
          renderActions={row => (
            <EvolveButton onClick={() => navigate(`/stocks/${row.symbol}`)} aria-label={`View details for ${row.name}`}>
              View
            </EvolveButton>
          )}
        />
      </Box>
    </Box>
  );
}
