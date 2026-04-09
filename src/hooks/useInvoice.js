import { useState, useCallback, useMemo, useEffect } from "react";
import { calcTotalsWithGST } from "@/utils/gst";
import { genInvoiceNo, fmtDate, addDays } from "@/utils/format";
import { DEFAULT_SELLER } from "@/constants/invoice";
/** @typedef {import("@/types").InvoiceHookReturn} InvoiceHookReturn */

const makeItem = (id) => ({ id, name: "", qty: 1, price: "", gst: 18 });

/**
 * Custom hook for managing invoice state and calculations
 * @returns {InvoiceHookReturn} Invoice state and methods
 */
export function useInvoice() {
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Initialize dates and invoice number only on client to avoid hydration mismatch
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setInvoiceNo(genInvoiceNo());
    setDate(fmtDate());
    setDueDate(fmtDate(addDays(new Date(), 30)));
  }, []);

  // ── Invoice Parties ──
  const [seller, setSeller] = useState(DEFAULT_SELLER);
  const [customer, setCustomer] = useState({ name: "", address: "", gstin: "", state: "" });

  // ── Logo ──
  const [logo, setLogo] = useState(null); // base64 string or null

  // ── Line Items ──
  const [items, setItems] = useState([makeItem(1)]);
  const [nextId, setNextId] = useState(2);

  // ── GST Configuration ──
  const [gstType, setGstType] = useState("intra-state"); // "intra-state" | "inter-state"
  const [gstRate, setGstRate] = useState(18); // 5 | 12 | 18 | 28

  // ── Bank Details & Notes ──
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [upi, setUpi] = useState("");
  const [notes, setNotes] = useState("");

  // ── Discount & Extra Charges ──
  const [discountType, setDiscountType] = useState(null); // "flat" | "percentage" | null
  const [discountValue, setDiscountValue] = useState(0);
  const [extraCharges, setExtraCharges] = useState(0);

  // ── Field Updaters (stable references via useCallback) ──
  const updateCustomer = useCallback((field, value) =>
    setCustomer((prev) => ({ ...prev, [field]: value })), []);

  const updateSeller = useCallback((field, value) =>
    setSeller((prev) => ({ ...prev, [field]: value })), []);

  const updateItem = useCallback((id, field, value) =>
    setItems((prev) =>
      prev.map((item) => item.id === id ? { ...item, [field]: value } : item)
    ), []);

  const addItem = useCallback(() => {
    setItems((prev) => [...prev, makeItem(nextId)]);
    setNextId((n) => n + 1);
  }, [nextId]);

  const removeItem = useCallback((id) =>
    setItems((prev) => (prev.length > 1 ? prev.filter((i) => i.id !== id) : prev)),
    []);

  const resetInvoice = useCallback(() => {
    setCustomer({ name: "", address: "", gstin: "", state: "" });
    setItems([makeItem(1)]);
    setNextId(2);
    setBankName("");
    setAccountNumber("");
    setIfsc("");
    setUpi("");
    setNotes("");
    setDiscountType(null);
    setDiscountValue(0);
    setExtraCharges(0);
    setLogo(null);
  }, []);

  // ── Derived Totals (memoized, only recalculated when dependencies change) ──
  const totals = useMemo(
    () => calcTotalsWithGST(items, gstRate, gstType, discountType, discountValue, extraCharges),
    [items, gstRate, gstType, discountType, discountValue, extraCharges]
  );

  return {
    invoiceNo,
    date,
    dueDate,
    seller,
    updateSeller,
    customer,
    updateCustomer,
    items,
    addItem,
    removeItem,
    updateItem,
    gstType,
    setGstType,
    gstRate,
    setGstRate,
    bankName,
    setBankName,
    accountNumber,
    setAccountNumber,
    ifsc,
    setIfsc,
    upi,
    setUpi,
    notes,
    setNotes,
    discountType,
    setDiscountType,
    discountValue,
    setDiscountValue,
    extraCharges,
    setExtraCharges,
    logo,
    setLogo,
    totals,
    resetInvoice,
  };
}
