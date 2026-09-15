"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types/product";
import { getProducts } from "@/lib/api";
import { formatRs } from "@/lib/format";

export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      getProducts()
        .then((res) => setProducts(res.products))
        .catch(() => setProducts([]))
        .finally(() => setLoading(false));

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchGender = p.gender.toLowerCase() === q;
      const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
      const matchNotes =
        p.notes.top.some((n) => n.toLowerCase().includes(q)) ||
        p.notes.heart.some((n) => n.toLowerCase().includes(q)) ||
        p.notes.base.some((n) => n.toLowerCase().includes(q));
      return matchName || matchGender || matchTags || matchNotes;
    });
  }, [query, products]);

  const quickTags = [
    "Men",
    "Women",
    "Unisex",
    "Amber",
    "Vanilla",
    "Oud",
    "Fresh",
    "Rose",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full border-b border-line bg-parchment shadow-xl"
          >
            <div className="container-page py-6">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex flex-1 items-center">
                  <Search size={20} className="absolute left-3 text-stone" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by perfume name, notes (e.g. Vanilla, Oud, Bergamot), or gender..."
                    className="w-full border-b-2 border-line bg-transparent py-3 pl-11 pr-10 text-base text-ink placeholder:text-stone/70 focus:border-brass focus:outline-none sm:text-lg"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-3 text-stone hover:text-ink"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close search"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-brass hover:text-brass"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Quick tags */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-stone">Quick search:</span>
                {quickTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="border border-line bg-white/40 px-3 py-1 text-ink transition-colors hover:border-brass hover:text-brass"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Results container */}
            <div className="max-h-[65vh] overflow-y-auto border-t border-line bg-parchment/60 py-4">
              <div className="container-page">
                {loading && (
                  <p className="py-8 text-center text-sm text-stone">
                    Loading fragrances...
                  </p>
                )}

                {!loading && query && filtered.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="font-display text-lg italic text-ink">
                      No fragrances matched &ldquo;{query}&rdquo;
                    </p>
                    <p className="mt-2 text-sm text-stone">
                      Try searching for broader keywords like &ldquo;Men&rdquo;,
                      &ldquo;Vanilla&rdquo;, or &ldquo;Daily Wear&rdquo;.
                    </p>
                  </div>
                )}

                {!loading && query && filtered.length > 0 && (
                  <div>
                    <p className="mb-4 text-xs tracking-wider text-stone uppercase">
                      Found {filtered.length} fragrance
                      {filtered.length > 1 ? "s" : ""}
                    </p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {filtered.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.slug}`}
                          onClick={onClose}
                          className="group flex gap-4 border border-line bg-white/70 p-3 transition-colors hover:border-brass"
                        >
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden bg-parchment">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="80px"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="flex flex-1 flex-col justify-center">
                            <div className="flex items-center justify-between">
                              <h4 className="font-display text-sm text-ink group-hover:text-brass">
                                {product.name}
                              </h4>
                              <span className="text-[10px] text-stone uppercase">
                                {product.gender}
                              </span>
                            </div>
                            <p className="mt-0.5 text-xs text-stone">
                              {product.tags[0]} • {product.volumeMl}ml
                            </p>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-xs font-semibold text-ink">
                                {formatRs(product.priceRs)}
                              </span>
                              <span className="flex items-center gap-1 text-[11px] text-brass">
                                View <ArrowRight size={12} />
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="flex-1" onClick={onClose} />
        </div>
      )}
    </AnimatePresence>
  );
}
