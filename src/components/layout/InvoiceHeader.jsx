"use client";

import { useState } from "react";

export default function InvoiceHeader({
  title = "INV-2026",
  onTitleChange = () => {},
  status = "Draft",
  onSave = () => {},
  onPrint = () => {},
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleTitleChange = (e) => {
    onTitleChange(e.target.value);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
      // Show success feedback
      setTimeout(() => setIsSaving(false), 1000);
    } catch (error) {
      console.error("Save failed:", error);
      setIsSaving(false);
    }
  };

  const statusColors = {
    Draft: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
    Pending: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
    Sent: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
    Paid: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  };

  const statusColor = statusColors[status] || statusColors.Draft;

  return (
    <header 
      className="no-print sticky top-0 z-50 w-full bg-gradient-to-br from-blue-50 to-indigo-100 border-b border-blue-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Left: Editable Invoice Title */}
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
              placeholder="Invoice number..."
              className={`w-full px-4 py-2 text-lg font-semibold text-gray-900 bg-white/70 border rounded-lg transition-all duration-200 outline-none ${
                isEditing
                  ? "border-blue-400 shadow-md"
                  : "border-blue-200 hover:border-blue-300"
              }`}
            />
          </div>

          {/* Right: Status Badge + Buttons */}
          <div className="flex items-center gap-4 flex-wrap justify-end">
            {/* Status Badge */}
            <div
              className={`px-4 py-2 rounded-full text-sm font-medium border ${statusColor.bg} ${statusColor.text} ${statusColor.border} border`}
            >
              {status}
            </div>

            {/* Save Draft Button (Ghost) */}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-5 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200 flex items-center gap-2 ${
                isSaving
                  ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 active:border-gray-500"
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              {isSaving ? "Saving..." : "Save Draft"}
            </button>

            {/* Print / Download Button (Primary) */}
            <button
              onClick={onPrint}
              className="px-5 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-200 flex items-center gap-2 hover:brightness-110 shadow-md hover:shadow-lg"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print / Download
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
