"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/product";

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border border-ink/20">
        <button
          aria-label="Decrease quantity"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="flex h-11 w-11 items-center justify-center hover:text-brass"
        >
          <Minus size={14} />
        </button>
        <span className="w-8 text-center text-sm">{quantity}</span>
        <button
          aria-label="Increase quantity"
          onClick={() => setQuantity((q) => q + 1)}
          className="flex h-11 w-11 items-center justify-center hover:text-brass"
        >
          <Plus size={14} />
        </button>
      </div>
      <button
        onClick={() => addItem(product, quantity)}
        className="flex-1 bg-ink py-3 text-xs tracking-widest2 text-parchment transition-opacity hover:opacity-90"
      >
        ADD TO CART
      </button>
    </div>
  );
}
