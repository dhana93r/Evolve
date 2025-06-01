const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

// Fix: Use correct path for public folder at project root
const stocksPath = path.join(__dirname, '../public/stocks.json');
const outputPath = path.join(__dirname, '../public/stocks_enriched.json');

// Helper to convert month to quarter
function monthToQuarter(month) {
  switch (month) {
    case 'Mar': return 'Q4';
    case 'Jun': return 'Q1';
    case 'Sep': return 'Q2';
    case 'Dec': return 'Q3';
    default: return '';
  }
}

function cleanLabel(label) {
  return label.replace(/\s+/g, '').toLowerCase();
}

async function fetchQuarterlyResults(symbol) {
  const url = `https://www.screener.in/company/${symbol}/consolidated/`;
  try {
    const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const $ = cheerio.load(data);
    const table = $('section:contains("Quarterly Results") table.data-table');
    const headerCells = table.find('thead tr th').toArray();
    // Extract quarter headers (e.g., Mar 2024, Dec 2023, ...)
    const quarters = headerCells.slice(1).map(th => $(th).text().trim());
    let salesRow = null, profitRow = null;
    table.find('tbody tr').each((i, row) => {
      const label = cleanLabel($(row).find('td').first().text());
      if (!salesRow && (label === 'sales' || label === 'sales+')) salesRow = row;
      if (!profitRow && (label === 'netprofit' || label === 'netprofit+')) profitRow = row;
    });
    if (!salesRow || !profitRow) return [];
    const salesCells = $(salesRow).find('td').toArray().slice(1);
    const profitCells = $(profitRow).find('td').toArray().slice(1);
    // Compose array of { year, quarter, revenue, profit }
    const results = [];
    for (let i = 0; i < Math.min(quarters.length, 12); i++) {
      const [month, yearStr] = quarters[i].split(' ');
      const year = parseInt(yearStr, 10);
      const quarter = monthToQuarter(month);
      if (!year || !quarter) continue;
      const revenue = parseFloat($(salesCells[i]).text().replace(/,/g, ''));
      const profit = parseFloat($(profitCells[i]).text().replace(/,/g, ''));
      results.push({ year, quarter, revenue, profit });
    }
    return results;
  } catch (err) {
    console.error(`Error fetching data for ${symbol}:`, err.message);
    return [];
  }
}

async function main() {
  const stocks = JSON.parse(fs.readFileSync(stocksPath, 'utf-8'));
  for (const stock of stocks) {
    console.log(`Fetching data for ${stock.symbol}...`);
    stock.quarters = await fetchQuarterlyResults(stock.symbol);
    // Optional: Add a delay to avoid hammering the server
    await new Promise((r) => setTimeout(r, 1500));
  }
  fs.writeFileSync(outputPath, JSON.stringify(stocks, null, 2));
  console.log('Done! Data saved to', outputPath);
}

main().then(() => {
  // After enrichment, copy enriched data to stocks.json
  fs.copyFileSync(outputPath, stocksPath);
  console.log('stocks_enriched.json copied to stocks.json');
});