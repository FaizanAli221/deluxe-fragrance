"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { formatRs } from "@/lib/format";
import CheckoutModal from "./CheckoutModal";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const lines = useCartStore((s) => s.lines);
  const increment = useCartStore((s) => s.incrementItem);
  const decrement = useCartStore((s) => s.decrementItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const lineItems = lines;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 z-50 bg-ink/50"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-parchment"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <h2 className="font-display text-lg italic text-ink">
                  Your bag ({lineItems.reduce((n, l) => n + l.quantity, 0)})
                </h2>
                <button
                  aria-label="Close cart"
                  onClick={closeCart}
                  className="text-ink hover:text-brass"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5">
                {lineItems.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center text-stone">
                    <p>Your bag is empty.</p>
                    <button
                      onClick={closeCart}
                      className="mt-4 border border-ink px-5 py-2 text-xs tracking-widest2 text-ink hover:bg-ink hover:text-parchment"
                    >
                      CONTINUE SHOPPING
                    </button>
                  </div>
                ) : (
                  <ul className="divide-y divide-line">
                    {lineItems.map(({ product, quantity }) => (
                      <li key={product.id} className="flex gap-4 py-5">
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden bg-white/50">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-display text-sm text-ink">
                                {product.name} ({product.volumeMl}ml)
                              </p>
                              <p className="mt-1 text-sm text-ink/70">
                                {formatRs(product.priceRs)}
                              </p>
                            </div>
                            <button
                              aria-label={`Remove ${product.name}`}
                              onClick={() => removeItem(product.id)}
                              className="text-stone hover:text-wine"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="mt-3 flex items-center gap-3">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => decrement(product.id)}
                              className="flex h-7 w-7 items-center justify-center border border-ink/20 hover:border-brass hover:text-brass"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-4 text-center text-sm">
                              {quantity}
                            </span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => increment(product.id)}
                              className="flex h-7 w-7 items-center justify-center border border-ink/20 hover:border-brass hover:text-brass"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {lineItems.length > 0 && (
                <div className="border-t border-line px-5 py-5">
                  <div className="mb-4 flex justify-between text-sm text-ink">
                    <span>Subtotal</span>
                    <span className="font-semibold">{formatRs(subtotal)}</span>
                  </div>
                  <button
                    onClick={() => setCheckoutOpen(true)}
                    className="w-full bg-ink py-3 text-xs tracking-widest2 text-parchment transition-opacity hover:opacity-90"
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {checkoutOpen && (
        <CheckoutModal onClose={() => setCheckoutOpen(false)} />
      )}
    </>
  );
}
