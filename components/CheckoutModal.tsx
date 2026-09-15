"use client";

import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { formatRs } from "@/lib/format";
import { checkoutOrder } from "@/lib/api";

export default function CheckoutModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const lines = useCartStore((s) => s.lines);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const shipping = subtotal >= 5000 ? 0 : 250;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const checkoutLines = lines.map((line) => ({
        productId: line.product.id,
        quantity: line.quantity,
      }));
      const data = await checkoutOrder({ lines: checkoutLines, customer: form });
      setOrderId(data.order.orderId);
      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto bg-parchment p-6"
      >
        <button
          aria-label="Close checkout"
          onClick={onClose}
          className="absolute right-4 top-4 text-ink hover:text-brass"
        >
          <X size={20} />
        </button>

        {orderId ? (
          <div className="flex flex-col items-center py-8 text-center">
            <CheckCircle2 size={40} className="text-brass" />
            <h3 className="mt-4 font-display text-xl italic text-ink">
              Order confirmed
            </h3>
            <p className="mt-2 text-sm text-ink/70">
              Your order reference is
            </p>
            <p className="mt-1 font-mono text-sm text-ink">{orderId}</p>
            <button
              onClick={onClose}
              className="mt-6 border border-ink px-6 py-2.5 text-xs tracking-widest2 text-ink hover:bg-ink hover:text-parchment"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-display text-xl italic text-ink">
              Checkout
            </h3>
            <p className="mt-1 text-sm text-stone">
              This is a simulated checkout — no payment is processed.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-xs tracking-wide text-stone">
                  Full name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-line bg-white/50 px-3 py-2 text-sm focus:border-brass"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs tracking-wide text-stone">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-line bg-white/50 px-3 py-2 text-sm focus:border-brass"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs tracking-wide text-stone">
                  Delivery address
                </label>
                <textarea
                  required
                  rows={2}
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="w-full border border-line bg-white/50 px-3 py-2 text-sm focus:border-brass"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs tracking-wide text-stone">
                  Phone
                </label>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-line bg-white/50 px-3 py-2 text-sm focus:border-brass"
                />
              </div>

              <div className="space-y-1 border-t border-line pt-4 text-sm">
                <div className="flex justify-between text-ink/70">
                  <span>Subtotal</span>
                  <span>{formatRs(subtotal)}</span>
                </div>
                <div className="flex justify-between text-ink/70">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatRs(shipping)}</span>
                </div>
                <div className="flex justify-between pt-1 font-semibold text-ink">
                  <span>Total</span>
                  <span>{formatRs(total)}</span>
                </div>
              </div>

              {error && <p className="text-sm text-wine">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-ink py-3 text-xs tracking-widest2 text-parchment transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? "PLACING ORDER..." : "PLACE ORDER"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
