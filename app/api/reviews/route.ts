import { NextRequest, NextResponse } from "next/server";
import { reviews, getReviewsForProduct, getProductBySlug } from "@/data/products";

export const runtime = "edge";

function enrichReview(r: (typeof reviews)[number]) {
  const product = getProductBySlug(r.productSlug);
  return {
    ...r,
    productName: product?.name,
    productVolumeMl: product?.volumeMl,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("product");

  if (slug) {
    return NextResponse.json({
      reviews: getReviewsForProduct(slug).map(enrichReview),
    });
  }

  return NextResponse.json({ reviews: reviews.map(enrichReview) });
}

