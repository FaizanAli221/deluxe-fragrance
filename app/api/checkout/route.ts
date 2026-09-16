import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";
import { CheckoutLine } from "@/types/product";

export const runtime = "edge";

interface CheckoutBody {
  lines: CheckoutLine[];
  customer: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
}

export async function POST(request: NextRequest) {
  let body: CheckoutBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.lines || body.lines.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  if (!body.customer?.name || !body.customer?.email || !body.customer?.address) {
    return NextResponse.json(
      { error: "Missing required customer details" },
      { status: 400 }
    );
  }

  let subtotal = 0;
  const lineItems = body.lines.map((line) => {
    const product = products.find((p) => p.id === line.productId);
    const lineTotal = product ? product.priceRs * line.quantity : 0;
    subtotal += lineTotal;
    return {
      productId: line.productId,
      name: product?.name ?? "Unknown item",
      quantity: line.quantity,
      unitPrice: product?.priceRs ?? 0,
      lineTotal,
    };
  });

  const shipping = subtotal >= 5000 ? 0 : 250;
  const total = subtotal + shipping;

  // Simulated order — in production this would create an order record
  // and hand off to a real payment gateway.
  const order = {
    orderId: `FD-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: "confirmed" as const,
    customer: body.customer,
    lineItems,
    subtotal,
    shipping,
    total,
  };

  return NextResponse.json({ order }, { status: 201 });
}
