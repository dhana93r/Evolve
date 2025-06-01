import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Stack, MenuItem, Select, FormControl, InputLabel, Paper, Chip, Card, CardContent } from '@mui/material';
import { EvolveButton } from '../components';
import { calculateFairValue, getRecommendation } from '../utils';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { useStocks } from '../hooks/useStocks';
import Loading from '../components/Loading';
import Error from '../components/Error';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

const StockDetails = () => {
  const { symbol } = useParams();
  const { stocks, loading, error } = useStocks();
  const [stock, setStock] = useState(null);
  const [year, setYear] = useState('');
  const [quarter, setQuarter] = useState('');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!stocks.length) return;
    const s = stocks.find((x) => x.symbol === symbol);
    setStock(s);
    if (s && s.quarters && s.quarters.length) {
      setYear(s.quarters[0].year);
      setQuarter(s.quarters[0].quarter);
    }
  }, [symbol, stocks]);

  useEffect(() => {
    if (stock && stock.quarters) {
      let filtered = stock.quarters;
      if (year) filtered = filtered.filter(q => q.year === Number(year));
      if (quarter) filtered = filtered.filter(q => q.quarter === quarter);
      setChartData(filtered);
    }
  }, [stock, year, quarter]);

  const fairValue10 = stock ? calculateFairValue(stock, 'pe10') : '';
  const fairValue5 = stock ? calculateFairValue(stock, 'pe5') : '';
  const recommendation = stock ? getRecommendation(stock) : {};

  // Memoize chart data and options for performance
  const chartJsData = useMemo(() => ({
    labels: chartData.map((d) => d.quarter),
    datasets: [
      {
        label: 'Revenue',
        data: chartData.map((d) => d.revenue),
        backgroundColor: 'rgba(25, 118, 210, 0.7)',
        borderRadius: 6,
        maxBarThickness: 40,
      },
      {
        label: 'Profit',
        data: chartData.map((d) => d.profit),
        backgroundColor: 'rgba(191, 164, 111, 0.7)',
        borderRadius: 6,
        maxBarThickness: 40,
      },
    ],
  }), [chartData]);

  const chartJsOptions = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) =>
            ` ${context.dataset.label}: $${context.parsed.y?.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: { title: { display: true, text: 'Quarter' } },
      y: {
        title: { display: true, text: 'Value' },
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return '$' + value.toLocaleString();
          },
        },
      },
    },
  }), []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!stock) return <Typography>Stock not found.</Typography>;

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
        maxWidth="sm"
        sx={{
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          px: { xs: 0.5, sm: 2 },
          width: '100%',
          maxWidth: 500,
          mx: 'auto',
          boxSizing: 'border-box',
          overflowX: 'hidden',
        }}
      >
        <Card
          sx={{
            p: { xs: 2, sm: 3 },
            mb: 3,
            width: '100%',
            maxWidth: 500,
            mx: 'auto',
            boxShadow: 3,
            borderRadius: { xs: 3, sm: 4 },
          }}
        >
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
              <Typography variant="h5" fontWeight={700}>{stock.name} ({stock.symbol})</Typography>
              <Chip label={recommendation.label}
                icon={<span>{recommendation.icon}</span>}
                color={recommendation.color === 'success' ? 'success' : 'default'}
                sx={
                  recommendation.color !== 'success' ? {
                    bgcolor: recommendation.color,
                    color: '#fff',
                    fontWeight: 600
                  } : {}
                }
              />
            </Stack>
            <Typography variant="subtitle1" color="text.secondary">{stock.industry}</Typography>
            <Box mt={2}>
              <Typography>PE: {stock.pe}</Typography>
              <Typography>EPS: {stock.eps}</Typography>
              <Typography>Price: {stock.price}</Typography>
              <Typography>Median 10yr PE: {stock.pe10}</Typography>
              <Typography>Median 5yr PE: {stock.pe5}</Typography>
              <Typography sx={{ fontWeight: 600, color: 'primary.main' }}>Fair Value (10yr): {fairValue10}</Typography>
              <Typography sx={{ fontWeight: 600, color: 'secondary.main' }}>Fair Value (5yr): {fairValue5}</Typography>
            </Box>
          </CardContent>
        </Card>
        <Paper
          sx={{
            p: { xs: 2, sm: 3 },
            width: '100%',
            maxWidth: 500,
            mx: 'auto',
            borderRadius: { xs: 2, sm: 3 },
            overflowX: 'auto',
          }}
        >
          <Stack direction="row" spacing={2} mb={2} justifyContent="center" sx={{ flexWrap: 'wrap', gap: { xs: 1, sm: 2 } }}>
            <FormControl size="small">
              <InputLabel>Year</InputLabel>
              <Select value={year} label="Year" onChange={e => setYear(e.target.value)}>
                {[...new Set((stock.quarters||[]).map(q => q.year))].map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl size="small">
              <InputLabel>Quarter</InputLabel>
              <Select value={quarter} label="Quarter" onChange={e => setQuarter(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                {[...new Set((stock.quarters||[]).map(q => q.quarter))].map(q => <MenuItem key={q} value={q}>{q}</MenuItem>)}
              </Select>
            </FormControl>
          </Stack>
          <Box sx={{ width: '100%', height: 250 }}>
            <Bar data={chartJsData} options={chartJsOptions} />
          </Box>
        </Paper>
        <EvolveButton sx={{ mt: 3, width: { xs: '100%', sm: 'auto' } }} variant="outlined" onClick={() => window.history.back()}>
          Back
        </EvolveButton>
      </Container>
    </Box>
  );
};

export default StockDetails;
