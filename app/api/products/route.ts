import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const gender = searchParams.get("gender");
  const featured = searchParams.get("featured");
  const tag = searchParams.get("tag");

  let result = products;

  if (gender && ["men", "women", "unisex"].includes(gender)) {
    result = result.filter((p) => p.gender === gender);
  }

  if (featured === "true") {
    result = result.filter((p) => p.featured);
  }

  if (tag) {
    result = result.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    );
  }

  return NextResponse.json({ products: result, count: result.length });
}
