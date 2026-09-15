"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircle, HelpCircle } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: "Formulation & Authenticity",
    items: [
      {
        q: "What concentration are Fragrance Deluxe perfumes?",
        a: "All Fragrance Deluxe fragrances are formulated at Extrait de Parfum concentration (25% - 30% fragrance oil concentration). This ensures remarkable depth, 10 to 14+ hours of lasting performance, and a lingering sillage trail.",
      },
      {
        q: "Where are your fragrances produced?",
        a: "Our master formulations and raw ingredients are sourced and produced in specialized fragrance laboratories in Sharjah and Dubai, United Arab Emirates, adhering to strict IFRA global safety guidelines.",
      },
      {
        q: "Are these impressions or original creations?",
        a: "Our collection features luxury bespoke compositions crafted to rival the world's most acclaimed niche and designer signatures, offering identical luxury nuance and performance at an accessible price.",
      },
      {
        q: "Are the bottles safe for everyday use and sensitive skin?",
        a: "Yes. Every batch is dermatologically evaluated and completely free of toxic parabens, phthalates, and harsh chemical stabilizers.",
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    items: [
      {
        q: "How much does shipping cost?",
        a: "Standard nationwide shipping is Rs. 250 across all cities in Pakistan. However, all orders of Rs. 5,000 or above automatically qualify for COMPLIMENTARY FREE shipping!",
      },
      {
        q: "How long will my order take to arrive?",
        a: "Orders in major cities (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad) typically arrive within 2 to 3 business days. Other cities and suburban regions typically take 3 to 5 business days.",
      },
      {
        q: "Do you offer Cash on Delivery (COD)?",
        a: "Yes! We proudly offer Cash on Delivery (COD) to every postal code across Pakistan. You can inspect the sealed outer package and pay the courier upon delivery.",
      },
      {
        q: "How can I track my shipment?",
        a: "Once dispatched, you will receive a courier tracking number via SMS/WhatsApp. You can also visit our Track Order page anytime and enter your order reference ID.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      {
        q: "What is your return & exchange policy?",
        a: "We offer a 7-day hassle-free exchange policy. If the item is unopened, undamaged, and retains its original luxury packaging, we will gladly exchange it for another fragrance of your choice.",
      },
      {
        q: "What should I do if a bottle arrives leaked or damaged?",
        a: "Our parcels are securely bubble-wrapped and reinforced. In the rare event of transit damage, simply send photos of the damage to our WhatsApp helpline (+92 325 8764465) within 24 hours, and we will send a brand-new replacement immediately at no extra charge.",
      },
    ],
  },
  {
    title: "Perfume Care & Longevity Tips",
    items: [
      {
        q: "How should I apply my perfume for maximum projection?",
        a: "Apply your fragrance to warm pulse points: wrists, sides of the neck, behind the ears, and inner elbows. For enhanced projection, apply immediately after a warm shower onto well-hydrated skin, and avoid rubbing your wrists together as that breaks down top notes.",
      },
      {
        q: "How should I store my fragrance bottles?",
        a: "Keep your perfumes in a cool, dry place away from direct sunlight, excessive heat, and bathroom humidity. Keeping them inside their luxury boxes or inside a bedroom cabinet preserves the oil integrity for years.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({
    "0-0": true,
    "1-0": true,
  });

  const toggle = (key: string) => {
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="py-12 sm:py-20">
      <div className="container-page max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <p className="eyebrow mb-2">Help Center</p>
          <h1 className="font-display text-3xl italic text-ink sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink/75 sm:text-base">
            Everything you need to know about our Extrait de Parfum
            concentrations, delivery across Pakistan, payment methods, and
            fragrance care.
          </p>
        </div>

        {/* Categories & Accordions */}
        <div className="mt-14 space-y-12">
          {faqData.map((category, catIdx) => (
            <div key={category.title}>
              <h2 className="border-b border-line pb-3 font-display text-xl italic text-ink">
                {category.title}
              </h2>
              <div className="mt-4 divide-y divide-line">
                {category.items.map((item, itemIdx) => {
                  const key = `${catIdx}-${itemIdx}`;
                  const isOpen = !!openMap[key];
                  return (
                    <div key={item.q} className="py-4">
                      <button
                        onClick={() => toggle(key)}
                        className="flex w-full items-center justify-between text-left font-display text-base text-ink transition-colors hover:text-brass"
                      >
                        <span className="pr-4">{item.q}</span>
                        <ChevronDown
                          size={18}
                          className={`flex-shrink-0 text-stone transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-brass" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <p className="mt-3 text-sm leading-relaxed text-ink/80">
                          {item.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-16 border border-line bg-brass/[0.08] p-8 text-center sm:p-10">
          <HelpCircle size={32} className="mx-auto text-brass" />
          <h3 className="mt-3 font-display text-xl italic text-ink">
            Have a question that isn&apos;t listed here?
          </h3>
          <p className="mt-2 text-sm text-stone">
            Our customer concierge is available 7 days a week to guide your
            purchase and answer specific questions.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/923258764465"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded bg-[#25D366] px-6 py-3 text-xs font-semibold text-white hover:opacity-90 uppercase tracking-wide"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="border border-ink bg-transparent px-6 py-3 text-xs tracking-widest2 text-ink hover:bg-ink hover:text-parchment uppercase"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
