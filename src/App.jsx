import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Stocks from './Stocks';
import StockDetails from './StockDetails';
import Header from './Header';
import Footer from './Footer';
import DashboardLayout from './DashboardLayout';
import { CssBaseline, ThemeProvider, createTheme, Box, Typography } from '@mui/material';
import CompanyDetails from './CompanyDetails';
import Learn from './Learn';
import CompanyGroupProfile from './CompanyGroupProfile';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#bfa46f' },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    body1: { lineHeight: 1.7 },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/*"
            element={
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<Welcome />} />
                  <Route path="stocks" element={<Stocks />} />
                  <Route path="stocks/:symbol" element={<StockDetails />} />
                  <Route path="company-details" element={<CompanyDetails />} />
                  <Route path="learn" element={<Learn />} />
                  <Route path="company-group-profile" element={<CompanyGroupProfile />} />
                </Routes>
              </DashboardLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
