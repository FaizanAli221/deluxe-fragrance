import { NextRequest } from "next/server";
import { Gender, Product, Review, CheckoutLine } from "@/types/product";

export interface ProductsResponse {
  products: Product[];
  count: number;
}

export interface CheckoutResponse {
  order: {
    orderId: string;
    createdAt: string;
    status: "confirmed";
    customer: {
      name: string;
      email: string;
      address: string;
      phone: string;
    };
    lineItems: {
      productId: string;
      name: string;
      quantity: number;
      unitPrice: number;
      lineTotal: number;
    }[];
    subtotal: number;
    shipping: number;
    total: number;
  };
}

export async function getProducts(params?: {
  gender?: Gender;
  featured?: boolean;
  tag?: string;
}): Promise<ProductsResponse> {
  const query = new URLSearchParams();
  if (params?.gender) query.set("gender", params.gender);
  if (params?.featured) query.set("featured", "true");
  if (params?.tag) query.set("tag", params.tag);
  const qs = query.toString();

  if (typeof window !== "undefined") {
    const res = await fetch(`/api/products${qs ? `?${qs}` : ""}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
    return res.json();
  }

  // Server-side execution: invoke route handler directly to support static builds
  const { GET } = await import("@/app/api/products/route");
  const url = new URL(`http://localhost/api/products${qs ? `?${qs}` : ""}`);
  const response = await GET(new NextRequest(url));
  return response.json();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (typeof window !== "undefined") {
    const res = await fetch(`/api/products/${slug}`);
    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.statusText}`);
    }
    const data = await res.json();
    return data.product ?? null;
  }

  // Server-side execution
  const { GET } = await import("@/app/api/products/[slug]/route");
  const url = new URL(`http://localhost/api/products/${slug}`);
  const response = await GET(new NextRequest(url), { params: { slug } });
  if (response.status === 404) return null;
  const data = await response.json();
  return data.product ?? null;
}

export async function getReviews(productSlug?: string): Promise<Review[]> {
  const query = productSlug ? `?product=${encodeURIComponent(productSlug)}` : "";

  if (typeof window !== "undefined") {
    const res = await fetch(`/api/reviews${query}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch reviews: ${res.statusText}`);
    }
    const data = await res.json();
    return data.reviews ?? [];
  }

  // Server-side execution
  const { GET } = await import("@/app/api/reviews/route");
  const url = new URL(`http://localhost/api/reviews${query}`);
  const response = await GET(new NextRequest(url));
  const data = await response.json();
  return data.reviews ?? [];
}

export async function checkoutOrder(body: {
  lines: CheckoutLine[];
  customer: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
}): Promise<CheckoutResponse> {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error ?? "Checkout failed");
  }

  return data;
}
