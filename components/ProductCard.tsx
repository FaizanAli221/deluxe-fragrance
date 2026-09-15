"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/types/product";
import { formatRs } from "@/lib/format";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));

  return (
    <div className="group flex flex-col border border-line bg-white/40 transition-colors hover:border-brass">
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
        <button
          aria-label={
            isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-parchment/90 text-ink transition-colors hover:text-wine"
        >
          <Heart
            size={16}
            className={isWishlisted ? "fill-wine text-wine" : ""}
          />
        </button>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-display text-base text-ink">
            {product.name} ({product.volumeMl}ml)
          </h3>
        </Link>
        <p className="mt-1 text-sm text-ink/80">{formatRs(product.priceRs)}</p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-brass/40 px-2.5 py-0.5 text-[11px] text-brass"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => addItem(product)}
          className="mt-4 w-full border border-ink py-2.5 text-xs tracking-widest2 text-ink transition-colors hover:bg-ink hover:text-parchment"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
