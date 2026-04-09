import { NextResponse } from 'next/server';

/**
 * GET /api/invoices/[id]
 * Get a specific invoice by ID
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Mock data - in a real app, this would query a database
  if (id === '1') {
    return NextResponse.json({
      success: true,
      data: {
        id: '1',
        invoiceNumber: 'INV-001',
        seller: {
          name: 'Your Company',
          gstNumber: '07AAABR1234A2Z0',
          address: {
            street: '123 Business St',
            city: 'Mumbai',
            state: 'MH',
            zipCode: '400001',
            country: 'India',
          },
          email: 'contact@company.com',
        },
        buyer: {
          name: 'John Doe',
          gstNumber: '05AABCD1234E1Z0',
          address: {
            street: '456 Customer St',
            city: 'Delhi',
            state: 'DL',
            zipCode: '110001',
            country: 'India',
          },
          email: 'john@example.com',
        },
        lineItems: [
          {
            id: '1',
            description: 'Web Development Services',
            quantity: 10,
            unitPrice: 500,
            taxRate: 18,
          },
        ],
        status: 'sent',
        date: new Date('2026-03-15'),
        dueDate: new Date('2026-04-15'),
      },
    });
  }

  return NextResponse.json(
    { error: 'Invoice not found' },
    { status: 404 }
  );
}

/**
 * PUT /api/invoices/[id]
 * Update an invoice
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;

    // In a real app, you would update the database
    const updatedInvoice = {
      id,
      ...body,
      updatedAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      data: updatedInvoice,
      message: 'Invoice updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update invoice' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/invoices/[id]
 * Delete an invoice
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // In a real app, you would delete from the database
  return NextResponse.json({
    success: true,
    message: `Invoice ${id} deleted successfully`,
  });
}
