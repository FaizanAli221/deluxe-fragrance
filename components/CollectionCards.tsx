import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "Men's Extrait",
    subtitle: "Woody, Amber & Spiced",
    href: "/shop?gender=men",
    image:
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Women's Signatures",
    subtitle: "Floral, Vanilla & Sweet",
    href: "/shop?gender=women",
    image:
      "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Unisex Editions",
    subtitle: "Balanced Modern Compositions",
    href: "/shop?gender=unisex",
    image:
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Complete Catalog",
    subtitle: "Explore All Formulations",
    href: "/shop",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function CollectionCards() {
  return (
    <section className="py-14 sm:py-20">
      <div className="container-page">
        <div className="mb-8 text-center">
          <p className="eyebrow mb-2">Curated Editions</p>
          <h2 className="font-display text-2xl italic text-ink sm:text-3xl">
            Shop by collection
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {collections.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group relative block h-80 overflow-hidden border border-line bg-parchment"
            >
              <Image
                src={c.image}
                alt={c.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-[11px] tracking-widest text-brassLight uppercase">
                  {c.subtitle}
                </p>
                <span className="mt-1 block font-display text-xl italic text-parchment">
                  {c.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
