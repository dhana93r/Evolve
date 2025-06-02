// Utility to format numbers as rupee currency
export function formatRupee(value, options = {}) {
  if (value === null || value === undefined || isNaN(value)) return "-";
  const { minimumFractionDigits = 0, maximumFractionDigits = 2 } = options;
  return value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits,
    maximumFractionDigits,
    currencyDisplay: "symbol",
  });
}
