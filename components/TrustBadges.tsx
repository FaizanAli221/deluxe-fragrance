import { MapPin, BadgeCheck, Droplet, Truck } from "lucide-react";

const badges = [
  { icon: MapPin, label: "Made in UAE" },
  { icon: BadgeCheck, label: "1 Million+ Units Sold" },
  { icon: Droplet, label: "Authentic Lasting & Projection" },
  { icon: Truck, label: "Nationwide Retail Presence" },
];

export default function TrustBadges() {
  return (
    <section className="py-10 sm:py-14">
      <div className="container-page">
        <h2 className="mb-6 text-center font-display text-xl italic text-ink sm:text-2xl">
          Why Fragrance Deluxe?
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {badges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 border border-brass/30 bg-brass/[0.06] px-4 py-8 text-center"
            >
              <Icon size={24} className="text-brass" strokeWidth={1.5} />
              <span className="text-sm text-ink">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
