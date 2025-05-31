import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const peContent = (
  <Box>
    <Typography gutterBottom>
      <b>Price-to-Earnings (P/E) Ratio</b> measures a company's share price relative to its earnings per share (EPS). It helps assess the relative value of a company's stock and is widely used for comparing companies within the same industry or a single company over time.
    </Typography>
    <Typography gutterBottom>
      <b>Formula:</b> P/E Ratio = Share Price / Earnings Per Share (EPS)
    </Typography>
    <Typography gutterBottom>
      A high P/E ratio could mean a stock is overvalued or that investors expect high growth rates. A low P/E could indicate undervaluation. P/E is most useful when comparing similar companies or historical performance.
    </Typography>
    <Typography variant="caption" color="text.secondary">
      Source: Investopedia
    </Typography>
  </Box>
);

const epsContent = (
  <Box>
    <Typography gutterBottom>
      <b>Earnings Per Share (EPS)</b> is a company's net income (minus preferred dividends) divided by the number of common shares outstanding. EPS shows how much profit each share of stock has earned and is a key metric for estimating corporate value.
    </Typography>
    <Typography gutterBottom>
      <b>Formula:</b> EPS = (Net Income - Preferred Dividends) / Shares Outstanding
    </Typography>
    <Typography gutterBottom>
      A higher EPS indicates greater value, as investors will pay more for shares if they believe the company has higher profits relative to its share price. EPS is most valuable when compared across competitors, industries, or time periods.
    </Typography>
    <Typography variant="caption" color="text.secondary">
      Source: Investopedia
    </Typography>
  </Box>
);

const debtEquityContent = (
  <Box>
    <Typography gutterBottom>
      <b>Debt to Equity Ratio</b> compares a company's total liabilities to its shareholder equity. It shows how much debt a company is using to finance its assets relative to equity. A higher ratio means more leverage and potentially higher risk.
    </Typography>
    <Typography gutterBottom>
      <b>Formula:</b> Debt to Equity Ratio = Total Liabilities / Shareholder Equity
    </Typography>
    <Typography gutterBottom>
      This ratio helps investors understand a company's financial structure and risk. A lower ratio is generally preferred, but the ideal value varies by industry.
    </Typography>
    <Typography variant="caption" color="text.secondary">
      Source: Investopedia (paraphrased)
    </Typography>
  </Box>
);

export default function Learn() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

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
      <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, sm: 4, md: 6 }, width: '100%', boxSizing: 'border-box', overflowX: 'hidden' }}>
        <Typography variant="h4" align="center" fontWeight={700} mb={4}>
          Learn: Key Stock Market Terms
        </Typography>
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6"><b>What is PE?</b></Typography>
          </AccordionSummary>
          <AccordionDetails>{peContent}</AccordionDetails>
        </Accordion>
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6"><b>What is EPS?</b></Typography>
          </AccordionSummary>
          <AccordionDetails>{epsContent}</AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6"><b>What is Debt to Equity?</b></Typography>
          </AccordionSummary>
          <AccordionDetails>{debtEquityContent}</AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}
