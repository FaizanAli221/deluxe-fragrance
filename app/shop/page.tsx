import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";
import { Gender } from "@/types/product";

const filters: { label: string; value: Gender | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Unisex", value: "unisex" },
];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { gender?: string };
}) {
  const activeGender = (searchParams.gender as Gender | undefined) ?? "all";
  const { products } = await getProducts({
    gender: activeGender === "all" ? undefined : activeGender,
  });

  return (
    <div className="pt-10 sm:pt-14">
      <div className="container-page mb-8">
        <h1 className="text-center font-display text-3xl italic text-ink">
          Shop all fragrances
        </h1>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <Link
              key={f.value}
              href={f.value === "all" ? "/shop" : `/shop?gender=${f.value}`}
              className={`border px-4 py-1.5 text-sm transition-colors ${
                activeGender === f.value
                  ? "border-ink bg-ink text-parchment"
                  : "border-line text-ink hover:border-brass hover:text-brass"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
