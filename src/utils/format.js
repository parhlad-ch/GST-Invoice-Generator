/**
 * Format a number as Indian ₹ currency
 * @param {number} n - Amount to format
 * @returns {string} Formatted currency string (e.g., "₹1,234.56")
 */
export const fmtINR = (n) =>
  "₹" + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/**
 * Format date in Indian locale
 * @param {Date} [date=new Date()] - Date to format
 * @returns {string} Formatted date (e.g., "20 March 2026")
 */
export const fmtDate = (date = new Date()) =>
  date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

/**
 * Add days to a date
 * @param {Date} date - Starting date
 * @param {number} days - Number of days to add
 * @returns {Date} New date with days added
 */
export const addDays = (date, days) =>
  new Date(date.getTime() + days * 86_400_000);

/**
 * Generate a unique invoice number
 * @returns {string} Invoice number (e.g., "INV-2026-0042")
 */
export const genInvoiceNo = () => {
  const y = new Date().getFullYear();
  const n = String(Math.floor(Math.random() * 999) + 1).padStart(4, "0");
  return `INV-${y}-${n}`;
};