/**
 * Calculate tax and total for a single line item
 * @param {number} qty - Quantity
 * @param {number} price - Unit price (ex-GST)
 * @param {number} rate - GST rate as decimal (e.g., 0.18 for 18%)
 * @returns {{ subtotal: number, gstAmount: number, cgst: number, sgst: number, total: number }}
 */
export function calcLineItem(qty, price, rate = 0.18) {
  const subtotal = (parseFloat(qty) || 0) * (parseFloat(price) || 0);
  const gstAmount = parseFloat((subtotal * rate).toFixed(2));
  return {
    subtotal,
    gstAmount,
    cgst: parseFloat((gstAmount / 2).toFixed(2)),
    sgst: parseFloat((gstAmount / 2).toFixed(2)),
    total: parseFloat((subtotal + gstAmount).toFixed(2)),
  };
}

/**
 * Calculate invoice-level totals with GST split (CGST/SGST for intra-state, IGST for inter-state)
 * @param {Array<{qty: number, price: number}>} items - Invoice line items
 * @param {number} gstRate - GST rate as percentage (5, 12, 18, or 28)
 * @param {string} gstType - "intra-state" (CGST+SGST) or "inter-state" (IGST)
 * @param {string} discountType - "flat" or "percentage" (optional)
 * @param {number} discountValue - Discount amount or percentage (optional)
 * @param {number} extraCharges - Extra charges like shipping (optional)
 * @returns {{ subtotal: number, discount: number, subtotalAfterDiscount: number, cgst: number, sgst: number, igst: number, totalGST: number, extraCharges: number, grandTotal: number }}
 */
export function calcTotalsWithGST(items, gstRate = 18, gstType = "intra-state", discountType = null, discountValue = 0, extraCharges = 0) {
  // Step 1: Calculate item subtotal
  const subtotal = items.reduce(
    (sum, i) => sum + (parseFloat(i.qty) || 0) * (parseFloat(i.price) || 0),
    0
  );

  // Step 2: Calculate discount
  let discount = 0;
  if (discountType === "flat") {
    discount = parseFloat(discountValue) || 0;
  } else if (discountType === "percentage") {
    discount = (subtotal * (parseFloat(discountValue) || 0)) / 100;
  }
  discount = parseFloat(discount.toFixed(2));

  // Step 3: Calculate subtotal after discount
  const subtotalAfterDiscount = parseFloat((subtotal - discount).toFixed(2));

  // Step 4: Calculate GST on discounted subtotal
  const rateDecimal = parseFloat(gstRate) / 100;
  const totalGST = parseFloat((subtotalAfterDiscount * rateDecimal).toFixed(2));

  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  if (gstType === "intra-state") {
    cgst = parseFloat((totalGST / 2).toFixed(2));
    sgst = parseFloat((totalGST / 2).toFixed(2));
  } else if (gstType === "inter-state") {
    igst = totalGST;
  }

  // Step 5: Parse extra charges
  const parsedExtraCharges = parseFloat(extraCharges) || 0;

  // Step 6: Calculate grand total
  const grandTotal = parseFloat((subtotalAfterDiscount + totalGST + parsedExtraCharges).toFixed(2));

  return {
    subtotal,
    discount,
    subtotalAfterDiscount,
    cgst,
    sgst,
    igst,
    totalGST,
    extraCharges: parsedExtraCharges,
    grandTotal
  };
}