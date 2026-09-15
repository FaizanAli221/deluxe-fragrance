import Image from "next/image";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { getProductBySlug, getReviews, getProducts } from "@/lib/api";
import { formatRs } from "@/lib/format";
import ProductGrid from "@/components/ProductGrid";
import AddToCartButton from "@/components/AddToCartButton";

export async function generateStaticParams() {
  const { products } = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const [productReviews, relatedRes] = await Promise.all([
    getReviews(product.slug),
    getProducts({ gender: product.gender }),
  ]);

  const related = relatedRes.products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-8 sm:pt-12">
      <div className="container-page grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12">
        <div className="relative aspect-square overflow-hidden bg-white/40">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="font-display text-3xl italic text-ink">
            {product.name} ({product.volumeMl}ml)
          </h1>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex text-brass">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.round(product.rating) ? "fill-brass" : ""
                  }
                />
              ))}
            </div>
            <span className="text-sm text-stone">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>

          <p className="mt-4 text-xl text-ink">{formatRs(product.priceRs)}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-brass/40 px-2.5 py-0.5 text-[11px] text-brass"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-ink/80">
            {product.description}
          </p>

          <dl className="mt-6 space-y-2 border-y border-line py-5 text-sm">
            <div className="flex gap-2">
              <dt className="w-16 flex-shrink-0 text-stone">Top</dt>
              <dd className="text-ink">{product.notes.top.join(", ")}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 flex-shrink-0 text-stone">Heart</dt>
              <dd className="text-ink">{product.notes.heart.join(", ")}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 flex-shrink-0 text-stone">Base</dt>
              <dd className="text-ink">{product.notes.base.join(", ")}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      {productReviews.length > 0 && (
        <div className="container-page mt-16">
          <h2 className="mb-6 font-display text-xl italic text-ink">
            What customers say
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {productReviews.map((review) => (
              <div key={review.id} className="border border-line p-5">
                <div className="flex text-brass">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-brass" />
                  ))}
                </div>
                <p className="mt-2 font-medium text-ink">{review.title}</p>
                <p className="mt-1 text-sm text-ink/75">{review.body}</p>
                <p className="mt-3 text-sm font-medium text-ink">
                  {review.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-8">
          <ProductGrid title="You may also like" products={related} />
        </div>
      )}
    </div>
  );
}
