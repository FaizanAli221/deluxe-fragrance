export type Gender = "men" | "women" | "unisex";

export interface Product {
  id: string;
  slug: string;
  name: string;
  volumeMl: number;
  priceRs: number;
  gender: Gender;
  tags: string[];
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
}

export interface Review {
  id: string;
  productSlug: string;
  productName?: string;
  productVolumeMl?: number;
  author: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
}

export interface CartLine {
  product: Product;
  quantity: number;
}

export interface CheckoutLine {
  productId: string;
  quantity: number;
}
