"use client";

import { useState } from "react";
import AccordionSection from "./AccordionSection";
import LogoUploadBox from "./LogoUploadBox";

export default function InvoiceFormAccordion({
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
  invoiceNumber = "INV-2026",
  invoiceDate = new Date().toISOString().split('T')[0],
  dueDate = new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
  updateInvoiceNumber = () => {},
  updateInvoiceDate = () => {},
  updateDueDate = () => {},
  onReset = () => {},
  onSave = (data) => {},
}) {
  // Accordion state - Invoice Info and Items are open by default
  const [openSections, setOpenSections] = useState({
    invoiceInfo: true,
    logoUpload: false,
    sellerClient: false,
    gstSettings: false,
    discountCharges: false,
    paymentDetails: false,
    notes: false,
    items: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Icon components
  const InvoiceIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="12" y1="19" x2="12" y2="11"/>
      <line x1="9" y1="14" x2="15" y2="14"/>
    </svg>
  );

  const LogoIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  );

  const PeopleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );

  const SettingsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"/>
    </svg>
  );

  const DiscountIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <line x1="9" y1="9" x2="15" y2="15"/>
      <circle cx="9" cy="15" r="1"/>
      <circle cx="15" cy="9" r="1"/>
    </svg>
  );

  const PaymentIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  );

  const NotesIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );

  const ItemsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>
      <line x1="6" y1="9" x2="18" y2="9"/>
      <line x1="6" y1="13" x2="18" y2="13"/>
      <line x1="6" y1="17" x2="18" y2="17"/>
    </svg>
  );

  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-lg">
      {/* SECTION 1: INVOICE INFO */}
      <AccordionSection
        title="Invoice Info"
        icon={<InvoiceIcon />}
        isOpen={openSections.invoiceInfo}
        onToggle={() => toggleSection("invoiceInfo")}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Invoice Number
            </label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => updateInvoiceNumber(e.target.value)}
              placeholder="INV-2026"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Invoice Date
            </label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => updateInvoiceDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => updateDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </AccordionSection>

      {/* SECTION 2: LOGO UPLOAD */}
      <AccordionSection
        title="Logo Upload"
        icon={<LogoIcon />}
        isOpen={openSections.logoUpload}
        onToggle={() => toggleSection("logoUpload")}
      >
        <LogoUploadBox logo={logo} setLogo={setLogo} />
      </AccordionSection>

      {/* SECTION 3: SELLER & CLIENT */}
      <AccordionSection
        title="Seller & Client Information"
        icon={<PeopleIcon />}
        isOpen={openSections.sellerClient}
        onToggle={() => toggleSection("sellerClient")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SELLER */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-3">From (Seller)</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Company name"
                  value={seller?.name || ""}
                  onChange={(e) => updateSeller("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Street, City, State - PIN"
                  value={seller?.address || ""}
                  onChange={(e) => updateSeller("address", e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">GSTIN</label>
                <input
                  type="text"
                  placeholder="29AABCU1234B1Z0"
                  value={seller?.gstin || ""}
                  onChange={(e) => updateSeller("gstin", e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* CLIENT */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="text-xs font-bold text-green-700 uppercase tracking-wide mb-3">To (Client)</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Client Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Client or organization name"
                  value={customer?.name || ""}
                  onChange={(e) => updateCustomer("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Street, City, State - PIN"
                  value={customer?.address || ""}
                  onChange={(e) => updateCustomer("address", e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">GSTIN</label>
                <input
                  type="text"
                  placeholder="29AABCU1234B1Z0"
                  value={customer?.gstin || ""}
                  onChange={(e) => updateCustomer("gstin", e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </AccordionSection>

      {/* SECTION 4: GST SETTINGS */}
      <AccordionSection
        title="GST Settings"
        icon={<SettingsIcon />}
        isOpen={openSections.gstSettings}
        onToggle={() => toggleSection("gstSettings")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">GST Type</label>
            <select
              value={gstType}
              onChange={(e) => setGstType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="IGST">IGST (Inter-State)</option>
              <option value="SGST_CGST">SGST + CGST (Same State)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">GST Rate (%)</label>
            <select
              value={gstRate}
              onChange={(e) => setGstRate(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[0, 5, 12, 18, 28].map((rate) => (
                <option key={rate} value={rate}>
                  {rate}%
                </option>
              ))}
            </select>
          </div>
        </div>
      </AccordionSection>

      {/* SECTION 5: DISCOUNT & CHARGES */}
      <AccordionSection
        title="Discount & Charges"
        icon={<DiscountIcon />}
        isOpen={openSections.discountCharges}
        onToggle={() => toggleSection("discountCharges")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="flat">Flat Amount</option>
              <option value="percent">Percentage (%)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Discount Value</label>
            <input
              type="number"
              value={discountValue || 0}
              onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Extra Charges</label>
            <input
              type="number"
              value={extraCharges || 0}
              onChange={(e) => setExtraCharges(parseFloat(e.target.value) || 0)}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent col-span-1"
            />
          </div>
        </div>
      </AccordionSection>

      {/* SECTION 6: PAYMENT DETAILS */}
      <AccordionSection
        title="Payment Details"
        icon={<PaymentIcon />}
        isOpen={openSections.paymentDetails}
        onToggle={() => toggleSection("paymentDetails")}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
            <input
              type="text"
              value={bankName || ""}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Bank name"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
              <input
                type="text"
                value={accountNumber || ""}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Account number"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
              <input
                type="text"
                value={ifsc || ""}
                onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                placeholder="IFSC code"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
            <input
              type="text"
              value={upi || ""}
              onChange={(e) => setUpi(e.target.value)}
              placeholder="user@bank"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </AccordionSection>

      {/* SECTION 7: NOTES */}
      <AccordionSection
        title="Notes"
        icon={<NotesIcon />}
        isOpen={openSections.notes}
        onToggle={() => toggleSection("notes")}
      >
        <textarea
          value={notes || ""}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any notes, terms, or special instructions..."
          rows="4"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </AccordionSection>

      {/* SECTION 8: ITEMS */}
      <AccordionSection
        title={`Items (${items?.length || 0})`}
        icon={<ItemsIcon />}
        isOpen={openSections.items}
        onToggle={() => toggleSection("items")}
      >
        <div className="space-y-3">
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <div key={item.id || index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Item Name</label>
                    <input
                      type="text"
                      value={item.name || ""}
                      onChange={(e) => updateItem(item.id, "name", e.target.value)}
                      placeholder="Item name"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      value={item.quantity || 1}
                      onChange={(e) => updateItem(item.id, "quantity", parseFloat(e.target.value) || 1)}
                      placeholder="1"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      value={item.price || 0}
                      onChange={(e) => updateItem(item.id, "price", parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-full px-3 py-2 bg-red-50 border border-red-300 rounded-lg text-red-600 text-sm font-medium transition-all hover:bg-red-600 hover:text-white hover:border-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  Subtotal: ₹{((item.quantity || 1) * (item.price || 0)).toFixed(2)}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No items added yet</p>
          )}
          <button
            onClick={addItem}
            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-blue-600 font-medium text-sm transition-all hover:border-blue-400 hover:bg-blue-50"
          >
            + Add Item
          </button>
        </div>
      </AccordionSection>
    </div>
  );
}
