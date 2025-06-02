import React from 'react';
import PropTypes from 'prop-types';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

const StockBarChart = ({ data, options }) => {
  return <Bar data={data} options={options} />;
};

StockBarChart.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};

export default StockBarChart;
