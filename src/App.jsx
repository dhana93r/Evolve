import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Stocks from './Stocks';
import StockDetails from './StockDetails';
import Header from './Header';
import Footer from './Footer';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';

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
        <Box sx={{ minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <Box sx={{ flex: 1, width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/stocks" element={<Stocks />} />
              <Route path="/stocks/:symbol" element={<StockDetails />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
