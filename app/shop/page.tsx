"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";
import { Gender } from "@/types/product";

const genderFilters: { label: string; value: Gender | "all" }[] = [
  { label: "All Fragrances", value: "all" },
  { label: "Men's Collection", value: "men" },
  { label: "Women's Collection", value: "women" },
  { label: "Unisex Signatures", value: "unisex" },
];

const tagFilters = [
  "Daily Wear",
  "Evening Wear",
  "Amber Vanilla",
  "Fresh Spicy",
  "Woody Floral",
  "Soft Floral",
];

function ShopInner() {
  const searchParams = useSearchParams();
  const activeGender = (searchParams.get("gender") as Gender | null) ?? "all";
  const activeTag = searchParams.get("tag");

  const filteredProducts = useMemo(() => {
    let list = products;
    if (activeGender && activeGender !== "all") {
      list = list.filter((p) => p.gender === activeGender);
    }
    if (activeTag) {
      list = list.filter((p) =>
        p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())
      );
    }
    return list;
  }, [activeGender, activeTag]);

  return (
    <div className="pt-10 sm:pt-16">
      <div className="container-page mb-10">
        <div className="text-center">
          <p className="eyebrow mb-2">The Complete Catalog</p>
          <h1 className="font-display text-3xl italic text-ink sm:text-5xl">
            Luxury Fragrance Edit
          </h1>
          <p className="mt-3 text-sm text-stone">
            Showing {filteredProducts.length} artisanal Extrait de Parfum formulation
            {filteredProducts.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Gender Category Tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {genderFilters.map((f) => {
            const isSelected = activeGender === f.value;
            const queryParams = new URLSearchParams();
            if (f.value !== "all") queryParams.set("gender", f.value);
            if (activeTag) queryParams.set("tag", activeTag);
            const href = `/shop${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

            return (
              <Link
                key={f.value}
                href={href}
                className={`border px-5 py-2 text-xs tracking-wider uppercase transition-all ${
                  isSelected
                    ? "border-ink bg-ink text-parchment font-semibold"
                    : "border-line bg-white/40 text-ink hover:border-brass hover:text-brass"
                }`}
              >
                {f.label}
              </Link>
            );
          })}
        </div>

        {/* Scent Profile Tags */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs">
          <span className="text-[11px] text-stone mr-1">Scent Profile:</span>
          {tagFilters.map((tag) => {
            const isSelected = activeTag?.toLowerCase() === tag.toLowerCase();
            const queryParams = new URLSearchParams();
            if (activeGender !== "all") queryParams.set("gender", activeGender);
            if (!isSelected) queryParams.set("tag", tag);
            const href = `/shop${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

            return (
              <Link
                key={tag}
                href={href}
                className={`rounded-full px-3 py-1 text-[11px] transition-all ${
                  isSelected
                    ? "border border-brass bg-brass text-ink font-semibold"
                    : "border border-line bg-white/60 text-stone hover:border-brass hover:text-brass"
                }`}
              >
                {tag} {isSelected && "✕"}
              </Link>
            );
          })}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="container-page my-16 border border-line bg-white/40 py-16 text-center">
          <p className="font-display text-xl italic text-ink">
            No fragrances found matching these filters.
          </p>
          <Link
            href="/shop"
            className="mt-5 inline-block border border-ink px-6 py-2.5 text-xs tracking-widest2 text-ink hover:bg-ink hover:text-parchment uppercase"
          >
            Clear All Filters
          </Link>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-20 text-center text-sm text-stone">
          Loading catalog...
        </div>
      }
    >
      <ShopInner />
    </Suspense>
  );
}
