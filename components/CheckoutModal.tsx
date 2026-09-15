"use client";

import { useState } from "react";
import Image from "next/image";
import { X, CheckCircle2, ShieldCheck, Truck, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { formatRs } from "@/lib/format";
import { checkoutOrder } from "@/lib/api";

const majorCities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Other City",
];

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
    city: "Karachi",
    phone: "",
    paymentMethod: "Cash on Delivery (COD)",
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
      const fullAddress = `${form.address}, ${form.city} (Payment: ${form.paymentMethod})`;
      const data = await checkoutOrder({
        lines: checkoutLines,
        customer: {
          name: form.name,
          email: form.email,
          address: fullAddress,
          phone: form.phone,
        },
      });
      setOrderId(data.order.orderId);
      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/65 p-4 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto bg-parchment p-6 sm:p-8 shadow-2xl border border-line"
      >
        <button
          aria-label="Close checkout"
          onClick={onClose}
          className="absolute right-4 top-4 text-ink transition-colors hover:text-brass"
        >
          <X size={20} />
        </button>

        {orderId ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brass/20 text-brass">
              <CheckCircle2 size={38} />
            </div>
            <h3 className="mt-5 font-display text-2xl italic text-ink">
              Order Confirmed
            </h3>
            <p className="mt-2 text-sm text-stone">
              Thank you for choosing Fragrance Deluxe. Your order reference is:
            </p>
            <p className="mt-2 border border-brass/40 bg-brass/[0.08] px-4 py-2 font-mono text-base font-bold text-ink tracking-wider">
              {orderId}
            </p>

            <div className="mt-6 w-full rounded border border-line bg-white/60 p-4 text-left text-xs text-stone space-y-2">
              <p className="flex items-center gap-1.5 text-ink font-semibold">
                <Truck size={14} className="text-brass" /> Express Courier Dispatch
              </p>
              <p>
                Our warehouse team in Karachi will inspect your bottle and hand
                it over to TCS / Leopard Courier within 24 hours.
              </p>
              <p className="pt-1">
                Payment: <span className="font-semibold text-ink">{form.paymentMethod}</span> upon delivery.
              </p>
            </div>

            <div className="mt-6 flex w-full flex-col gap-2.5 sm:flex-row">
              <a
                href={`https://wa.me/923258764465?text=Hi%20Fragrance%20Deluxe,%20I%20just%20placed%20order%20${orderId}.%20Please%20confirm%20my%20shipment.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded bg-[#25D366] py-3 text-xs font-semibold text-white transition-opacity hover:opacity-90 uppercase"
              >
                <MessageCircle size={15} /> Confirm on WhatsApp
              </a>
              <button
                onClick={onClose}
                className="border border-ink px-6 py-3 text-xs tracking-widest2 text-ink hover:bg-ink hover:text-parchment uppercase transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <p className="eyebrow mb-1">Express Checkout</p>
              <h3 className="font-display text-2xl italic text-ink">
                Complete Your Order
              </h3>
              <p className="mt-1 text-xs text-stone">
                Enter your delivery address for express delivery across Pakistan.
              </p>
            </div>

            {/* Order Items Preview */}
            <div className="mt-5 max-h-36 overflow-y-auto border-y border-line py-3">
              <p className="mb-2 text-[10px] tracking-wider text-stone uppercase">
                Order Items ({lines.reduce((s, l) => s + l.quantity, 0)})
              </p>
              <div className="space-y-2">
                {lines.map((line) => (
                  <div key={line.product.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden bg-white border border-line">
                        <Image
                          src={line.product.image}
                          alt={line.product.name}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-ink">{line.product.name}</p>
                        <p className="text-[10px] text-stone">Qty: {line.quantity} • {line.product.volumeMl}ml</p>
                      </div>
                    </div>
                    <span className="font-semibold text-ink">
                      {formatRs(line.product.priceRs * line.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] tracking-wide text-stone uppercase">
                    Full Name *
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full border border-line bg-white/70 px-3 py-2 text-sm text-ink focus:border-brass focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] tracking-wide text-stone uppercase">
                    Phone / WhatsApp *
                  </label>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0300-1234567"
                    className="w-full border border-line bg-white/70 px-3 py-2 text-sm text-ink focus:border-brass focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] tracking-wide text-stone uppercase">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full border border-line bg-white/70 px-3 py-2 text-sm text-ink focus:border-brass focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] tracking-wide text-stone uppercase">
                    Destination City *
                  </label>
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full border border-line bg-white/70 px-3 py-2 text-sm text-ink focus:border-brass focus:outline-none"
                  >
                    {majorCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[11px] tracking-wide text-stone uppercase">
                  Complete Street Address *
                </label>
                <textarea
                  required
                  rows={2}
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  placeholder="House/Apartment #, Street, Sector / Area"
                  className="w-full border border-line bg-white/70 px-3 py-2 text-sm text-ink focus:border-brass focus:outline-none"
                />
              </div>

              {/* Payment selection */}
              <div>
                <label className="mb-1.5 block text-[11px] tracking-wide text-stone uppercase">
                  Payment Method
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
                  <label
                    className={`flex items-center gap-2 border p-2.5 cursor-pointer transition-colors ${
                      form.paymentMethod === "Cash on Delivery (COD)"
                        ? "border-brass bg-brass/[0.08] text-ink font-medium"
                        : "border-line bg-white/40 text-stone"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery (COD)"
                      checked={form.paymentMethod === "Cash on Delivery (COD)"}
                      onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                      className="accent-brass"
                    />
                    <span>Cash on Delivery (COD)</span>
                  </label>

                  <label
                    className={`flex items-center gap-2 border p-2.5 cursor-pointer transition-colors ${
                      form.paymentMethod === "Bank Transfer / JazzCash"
                        ? "border-brass bg-brass/[0.08] text-ink font-medium"
                        : "border-line bg-white/40 text-stone"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Bank Transfer / JazzCash"
                      checked={form.paymentMethod === "Bank Transfer / JazzCash"}
                      onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                      className="accent-brass"
                    />
                    <span>Bank / JazzCash</span>
                  </label>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-1.5 border-t border-line pt-3 text-xs">
                <div className="flex justify-between text-ink/75">
                  <span>Subtotal</span>
                  <span>{formatRs(subtotal)}</span>
                </div>
                <div className="flex justify-between text-ink/75">
                  <span>Nationwide Express Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatRs(shipping)}</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-bold text-ink">
                  <span>Total Due</span>
                  <span className="text-base text-ink">{formatRs(total)}</span>
                </div>
              </div>

              {error && <p className="text-xs text-wine">{error}</p>}

              <div className="flex items-center gap-2 text-[11px] text-stone">
                <ShieldCheck size={14} className="text-brass flex-shrink-0" />
                <span>100% Secure Checkout • Sealed Box Delivery Guarantee</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-ink py-3.5 text-xs tracking-widest2 text-parchment transition-all hover:bg-brass hover:text-ink disabled:opacity-50 uppercase"
              >
                {submitting ? "PLACING ORDER..." : "CONFIRM ORDER"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
