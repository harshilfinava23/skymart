import React from "react";
import { useNavigate } from "react-router";
import { Laptop, Shirt, Footprints, Sofa, Home as HomeIcon, Dumbbell, Watch, ArrowRight } from "lucide-react";

const categories = [
  { name: "Electronics", icon: Laptop },
  { name: "Clothings", icon: Shirt },
  { name: "Shoes", icon: Footprints },
  { name: "Furniture", icon: Sofa },
  { name: "Home", icon: HomeIcon },
  { name: "Sports", icon: Dumbbell },
  { name: "Accessories", icon: Watch },
];

const ShopByCategory = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (name) => {
    navigate(`/products?category=${name}`);
  };

  return (
    <div className="w-full text-white my-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-heading">Shop By Category</h2>
          <p className="text-xs text-neutral-400 mt-1">Explore our wide selection of premium catalog items</p>
        </div>
        <button
          onClick={() => navigate('/products')}
          className="text-xs font-bold text-[#c8f400] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
        {categories.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => handleCategoryClick(name)}
            className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#c8f400]/40 hover:bg-white/5 transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-1"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#c8f400] group-hover:bg-[#c8f400]/15 group-hover:scale-110 transition-all duration-300">
              <Icon className="h-6 w-6 text-neutral-300 group-hover:text-[#c8f400] transition-colors" strokeWidth={1.75} />
            </div>
            <p className="text-xs font-bold text-neutral-300 group-hover:text-white transition-colors">{name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
