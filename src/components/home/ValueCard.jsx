import React from "react";
import { ShieldCheck, Zap, HeartHandshake, Sparkles } from "lucide-react";

const ValueCard = () => {
  const values = [
    {
      icon: ShieldCheck,
      title: "Quality First",
      description: "Every product is rigorously checked before dispatch.",
    },
    {
      icon: Zap,
      title: "Fast & Reliable",
      description: "Express shipping, real-time tracking, zero delays.",
    },
    {
      icon: HeartHandshake,
      title: "Honest Pricing",
      description: "No hidden fees or inflated tags. Genuine member prices.",
    },
    {
      icon: Sparkles,
      title: "Seamless Experience",
      description: "Effortless, intuitive shopping built for modern lifestyle.",
    },
  ];
  return (
    <section className="flex flex-col gap-6 my-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white font-heading">What We Stand On</h2>
        <p className="text-xs text-neutral-400 mt-1">Our core values driving your e-commerce experience</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {values.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#111111] p-6 hover:border-[#c8f400]/40 transition-all duration-300 shadow-md group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#c8f400] group-hover:bg-[#c8f400]/15 transition-all">
              <Icon className="h-5 w-5 text-[#c8f400]" strokeWidth={1.75} />
            </div>
            <p className="text-sm font-extrabold text-white group-hover:text-[#c8f400] transition-colors">{title}</p>
            <p className="text-xs text-neutral-400 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueCard;
