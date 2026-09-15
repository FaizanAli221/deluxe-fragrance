import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, Truck, ShieldCheck, RefreshCw, Banknote, Sparkles } from "lucide-react";
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
    <div className="pt-8 sm:pt-14">
      <div className="container-page grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14">
        {/* Product Image Frame */}
        <div className="lg:col-span-6">
          <div className="relative aspect-square overflow-hidden border border-line bg-white/50 shadow-sm">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
            <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-ink/75 px-3 py-1 text-xs tracking-wider text-parchment backdrop-blur-xs uppercase">
              Extrait de Parfum • {product.gender}
            </span>
          </div>
        </div>

        {/* Product Details Column */}
        <div className="flex flex-col lg:col-span-6">
          <div>
            <span className="eyebrow uppercase tracking-widest text-brass">
              Haute Parfumerie Collection
            </span>
            <h1 className="mt-1 font-display text-3xl italic text-ink sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-0.5 text-xs text-stone">
              100ml / 3.4 FL. OZ. • Extrait Concentration
            </p>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex text-brass">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className={
                      i < Math.round(product.rating) ? "fill-brass" : ""
                    }
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-ink">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-xs text-stone">
                ({product.reviewCount} customer reviews)
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold text-ink">
              {formatRs(product.priceRs)}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-brass/40 bg-brass/[0.04] px-3 py-0.5 text-[11px] text-brass"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-ink/80">
              {product.description}
            </p>
          </div>

          {/* Olfactory pyramid */}
          <div className="mt-6 border-y border-line py-5">
            <h3 className="mb-3 font-display text-xs uppercase tracking-widest text-stone">
              Olfactory Pyramid
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="border border-line bg-white/40 p-3">
                <p className="text-[10px] tracking-wider text-stone uppercase">
                  Top Notes
                </p>
                <p className="mt-1 text-xs font-medium text-ink">
                  {product.notes.top.join(", ")}
                </p>
              </div>
              <div className="border border-line bg-white/40 p-3">
                <p className="text-[10px] tracking-wider text-stone uppercase">
                  Heart Notes
                </p>
                <p className="mt-1 text-xs font-medium text-ink">
                  {product.notes.heart.join(", ")}
                </p>
              </div>
              <div className="border border-line bg-white/40 p-3">
                <p className="text-[10px] tracking-wider text-stone uppercase">
                  Base Notes
                </p>
                <p className="mt-1 text-xs font-medium text-ink">
                  {product.notes.base.join(", ")}
                </p>
              </div>
            </div>
          </div>

          {/* Add to Cart button */}
          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>

          {/* Trust perks */}
          <div className="mt-8 space-y-2.5 rounded border border-line bg-brass/[0.05] p-4 text-xs text-ink/85">
            <div className="flex items-center gap-2.5">
              <Truck size={16} className="text-brass flex-shrink-0" />
              <span>
                <strong>Free Delivery</strong> across Pakistan on orders over
                Rs. 5,000 (dispatched in 24h).
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Banknote size={16} className="text-brass flex-shrink-0" />
              <span>
                <strong>Cash on Delivery (COD)</strong> available nationwide.
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={16} className="text-brass flex-shrink-0" />
              <span>
                <strong>100% Authentic Extrait:</strong> 25-30% oil
                concentration for 12+ hours longevity.
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <RefreshCw size={16} className="text-brass flex-shrink-0" />
              <span>
                <strong>7-Day Guarantee:</strong> Hassle-free exchange for any
                unopened bottle.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      {productReviews.length > 0 && (
        <div className="container-page mt-20 border-t border-line pt-12">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="eyebrow mb-1">Customer Reviews</p>
              <h2 className="font-display text-2xl italic text-ink sm:text-3xl">
                What clients say about {product.name}
              </h2>
            </div>
            <div className="flex items-center gap-2 border border-line bg-white/50 px-4 py-2 text-xs">
              <Sparkles size={14} className="text-brass" />
              <span>Verified Extrait Purchases</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {productReviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col justify-between border border-line bg-white/50 p-6 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex text-brass">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={13} className="fill-brass" />
                      ))}
                    </div>
                    {review.verified && (
                      <span className="text-[10px] text-stone">
                        ✓ Verified Buyer
                      </span>
                    )}
                  </div>
                  <h4 className="mt-3 font-display text-base text-ink">
                    {review.title}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink/75">
                    &ldquo;{review.body}&rdquo;
                  </p>
                </div>
                <p className="mt-5 border-t border-line/60 pt-3 text-xs font-semibold text-ink">
                  {review.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-16 border-t border-line pt-12">
          <ProductGrid title="You may also appreciate" products={related} />
        </div>
      )}
    </div>
  );
}
