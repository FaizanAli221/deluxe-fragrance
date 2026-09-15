"use client";

import { useRef } from "react";
import { Star, BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { Review } from "@/types/product";

export default function Reviews({ reviews }: { reviews: Review[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section className="bg-brass/[0.06] py-14 sm:py-20">
      <div className="container-page">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl italic text-ink sm:text-3xl">
              Customer feedback
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex text-brass">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-brass" />
                ))}
              </div>
              <span className="text-sm text-stone">
                from {reviews.length * 7} reviews
              </span>
              <BadgeCheck size={16} className="text-brass" />
            </div>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              aria-label="Scroll reviews left"
              onClick={() => scroll(-1)}
              className="flex h-9 w-9 items-center justify-center border border-ink/20 text-ink transition-colors hover:border-brass hover:text-brass"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              aria-label="Scroll reviews right"
              onClick={() => scroll(1)}
              className="flex h-9 w-9 items-center justify-center border border-ink/20 text-ink transition-colors hover:border-brass hover:text-brass"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="w-72 flex-shrink-0 snap-start border border-line bg-parchment p-5"
            >
              <div className="flex text-brass">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-brass" />
                ))}
              </div>
              <p className="mt-2 font-medium text-ink">{review.title}</p>
              <p className="mt-1 text-sm text-ink/75">{review.body}</p>
              <div className="mt-4 border-t border-line pt-3">
                <p className="text-sm font-medium text-ink">
                  {review.author}
                </p>
                {review.productName && (
                  <p className="text-xs text-stone underline">
                    {review.productName}
                    {review.productVolumeMl ? ` (${review.productVolumeMl}ml)` : ""}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
