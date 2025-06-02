import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StockBarChart from './StockBarChart';
import AreaChart from './AreaChart';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const chartTypes = [
  { label: 'Bar Chart', value: 'bar' },
  { label: 'Area Chart', value: 'area' },
];

const ChartSwitcher = ({
  barData, barOptions,
  areaData, areaOptions,
  initialType = 'bar',
  height = 250
}) => {
  const [chartType, setChartType] = useState(initialType);

  return (
    <Box>
      <FormControl size="small" sx={{ mb: 2, minWidth: 140 }}>
        <InputLabel>Chart Type</InputLabel>
        <Select
          value={chartType}
          label="Chart Type"
          onChange={e => setChartType(e.target.value)}
        >
          {chartTypes.map(type => (
            <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ width: '100%', height }}>
        {chartType === 'bar' && <StockBarChart data={barData} options={barOptions} />}
        {chartType === 'area' && <AreaChart data={areaData} options={areaOptions} />}
      </Box>
    </Box>
  );
};

ChartSwitcher.propTypes = {
  barData: PropTypes.object.isRequired,
  barOptions: PropTypes.object.isRequired,
  areaData: PropTypes.object.isRequired,
  areaOptions: PropTypes.object.isRequired,
  initialType: PropTypes.oneOf(['bar', 'area']),
  height: PropTypes.number,
};

export default ChartSwitcher;
