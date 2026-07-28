import React, { useState, useEffect, useRef, useContext } from "react";
import { ChevronDown, X, ArrowUp, Search, Sparkles } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { ProductsContext } from "../context/ProductsContext";
import { useSearchParams } from "react-router";

const categories = ["All", "Electronics", "Clothings", "Shoes", "Furniture", "Home", "Sports", "Accessories"];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Top Rated", value: "rating-desc" },
  { label: "Lowest Rated", value: "rating-asc" },
];

const Products = () => {
  const { products } = useContext(ProductsContext);
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [category, setCategory] = useState(categoryFromUrl || "All");
  const [sort, setSort] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("featured");
  };

  const hasActiveFilters = search !== "" || category !== "All" || sort !== "featured";

  let filteredProducts = category === "All" ? products : products.filter((p) => p.category === category);

  filteredProducts = filteredProducts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating-desc":
        return b.rating - a.rating;
      case "rating-asc":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const currentSortLabel = sortOptions.find((s) => s.value === sort)?.label;

  return (
    <div className="min-h-screen text-white py-8 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Explore Catalog</h1>
          <p className="text-xs text-neutral-400 mt-1 font-medium">Discover high quality curated products for everyday lifestyle</p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-80 flex items-center">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="field pl-icon-left text-xs"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-52" ref={sortRef}>
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="field flex items-center justify-between text-xs cursor-pointer"
            >
              <span>{currentSortLabel}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? "rotate-180 text-[#c8f400]" : ""}`} />
            </button>

            {sortOpen && (
              <div className="absolute right-0 z-50 mt-1 w-full bg-[#111111] border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSort(opt.value);
                      setSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs transition-colors cursor-pointer ${
                      sort === opt.value
                        ? "bg-[#c8f400] text-black font-bold"
                        : "text-neutral-300 hover:bg-white/5"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="btn-ghost shrink-0 !py-2 !px-3 text-xs text-neutral-400 hover:text-rose-400 border border-white/10 hover:border-rose-400/40"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
              category === cat
                ? "bg-[#c8f400] text-black shadow-[0_0_12px_rgba(200,244,0,0.4)]"
                : "bg-white/5 text-neutral-300 border border-white/10 hover:border-[#c8f400]/40 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#111111] border border-white/10 rounded-3xl">
          <Sparkles className="w-10 h-10 text-[#c8f400] mx-auto mb-3 animate-pulse" />
          <p className="text-[#c8f400] font-bold text-lg">No Products Found</p>
          <p className="text-neutral-400 text-xs mt-1">Try clearing filters or searching for another keyword.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.uniqueId || index} product={product} />
          ))}
        </div>
      )}

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-[#c8f400] text-black rounded-full shadow-[0_0_20px_rgba(200,244,0,0.5)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 font-bold" />
        </button>
      )}
    </div>
  );
};

export default Products;
