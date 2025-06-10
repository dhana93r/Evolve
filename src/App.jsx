import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Welcome, Stocks, StockDetails, CompanyDetails, Learn, CompanyGroupProfile } from './pages';
import { DashboardLayout } from './layout';
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider>
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
    </ConfigProvider>
  );
}

export default App;
