import { Product, Review } from "@/types/product";

export const products: Product[] = [
  {
    id: "p1",
    slug: "havai-ice",
    name: "Havai Ice",
    volumeMl: 100,
    priceRs: 3999,
    gender: "men",
    tags: ["Fresh Fruity Woody", "Daily Wear"],
    notes: {
      top: ["Green Apple", "Bergamot"],
      heart: ["Lavender", "Sea Salt"],
      base: ["Cedarwood", "Musk"],
    },
    description:
      "A crisp, glacial composition that opens with sparkling green apple over a mineral, sea-salt heart, settling into a clean woody base. Built for warm days and long wear.",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 18,
    inStock: true,
    featured: true,
  },
  {
    id: "p2",
    slug: "ombre-nomate",
    name: "Ombre Nomate",
    volumeMl: 100,
    priceRs: 4499,
    gender: "men",
    tags: ["Woody Floral", "Evening Wear"],
    notes: {
      top: ["Saffron", "Pink Pepper"],
      heart: ["Rose", "Amberwood"],
      base: ["Sandalwood", "Vanilla"],
    },
    description:
      "A smouldering woody-floral built around a rare amberwood accord, softened by rose and finished with a warm sandalwood-vanilla base. Reserved for evenings that matter.",
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 24,
    inStock: true,
    featured: true,
  },
  {
    id: "p3",
    slug: "3-pm",
    name: "3 PM",
    volumeMl: 100,
    priceRs: 3499,
    gender: "unisex",
    tags: ["Amber Vanilla", "Evening"],
    notes: {
      top: ["Bergamot", "Cinnamon"],
      heart: ["Amber", "Orchid"],
      base: ["Vanilla", "Tonka Bean"],
    },
    description:
      "Golden amber and vanilla wrapped around a spiced citrus opening — an afternoon-into-evening signature that lingers on skin and fabric alike.",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 31,
    inStock: true,
    featured: true,
  },
  {
    id: "p4",
    slug: "barakkat-rouge",
    name: "Barakkat Rouge",
    volumeMl: 100,
    priceRs: 4449,
    gender: "women",
    tags: ["Amber Floral", "Evening"],
    notes: {
      top: ["Grapefruit", "Saffron"],
      heart: ["Jasmine", "Amber"],
      base: ["Cedarwood", "Ambergris"],
    },
    description:
      "A radiant amber-floral extrait, opening on juicy grapefruit and saffron before unfolding into jasmine and a rich ambergris base. Unmistakable and long-lasting.",
    image:
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 27,
    inStock: true,
    featured: true,
  },
  {
    id: "p5",
    slug: "the-man-elixir",
    name: "The Man Elixir",
    volumeMl: 100,
    priceRs: 3999,
    gender: "men",
    tags: ["Amber Woody", "Evening"],
    notes: {
      top: ["Cardamom", "Black Pepper"],
      heart: ["Amber", "Dates"],
      base: ["Woody Notes", "Musk"],
    },
    description:
      "A commanding amber-woody built on spiced cardamom and dates, deepened with a smoky woody-musk base. Understated strength, worn all evening.",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop&sat=-20",
    rating: 4.7,
    reviewCount: 15,
    inStock: true,
    featured: true,
  },
  {
    id: "p6",
    slug: "phantasy",
    name: "Phantasy",
    volumeMl: 100,
    priceRs: 4499,
    gender: "unisex",
    tags: ["Citrus Aromatic", "Daily Wear"],
    notes: {
      top: ["Bergamot", "Sea Notes"],
      heart: ["Blue Sage", "Juniper"],
      base: ["Ambroxan", "Driftwood"],
    },
    description:
      "An aquatic-aromatic built for daily wear — cool citrus and blue sage over an ambroxan base that reads clean and modern from morning to night.",
    image:
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=1200&auto=format&fit=crop",
    rating: 4.6,
    reviewCount: 12,
    inStock: true,
    featured: true,
  },
  {
    id: "p7",
    slug: "3-am",
    name: "3 AM",
    volumeMl: 100,
    priceRs: 3499,
    gender: "women",
    tags: ["Amber Vanilla", "Evening"],
    notes: {
      top: ["Pear", "Pink Pepper"],
      heart: ["Orchid", "Amber"],
      base: ["Vanilla", "Musk"],
    },
    description:
      "The women's companion to our signature amber-vanilla line — soft pear and orchid over a warm, musky vanilla base built to last through the night.",
    image:
      "https://images.unsplash.com/photo-1592842232655-e5f4b7cdb019?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 22,
    inStock: true,
  },
  {
    id: "p8",
    slug: "blossom-paris",
    name: "Blossom Paris",
    volumeMl: 100,
    priceRs: 3799,
    gender: "women",
    tags: ["White Floral", "Daily Wear"],
    notes: {
      top: ["Peony", "Mandarin"],
      heart: ["Jasmine", "Lily of the Valley"],
      base: ["White Musk", "Cedar"],
    },
    description:
      "A light, romantic white floral with peony and jasmine over a soft musk-cedar base — an everyday signature with quiet Parisian polish.",
    image:
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=1200&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 19,
    inStock: true,
  },
  {
    id: "p9",
    slug: "secret-passion",
    name: "Secret Passion",
    volumeMl: 100,
    priceRs: 4299,
    gender: "women",
    tags: ["Fruity Floral", "Evening"],
    notes: {
      top: ["Blackcurrant", "Litchi"],
      heart: ["Rose", "Peony"],
      base: ["Patchouli", "Musk"],
    },
    description:
      "A bold fruity-floral extrait — tart blackcurrant and litchi over a rose heart, grounded in patchouli and musk for a passionate evening finish.",
    image:
      "https://images.unsplash.com/photo-1610461888750-10bfc601b874?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 34,
    inStock: true,
  },
  {
    id: "p10",
    slug: "suvage",
    name: "Suvage",
    volumeMl: 100,
    priceRs: 4199,
    gender: "men",
    tags: ["Fresh Spicy", "Daily Wear"],
    notes: {
      top: ["Calabrian Bergamot", "Pepper"],
      heart: ["Lavender", "Geranium"],
      base: ["Ambroxan", "Vanilla"],
    },
    description:
      "A radiant, freshly-spiced signature built on bergamot and ambroxan — bold projection with everyday wearability, from desk to dinner.",
    image:
      "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 41,
    inStock: true,
  },
  {
    id: "p11",
    slug: "fire-night",
    name: "Fire Night",
    volumeMl: 100,
    priceRs: 3899,
    gender: "men",
    tags: ["Spicy Amber", "Evening"],
    notes: {
      top: ["Cinnamon", "Orange"],
      heart: ["Oud", "Rose"],
      base: ["Amber", "Leather"],
    },
    description:
      "A smoky, spiced amber-oud built for cold evenings — cinnamon and orange give way to rose and oud over a warm leather-amber base.",
    image:
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=1200&auto=format&fit=crop",
    rating: 4.6,
    reviewCount: 9,
    inStock: true,
  },
  {
    id: "p12",
    slug: "florance",
    name: "Florance",
    volumeMl: 100,
    priceRs: 3699,
    gender: "women",
    tags: ["Soft Floral", "Daily Wear"],
    notes: {
      top: ["Cherry Blossom", "Pear"],
      heart: ["Peony", "Freesia"],
      base: ["White Musk", "Sandalwood"],
    },
    description:
      "A tender, petal-soft floral with cherry blossom and freesia resting on a smooth white-musk sandalwood base. Light enough for every day.",
    image:
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=1200&auto=format&fit=crop&sat=10",
    rating: 4.7,
    reviewCount: 16,
    inStock: true,
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    productSlug: "havai-ice",
    author: "Kamliheer Heer",
    rating: 5,
    title: "Very nice",
    body: "Very nice, lasts the whole day and the scent is exactly as described.",
    verified: true,
  },
  {
    id: "r2",
    productSlug: "the-man-elixir",
    author: "Yousaf Javed",
    rating: 5,
    title: "Excellent projection",
    body: "Reminds me of a much pricier designer scent. Great longevity for the price.",
    verified: true,
  },
  {
    id: "r3",
    productSlug: "barakkat-rouge",
    author: "Ayesha Malik",
    rating: 5,
    title: "My new signature",
    body: "Got so many compliments the first time I wore this out. Packaging feels premium too.",
    verified: true,
  },
  {
    id: "r4",
    productSlug: "3-pm",
    author: "Bilal Ahmed",
    rating: 5,
    title: "Worth every rupee",
    body: "Sillage is strong without being overwhelming. Will definitely reorder.",
    verified: true,
  },
  {
    id: "r5",
    productSlug: "suvage",
    author: "Hina Raza",
    rating: 4,
    title: "Great daily scent",
    body: "Light enough for the office but still noticeable. Bottle looks great on the shelf too.",
    verified: true,
  },
  {
    id: "r6",
    productSlug: "secret-passion",
    author: "Zainab Sheikh",
    rating: 5,
    title: "Beautiful bottle, better scent",
    body: "Fruity opening settles into something much deeper after an hour. Loved it.",
    verified: true,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getReviewsForProduct(slug: string) {
  return reviews.filter((r) => r.productSlug === slug);
}
