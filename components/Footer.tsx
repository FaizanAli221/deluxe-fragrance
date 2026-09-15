"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Truck, MessageCircle } from "lucide-react";

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
    <footer className="border-t border-line/20 bg-ink text-parchment/80">
      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 sm:py-20">
        {/* Brand Info */}
        <div className="lg:col-span-1">
          <h3 className="mb-4 text-xs font-semibold tracking-widest2 text-parchment uppercase">
            FRAGRANCE DELUXE
          </h3>
          <p className="text-xs leading-relaxed text-parchment/70">
            Crafted in the UAE and curated for lasting presence. Luxury Extrait
            de Parfum formulations inspired by legendary olfactory masterworks.
          </p>
          <div className="mt-4 space-y-1 text-xs text-parchment/75">
            <p>Direct Support: +92 325 8764465</p>
            <p>Inquiries: info@fragrancedeluxe.pk</p>
          </div>
          <div className="mt-5 flex gap-3">
            <a
              href="https://wa.me/923258764465"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-parchment/30 transition-colors hover:border-brass hover:text-brass"
            >
              <MessageCircle size={15} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-parchment/30 transition-colors hover:border-brass hover:text-brass"
            >
              <Facebook size={15} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-parchment/30 transition-colors hover:border-brass hover:text-brass"
            >
              <Instagram size={15} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-xs font-semibold tracking-widest2 text-parchment uppercase">
            EXPLORE
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/shop" className="transition-colors hover:text-brass">
                Shop All Fragrances
              </Link>
            </li>
            <li>
              <Link
                href="/shop?gender=men"
                className="transition-colors hover:text-brass"
              >
                Men&apos;s Collection
              </Link>
            </li>
            <li>
              <Link
                href="/shop?gender=women"
                className="transition-colors hover:text-brass"
              >
                Women&apos;s Collection
              </Link>
            </li>
            <li>
              <Link
                href="/collections"
                className="transition-colors hover:text-brass"
              >
                Curated Editions
              </Link>
            </li>
            <li>
              <Link
                href="/wishlist"
                className="transition-colors hover:text-brass"
              >
                My Saved Wishlist
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="mb-4 text-xs font-semibold tracking-widest2 text-parchment uppercase">
            CUSTOMER CARE
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link
                href="/track-order"
                className="transition-colors hover:text-brass"
              >
                Track Your Order
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="transition-colors hover:text-brass"
              >
                Contact & Showrooms
              </Link>
            </li>
            <li>
              <Link href="/faq" className="transition-colors hover:text-brass">
                Frequently Asked Questions
              </Link>
            </li>
            <li>
              <Link
                href="/policies/shipping"
                className="transition-colors hover:text-brass"
              >
                Shipping & Delivery
              </Link>
            </li>
            <li>
              <Link
                href="/policies/refund"
                className="transition-colors hover:text-brass"
              >
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link
                href="/policies/privacy"
                className="transition-colors hover:text-brass"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Tracking */}
        <div>
          <h3 className="mb-4 text-xs font-semibold tracking-widest2 text-parchment uppercase">
            VIP INSIDER CLUB
          </h3>
          <p className="mb-3 text-xs leading-relaxed text-parchment/65">
            Receive private release invitations, member-only discounts, and
            fragrance guides.
          </p>
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address..."
              className="w-full border border-parchment/30 bg-transparent px-3 py-2 text-xs text-parchment placeholder:text-parchment/40 focus:border-brass focus:outline-none"
            />
            <button
              type="submit"
              className="whitespace-nowrap bg-brass px-4 py-2 text-xs font-semibold tracking-wide text-ink transition-colors hover:bg-brassLight"
            >
              JOIN
            </button>
          </form>
          {subscribed && (
            <p className="mt-2 text-xs text-brassLight">
              ✨ Welcome to the Fragrance Deluxe circle.
            </p>
          )}

          <div className="mt-6 border-t border-parchment/10 pt-4">
            <Link
              href="/track-order"
              className="flex items-center gap-2 text-xs text-parchment/90 transition-colors hover:text-brass"
            >
              <Truck size={15} className="text-brass" />
              <span>Track an Active Order</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-parchment/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-parchment/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Fragrance Deluxe Haute Parfumerie.
            All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/policies/terms"
              className="transition-colors hover:text-brass"
            >
              Terms of Service
            </Link>
            <Link
              href="/policies/privacy"
              className="transition-colors hover:text-brass"
            >
              Privacy Policy
            </Link>
            <Link
              href="/policies/refund"
              className="transition-colors hover:text-brass"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
