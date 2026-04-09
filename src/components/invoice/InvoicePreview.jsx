import { useState } from "react";
import { calcLineItem } from "@/utils/gst";
import { fmtINR } from "@/utils/format";
import UPIQRCode from "./UPIQRCode";

export default function InvoicePreview({
  invoiceNo, date, dueDate,
  seller, customer,
  items, totals,
  gstType, gstRate,
  onInvoiceNoChange, onDateChange,
  bankName, accountNumber, ifscCode, upiId,
  discountType,
  logo, notes,
}) {
  const invoiceNumber = invoiceNo || "INV-2026-0001";
  const [invoiceDate, setInvoiceDate] = useState(
    date || new Date().toISOString().split("T")[0]
  );

  const handleInvoiceNoChange = (e) => onInvoiceNoChange?.(e.target.value);

  const handleDateChange = (e) => {
    setInvoiceDate(e.target.value);
    onDateChange?.(e.target.value);
  };

  const hasPaymentDetails = bankName || accountNumber || ifscCode || upiId;

  /* ── Shared style tokens (keeps JSX clean) ── */
  const labelStyle = {
    fontSize: "10px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "#94a3b8",
    marginBottom: "4px",
  };
  const valueStyle = {
    fontSize: "13px",
    fontWeight: 600,
    color: "#0f172a",
    fontFamily: "var(--font-open-sans, 'Open Sans'), sans-serif",
  };
  const monoStyle = {
    fontFamily: "var(--font-dm-mono, 'DM Mono'), monospace",
  };

  return (
    <div className="w-full break-inside-avoid">
      <div
        id="invoice-preview"
        className="bg-white break-inside-avoid overflow-hidden"
        style={{ fontFamily: "var(--font-open-sans, 'Open Sans'), sans-serif" }}
      >

        {/* ── Accent stripe ── */}
        <div style={{ height: "5px", background: "linear-gradient(90deg, #2563eb 0%, #6366f1 100%)" }} />

        {/* ══════════════════════════════════════════
            HEADER — Invoice title + company
        ══════════════════════════════════════════ */}
        <div style={{ padding: "32px 40px 24px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>

            {/* Left: INVOICE heading + number */}
            <div>
              <div style={{ fontSize: "28px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px", lineHeight: 1 }}>
                INVOICE
              </div>
              <input
                type="text"
                value={invoiceNumber}
                onChange={handleInvoiceNoChange}
                placeholder="INV-2026-0001"
                style={{
                  marginTop: "6px",
                  fontSize: "13px",
                  color: "#94a3b8",
                  ...monoStyle,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  padding: 0,
                  width: "180px",
                }}
              />
            </div>

            {/* Right: Logo + company */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", textAlign: "right" }}>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>
                  {seller?.name || "Your Company"}
                </div>
                {seller?.email && (
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>{seller.email}</div>
                )}
                {seller?.phone && (
                  <div style={{ fontSize: "11px", color: "#94a3b8" }}>{seller.phone}</div>
                )}
              </div>
              {logo ? (
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "52px", height: "52px", objectFit: "contain", borderRadius: "10px", border: "1px solid #f1f5f9" }}
                />
              ) : (
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "10px",
                  background: "#eff6ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Dates + status row */}
          <div
            style={{
              marginTop: "24px",
              paddingTop: "18px",
              borderTop: "1px solid #f1f5f9",
              display: "flex",
              alignItems: "center",
              gap: "32px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={labelStyle}>Issue Date</div>
              <input
                type="date"
                value={invoiceDate}
                onChange={handleDateChange}
                style={{ ...valueStyle, background: "transparent", border: "none", outline: "none", padding: 0, cursor: "pointer" }}
              />
            </div>
            {dueDate && (
              <div>
                <div style={labelStyle}>Due Date</div>
                <div style={valueStyle}>{dueDate}</div>
              </div>
            )}
            <div style={{ marginLeft: "auto" }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 10px",
                borderRadius: "20px",
                background: "#fffbeb",
                border: "1px solid #fde68a",
                fontSize: "11px",
                fontWeight: 700,
                color: "#b45309",
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
                Payment Pending
              </span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            FROM / TO — sender & recipient
        ══════════════════════════════════════════ */}
        <div style={{ padding: "0 40px 24px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            background: "#f8fafc",
            borderRadius: "12px",
            padding: "20px",
          }}>
            {/* From */}
            <div>
              <div style={{ ...labelStyle, color: "#2563eb", display: "flex", alignItems: "center", gap: "5px" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                From
              </div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>
                {seller?.name || "Your Company"}
              </div>
              {seller?.address && (
                <div style={{ fontSize: "11px", color: "#64748b", lineHeight: "1.6" }}>{seller.address}</div>
              )}
              {seller?.gstin && (
                <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "6px", ...monoStyle }}>
                  GSTIN: {seller.gstin}
                </div>
              )}
            </div>

            {/* Bill To */}
            <div>
              <div style={{ ...labelStyle, color: "#16a34a", display: "flex", alignItems: "center", gap: "5px" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Bill To
              </div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>
                {customer?.name || "Client Name"}
              </div>
              {customer?.address && (
                <div style={{ fontSize: "11px", color: "#64748b", lineHeight: "1.6" }}>{customer.address}</div>
              )}
              {customer?.gstin && (
                <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "6px", ...monoStyle }}>
                  GSTIN: {customer.gstin}
                </div>
              )}
              {customer?.email && (
                <div style={{ fontSize: "10px", color: "#94a3b8" }}>{customer.email}</div>
              )}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            ITEMS TABLE
        ══════════════════════════════════════════ */}
        <div style={{ padding: "0 40px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderRadius: "8px" }}>
                {[
                  { label: "Item / Service", align: "left",   w: "38%" },
                  { label: "HSN",            align: "center", w: "12%" },
                  { label: "Qty",            align: "center", w: "8%"  },
                  { label: "Rate",           align: "right",  w: "14%" },
                  { label: "Amount",         align: "right",  w: "14%" },
                ].map((col) => (
                  <th
                    key={col.label}
                    style={{
                      padding: "10px 12px",
                      textAlign: col.align,
                      width: col.w,
                      fontSize: "10px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "#94a3b8",
                      borderBottom: "2px solid #f1f5f9",
                    }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    style={{ padding: "40px", textAlign: "center", color: "#cbd5e1", fontSize: "13px" }}
                  >
                    No items added yet
                  </td>
                </tr>
              ) : (
                items.map((item, idx) => {
                  const { subtotal } = calcLineItem(item.qty, item.price, (item.gst ?? 18) / 100);
                  return (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: "1px solid #f8fafc",
                        background: idx % 2 === 1 ? "#fafbfc" : "transparent",
                      }}
                    >
                      <td style={{ padding: "12px", fontSize: "13px", fontWeight: 500, color: "#0f172a" }}>
                        {item.name || "—"}
                      </td>
                      <td style={{ padding: "12px", textAlign: "center", fontSize: "11px", color: "#64748b", ...monoStyle }}>
                        {item.hsn || "—"}
                      </td>
                      <td style={{ padding: "12px", textAlign: "center", fontSize: "13px", color: "#475569", ...monoStyle }}>
                        {item.qty}
                      </td>
                      <td style={{ padding: "12px", textAlign: "right", fontSize: "13px", color: "#475569", ...monoStyle }}>
                        {fmtINR(item.price)}
                      </td>
                      <td style={{ padding: "12px", textAlign: "right", fontSize: "13px", fontWeight: 700, color: "#0f172a", ...monoStyle }}>
                        {fmtINR(subtotal)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ══════════════════════════════════════════
            TOTALS SECTION
        ══════════════════════════════════════════ */}
        <div style={{ padding: "16px 40px 32px", display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: "280px" }}>

            {/* Subtotal */}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: "13px", color: "#64748b" }}>Subtotal</span>
              <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: 600, ...monoStyle }}>
                {fmtINR(totals?.subtotal || 0)}
              </span>
            </div>

            {/* Discount */}
            {discountType && (totals?.discount || 0) > 0 && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <span style={{ fontSize: "13px", color: "#64748b" }}>
                    Discount ({discountType === "flat" ? "₹" : "%"})
                  </span>
                  <span style={{ fontSize: "13px", color: "#dc2626", fontWeight: 600, ...monoStyle }}>
                    −{fmtINR(totals?.discount || 0)}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <span style={{ fontSize: "12px", color: "#94a3b8" }}>After Discount</span>
                  <span style={{ fontSize: "12px", color: "#64748b", ...monoStyle }}>
                    {fmtINR(totals?.subtotalAfterDiscount || 0)}
                  </span>
                </div>
              </>
            )}

            {/* GST */}
            {gstType === "intra-state" ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <span style={{ fontSize: "13px", color: "#64748b" }}>CGST ({gstRate / 2}%)</span>
                  <span style={{ fontSize: "13px", color: "#475569", ...monoStyle }}>{fmtINR(totals?.cgst || 0)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <span style={{ fontSize: "13px", color: "#64748b" }}>SGST ({gstRate / 2}%)</span>
                  <span style={{ fontSize: "13px", color: "#475569", ...monoStyle }}>{fmtINR(totals?.sgst || 0)}</span>
                </div>
              </>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: "13px", color: "#64748b" }}>IGST ({gstRate}%)</span>
                <span style={{ fontSize: "13px", color: "#475569", ...monoStyle }}>{fmtINR(totals?.igst || 0)}</span>
              </div>
            )}

            {/* Extra charges */}
            {(totals?.extraCharges || 0) > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: "13px", color: "#64748b" }}>Extra Charges</span>
                <span style={{ fontSize: "13px", color: "#d97706", fontWeight: 600, ...monoStyle }}>
                  +{fmtINR(totals?.extraCharges || 0)}
                </span>
              </div>
            )}

            {/* Grand total — highlighted box */}
            <div style={{
              marginTop: "12px",
              padding: "14px 16px",
              background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>
                Total Due
              </span>
              <span style={{ fontSize: "22px", fontWeight: 800, color: "white", ...monoStyle }}>
                {fmtINR(totals?.grandTotal || 0)}
              </span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            PAYMENT DETAILS + NOTES + SIGNATURE
        ══════════════════════════════════════════ */}
        <div style={{ borderTop: "1px solid #f1f5f9" }} />
        <div style={{ padding: "24px 40px 32px" }}>

          {/* Payment method grid */}
          {hasPaymentDetails && (
            <div style={{ marginBottom: "20px" }}>
              <div style={{ ...labelStyle, marginBottom: "12px" }}>Payment Method</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px" }}>
                {bankName && (
                  <div>
                    <div style={{ fontSize: "10px", color: "#94a3b8", marginBottom: "2px" }}>Bank Name</div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a" }}>{bankName}</div>
                  </div>
                )}
                {seller?.name && (
                  <div>
                    <div style={{ fontSize: "10px", color: "#94a3b8", marginBottom: "2px" }}>Account Name</div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a" }}>{seller.name}</div>
                  </div>
                )}
                {accountNumber && (
                  <div>
                    <div style={{ fontSize: "10px", color: "#94a3b8", marginBottom: "2px" }}>Account Number</div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a", ...monoStyle }}>{accountNumber}</div>
                  </div>
                )}
                {ifscCode && (
                  <div>
                    <div style={{ fontSize: "10px", color: "#94a3b8", marginBottom: "2px" }}>IFSC Code</div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a", ...monoStyle }}>{ifscCode}</div>
                  </div>
                )}
                {upiId && (
                  <div>
                    <div style={{ fontSize: "10px", color: "#94a3b8", marginBottom: "2px" }}>UPI ID</div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a", ...monoStyle }}>{upiId}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* UPI QR code */}
          {upiId && totals?.grandTotal && (
            <div style={{ marginBottom: "20px" }}>
              <UPIQRCode
                upiId={upiId}
                amount={totals.grandTotal}
                sellerName={seller?.name}
                invoiceNo={invoiceNo}
              />
            </div>
          )}

          {/* Notes */}
          {notes && (
            <div style={{
              padding: "14px 16px",
              background: "#f8fafc",
              borderRadius: "10px",
              borderLeft: "3px solid #bfdbfe",
              marginBottom: "20px",
            }}>
              <p style={{ margin: 0, fontSize: "12px", color: "#475569", lineHeight: "1.7", whiteSpace: "pre-wrap" }}>
                <strong style={{ color: "#0f172a" }}>Note: </strong>
                {notes}
              </p>
            </div>
          )}

          {/* Signature block */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ textAlign: "right", minWidth: "160px" }}>
              <div style={{ height: "48px", borderBottom: "1.5px solid #cbd5e1", marginBottom: "8px" }} />
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>
                {seller?.name || "Authorized Signatory"}
              </div>
              {seller?.gstin && (
                <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "2px", ...monoStyle }}>
                  GSTIN: {seller.gstin}
                </div>
              )}
              <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "1px" }}>Authorized Signatory</div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{
          borderTop: "1px solid #f1f5f9",
          padding: "12px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{ fontSize: "10px", color: "#cbd5e1" }}>
            Computer-generated invoice · No physical signature required
          </span>
          <span style={{ fontSize: "10px", color: "#2563eb", fontWeight: 600 }}>
            GST Invoice Generator
          </span>
        </div>
      </div>

      <style>{`
        input[type="date"] { color-scheme: light; }
        input[type="date"]::-webkit-calendar-picker-indicator { opacity: 0.4; cursor: pointer; }
        #invoice-preview input:focus { outline: none; }
      `}</style>
    </div>
  );
}
