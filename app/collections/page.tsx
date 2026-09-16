import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collectionsList = [
  {
    title: "Pour Homme Collection",
    subtitle: "Bold, Woody & Spiced",
    desc: "Commanding compositions built on cedarwood, saffron, pepper, and refined amberwood designed for day-to-night presence.",
    href: "/shop?gender=men",
    image: "/images/products/the-man-elixir.jpg",
    tag: "Men's Extrait",
  },
  {
    title: "Pour Femme Collection",
    subtitle: "Radiant, Floral & Sweet",
    desc: "Intoxicating white florals, French peonies, delicate orchids, and velvety Madagascar vanilla with unforgettable trails.",
    href: "/shop?gender=women",
    image: "/images/products/blossom-paris.jpg",
    tag: "Women's Extrait",
  },
  {
    title: "Unisex Signatures",
    subtitle: "Modern Balanced Harmonies",
    desc: "Transcendent scents that defy convention — sea salt, amber accords, and fresh bergamot suited for any connoisseur.",
    href: "/shop?gender=unisex",
    image: "/images/products/phantasy.jpg",
    tag: "Genderless Luxury",
  },
  {
    title: "The Evening & Oud Edit",
    subtitle: "Smoky, Intense & Warm",
    desc: "Extrait-strength oud, spiced cinnamon, ambergris, and smoky leather crafted for grand evenings and cold weather.",
    href: "/shop",
    image: "/images/products/ombre-nomate.jpg",
    tag: "Evening Wear",
  },
  {
    title: "Fresh & Aquatic Crisp",
    subtitle: "Glacial, Citrus & Marine",
    desc: "Glacial green apple, Calabrian bergamot, and blue sage designed for hot summer days, desk wear, and clean confidence.",
    href: "/shop",
    image: "/images/products/havai-ice.jpg",
    tag: "Fresh Everyday",
  },
  {
    title: "Gourmand & Amber Vanilla",
    subtitle: "Warm, Sweet & Addictive",
    desc: "Golden amber, roasted tonka bean, and luscious vanilla that linger gracefully on clothing and skin for over 14 hours.",
    href: "/shop",
    image: "/images/products/3-pm.jpg",
    tag: "Long Lasting",
  },
];

export default function CollectionsPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-2">Curated Olfactory Edits</p>
          <h1 className="font-display text-3xl italic text-ink sm:text-5xl">
            The Collections
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink/75 sm:text-base">
            Explore our artisanal Extrait de Parfum collections, categorized by
            gender, mood, and seasonal notes.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {collectionsList.map((col) => (
            <Link
              key={col.title}
              href={col.href}
              className="group flex flex-col border border-line bg-white/50 transition-all hover:border-brass hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-parchment">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-ink/70 px-3 py-0.5 text-[10px] tracking-wider text-parchment backdrop-blur-xs uppercase">
                  {col.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-[11px] tracking-widest text-stone uppercase">
                  {col.subtitle}
                </p>
                <h3 className="mt-1 font-display text-xl italic text-ink group-hover:text-brass">
                  {col.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/75">
                  {col.desc}
                </p>
                <div className="mt-6 flex items-center gap-1.5 pt-2 text-xs font-semibold tracking-wider text-brass uppercase">
                  <span>Explore Collection</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
