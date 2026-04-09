"use client";

import FloatingLabelInput from "./FloatingLabelInput";

export default function SellerClientCards({
  seller,
  updateSeller,
  customer,
  updateCustomer,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* SELLER CARD */}
      <div className="border-l-4 border-l-blue-600 border border-gray-200 rounded-lg bg-gradient-to-br from-blue-50 to-white p-4 transition-all hover:shadow-md">
        {/* Card Header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-blue-200">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-blue-600"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <h4 className="text-sm font-bold text-blue-700 uppercase tracking-wide">
            From (Seller)
          </h4>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <FloatingLabelInput
            label="Company Name"
            value={seller?.name || ""}
            onChange={(e) => updateSeller("name", e.target.value)}
            placeholder="Enter company name"
            required
            className="blue"
          />
          <FloatingLabelInput
            label="Address"
            value={seller?.address || ""}
            onChange={(e) => updateSeller("address", e.target.value)}
            placeholder="Street, City, State - PIN"
            multiline
            rows={3}
            required
            className="blue"
          />
          <FloatingLabelInput
            label="GSTIN"
            value={seller?.gstin || ""}
            onChange={(e) => updateSeller("gstin", e.target.value.toUpperCase())}
            placeholder="29AABCU1234B1Z0"
            className="blue"
          />
        </div>
      </div>

      {/* CLIENT CARD */}
      <div className="border-l-4 border-l-green-600 border border-gray-200 rounded-lg bg-gradient-to-br from-green-50 to-white p-4 transition-all hover:shadow-md">
        {/* Card Header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-green-200">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-green-600"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <h4 className="text-sm font-bold text-green-700 uppercase tracking-wide">
            To (Client)
          </h4>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <FloatingLabelInput
            label="Client Name"
            value={customer?.name || ""}
            onChange={(e) => updateCustomer("name", e.target.value)}
            placeholder="Enter client name"
            required
            className="green"
          />
          <FloatingLabelInput
            label="Address"
            value={customer?.address || ""}
            onChange={(e) => updateCustomer("address", e.target.value)}
            placeholder="Street, City, State - PIN"
            multiline
            rows={3}
            required
            className="green"
          />
          <FloatingLabelInput
            label="GSTIN"
            value={customer?.gstin || ""}
            onChange={(e) => updateCustomer("gstin", e.target.value.toUpperCase())}
            placeholder="29AABCU1234B1Z0"
            className="green"
          />
        </div>
      </div>
    </div>
  );
}
