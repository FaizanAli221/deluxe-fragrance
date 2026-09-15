import Hero from "@/components/Hero";
import CollectionCards from "@/components/CollectionCards";
import TrustBadges from "@/components/TrustBadges";
import ProductGrid from "@/components/ProductGrid";
import Reviews from "@/components/Reviews";
import { getProducts, getReviews } from "@/lib/api";

export default async function HomePage() {
  const [womenRes, menRes, reviews] = await Promise.all([
    getProducts({ gender: "women" }),
    getProducts({ gender: "men" }),
    getReviews(),
  ]);

  const womenProducts = womenRes.products.slice(0, 3);
  const menProducts = menRes.products.slice(0, 3);

  return (
    <>
      <Hero />
      <CollectionCards />
      <TrustBadges />
      <ProductGrid title="Women collection" products={womenProducts} />
      <ProductGrid title="Men collection" products={menProducts} />
      <Reviews reviews={reviews} />
    </>
  );
}
