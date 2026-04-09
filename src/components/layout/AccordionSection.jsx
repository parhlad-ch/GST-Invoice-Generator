"use client";

import { useState } from "react";

export default function AccordionSection({
  title,
  icon,
  isOpen,
  onToggle,
  children,
  defaultOpen = false,
}) {
  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150"
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div className="text-gray-600 flex-shrink-0">
              {icon}
            </div>
          )}
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        </div>
        {/* Chevron Icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-gray-600 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          {children}
        </div>
      )}
    </div>
  );
}
