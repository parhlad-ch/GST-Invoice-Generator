"use client";

import { useState } from "react";

export default function LogoUploadBox({ logo, setLogo }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    const validTypes = ["image/png", "image/jpeg", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a PNG, JPG, or SVG file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setLogo(event.target?.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative rounded-lg border-2 border-dashed transition-all duration-200 ${
        dragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-gray-400 bg-gray-50"
      }`}
    >
      <input
        type="file"
        accept="image/png,image/jpeg,image/svg+xml,.png,.jpg,.jpeg,.svg"
        onChange={handleFileInput}
        className="hidden"
        id="logo-upload-input"
      />

      {!logo ? (
        // Empty State
        <label
          htmlFor="logo-upload-input"
          className="block p-8 text-center cursor-pointer"
        >
          <div className="flex justify-center mb-3">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-gray-400"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-700 mb-1">
            {dragActive ? "Drop your logo here" : "Upload Logo"}
          </p>
          <p className="text-xs text-gray-500">
            Drag and drop or click to browse
          </p>
          <p className="text-xs text-gray-400 mt-2">
            PNG, JPG, or SVG (Max 2MB)
          </p>
        </label>
      ) : (
        // Filled State - Preview
        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            {/* Image Preview */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={logo}
                  alt="Logo preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-sm font-semibold text-gray-700">Logo Uploaded</p>
              <p className="text-xs text-gray-500 mb-2">
                Click to replace or drag a new file
              </p>
              <div className="flex gap-2">
                <label
                  htmlFor="logo-upload-input"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg cursor-pointer transition-all hover:bg-blue-700 text-center"
                >
                  Replace
                </label>
                <button
                  onClick={() => setLogo(null)}
                  className="flex-1 px-4 py-2 bg-red-50 border border-red-300 text-red-600 text-sm font-medium rounded-lg transition-all hover:bg-red-600 hover:text-white hover:border-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
