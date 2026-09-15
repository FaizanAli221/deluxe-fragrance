"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "The Signature Edit",
    heading: "Scent, considered.",
    sub: "Extrait-strength fragrances crafted in small batches for lasting projection.",
    cta: "Shop the edit",
    href: "/shop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "For Him",
    heading: "Bold, without trying.",
    sub: "Woody, amber, and aromatic compositions built for daily wear.",
    cta: "Shop men's",
    href: "/shop?gender=men",
  },
  {
    image:
      "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "For Her",
    heading: "Quietly unforgettable.",
    sub: "Floral and amber blends designed to be remembered, not just worn.",
    cta: "Shop women's",
    href: "/shop?gender=women",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const slide = slides[index];

  return (
    <section className="relative h-[520px] w-full overflow-hidden bg-ink sm:h-[640px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.heading}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/10" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full items-end">
        <div className="container-page w-full pb-14 sm:pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-lg text-parchment"
            >
              <p className="eyebrow mb-3 text-brassLight">{slide.eyebrow}</p>
              <h1 className="font-display text-4xl italic leading-tight sm:text-5xl">
                {slide.heading}
              </h1>
              <p className="mt-4 text-sm text-parchment/80 sm:text-base">
                {slide.sub}
              </p>
              <Link
                href={slide.href}
                className="mt-6 inline-block border border-brassLight px-6 py-3 text-sm tracking-wide text-parchment transition-colors hover:bg-brassLight hover:text-ink"
              >
                {slide.cta}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button
        aria-label="Previous slide"
        onClick={prev}
        className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-parchment/90 text-ink transition-colors hover:bg-parchment sm:left-6"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        aria-label="Next slide"
        onClick={next}
        className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-parchment/90 text-ink transition-colors hover:bg-parchment sm:right-6"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-brassLight" : "w-1.5 bg-parchment/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
