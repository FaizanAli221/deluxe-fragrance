import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "Shop All",
    href: "/shop",
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Women's Perfumes",
    href: "/shop?gender=women",
    image:
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function CollectionCards() {
  return (
    <section className="py-14 sm:py-20">
      <div className="container-page">
        <h2 className="mb-8 text-center font-display text-2xl italic text-ink sm:text-3xl">
          Shop by collection
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {collections.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group relative block h-72 overflow-hidden sm:h-96"
            >
              <Image
                src={c.image}
                alt={c.title}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0" />
              <span className="absolute bottom-5 left-5 font-display text-xl italic text-parchment sm:text-2xl">
                {c.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
