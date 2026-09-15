"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ShoppingBag, Heart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import SearchModal from "./SearchModal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop All" },
  { href: "/shop?gender=men", label: "Men" },
  { href: "/shop?gender=women", label: "Women" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "Our Story" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);
  const wishlistCount = useWishlistStore((s) => s.productIds.length);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-parchment/95 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between lg:h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-brass"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <button
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
              className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-brass"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Brand Logo */}
          <Link
            href="/"
            className="text-center font-display text-xl tracking-wider text-ink sm:text-2xl"
          >
            FRAGRANCE DELUXE
            <span className="block text-[9px] tracking-widest2 text-stone uppercase">
              Haute Parfumerie
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs tracking-wider uppercase transition-colors hover:text-brass ${
                    isActive
                      ? "border-b-2 border-brass font-semibold text-ink"
                      : "text-ink/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Search, Wishlist, Cart */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              aria-label="Search fragrances"
              onClick={() => setSearchOpen(true)}
              className="hidden h-9 w-9 items-center justify-center text-ink transition-colors hover:text-brass lg:flex"
            >
              <Search size={20} />
            </button>

            <Link
              href="/wishlist"
              aria-label="View wishlist"
              className="relative flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-wine"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-wine text-[10px] font-semibold text-parchment">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              aria-label="Open cart"
              onClick={openCart}
              className="relative flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-brass"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[10px] font-semibold text-parchment">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <nav className="border-t border-line bg-parchment lg:hidden">
            <ul className="container-page flex flex-col py-3">
              {navLinks.map((link) => (
                <li
                  key={link.href}
                  className="border-b border-line last:border-none"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-3 text-sm tracking-wide text-ink transition-colors hover:text-brass uppercase"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-4 pb-2">
                <Link
                  href="/track-order"
                  onClick={() => setMenuOpen(false)}
                  className="block text-xs tracking-wider text-stone uppercase hover:text-brass"
                >
                  Track an Existing Order →
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Interactive live search modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
