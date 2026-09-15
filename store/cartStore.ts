"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartLine, Product } from "@/types/product";

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.lines.find((l) => l.product.id === product.id);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.product.id === product.id
                  ? { ...l, quantity: l.quantity + quantity }
                  : l
              ),
              isOpen: true,
            };
          }
          return {
            lines: [...state.lines, { product, quantity }],
            isOpen: true,
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          lines: state.lines.filter((l) => l.product.id !== productId),
        }));
      },

      incrementItem: (productId) => {
        set((state) => ({
          lines: state.lines.map((l) =>
            l.product.id === productId
              ? { ...l, quantity: l.quantity + 1 }
              : l
          ),
        }));
      },

      decrementItem: (productId) => {
        set((state) => ({
          lines: state.lines
            .map((l) =>
              l.product.id === productId
                ? { ...l, quantity: l.quantity - 1 }
                : l
            )
            .filter((l) => l.quantity > 0),
        }));
      },

      clearCart: () => set({ lines: [] }),

      totalItems: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),

      subtotal: () =>
        get().lines.reduce(
          (sum, l) => sum + l.product.priceRs * l.quantity,
          0
        ),
    }),
    {
      name: "fragrance-deluxe-cart",
      partialize: (state) => ({ lines: state.lines }),
    }
  )
);
