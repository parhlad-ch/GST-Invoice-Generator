/**
 * Core type definitions for the GST Invoice Generator
 */

// ─────────────────────────────────────────────────────────────────────
// GST Types
// ─────────────────────────────────────────────────────────────────────

/** GST type: Intra-state (CGST + SGST) or Inter-state (IGST) */
export type GSTType = "intra-state" | "inter-state";

/** Valid GST rates in India */
export type GSTRate = 0 | 5 | 12 | 18 | 28;

// ─────────────────────────────────────────────────────────────────────
// Invoice Item
// ─────────────────────────────────────────────────────────────────────

export interface InvoiceItem {
  /** Unique item identifier */
  id: number;
  /** Item/service name */
  name: string;
  /** Quantity */
  qty: number;
  /** Unit price (ex-GST) */
  price: number | string;
  /** GST percentage (5, 12, 18, 28) */
  gst: GSTRate;
  /** HSN/SAC code (optional) */
  hsn?: string;
}

// ─────────────────────────────────────────────────────────────────────
// Party Information (Seller/Customer)
// ─────────────────────────────────────────────────────────────────────

export interface PartyInfo {
  /** Party name or company name */
  name: string;
  /** Physical address */
  address: string;
  /** GST Identification Number */
  gstin: string;
  /** State code (optional) */
  state?: string;
  /** Email address (optional) */
  email?: string;
}

// ─────────────────────────────────────────────────────────────────────
// Invoice Totals & Tax Breakdown
// ─────────────────────────────────────────────────────────────────────

export interface InvoiceTotals {
  /** Subtotal before tax */
  subtotal: number;
  /** CGST amount (intra-state only) */
  cgst: number;
  /** SGST amount (intra-state only) */
  sgst: number;
  /** IGST amount (inter-state only) */
  igst: number;
  /** Total GST amount */
  totalGST: number;
  /** Final total with tax included */
  grandTotal: number;
}

// ─────────────────────────────────────────────────────────────────────
// Line Item Tax Calculation
// ─────────────────────────────────────────────────────────────────────

export interface LineItemTotals {
  /** Amount before tax */
  subtotal: number;
  /** Tax amount for this item */
  gstAmount: number;
  /** CGST share (if intra-state) */
  cgst: number;
  /** SGST share (if intra-state) */
  sgst: number;
  /** Final amount with tax */
  total: number;
}

// ─────────────────────────────────────────────────────────────────────
// Bank Details & Notes
// ─────────────────────────────────────────────────────────────────────

export interface BankDetails {
  /** Bank name */
  bankName: string;
  /** Account number */
  accountNumber: string;
  /** IFSC code */
  ifsc: string;
  /** UPI ID */
  upi: string;
}

export interface InvoiceNotes {
  /** Payment terms and conditions */
  notes: string;
}

// ─────────────────────────────────────────────────────────────────────
// Field Updater Types
// ─────────────────────────────────────────────────────────────────────

export type UpdateField<T> = <K extends keyof T>(field: K, value: T[K]) => void;
export type UpdateItemField = (id: number, field: keyof InvoiceItem, value: any) => void;
export type RemoveItem = (id: number) => void;
export type AddItem = () => void;

// ─────────────────────────────────────────────────────────────────────
// Complete Invoice Hook Return Type
// ─────────────────────────────────────────────────────────────────────

export interface InvoiceHookReturn {
  // Invoice metadata
  invoiceNo: string;
  date: string;
  dueDate: string;

  // Seller information
  seller: PartyInfo;
  updateSeller: UpdateField<PartyInfo>;

  // Customer information
  customer: PartyInfo;
  updateCustomer: UpdateField<PartyInfo>;

  // Line items
  items: InvoiceItem[];
  addItem: AddItem;
  removeItem: RemoveItem;
  updateItem: UpdateItemField;

  // GST settings
  gstType: GSTType;
  setGstType: (type: GSTType) => void;
  gstRate: GSTRate;
  setGstRate: (rate: GSTRate) => void;

  // Bank details
  bankName: string;
  setBankName: (value: string) => void;
  accountNumber: string;
  setAccountNumber: (value: string) => void;
  ifsc: string;
  setIfsc: (value: string) => void;
  upi: string;
  setUpi: (value: string) => void;

  // Notes
  notes: string;
  setNotes: (value: string) => void;

  // Calculated totals
  totals: InvoiceTotals;
  
  // Reset functionality
  resetInvoice: () => void;
}
