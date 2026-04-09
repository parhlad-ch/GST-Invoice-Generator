"use client";

import { useState } from "react";
import { calcLineItem } from "@/utils/gst";
import { fmtINR } from "@/utils/format";

/* ── Tiny inline section-header component (used only here) ── */
function SectionHeader({ icon, title, accent = "#64748b" }) {
  return (
    <div className="form-section-header">
      <span
        className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
        style={{ background: "#f1f5f9" }}
      >
        {icon}
      </span>
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
        {title}
      </span>
    </div>
  );
}

export default function InvoiceForm({
  seller, updateSeller,
  customer, updateCustomer,
  items, totals, addItem, removeItem, updateItem,
  gstType, setGstType,
  gstRate, setGstRate,
  bankName, setBankName,
  accountNumber, setAccountNumber,
  ifsc, setIfsc,
  upi, setUpi,
  notes, setNotes,
  discountType, setDiscountType,
  discountValue, setDiscountValue,
  extraCharges, setExtraCharges,
  logo, setLogo,
  onReset = () => {}, onSave = () => {},
}) {
  const [currency] = useState("INR");

  const handleSave = () => {
    if (!customer.name || items.length === 0 || items.some(i => !i.name || !i.price)) {
      alert("Please fill in all required fields");
      return;
    }
    onSave?.({ customer, items, totals });
  };

  const handleUpdateItem = (id, field, value) => updateItem(id, field, value);

  /* ── Shared icon stroke colour ── */
  const iconStroke = "#94a3b8";

  return (
    <div className="flex flex-col gap-4">

      {/* ══════════════════════════════════════
          SECTION: COMPANY LOGO
      ══════════════════════════════════════ */}
      <div className="form-section">
        <SectionHeader
          icon={
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          }
          title="Company Logo"
        />
        <div className="form-section-body">
          <div className="flex items-center gap-4">
            {/* Preview */}
            <div
              className="w-20 h-20 rounded-xl border-2 border-dashed flex items-center justify-center flex-shrink-0 overflow-hidden"
              style={{ borderColor: "var(--border)", background: "var(--surface-3)" }}
            >
              {logo ? (
                <img src={logo} alt="Logo" className="max-w-full max-h-full object-contain" />
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              )}
            </div>

            {/* Controls */}
            <div className="flex-1 min-w-0">
              <input
                type="file"
                accept="image/png,image/jpeg,image/svg+xml"
                id="logo-upload"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => setLogo(ev.target?.result);
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <div className="flex items-center gap-2 flex-wrap">
                <label htmlFor="logo-upload" className="btn-outline cursor-pointer text-xs px-3 py-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  Upload Logo
                </label>
                {logo && (
                  <button
                    onClick={() => setLogo(null)}
                    className="btn-danger-outline text-xs px-3 py-2"
                  >
                    Remove
                  </button>
                )}
              </div>
              <p className="text-xs mt-2 mb-0" style={{ color: "var(--ink-3)" }}>
                PNG, JPG or SVG · Max 2 MB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          SECTION: SELLER & CLIENT
      ══════════════════════════════════════ */}
      <div className="form-section">
        <SectionHeader
          icon={
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          }
          title="Seller & Client Information"
        />
        <div className="form-section-body">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* SELLER (From) */}
            <div className="p-3 rounded-xl border border-blue-100 border-l-4 border-l-blue-500 bg-blue-50/40">
              <div className="flex items-center gap-1.5 mb-3">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">From — Seller</span>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="field-label">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="field-input"
                    placeholder="Your company name"
                    value={seller?.name || ""}
                    onChange={(e) => updateSeller("name", e.target.value)}
                  />
                </div>
                <div>
                  <label className="field-label">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="field-input"
                    placeholder="Street, City, State – PIN"
                    value={seller?.address || ""}
                    onChange={(e) => updateSeller("address", e.target.value)}
                    rows={3}
                    style={{ resize: "vertical" }}
                  />
                </div>
                <div>
                  <label className="field-label">GSTIN</label>
                  <input
                    type="text"
                    className="field-input"
                    placeholder="29AABCU1234B1Z0"
                    value={seller?.gstin || ""}
                    onChange={(e) => updateSeller("gstin", e.target.value.toUpperCase())}
                    style={{ fontFamily: "var(--font-dm-mono, monospace)" }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="field-label">Email</label>
                    <input
                      type="email"
                      className="field-input"
                      placeholder="you@company.com"
                      value={seller?.email || ""}
                      onChange={(e) => updateSeller("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="field-label">Phone</label>
                    <input
                      type="tel"
                      className="field-input"
                      placeholder="+91 12345 67890"
                      value={seller?.phone || ""}
                      onChange={(e) => updateSeller("phone", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CLIENT (To) */}
            <div className="p-3 rounded-xl border border-green-100 border-l-4 border-l-green-500 bg-green-50/40">
              <div className="flex items-center gap-1.5 mb-3">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span className="text-xs font-bold uppercase tracking-widest text-green-600">To — Client</span>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="field-label">
                    Client Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="field-input"
                    placeholder="Client or organisation name"
                    value={customer?.name || ""}
                    onChange={(e) => updateCustomer("name", e.target.value)}
                  />
                </div>
                <div>
                  <label className="field-label">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="field-input"
                    placeholder="Street, City, State – PIN"
                    value={customer?.address || ""}
                    onChange={(e) => updateCustomer("address", e.target.value)}
                    rows={3}
                    style={{ resize: "vertical" }}
                  />
                </div>
                <div>
                  <label className="field-label">GSTIN</label>
                  <input
                    type="text"
                    className="field-input"
                    placeholder="29AABCU1234B1Z0"
                    value={customer?.gstin || ""}
                    onChange={(e) => updateCustomer("gstin", e.target.value.toUpperCase())}
                    style={{ fontFamily: "var(--font-dm-mono, monospace)" }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="field-label">Email</label>
                    <input
                      type="email"
                      className="field-input"
                      placeholder="client@company.com"
                      value={customer?.email || ""}
                      onChange={(e) => updateCustomer("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="field-label">Phone</label>
                    <input
                      type="tel"
                      className="field-input"
                      placeholder="+91 98765 43210"
                      value={customer?.phone || ""}
                      onChange={(e) => updateCustomer("phone", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          SECTION: GST SETTINGS
      ══════════════════════════════════════ */}
      <div className="form-section">
        <SectionHeader
          icon={
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4l3 3"/>
            </svg>
          }
          title="GST Configuration"
        />
        <div className="form-section-body flex flex-col gap-4">

          {/* GST Type radio */}
          <div>
            <label className="field-label mb-2">
              GST Type <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3 flex-wrap">
              {[
                { val: "intra-state", label: "Intra-State", sub: "CGST + SGST" },
                { val: "inter-state", label: "Inter-State", sub: "IGST" },
              ].map(({ val, label, sub }) => (
                <label
                  key={val}
                  className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-[140px] p-3 rounded-lg border transition-all duration-150"
                  style={{
                    borderColor: gstType === val ? "var(--primary)" : "var(--border)",
                    background: gstType === val ? "var(--primary-light)" : "white",
                  }}
                >
                  <input
                    type="radio"
                    name="gstType"
                    value={val}
                    checked={gstType === val}
                    onChange={(e) => setGstType(e.target.value)}
                    style={{ accentColor: "var(--primary)", width: "16px", height: "16px" }}
                  />
                  <span>
                    <span className="block text-sm font-semibold text-slate-800">{label}</span>
                    <span className="block text-xs text-slate-500">{sub}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* GST Rate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="field-label">
                GST Rate <span className="text-red-500">*</span>
              </label>
              <select
                className="field-input"
                value={gstRate}
                onChange={(e) => setGstRate(parseInt(e.target.value))}
              >
                <option value={0}>0% GST (Exempt)</option>
                <option value={5}>5% GST</option>
                <option value={12}>12% GST</option>
                <option value={18}>18% GST</option>
                <option value={28}>28% GST</option>
              </select>
            </div>
            <div
              className="flex items-center p-3 rounded-lg text-xs"
              style={{ background: "var(--surface-3)", color: "var(--ink-2)" }}
            >
              <div>
                <div className="font-semibold mb-0.5" style={{ color: "var(--ink)" }}>
                  {gstType === "intra-state"
                    ? `CGST ${gstRate / 2}% + SGST ${gstRate / 2}% = ${gstRate}%`
                    : `IGST ${gstRate}%`}
                </div>
                <div style={{ color: "var(--ink-3)" }}>
                  {gstType === "intra-state"
                    ? "Same-state transaction"
                    : "Cross-state transaction"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          SECTION: DISCOUNT & EXTRA CHARGES
      ══════════════════════════════════════ */}
      <div className="form-section">
        <SectionHeader
          icon={
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="2">
              <line x1="19" y1="5" x2="5" y2="19"/>
              <circle cx="6.5" cy="6.5" r="2.5"/>
              <circle cx="17.5" cy="17.5" r="2.5"/>
            </svg>
          }
          title="Discount & Extra Charges"
        />
        <div className="form-section-body">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Discount Type */}
            <div>
              <label className="field-label">Discount Type</label>
              <select
                className="field-input"
                value={discountType || ""}
                onChange={(e) => setDiscountType(e.target.value || null)}
              >
                <option value="">None</option>
                <option value="flat">Flat Amount (₹)</option>
                <option value="percentage">Percentage (%)</option>
              </select>
            </div>

            {/* Discount Value */}
            <div>
              <label className="field-label">
                Discount {discountType === "flat" ? "(₹)" : discountType === "percentage" ? "(%)" : ""}
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                disabled={!discountType}
                className="field-input"
                style={{
                  fontFamily: "var(--font-dm-mono, monospace)",
                  opacity: discountType ? 1 : 0.5,
                }}
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
              />
            </div>

            {/* Extra Charges */}
            <div>
              <label className="field-label">
                Extra Charges (₹)
                <span className="ml-1 font-normal" style={{ color: "var(--ink-3)" }}>e.g. Shipping</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="field-input"
                style={{ fontFamily: "var(--font-dm-mono, monospace)" }}
                value={extraCharges}
                onChange={(e) => setExtraCharges(e.target.value)}
              />
            </div>
          </div>

          {/* Summary pill */}
          {(discountType && parseFloat(discountValue) > 0) || parseFloat(extraCharges) > 0 ? (
            <div
              className="mt-3 p-2.5 rounded-lg flex items-center gap-4 flex-wrap text-xs"
              style={{ background: "var(--surface-3)" }}
            >
              {discountType && parseFloat(discountValue) > 0 && (
                <span>
                  <span style={{ color: "var(--ink-3)" }}>Discount: </span>
                  <strong className="text-red-600">
                    {discountType === "flat" ? fmtINR(parseFloat(discountValue)) : `${discountValue}%`}
                  </strong>
                </span>
              )}
              {parseFloat(extraCharges) > 0 && (
                <span>
                  <span style={{ color: "var(--ink-3)" }}>Extra: </span>
                  <strong style={{ color: "var(--warning)" }}>+{fmtINR(parseFloat(extraCharges))}</strong>
                </span>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* ══════════════════════════════════════
          SECTION: BANK DETAILS
      ══════════════════════════════════════ */}
      <div className="form-section">
        <SectionHeader
          icon={
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
          }
          title="Payment Details"
        />
        <div className="form-section-body flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="field-label">Bank Name</label>
              <input
                type="text"
                className="field-input"
                placeholder="e.g. State Bank of India"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
            <div>
              <label className="field-label">Account Number</label>
              <input
                type="text"
                className="field-input"
                placeholder="Account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                style={{ fontFamily: "var(--font-dm-mono, monospace)" }}
              />
            </div>
            <div>
              <label className="field-label">IFSC Code</label>
              <input
                type="text"
                className="field-input"
                placeholder="SBIN0001234"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                style={{ fontFamily: "var(--font-dm-mono, monospace)" }}
              />
            </div>
            <div>
              <label className="field-label">UPI ID</label>
              <input
                type="text"
                className="field-input"
                placeholder="yourname@upi"
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
                style={{ fontFamily: "var(--font-dm-mono, monospace)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          SECTION: NOTES / T&C
      ══════════════════════════════════════ */}
      <div className="form-section">
        <SectionHeader
          icon={
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          }
          title="Notes / Terms & Conditions"
        />
        <div className="form-section-body">
          <textarea
            className="field-input"
            rows={5}
            placeholder="Enter payment terms, T&C or additional notes…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ resize: "vertical" }}
          />
        </div>
      </div>

      {/* ══════════════════════════════════════
          SECTION: INVOICE ITEMS
      ══════════════════════════════════════ */}
      <div className="form-section">
        <div className="form-section-header" style={{ justifyContent: "space-between" }}>
          <div className="flex items-center gap-2.5">
            <span
              className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
              style={{ background: "#f1f5f9" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#64748b" }}>
              Invoice Items
            </span>
          </div>
          <span className="text-xs font-medium" style={{ color: "var(--ink-3)" }}>
            {items.length} item{items.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Items table */}
        <div
          className="table-responsive"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "820px" }}>
            <thead>
              <tr style={{ background: "var(--surface-3)", borderBottom: "2px solid var(--border)" }}>
                {[
                  { label: "#",              w: "4%",  align: "center" },
                  { label: "Service / Item", w: "30%", align: "left"   },
                  { label: "HSN / SAC",      w: "14%", align: "center" },
                  { label: "Qty",            w: "8%",  align: "center" },
                  { label: `Rate (${currency})`,   w: "14%", align: "right"  },
                  { label: `Amount (${currency})`, w: "14%", align: "right"  },
                  { label: "Action",         w: "16%", align: "center" },
                ].map((col) => (
                  <th
                    key={col.label}
                    style={{
                      padding: "10px 12px",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--ink-3)",
                      textAlign: col.align,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      width: col.w,
                    }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => {
                const { subtotal } = calcLineItem(item.qty, item.price, (item.gst ?? 18) / 100);
                return (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: "1px solid var(--border)",
                      background: idx % 2 === 1 ? "var(--surface-3)" : "white",
                    }}
                  >
                    {/* # */}
                    <td style={{ padding: "10px 12px", textAlign: "center" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "22px",
                          height: "22px",
                          borderRadius: "6px",
                          background: "var(--surface-3)",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "var(--ink-3)",
                        }}
                      >
                        {idx + 1}
                      </span>
                    </td>

                    {/* Name */}
                    <td style={{ padding: "10px 12px" }}>
                      <input
                        type="text"
                        placeholder="Service or item description"
                        value={item.name}
                        onChange={(e) => handleUpdateItem(item.id, "name", e.target.value)}
                        className="field-input"
                        style={{ minWidth: "140px" }}
                      />
                    </td>

                    {/* HSN */}
                    <td style={{ padding: "10px 12px" }}>
                      <input
                        type="text"
                        placeholder="HSN"
                        value={item.hsn || ""}
                        onChange={(e) => handleUpdateItem(item.id, "hsn", e.target.value.toUpperCase())}
                        maxLength={8}
                        className="field-input text-center"
                        style={{ fontFamily: "var(--font-dm-mono, monospace)" }}
                      />
                    </td>

                    {/* Qty */}
                    <td style={{ padding: "10px 12px" }}>
                      <input
                        type="number"
                        min="1"
                        placeholder="1"
                        value={item.qty}
                        onChange={(e) => handleUpdateItem(item.id, "qty", parseInt(e.target.value) || 1)}
                        className="field-input text-center"
                        style={{ fontFamily: "var(--font-dm-mono, monospace)",width: "80px" }}
                      />
                    </td>

                    {/* Rate */}
                    <td style={{ padding: "10px 12px" }}>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={item.price}
                        onChange={(e) => handleUpdateItem(item.id, "price", parseFloat(e.target.value) || "")}
                        className="field-input text-right"
                        style={{ fontFamily: "var(--font-dm-mono, monospace)" }}
                      />
                    </td>

                    {/* Amount */}
                    <td style={{ padding: "10px 12px" }}>
                      <div
                        className="text-right text-sm font-bold"
                        style={{
                          padding: "8px 10px",
                          borderRadius: "var(--radius-sm)",
                          background: "var(--primary-light)",
                          color: "var(--primary)",
                          fontFamily: "var(--font-dm-mono, monospace)",
                        }}
                      >
                        {fmtINR(subtotal)}
                      </div>
                    </td>

                    {/* Delete */}
                    <td style={{ padding: "10px 12px", textAlign: "center" }}>
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        title={items.length === 1 ? "Cannot delete the last item" : "Delete item"}
                        className={items.length === 1 ? "" : "btn-danger-outline"}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "6px 10px",
                          borderRadius: "var(--radius-sm)",
                          fontSize: "12px",
                          fontWeight: 600,
                          cursor: items.length === 1 ? "not-allowed" : "pointer",
                          opacity: items.length === 1 ? 0.4 : 1,
                          background: items.length === 1 ? "var(--surface-3)" : undefined,
                          color: items.length === 1 ? "var(--ink-3)" : undefined,
                          border: items.length === 1 ? "1px solid var(--border)" : undefined,
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Add item */}
        <div className="p-4 flex items-center gap-3">
          <button
            onClick={addItem}
            className="btn-outline text-sm px-4 py-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add New Item
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════
          ACTION BUTTONS
      ══════════════════════════════════════ */}
      <div
        className="flex gap-3 pt-2"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <button
          onClick={onReset}
          className="btn-secondary flex-1"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
          </svg>
          Reset
        </button>
        <button
          onClick={handleSave}
          className="btn-success flex-1"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          Save Invoice
        </button>
      </div>

    </div>
  );
}
