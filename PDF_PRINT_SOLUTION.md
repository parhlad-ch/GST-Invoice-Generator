# PDF Print Solution - Invoice Generator

## Overview

This document explains the PDF printing implementation for the GST Invoice Generator, which eliminates browser headers/footers and unwanted UI elements from printed invoices.

## Problem Solved

When using browser's `window.print()` or print-to-PDF, browsers automatically inject:
- **Top left**: Date/Time
- **Top right**: Page title
- **Bottom left**: URL
- **Bottom right**: Page number

Additionally, header, navigation, forms, and buttons were visible in the PDF.

## Solution Architecture

### Two-Strategy Approach

#### **Strategy 1: CSS-Based Printing (window.print)**
Uses `@media print` CSS rules to hide unwanted elements and format the page.

**Pros:**
- No external dependencies
- Works with browser's native print functionality
- Lightweight

**Cons:**
- Browser headers/footers still appear
- User must manually disable in print settings: `Ctrl+P` → Uncheck "Headers and Footers"

**Location:** `src/app/globals.css` (lines for @media print)

---

#### **Strategy 2: html2pdf.js (RECOMMENDED)**
Programmatically generates PDF without browser intervention.

**Pros:**
- **No browser headers/footers** ✅
- Fully automatic - no user configuration needed
- Complete control over output
- Better quality control

**Cons:**
- Adds ~500KB to bundle (gzipped ~150KB)
- Slightly slower than native print

**Location:** `src/hooks/usePdfDownload.js` and `src/components/DownloadButton.jsx`

---

## Implementation Details

### 1. **CSS Print Styles** (`src/app/globals.css`)

```css
@page {
  size: A4;
  margin: 0;  /* ← Critical: Removes default margin space */
}

@media print {
  @page {
    size: A4;
    margin: 0;
  }

  /* Hide everything by default */
  body > * {
    display: none !important;
  }

  /* Show only print-area */
  .print-area {
    display: block !important;
    width: 100%;
    margin: 0 !important;
    padding: 20px !important;
    background: #fff !important;
  }

  .print-area * {
    visibility: visible !important;
  }

  /* Hide non-print elements */
  .no-print {
    display: none !important;
  }
}
```

**Key CSS Properties:**
- `@page margin: 0` - Removes browser's default margin space where headers/footers appear
- `print-color-adjust: exact` - Preserves color styling
- `page-break-inside: avoid` - Keeps tables and content together

---

### 2. **Layout Structure** (`src/app/page.jsx`)

```jsx
<div className="col-xl-7 print-area">
  {/* Only this is shown on print */}
  <InvoicePreview {...invoiceProps} />
</div>
```

**Classes Used:**
- `print-area` - Content to show during printing
- `no-print` - Content to hide (header, buttons, form, etc.)

---

### 3. **Download Hook** (`src/hooks/usePdfDownload.js`)

Two methods available:

```javascript
const { downloadWithPrint, downloadWithHtml2Pdf } = usePdfDownload();

// Method 1: Browser print dialog
downloadWithPrint('invoice-preview', 'INV-2026-0803');

// Method 2: Direct PDF generation (RECOMMENDED)
downloadWithHtml2Pdf('invoice-preview', 'INV-2026-0803');
```

---

## Usage

### Using html2pdf.js (Current Implementation)

```javascript
import { usePdfDownload } from '@/hooks/usePdfDownload';

export default function MyComponent() {
  const { downloadWithHtml2Pdf } = usePdfDownload();

  const handleDownload = () => {
    downloadWithHtml2Pdf('invoice-preview', 'INV-2026-0803');
  };

  return (
    <button onClick={handleDownload}>Download PDF</button>
  );
}
```

### Using window.print() (Alternative)

```javascript
const { downloadWithPrint } = usePdfDownload();

const handleDownload = () => {
  downloadWithPrint('invoice-preview', 'INV-2026-0803');
  // User must: Ctrl+P → Uncheck "Headers and Footers"
};
```

---

## Required Elements

### 1. **Element IDs**
Invoice must have unique ID for html2pdf targeting:
```jsx
<div id="invoice-preview" className="card">
  {/* Invoice content */}
</div>
```

### 2. **Print-Area Container**
Wrap printable content:
```jsx
<div className="print-area">
  <InvoicePreview {...props} />
</div>
```

### 3. **No-Print Classes**
Mark UI elements to hide:
```jsx
<header className="no-print">Header</header>
<button className="no-print">Download</button>
<div className="no-print">Form</div>
```

---

## Troubleshooting

### Issue: PDF Still Has Headers/Footers

**Cause:** Using `window.print()` without disabling headers in print settings

**Solution:** 
1. First ensure Strategy 2 (html2pdf.js) is implemented
2. If using window.print(), user must:
   - Open print dialog (`Ctrl+P`)
   - Uncheck "Headers and Footers"
   - Click Print

### Issue: Invoice Content Not Visible in PDF

**Cause:** Missing `print-area` class or wrong element ID

**Solution:**
1. Verify element has `id="invoice-preview"`
2. Verify parent has `className="print-area"`
3. Check browser console for errors

### Issue: Styling Lost in PDF

**Cause:** Missing `print-color-adjust: exact` or Bootstrap conflicts

**Solution:**
1. Ensure `print-color-adjust: exact` in @media print
2. Add `-webkit-print-color-adjust: exact` for older browsers
3. Use inline styles if Bootstrap classes don't work

### Issue: Table Breaks Across Pages

**Cause:** Missing `page-break-inside: avoid`

**Solution:**
Add to CSS:
```css
@media print {
  tr { page-break-inside: avoid; }
}
```

---

## Performance Considerations

### html2pdf.js Bundle Size
- Uncompressed: ~500KB
- Gzipped: ~150KB
- Lazy-loaded via dynamic import (only loaded when needed)

### Optimization Tips
1. **Lazy Loading:** html2pdf is dynamically imported (already implemented)
2. **Canvas Scale:** Currently set to 2 for quality; reduce to 1 if file size is critical
3. **Image Quality:** Set to 0.98; reduce for smaller files

---

## Dependencies

### Required
- `html2pdf.js@^0.10.1` - For pdf generation
- `bootstrap@^5.3.0` - Bootstrap framework
- `react-bootstrap@^2.10.0` - React Bootstrap components

### Already Installed
- React 19.2.4
- Next.js 16.2.0

### Installation
```bash
npm install --legacy-peer-deps
```

---

## Browser Support

| Browser | Method 1 (Print) | Method 2 (html2pdf) |
|---------|------------------|---------------------|
| Chrome  | ✅                | ✅                   |
| Firefox | ✅                | ✅                   |
| Safari  | ✅                | ✅                   |
| Edge    | ✅                | ✅                   |
| IE 11   | ⚠️ Limited        | ❌                   |

---

## Files Modified

1. **package.json** - Added html2pdf.js dependency
2. **src/app/globals.css** - Enhanced print CSS rules
3. **src/app/page.jsx** - Added print-area wrapper
4. **src/components/DownloadButton.jsx** - Integrated usePdfDownload hook
5. **src/hooks/usePdfDownload.js** - New PDF download utility (created)

---

## Next Steps

1. **Run dev server:**
   ```bash
   npm run dev
   ```

2. **Test the solution:**
   - Click "Download PDF" button
   - Verify PDF contains only invoice content
   - Check for no browser headers/footers

3. **Customization:**
   - Adjust `margin` in `@page` if needed
   - Modify html2pdf `options` in usePdfDownload.js
   - Add additional `no-print` classes as needed

---

## References

- [html2pdf.js Documentation](https://ekoopmans.github.io/html2pdf.js/)
- [CSS @page MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@page)
- [CSS @media print MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/print)
