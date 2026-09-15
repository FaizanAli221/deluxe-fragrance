"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Truck } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-ink text-parchment/80">
      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 sm:py-20">
        <div>
          <h3 className="mb-4 text-sm font-semibold tracking-widest2 text-parchment">
            GET IN TOUCH
          </h3>
          <p className="max-w-sm text-sm leading-relaxed">
            Fragrance Deluxe brings you the finest branded perfumes, crafted
            to inspire elegance and individuality. Since 2016, we&apos;ve
            been redefining luxury, one unforgettable scent at a time.
          </p>
          <p className="mt-4 text-sm">+92 325 8764465</p>
          <p className="text-sm">info@fragrancedeluxe.example</p>
          <div className="mt-5 flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-parchment/30 transition-colors hover:border-brass hover:text-brass"
            >
              <Facebook size={16} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-parchment/30 transition-colors hover:border-brass hover:text-brass"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-widest2 text-parchment">
              INFORMATION
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/policies/refund" className="hover:text-brass">Refund Policy</Link></li>
              <li><Link href="/policies/privacy" className="hover:text-brass">Privacy Policy</Link></li>
              <li><Link href="/policies/shipping" className="hover:text-brass">Shipping Policy</Link></li>
              <li><Link href="/policies/terms" className="hover:text-brass">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-widest2 text-parchment">
              NEWSLETTER
            </h3>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="w-full border border-parchment/30 bg-transparent px-3 py-2 text-sm text-parchment placeholder:text-parchment/40 focus:border-brass"
              />
              <button
                type="submit"
                className="whitespace-nowrap bg-brass px-4 py-2 text-xs font-semibold tracking-wide text-ink transition-colors hover:bg-brassLight"
              >
                SIGN UP
              </button>
            </form>
            {subscribed && (
              <p className="mt-2 text-xs text-brassLight">
                Thanks for subscribing.
              </p>
            )}
            <button className="mt-4 flex items-center gap-2 text-sm hover:text-brass">
              <Truck size={16} /> Track Order
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-parchment/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-parchment/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Fragrance Deluxe. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/policies/shipping" className="hover:text-brass">Shipping Policy</Link>
            <Link href="/policies/refund" className="hover:text-brass">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
