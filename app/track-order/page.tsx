"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, MessageCircle } from "lucide-react";

export default function TrackOrderPage() {
  const [orderRef, setOrderRef] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderRef.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSearched(true);
    }, 600);
  };

  const steps = [
    {
      title: "Order Placed & Confirmed",
      desc: "Your order details and formulation selection were logged in our system.",
      status: "completed",
      time: "Day 1 - 10:30 AM",
    },
    {
      title: "Quality Inspection & Luxury Packaging",
      desc: "Fragrance bottle atomizer inspected and encased in secure foam packaging.",
      status: "completed",
      time: "Day 1 - 04:15 PM",
    },
    {
      title: "Dispatched via Express Courier",
      desc: "Handed over to courier network (TCS / Leopard Courier PK) for transit.",
      status: "active",
      time: "Day 2 - 09:00 AM",
    },
    {
      title: "Out for Delivery",
      desc: "Rider dispatched with parcel for delivery to your designated address.",
      status: "pending",
      time: "Estimated Tomorrow",
    },
    {
      title: "Delivered & COD Collected",
      desc: "Parcel received by customer.",
      status: "pending",
      time: "Pending",
    },
  ];

  return (
    <div className="py-12 sm:py-20">
      <div className="container-page max-w-3xl">
        <div className="text-center">
          <p className="eyebrow mb-2">Live Shipment Status</p>
          <h1 className="font-display text-3xl italic text-ink sm:text-5xl">
            Track Your Order
          </h1>
          <p className="mt-3 text-sm text-stone">
            Enter your Order ID (e.g. FD-XXXXX) or registered phone number to
            view delivery status.
          </p>
        </div>

        {/* Search input card */}
        <div className="mt-10 border border-line bg-white/60 p-6 sm:p-8">
          <form onSubmit={handleTrack} className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone" />
              <input
                type="text"
                required
                value={orderRef}
                onChange={(e) => setOrderRef(e.target.value)}
                placeholder="Enter Order ID (e.g. FD-M129) or Phone Number"
                className="w-full border border-line bg-parchment/60 py-3 pl-11 pr-4 text-sm text-ink focus:border-brass focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-ink px-8 py-3 text-xs tracking-widest2 text-parchment transition-colors hover:bg-brass hover:text-ink uppercase disabled:opacity-50"
            >
              {loading ? "SEARCHING..." : "TRACK SHIPMENT"}
            </button>
          </form>
        </div>

        {/* Results */}
        {searched && (
          <div className="mt-10 border border-line bg-white/80 p-8 shadow-sm">
            <div className="flex flex-col justify-between border-b border-line pb-6 sm:flex-row sm:items-center">
              <div>
                <span className="text-xs text-stone">Order Reference</span>
                <h3 className="font-mono text-lg font-bold text-ink uppercase">
                  {orderRef.toUpperCase()}
                </h3>
              </div>
              <div className="mt-3 sm:mt-0">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brass/15 px-3 py-1 text-xs font-semibold text-brass">
                  <Truck size={14} /> In Transit via Express Courier
                </span>
              </div>
            </div>

            {/* Courier info */}
            <div className="grid grid-cols-2 gap-4 border-b border-line py-5 text-xs text-stone sm:grid-cols-4">
              <div>
                <p>Courier Partner</p>
                <p className="mt-1 font-semibold text-ink">TCS Express PK</p>
              </div>
              <div>
                <p>Payment Mode</p>
                <p className="mt-1 font-semibold text-ink">Cash on Delivery</p>
              </div>
              <div>
                <p>Origin Hub</p>
                <p className="mt-1 font-semibold text-ink">Karachi Central</p>
              </div>
              <div>
                <p>Est. Arrival</p>
                <p className="mt-1 font-semibold text-brass">24 - 48 Hours</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-8 space-y-8 pl-4">
              {steps.map((step, idx) => (
                <div key={step.title} className="relative flex items-start gap-4">
                  {idx !== steps.length - 1 && (
                    <div
                      className={`absolute left-[11px] top-6 h-full w-[2px] ${
                        step.status === "completed" ? "bg-brass" : "bg-line"
                      }`}
                    />
                  )}

                  <div
                    className={`relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs ${
                      step.status === "completed"
                        ? "bg-brass text-parchment"
                        : step.status === "active"
                        ? "border-2 border-brass bg-parchment text-brass animate-pulse"
                        : "border border-line bg-white text-stone"
                    }`}
                  >
                    {step.status === "completed" ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                      <p
                        className={`text-sm font-semibold ${
                          step.status === "pending"
                            ? "text-stone"
                            : "text-ink"
                        }`}
                      >
                        {step.title}
                      </p>
                      <span className="text-xs text-stone">{step.time}</span>
                    </div>
                    <p className="mt-1 text-xs text-stone/80">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded border border-line bg-parchment p-4 text-xs text-stone">
              <p>
                Need to amend delivery address or timing? Contact our dispatch
                support on WhatsApp at{" "}
                <a
                  href="https://wa.me/923258764465"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brass underline"
                >
                  +92 325 8764465
                </a>
                .
              </p>
            </div>
          </div>
        )}

        {/* Support helper */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border border-line bg-brass/[0.06] p-6 text-center sm:flex-row sm:text-left">
          <div>
            <h4 className="font-display text-base text-ink">
              Cannot locate your Order ID?
            </h4>
            <p className="text-xs text-stone">
              Check your SMS confirmation or WhatsApp our order concierge.
            </p>
          </div>
          <a
            href="https://wa.me/923258764465"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded bg-[#25D366] px-5 py-2.5 text-xs font-semibold text-white hover:opacity-90"
          >
            <MessageCircle size={15} /> WhatsApp Order Help
          </a>
        </div>
      </div>
    </div>
  );
}
