import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/data/products";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ product });
}
