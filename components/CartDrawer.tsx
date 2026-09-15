"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Minus, Plus, Trash2, Truck, CheckCircle2 } from "lucide-react";
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
  const freeShippingThreshold = 5000;
  const freeShippingDifference = freeShippingThreshold - subtotal;
  const shippingPercent = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

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
              className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-xs"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-parchment shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <h2 className="font-display text-lg italic text-ink">
                  Your bag ({lineItems.reduce((n, l) => n + l.quantity, 0)})
                </h2>
                <button
                  aria-label="Close cart"
                  onClick={closeCart}
                  className="text-ink transition-colors hover:text-brass"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Free shipping progress bar */}
              {lineItems.length > 0 && (
                <div className="border-b border-line bg-brass/[0.08] px-5 py-3">
                  <div className="flex items-center gap-2 text-xs text-ink">
                    {freeShippingDifference <= 0 ? (
                      <>
                        <CheckCircle2 size={14} className="text-brass" />
                        <span className="font-medium text-brass">
                          You&apos;ve unlocked FREE nationwide delivery!
                        </span>
                      </>
                    ) : (
                      <>
                        <Truck size={14} className="text-stone" />
                        <span>
                          Add{" "}
                          <span className="font-semibold text-ink">
                            {formatRs(freeShippingDifference)}
                          </span>{" "}
                          more for FREE delivery
                        </span>
                      </>
                    )}
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full bg-brass transition-all duration-500"
                      style={{ width: `${shippingPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Product items list */}
              <div className="flex-1 overflow-y-auto px-5">
                {lineItems.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center text-stone">
                    <p>Your bag is empty.</p>
                    <button
                      onClick={closeCart}
                      className="mt-4 border border-ink px-5 py-2 text-xs tracking-widest2 text-ink transition-colors hover:bg-ink hover:text-parchment"
                    >
                      CONTINUE SHOPPING
                    </button>
                  </div>
                ) : (
                  <ul className="divide-y divide-line">
                    {lineItems.map(({ product, quantity }) => (
                      <li key={product.id} className="flex gap-4 py-5">
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden bg-white/50 border border-line">
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
                              <p className="mt-0.5 text-xs text-stone">
                                Extrait de Parfum • {product.gender}
                              </p>
                              <p className="mt-1 text-sm font-semibold text-ink">
                                {formatRs(product.priceRs)}
                              </p>
                            </div>
                            <button
                              aria-label={`Remove ${product.name}`}
                              onClick={() => removeItem(product.id)}
                              className="text-stone transition-colors hover:text-wine"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="mt-3 flex items-center gap-3">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => decrement(product.id)}
                              className="flex h-7 w-7 items-center justify-center border border-ink/20 transition-colors hover:border-brass hover:text-brass"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-4 text-center text-sm font-medium">
                              {quantity}
                            </span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => increment(product.id)}
                              className="flex h-7 w-7 items-center justify-center border border-ink/20 transition-colors hover:border-brass hover:text-brass"
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

              {/* Checkout bottom bar */}
              {lineItems.length > 0 && (
                <div className="border-t border-line bg-parchment px-5 py-5 shadow-lg">
                  <div className="mb-2 flex justify-between text-sm text-ink/70">
                    <span>Subtotal</span>
                    <span>{formatRs(subtotal)}</span>
                  </div>
                  <div className="mb-4 flex justify-between text-sm text-ink/70">
                    <span>Shipping</span>
                    <span>
                      {subtotal >= freeShippingThreshold
                        ? "Free"
                        : formatRs(250)}
                    </span>
                  </div>
                  <div className="mb-4 flex justify-between border-t border-line/60 pt-2 text-base font-semibold text-ink">
                    <span>Estimated Total</span>
                    <span>
                      {formatRs(
                        subtotal +
                          (subtotal >= freeShippingThreshold ? 0 : 250)
                      )}
                    </span>
                  </div>
                  <button
                    onClick={() => setCheckoutOpen(true)}
                    className="w-full bg-ink py-3.5 text-xs tracking-widest2 text-parchment transition-all hover:bg-brass hover:text-ink"
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
