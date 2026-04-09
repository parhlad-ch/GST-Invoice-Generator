"use client";

import { useState } from "react";

export default function FloatingLabelInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  multiline = false,
  rows = 3,
  className = "",
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.toString().trim() !== "";

  const commonClasses =
    "w-full px-3 py-3 pt-4 pb-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 peer placeholder-transparent bg-white";

  const focusRingColor =
    className.includes("green")
      ? "focus:ring-green-500"
      : className.includes("blue")
        ? "focus:ring-blue-500"
        : "focus:ring-blue-500";

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          rows={rows}
          className={`${commonClasses} ${focusRingColor} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={`${commonClasses} ${focusRingColor}`}
        />
      )}
      <label
        className={`absolute left-3 text-xs font-medium pointer-events-none transition-all duration-200 ${
          focused || hasValue
            ? "top-1 text-gray-600"
            : "top-3 text-gray-500"
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
  );
}
