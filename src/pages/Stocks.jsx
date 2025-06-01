import React, { useEffect, useState } from 'react';
import { Container, Typography, Box as MuiBox, Typography as MuiTypography, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel, Pagination, Stack } from '@mui/material';
import { EvolveTable, EvolveButton } from '../components';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useStocks } from '../hooks/useStocks';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Box from '@mui/material/Box';

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

  // Filter and search logic
  const filteredStocks = React.useMemo(() => stocks.filter((stock) => {
    const matchesSearch = stock.name.toLowerCase().includes(search.toLowerCase()) || stock.symbol.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = !industry || stock.industry === industry;
    return matchesSearch && matchesIndustry;
  }), [stocks, search, industry]);

  // Pagination logic
  const paginatedStocks = React.useMemo(() => filteredStocks.slice((page - 1) * rowsPerPage, page * rowsPerPage), [filteredStocks, page, rowsPerPage]);
  const pageCount = Math.ceil(filteredStocks.length / rowsPerPage);

  const columns = [
    { id: 'name', label: 'Name', align: 'center', sx: { fontSize: { xs: '0.95rem', sm: '1rem' }, px: { xs: 0.5, sm: 2 } } },
    { id: 'industry', label: 'Industry', align: 'center', sx: { fontSize: { xs: '0.95rem', sm: '1rem' }, px: { xs: 0.5, sm: 2 } } },
    { id: 'price', label: 'Current Price', align: 'center', sx: { fontSize: { xs: '0.95rem', sm: '1rem' }, px: { xs: 0.5, sm: 2 } } },
  ];

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} />;
  }

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
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 600,
          mx: 'auto',
          boxSizing: 'border-box',
          overflowX: 'hidden',
        }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom align="center" sx={{ fontSize: { xs: '1.5rem', sm: '2.1rem' } }}>
          All NSE India Stocks
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3, width: '100%', justifyContent: 'center' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by name or symbol"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 200 }}
          />
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Industry</InputLabel>
            <Select
              value={industry}
              label="Industry"
              onChange={(e) => { setIndustry(e.target.value); setPage(1); }}
            >
              <MenuItem value="">All Industries</MenuItem>
              {industries.map((ind) => (
                <MenuItem key={ind} value={ind}>{ind}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <EvolveTable
          columns={columns}
          rows={paginatedStocks}
          getRowKey={(row) => `${row.symbol}_${row.name}`}
          renderActions={(row) => (
            <EvolveButton sx={{ mt: 1 }} onClick={() => navigate(`/stocks/${row.symbol}`)}>
              View
            </EvolveButton>
          )}
          loading={loading}
          emptyMessage="No stocks found."
          enableStriped={true}
          enableHover={true}
        />
        {pageCount > 1 && (
          <Stack alignItems="center" sx={{ mt: 3 }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default Stocks;
