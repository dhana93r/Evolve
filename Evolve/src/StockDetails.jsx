import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Stack, Button, MenuItem, Select, FormControl, InputLabel, Paper, Chip } from '@mui/material';
import { calculateFairValue } from './calc';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const recommendationIcon = (rec) => rec === 'consider' ? '✅' : '🚫';

const StockDetails = () => {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);
  const [year, setYear] = useState('');
  const [quarter, setQuarter] = useState('');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch('/src/stocks.json')
      .then((res) => res.json())
      .then((data) => {
        const s = data.find((x) => x.symbol === symbol);
        setStock(s);
        if (s && s.quarters && s.quarters.length) {
          setYear(s.quarters[0].year);
          setQuarter(s.quarters[0].quarter);
        }
      });
  }, [symbol]);

  useEffect(() => {
    if (stock && stock.quarters) {
      let filtered = stock.quarters;
      if (year) filtered = filtered.filter(q => q.year === Number(year));
      if (quarter) filtered = filtered.filter(q => q.quarter === quarter);
      setChartData(filtered);
    }
  }, [stock, year, quarter]);

  if (!stock) return <Typography>Stock not found.</Typography>;
  const fairValue10 = calculateFairValue(stock, 'pe10');
  const fairValue5 = calculateFairValue(stock, 'pe5');

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h5" fontWeight={700}>{stock.name} ({stock.symbol})</Typography>
          <Chip label={stock.recommendation === 'consider' ? 'Consider' : 'Not Consider'} icon={<span>{recommendationIcon(stock.recommendation)}</span>} color={stock.recommendation === 'consider' ? 'success' : 'error'} />
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
      </Paper>
      <Paper sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} mb={2}>
          <FormControl size="small">
            <InputLabel>Year</InputLabel>
            <Select value={year} label="Year" onChange={e => setYear(e.target.value)}>
              {[...new Set((stock.quarters||[]).map(q => q.year))].map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>Quarter</InputLabel>
            <Select value={quarter} label="Quarter" onChange={e => setQuarter(e.target.value)}>
              {[...new Set((stock.quarters||[]).map(q => q.quarter))].map(q => <MenuItem key={q} value={q}>{q}</MenuItem>)}
            </Select>
          </FormControl>
        </Stack>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#1976d2" name="Revenue" />
            <Bar dataKey="profit" fill="#bfa46f" name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
      <Button sx={{ mt: 3 }} variant="outlined" onClick={() => window.history.back()}>Back</Button>
    </Container>
  );
};

export default StockDetails;
