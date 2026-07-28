import React from "react";
import { NavLink } from "react-router";
import ValueCard from "../components/home/ValueCard";
import { Sparkles, ArrowRight } from "lucide-react";

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "1,200+", label: "Curated Drops" },
  { value: "4.9", label: "Average Rating" },
  { value: "24/7", label: "Live Support" },
];

const About = () => {
  return (
    <div className="flex flex-col gap-16 py-12 text-white max-w-7xl mx-auto px-6">
      {/* Hero Section */}
      <section className="flex flex-col gap-6">
        <span className="badge badge-volt w-fit">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OUR STORY</span>
        </span>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl text-white font-heading">
          We built SkyMart because shopping online got cluttered.
        </h1>
        <p className="max-w-xl text-sm text-neutral-400 md:text-base leading-relaxed">
          Too many tabs, too many fake discounts, and generic interfaces. SkyMart is built for Gen Z — a straightforward, 
          ultra-sleek marketplace with authentic drops, fair pricing, and curated essentials.
        </p>
        <div className="mt-2 flex flex-wrap gap-4">
          <NavLink
            to="/products"
            className="btn-volt group cursor-pointer"
          >
            <span>Browse Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NavLink>
          <NavLink
            to="/"
            className="btn-ghost cursor-pointer"
          >
            Back to Home
          </NavLink>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-3xl border border-white/10 bg-[#111111] p-6 text-center shadow-lg hover:border-[#c8f400]/30 transition-all">
            <p className="text-3xl md:text-4xl font-extrabold text-[#c8f400] font-heading">{stat.value}</p>
            <p className="mt-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Team Story Section */}
      <section className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
        <div className="relative h-72 w-full overflow-hidden rounded-3xl border border-white/10 bg-[#111111] md:h-96 md:w-2/5 shadow-2xl">
          <img
            src="https://imgs.search.brave.com/Fey-IaR8Q4KwXM8bYiyxGYtEgFMjZmAl3TcaegYDRcY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9z/bWlsZXktY29sbGVh/Z3Vlcy10YWtpbmct/c2VsZmllLWJlZm9y/ZS1tZWV0aW5nXzIz/LTIxNDg4MTcwMzku/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MCZxPTgw"
            alt="Our team packing orders"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
        </div>
        <div className="flex flex-col gap-4 md:w-3/5">
          <h2 className="text-3xl font-extrabold md:text-4xl font-heading text-white">Started Small. Stayed Authentic.</h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            SkyMart started as a two-person operation delivering curated gear. No fluff, no shortcuts — 
            just a clear mission: provide items people actually love with a seamless user experience.
          </p>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Today we collaborate with top creators and brands across tech, fashion, and lifestyle. If it doesn't meet our standard, it doesn't enter our catalog.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <ValueCard />

      {/* Call To Action Banner */}
      <section className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-[#111111] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#c8f400]/5 via-transparent to-[#c8f400]/5 pointer-events-none" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading">Ready to Experience SkyMart?</h2>
        <p className="max-w-md text-xs text-neutral-400 leading-relaxed">
          Join thousands of members enjoying instant drop access, member pricing, and ultra-fast shipping.
        </p>
        <NavLink
          to="/products"
          className="btn-volt mt-2 group cursor-pointer shadow-[0_0_20px_rgba(200,244,0,0.4)]"
        >
          <span>Start Shopping Now</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </NavLink>
      </section>
    </div>
  );
};

export default About;
