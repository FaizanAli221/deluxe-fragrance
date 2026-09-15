"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";
import { formatRs } from "@/lib/format";

export default function WishlistPage() {
  const productIds = useWishlistStore((s) => s.productIds);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const addItem = useCartStore((s) => s.addItem);

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((res) => setAllProducts(res.products))
      .catch(() => setAllProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const wishlistedItems = allProducts.filter((p) => productIds.includes(p.id));

  return (
    <div className="py-12 sm:py-20">
      <div className="container-page">
        <div className="text-center">
          <p className="eyebrow mb-2">Private Selection</p>
          <h1 className="font-display text-3xl italic text-ink sm:text-5xl">
            My Wishlist
          </h1>
          <p className="mt-3 text-sm text-stone">
            {wishlistedItems.length === 0
              ? "Your curated list of preferred fragrances"
              : `${wishlistedItems.length} fragrance${
                  wishlistedItems.length > 1 ? "s" : ""
                } saved for your collection`}
          </p>
        </div>

        {loading ? (
          <p className="py-20 text-center text-sm text-stone">
            Loading your saved fragrances...
          </p>
        ) : wishlistedItems.length === 0 ? (
          <div className="mx-auto mt-12 max-w-md border border-line bg-white/40 py-16 text-center">
            <Heart size={44} className="mx-auto text-stone/40" />
            <h3 className="mt-4 font-display text-xl italic text-ink">
              Your wishlist is currently empty
            </h3>
            <p className="mt-2 text-sm text-stone">
              Explore our catalogue and click the heart icon on any fragrance to
              save it for later.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 border border-ink px-6 py-3 text-xs tracking-widest2 text-ink hover:bg-ink hover:text-parchment uppercase transition-colors"
            >
              Discover Fragrances <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wishlistedItems.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col border border-line bg-white/50 transition-colors hover:border-brass"
              >
                <div className="relative aspect-square overflow-hidden bg-parchment">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <button
                    aria-label="Remove from wishlist"
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-parchment/90 text-wine transition-colors hover:bg-white"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[10px] tracking-wider text-stone uppercase">
                    Extrait de Parfum • {product.gender}
                  </span>
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="mt-1 font-display text-base text-ink group-hover:text-brass">
                      {product.name} ({product.volumeMl}ml)
                    </h3>
                  </Link>
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {formatRs(product.priceRs)}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => addItem(product)}
                      className="flex flex-1 items-center justify-center gap-2 bg-ink py-2.5 text-xs tracking-wider text-parchment transition-colors hover:bg-brass hover:text-ink uppercase"
                    >
                      <ShoppingBag size={14} /> Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
