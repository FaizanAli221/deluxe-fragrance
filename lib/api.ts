import { products, reviews, getProductBySlug as findProductBySlug, getReviewsForProduct } from "@/data/products";
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
  let result = products;

  if (params?.gender && ["men", "women", "unisex"].includes(params.gender)) {
    result = result.filter((p) => p.gender === params.gender);
  }

  if (params?.featured) {
    result = result.filter((p) => p.featured);
  }

  if (params?.tag) {
    result = result.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === params.tag?.toLowerCase())
    );
  }

  return { products: result, count: result.length };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return findProductBySlug(slug) ?? null;
}

export async function getReviews(productSlug?: string): Promise<Review[]> {
  if (productSlug) {
    return getReviewsForProduct(productSlug);
  }
  return reviews;
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

  return { order };
}
