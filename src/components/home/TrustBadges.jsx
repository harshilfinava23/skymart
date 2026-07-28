import React from "react";
import { Zap, Shield, Tag, Truck, RotateCcw, Headphones } from "lucide-react";

const badges = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Same-day on select items",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "100% encrypted checkout",
  },
  {
    icon: Tag,
    title: "Best Prices",
    description: "Price-match guarantee",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return window",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Real humans, always on",
  },
];

const TrustBadges = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 my-4">
      {badges.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#111111] px-6 py-5 hover:border-[#c8f400]/40 transition-all duration-300 shadow-md group"
        >
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#c8f400] group-hover:bg-[#c8f400]/15 transition-all">
            <Icon className="h-5 w-5 shrink-0 text-[#c8f400]" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-sm font-extrabold text-white group-hover:text-[#c8f400] transition-colors">{title}</p>
            <p className="text-xs text-neutral-400 mt-0.5">{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
