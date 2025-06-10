import React from 'react';
import { Typography, Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import Loading from '../components/Loading';
import Error from '../components/Error';

const { Panel } = Collapse;

const peContent = (
  <Typography.Paragraph>
    <b>Price-to-Earnings (P/E) Ratio</b> measures a company's share price relative to its earnings per share (EPS). It helps assess the relative value of a company's stock and is widely used for comparing companies within the same industry or a single company over time.<br />
    <b>Formula:</b> P/E Ratio = Share Price / Earnings Per Share (EPS)<br />
    A high P/E ratio could mean a stock is overvalued or that investors expect high growth rates. A low P/E could indicate undervaluation. P/E is most useful when comparing similar companies or historical performance.<br />
    <Typography.Text type="secondary">Source: Investopedia</Typography.Text>
  </Typography.Paragraph>
);

const epsContent = (
  <Typography.Paragraph>
    <b>Earnings Per Share (EPS)</b> is a company's net income (minus preferred dividends) divided by the number of common shares outstanding. EPS shows how much profit each share of stock has earned and is a key metric for estimating corporate value.<br />
    <b>Formula:</b> EPS = (Net Income - Preferred Dividends) / Shares Outstanding<br />
    A higher EPS indicates greater value, as investors will pay more for shares if they believe the company has higher profits relative to its share price. EPS is most valuable when compared across competitors, industries, or time periods.<br />
    <Typography.Text type="secondary">Source: Investopedia</Typography.Text>
  </Typography.Paragraph>
);

const debtEquityContent = (
  <Typography.Paragraph>
    <b>Debt to Equity Ratio</b> compares a company's total liabilities to its shareholder equity. It shows how much debt a company is using to finance its assets relative to equity. A higher ratio means more leverage and potentially higher risk.<br />
    <b>Formula:</b> Debt to Equity Ratio = Total Liabilities / Shareholder Equity<br />
    This ratio helps investors understand a company's financial structure and risk. A lower ratio is generally preferred, but the ideal value varies by industry.<br />
    <Typography.Text type="secondary">Source: Investopedia (paraphrased)</Typography.Text>
  </Typography.Paragraph>
);

export default function Learn() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      background: '#fff',
    }}
    >
      <div style={{
        width: '100%',
        maxWidth: 480,
        margin: '0 auto',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 32,
      }}
      >
        <Typography.Title
          level={4}
          style={{
            textAlign: 'center',
            marginBottom: 32,
            fontWeight: 700,
          }}
        >
          Learn: Key Stock Market Terms
        </Typography.Title>
        <Collapse
          accordion
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          style={{ width: '100%' }}
        >
          <Panel header={<b>What is PE?</b>} key="pe">
            {peContent}
          </Panel>
          <Panel header={<b>What is EPS?</b>} key="eps">
            {epsContent}
          </Panel>
          <Panel header={<b>What is Debt to Equity?</b>} key="de">
            {debtEquityContent}
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}

// No currency values to update in this file. No changes needed for Rupee or formatRupee.
