import * as React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { EvolveTable } from '../components';
import stocksData from '../stocks.json';

const columns = [
  { id: 'name', label: 'Name', align: 'center', sx: { fontSize: { xs: '0.95rem', sm: '1rem' }, px: { xs: 0.5, sm: 2 } } },
  { id: 'symbol', label: 'Symbol', align: 'center', sx: { fontSize: { xs: '0.95rem', sm: '1rem' }, px: { xs: 0.5, sm: 2 } } },
  { id: 'industry', label: 'Industry', align: 'center', sx: { fontSize: { xs: '0.95rem', sm: '1rem' }, px: { xs: 0.5, sm: 2 } } },
];

export default function CompanyDetails() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState(stocksData);

  React.useEffect(() => {
    if (!query) {
      setResults(stocksData);
    } else {
      setResults(
        stocksData.filter(
          (stock) =>
            stock.name.toLowerCase().includes(query.toLowerCase()) ||
            stock.symbol.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query]);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', px: { xs: 1, sm: 2 }, width: '100vw', boxSizing: 'border-box', overflowX: 'hidden' }}>
      <Box maxWidth="md" sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', px: { xs: 0.5, sm: 2 }, width: '100%', maxWidth: 600, mx: 'auto', boxSizing: 'border-box', overflowX: 'hidden' }}>
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
          rows={results}
          getRowKey={row => row.symbol}
          emptyMessage="No companies found."
          enableStriped={true}
          enableHover={true}
          renderActions={row => (
            <EvolveButton onClick={() => navigate(`/stocks/${row.symbol}`)}>
              View
            </EvolveButton>
          )}
        />
      </Box>
    </Box>
  );
}
