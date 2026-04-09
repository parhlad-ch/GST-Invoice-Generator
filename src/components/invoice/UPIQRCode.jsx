"use client";

import { QRCodeCanvas } from "qrcode.react";
import { generateUPIString } from "@/utils/upi";

/**
 * UPI QR Code component for invoice payments
 * Displays a scannable QR code for UPI payments with amount
 */
export default function UPIQRCode({ upiId, amount, sellerName, invoiceNo }) {
  const upiString = generateUPIString(upiId, amount, sellerName, invoiceNo);

  if (!upiString) return null;

  return (
    <div className="flex flex-col items-center gap-3 p-4 sm:p-6 bg-gray-50 border border-gray-200 rounded-xl transition-all duration-200">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">
        Scan to Pay with UPI
      </div>

      <div className="p-2 bg-white rounded-lg border border-gray-300 shadow-sm">
        <QRCodeCanvas
          value={upiString}
          size={120}
          level="H"
        />
      </div>

      <div className="text-xs text-gray-600 text-center leading-relaxed">
        {amount > 0 && (
          <>
            <div className="font-semibold mb-1">
              ₹ {amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </div>
          </>
        )}
        <div className="text-gray-500 text-10px">
          Use any UPI app to scan
        </div>
      </div>
    </div>
  );
}
