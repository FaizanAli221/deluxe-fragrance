"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Check } from "lucide-react";
import { Product } from "@/types/product";
import { formatRs } from "@/lib/format";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="group flex flex-col border border-line bg-white/40 transition-all hover:border-brass hover:shadow-md">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-parchment"
      >
        <Image
          src={product.image}
          alt={`${product.name} (${product.volumeMl}ml)`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
        />

        {/* Extrait badge */}
        <span className="absolute left-3 top-3 rounded-full border border-white/50 bg-ink/70 px-2.5 py-0.5 text-[9px] tracking-wider text-parchment backdrop-blur-xs uppercase">
          Extrait • {product.gender}
        </span>

        {/* Wishlist toggle */}
        <button
          aria-label={
            isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-parchment/90 text-ink shadow-sm transition-colors hover:text-wine"
        >
          <Heart
            size={16}
            className={isWishlisted ? "fill-wine text-wine" : ""}
          />
        </button>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-brass">
            <Star size={12} className="fill-brass text-brass" />
            <span className="font-semibold text-ink">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-stone">({product.reviewCount})</span>
          </div>
          <span className="text-[10px] tracking-wider text-stone uppercase">
            {product.volumeMl}ml
          </span>
        </div>

        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1.5 font-display text-base text-ink transition-colors group-hover:text-brass">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 text-sm font-semibold text-ink">
          {formatRs(product.priceRs)}
        </p>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-brass/30 bg-brass/[0.04] px-2 py-0.5 text-[10px] text-brass"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={handleAdd}
          className={`mt-4 w-full border py-2.5 text-xs tracking-widest2 transition-all uppercase flex items-center justify-center gap-1.5 ${
            justAdded
              ? "border-brass bg-brass text-ink font-semibold"
              : "border-ink text-ink hover:bg-ink hover:text-parchment"
          }`}
        >
          {justAdded ? (
            <>
              <Check size={14} /> Added to Bag
            </>
          ) : (
            "Add to Bag"
          )}
        </button>
      </div>
    </div>
  );
}
