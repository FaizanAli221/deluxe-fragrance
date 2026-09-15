import Link from "next/link";
import { Sparkles, ShieldCheck, Truck } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="border-b border-line bg-ink text-parchment/90">
      <div className="container-page flex h-9 items-center justify-between text-[11px] tracking-wide">
        <div className="hidden items-center gap-4 md:flex">
          <span className="flex items-center gap-1.5 text-stone">
            <ShieldCheck size={13} className="text-brass" /> 100% Authentic UAE
            Extrait
          </span>
          <span className="text-stone">|</span>
          <span className="flex items-center gap-1.5 text-stone">
            <Truck size={13} className="text-brass" /> Cash on Delivery
            Available
          </span>
        </div>

        <div className="mx-auto flex items-center gap-2 text-center md:mx-0">
          <Sparkles size={12} className="text-brassLight animate-pulse" />
          <span>
            Complimentary delivery nationwide on orders over{" "}
            <span className="font-semibold text-brassLight">Rs. 5,000</span>
          </span>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/track-order"
            className="text-stone transition-colors hover:text-brassLight"
          >
            Track Order
          </Link>
          <span className="text-stone">|</span>
          <Link
            href="/contact"
            className="text-stone transition-colors hover:text-brassLight"
          >
            Help & Support
          </Link>
        </div>
      </div>
    </div>
  );
}
