import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // html2pdf.js → jspdf → fflate uses Node.js Worker APIs that can't be bundled
  // for the server. Exclude from server bundle; the browser bundle handles it.
  serverExternalPackages: ["html2pdf.js", "jspdf", "fflate"],
};

export default nextConfig;
