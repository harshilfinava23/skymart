import React, { useContext } from "react";
import { NavLink } from "react-router";
import { Heart, ArrowRight } from "lucide-react";
import { ProductsContext } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";
import { Auth } from "../context/AuthContext";

const Wishlist = () => {
  const { products } = useContext(ProductsContext);
  const { currentUser } = useContext(Auth);

  const wishlistedProducts = products.filter((p) =>
    currentUser?.wishlist?.includes(p.uniqueId)
  );

  if (wishlistedProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center text-white max-w-7xl mx-auto px-6">
        <div className="p-4 rounded-3xl bg-white/5 border border-white/10">
          <Heart className="h-12 w-12 text-[#c8f400]" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-extrabold font-heading">Your Wishlist is Empty</h1>
        <p className="max-w-sm text-xs text-neutral-400 leading-relaxed">
          Save items you love by tapping the heart icon on any product card.
        </p>
        <NavLink
          to="/products"
          className="btn-volt mt-2 group cursor-pointer"
        >
          <span>Browse Products</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </NavLink>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white font-heading">
          Your Wishlist <span className="text-base font-normal text-neutral-400">({wishlistedProducts.length} items)</span>
        </h1>
        <p className="text-xs text-neutral-400 mt-1">Saved products ready for your next order</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistedProducts.map((product) => (
          <ProductCard key={product.uniqueId} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;