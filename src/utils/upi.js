/**
 * Generate UPI payment string for QR code
 * @param {string} upiId - UPI ID (e.g., user@bank)
 * @param {number} amount - Amount in rupees
 * @param {string} sellerName - Seller/Payee name
 * @param {string} description - Payment description/invoice number
 * @returns {string} UPI string ready for QR encoding
 */
export function generateUPIString(upiId, amount, sellerName = "", description = "") {
  if (!upiId) return null;

  const params = new URLSearchParams();
  params.append("pa", upiId); // Payee address (UPI ID)
  
  if (sellerName) {
    params.append("pn", sellerName.replace(/[&]/g, "")); // Payee name (alphanumeric)
  }
  
  if (amount && amount > 0) {
    params.append("am", amount.toFixed(2)); // Amount
  }
  
  if (description) {
    params.append("tn", description.replace(/[&]/g, "")); // Transaction note/description
  }

  // Transaction ref (optional, for tracking)
  params.append("tr", "INV");

  return `upi://pay?${params.toString()}`;
}

/**
 * Validate UPI ID format
 * @param {string} upiId - UPI ID to validate
 * @returns {boolean} True if valid UPI ID format
 */
export function isValidUPIId(upiId) {
  if (!upiId) return false;
  // Basic UPI ID regex: name@bankName (e.g., user@okhdfcbank)
  const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
  return upiRegex.test(upiId);
}
