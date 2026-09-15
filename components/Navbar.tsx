"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop?gender=men", label: "Men" },
  { href: "/shop?gender=women", label: "Women" },
  { href: "/shop", label: "Shop All" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-parchment/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-brass"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link
          href="/"
          className="font-display text-lg tracking-wide text-ink sm:text-2xl"
        >
          Fragrance Deluxe
        </Link>

        <div className="flex items-center gap-4 sm:gap-5">
          <button
            aria-label="Search"
            className="text-ink transition-colors hover:text-brass"
          >
            <Search size={20} />
          </button>
          <button
            aria-label="Open cart"
            onClick={openCart}
            className="relative text-ink transition-colors hover:text-brass"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-wine text-[10px] font-semibold leading-none text-parchment">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-line bg-parchment">
          <ul className="container-page flex flex-col py-2">
            {links.map((link) => (
              <li key={link.href} className="border-b border-line last:border-none">
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-sm text-ink transition-colors hover:text-brass"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
