import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Sparkles, ArrowRight } from "lucide-react";
import slide1 from "../../assets/slide-1.jpg";
import slide2 from "../../assets/slide-2.jpg";
import slide3 from "../../assets/slide-3.jpg";

const slides = [
  {
    badge: "GEN-Z DROP",
    title: "SUMMER TECH ESSENTIALS",
    description: "Noise-cancelling headphones, fast chargers, and everyday carry gear — curated for the season ahead.",
    meta: "Free shipping over $50",
    category: "Electronics",
    cta: "Shop Drop",
    image: slide1,
  },
  {
    badge: "UP TO 40% OFF",
    title: "HOME REFRESH COLLECTION",
    description: "Ambient lighting, minimalist decor, and futuristic furniture pieces to level up your space.",
    meta: "Ends this weekend",
    category: "Furniture",
    cta: "Explore Deals",
    image: slide2,
  },
  {
    badge: "TRENDING NOW",
    title: "PERFORMANCE & ATHLETICS",
    description: "Durable gear engineered for peak routines — lightweight, breathable, built for heavy use.",
    meta: "Rated 4.9/5 by active members",
    category: "Sports",
    cta: "Shop Sport",
    image: slide3,
  },
];

const SLIDE_DURATION = 6000;

const HeroCard = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#111111] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      <div
        className="flex transition-transform duration-700 cubic-bezier(0.16,1,0.3,1)"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="flex w-full shrink-0 flex-col md:flex-row md:h-[460px]">
            <div className="flex flex-col items-start justify-center gap-4 px-8 py-10 md:px-12 md:w-[45%] z-10">
              <span className="badge badge-volt">
                <Sparkles className="w-3.5 h-3.5 text-[#c8f400]" />
                <span>{slide.badge}</span>
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-white font-heading">
                {slide.title}
              </h2>
              <p className="line-clamp-2 max-w-md text-sm text-neutral-400 leading-relaxed">{slide.description}</p>
              <p className="text-xs text-[#c8f400]/70 font-semibold tracking-wide uppercase">{slide.meta}</p>
              <button
                className="btn-volt mt-2 group cursor-pointer"
                onClick={() => {
                  navigate(`/products?category=${slide.category}`);
                }}
              >
                <span>{slide.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative hidden md:block md:w-[55%] overflow-hidden">
              <img src={slide.image} alt={slide.title} className="h-full w-full object-cover scale-105" />
              <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[#111111] via-[#111111]/70 to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-8 bg-[#c8f400] shadow-[0_0_8px_rgba(200,244,0,0.6)]" : "w-2 bg-white/20 hover:bg-white/40"
            } cursor-pointer`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCard;
