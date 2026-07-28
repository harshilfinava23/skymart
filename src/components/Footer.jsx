import React from "react";
import { NavLink } from "react-router";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { Mail, ArrowRight, ShoppingBag } from "lucide-react";

const linkGroups = [
  {
    title: "Shop",
    links: [
      { label: "Electronics", to: "/products?category=Electronics" },
      { label: "Clothing", to: "/products?category=Clothings" },
      { label: "Furniture", to: "/products?category=Furniture" },
      { label: "All Products", to: "/products" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Track Order", to: "/" },
      { label: "Returns & Exchanges", to: "/" },
      { label: "Shipping Info", to: "/" },
      { label: "Contact Us", to: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/" },
      { label: "Privacy Policy", to: "/" },
      { label: "Terms of Service", to: "/" },
    ],
  },
];

const socials = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaFacebook, href: "#", label: "Facebook" },
];

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0d0d0d] text-white mt-16 relative overflow-hidden">
      {/* Background Subtle Ambient Light */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c8f400]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#c8f400] flex items-center justify-center text-[#0d0d0d] shadow-[0_0_15px_rgba(200,244,0,0.4)] shrink-0">
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white">
                Sky<span className="text-[#c8f400]">Mart</span>
              </h2>
            </div>
            <p className="max-w-xs text-xs text-neutral-400 leading-relaxed font-medium">
              Elevated essentials and next-gen drops. Curated products built for the modern dynamic lifestyle.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <div className="relative flex-1 flex items-center">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                <input
                  type="email"
                  placeholder="Join our newsletter"
                  className="field pl-icon-left text-xs"
                />
              </div>
              <button className="btn-volt shrink-0 !py-2.5 !px-4 text-xs font-bold cursor-pointer">
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">{group.title}</h3>
              {group.links.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className="w-fit text-xs text-neutral-400 transition hover:text-[#c8f400] font-medium"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-neutral-500 font-medium">© {new Date().getFullYear()} SkyMart. Engineered for Gen Z.</p>
          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <a 
                key={label} 
                href={href} 
                aria-label={label} 
                className="p-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-[#c8f400] hover:border-[#c8f400]/40 transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
