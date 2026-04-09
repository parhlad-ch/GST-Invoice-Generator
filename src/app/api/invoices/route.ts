import { NextResponse } from 'next/server';

/**
 * GET /api/invoices
 * Get all invoices with optional filtering
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  // Mock data - in a real app, this would query a database
  const invoices = [
    {
      id: '1',
      invoiceNumber: 'INV-001',
      buyer: { name: 'John Doe' },
      amount: 5000,
      status: 'sent',
      date: new Date('2026-03-15'),
    },
    {
      id: '2',
      invoiceNumber: 'INV-002',
      buyer: { name: 'Jane Smith' },
      amount: 12500,
      status: 'paid',
      date: new Date('2026-03-10'),
    },
  ];

  // Filter by status if provided
  const filtered = status ? invoices.filter((inv) => inv.status === status) : invoices;

  return NextResponse.json({
    success: true,
    data: filtered,
    count: filtered.length,
  });
}

/**
 * POST /api/invoices
 * Create a new invoice
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.invoiceNumber || !body.seller || !body.buyer || !body.lineItems) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a real app, you would save this to a database
    const newInvoice = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json(
      {
        success: true,
        data: newInvoice,
        message: 'Invoice created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}
