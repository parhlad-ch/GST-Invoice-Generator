"use client";

import { useState } from "react";
import { useInvoice } from "@/hooks/useInvoice";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import InvoicePreview from "@/components/invoice/InvoicePreview";

export default function Home() {
  const invoice = useInvoice();
  const [title, setTitle] = useState("INV-2026");
  const [saved, setSaved] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    invoice.resetInvoice();
  };

  const handlePrint = () => {
    setTimeout(() => window.print(), 100);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>

      {/* ── Header ── */}
      <header
        className="no-print sticky top-0 z-30 w-full border-b"
        style={{
          background: "white",
          borderColor: "var(--border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div
          className="mx-auto px-4 sm:px-6 lg:px-8"
          style={{ maxWidth: "1800px" }}
        >
          <div className="flex items-center gap-3 py-3">

            {/* Brand mark */}
            <div className="flex items-center gap-2.5 flex-shrink-0 mr-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--primary)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <span className="hidden sm:block text-sm font-bold text-slate-700">GST Invoice</span>
            </div>

            {/* Invoice number input */}
            <div className="flex-1 min-w-0 max-w-xs">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Invoice number"
                className="field-input font-semibold text-slate-800"
                style={{ fontFamily: "var(--font-dm-mono, 'DM Mono'), monospace" }}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                className="btn-secondary no-print hidden sm:inline-flex"
                onClick={handleSave}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
                <span>Save draft</span>
              </button>

              <button
                className="btn-primary no-print"
                onClick={handlePrint}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 6 2 18 2 18 9"/>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                  <rect x="6" y="14" width="12" height="8"/>
                </svg>
                <span className="hidden sm:inline">Print / Download PDF</span>
                <span className="sm:hidden">PDF</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Save notification ── */}
      {saved && (
        <div
          className="no-print fixed top-20 right-4 sm:right-6 z-50 flex items-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-xl animate-slide-in"
          style={{ background: "var(--success)", boxShadow: "var(--shadow)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Draft saved
        </div>
      )}

      {/* ── Main two-column layout ── */}
      <main
        className="mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        <div className="row g-5">

          {/* LEFT: Form */}
          <div className="col-12 col-lg-6 no-print">
            <div
              className="card card-hover"
              style={{ boxShadow: "var(--shadow)" }}
            >
              {/* Card header */}
              <div
                className="px-6 py-4 flex items-center gap-2.5 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--primary-light)" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </div>
                <span className="text-sm font-bold text-slate-700">Invoice Builder</span>
              </div>

              {/* Form body */}
              <div className="p-5 sm:p-6 mobile-p">
                <InvoiceForm
                  seller={invoice.seller}
                  updateSeller={invoice.updateSeller}
                  customer={invoice.customer}
                  updateCustomer={invoice.updateCustomer}
                  items={invoice.items}
                  totals={invoice.totals}
                  addItem={invoice.addItem}
                  removeItem={invoice.removeItem}
                  updateItem={invoice.updateItem}
                  gstType={invoice.gstType}
                  setGstType={invoice.setGstType}
                  gstRate={invoice.gstRate}
                  setGstRate={invoice.setGstRate}
                  bankName={invoice.bankName}
                  setBankName={invoice.setBankName}
                  accountNumber={invoice.accountNumber}
                  setAccountNumber={invoice.setAccountNumber}
                  ifsc={invoice.ifsc}
                  setIfsc={invoice.setIfsc}
                  upi={invoice.upi}
                  setUpi={invoice.setUpi}
                  notes={invoice.notes}
                  setNotes={invoice.setNotes}
                  discountType={invoice.discountType}
                  setDiscountType={invoice.setDiscountType}
                  discountValue={invoice.discountValue}
                  setDiscountValue={invoice.setDiscountValue}
                  extraCharges={invoice.extraCharges}
                  setExtraCharges={invoice.setExtraCharges}
                  logo={invoice.logo}
                  setLogo={invoice.setLogo}
                  onReset={handleReset}
                  onSave={handleSave}
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Preview */}
          <div className="preview-col col-lg-6 print-area">
            <div
              className="card card-hover sticky"
              style={{boxShadow: "var(--shadow)" }}
            >
              {/* Preview label */}
              <div
                className="no-print px-6 py-3.5 flex items-center gap-2 border-b"
                style={{ borderColor: "var(--border)", background: "var(--primary-light)" }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: "var(--primary)" }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ background: "var(--primary)" }}
                  />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
                  Live Preview
                </span>
              </div>

              <InvoicePreview
                invoiceNo={title}
                date={invoice.date}
                dueDate={invoice.dueDate}
                seller={invoice.seller}
                customer={invoice.customer}
                items={invoice.items}
                totals={invoice.totals}
                gstType={invoice.gstType}
                gstRate={invoice.gstRate}
                bankName={invoice.bankName}
                accountNumber={invoice.accountNumber}
                ifscCode={invoice.ifsc}
                upiId={invoice.upi}
                discountType={invoice.discountType}
                discountValue={invoice.discountValue}
                extraCharges={invoice.extraCharges}
                logo={invoice.logo}
                notes={invoice.notes}
                onInvoiceNoChange={(value) => setTitle(value)}
                onDateChange={(value) => {}}
              />
            </div>
          </div>

        </div>
      </main>

      {/* ── Mobile: floating Live Preview button ── */}
      <button
        className="no-print d-lg-none btn-primary"
        onClick={() => setPreviewOpen(true)}
        style={{
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 40,
          boxShadow: "var(--shadow-lg)",
          borderRadius: "100px",
          padding: "12px 24px",
          whiteSpace: "nowrap",
        }}
      >
        <span className="relative flex h-2 w-2">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ background: "rgba(255,255,255,0.7)" }}
          />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "white" }} />
        </span>
        Live Preview
      </button>

      {/* ── Mobile: Preview modal ── */}
      {previewOpen && (
        <div
          className="no-print d-lg-none"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "rgba(15,23,42,0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setPreviewOpen(false); }}
        >
          {/* Modal panel */}
          <div
            style={{
              background: "white",
              margin: "0",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              borderRadius: "20px 20px 0 0",
              marginTop: "48px",
            }}
          >
            {/* Modal header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
              style={{ borderColor: "var(--border)", background: "var(--primary-light)" }}
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: "var(--primary)" }}
                  />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--primary)" }} />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
                  Live Preview
                </span>
              </div>
              <button
                onClick={() => setPreviewOpen(false)}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  border: "none",
                  background: "var(--surface-3)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--ink-2)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Scrollable preview */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              <InvoicePreview
                invoiceNo={title}
                date={invoice.date}
                dueDate={invoice.dueDate}
                seller={invoice.seller}
                customer={invoice.customer}
                items={invoice.items}
                totals={invoice.totals}
                gstType={invoice.gstType}
                gstRate={invoice.gstRate}
                bankName={invoice.bankName}
                accountNumber={invoice.accountNumber}
                ifscCode={invoice.ifsc}
                upiId={invoice.upi}
                discountType={invoice.discountType}
                discountValue={invoice.discountValue}
                extraCharges={invoice.extraCharges}
                logo={invoice.logo}
                notes={invoice.notes}
                onInvoiceNoChange={(value) => setTitle(value)}
                onDateChange={() => {}}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
