import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  title,
  products,
}: {
  title?: string;
  products: Product[];
}) {
  return (
    <section className="pb-14 sm:pb-20">
      <div className="container-page">
        {title && (
          <h2 className="mb-8 text-center font-display text-2xl italic text-ink sm:text-3xl">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
