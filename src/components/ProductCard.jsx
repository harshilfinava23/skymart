import React, { useContext } from "react";
import { Heart, HeartOff, Star, ShoppingCart, Check, Trash2 } from "lucide-react";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { NavLink } from "react-router";

const ProductCard = ({ product }) => {
  const { currentUser, setCurrentUser, registeredUser, setRegisteredUser } = useContext(Auth);

  const liked = currentUser?.wishlist?.includes(product.uniqueId) || false;
  const inCart = currentUser?.cart?.some((item) => item.uniqueId === product.uniqueId) || false;

  const updateUser = (updatedUser) => {
    const updateAllUsers = registeredUser.map((user) => (user.id === currentUser.id ? updatedUser : user));

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem("registeredUsers", JSON.stringify(updateAllUsers));
    setCurrentUser(updatedUser);
    setRegisteredUser(updateAllUsers);
  };

  const toggleWishlist = (uniqueId) => {
    if (!currentUser) return;
    const alreadyWishlist = currentUser.wishlist.includes(uniqueId);

    const updatedWishlist = alreadyWishlist
      ? currentUser.wishlist.filter((id) => id !== uniqueId)
      : [...currentUser.wishlist, uniqueId];

    updateUser({ ...currentUser, wishlist: updatedWishlist });

    liked
      ? toast("Removed from wishlist", {
          icon: <HeartOff className="w-4 h-4 text-neutral-400" />,
        })
      : toast.success("Added to wishlist", {
          icon: <Heart className="w-4 h-4 text-[#c8f400] fill-[#c8f400]" />,
        });
  };

  const toggleCart = (uniqueId) => {
    if (!currentUser) return;
    const alreadyInCart = currentUser.cart.some((item) => item.uniqueId === uniqueId);

    const updatedCart = alreadyInCart
      ? currentUser.cart.filter((item) => item.uniqueId !== uniqueId)
      : [...currentUser.cart, { uniqueId, quantity: 1 }];

    updateUser({ ...currentUser, cart: updatedCart });

    inCart
      ? toast("Removed from cart", {
          icon: <Trash2 className="w-4 h-4 text-neutral-400" />,
        })
      : toast.success("Added to cart", {
          icon: <ShoppingCart className="w-4 h-4 text-[#c8f400]" />,
        });
  };

  return (
    <div className="product-card group relative flex flex-col justify-between">
      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product.uniqueId)}
        className="absolute top-3 right-3 z-10 p-2 bg-[#0d0d0d]/80 backdrop-blur-md rounded-full border border-white/10 hover:border-[#c8f400] hover:scale-110 transition-all cursor-pointer"
        aria-label="Wishlist toggle"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            liked ? "text-[#c8f400] fill-[#c8f400]" : "text-neutral-300 hover:text-[#c8f400]"
          }`}
        />
      </button>

      {/* Product Image */}
      <NavLink to={`/products/${product.uniqueId}`} className="block">
        <div className="bg-[#181818] h-64 flex items-center justify-center overflow-hidden relative">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
        </div>
      </NavLink>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold text-[#c8f400] uppercase tracking-wider block mb-1">
            {product.category}
          </span>
          <h3 className="text-sm font-semibold text-white truncate group-hover:text-[#c8f400] transition-colors">
            {product.title}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-extrabold text-white">${product.price}</span>
          <span className="flex items-center gap-1 text-xs text-neutral-400 bg-white/5 border border-white/5 py-1 px-2 rounded-md">
            <Star className="w-3.5 h-3.5 fill-[#c8f400] text-[#c8f400]" />
            <span className="font-semibold text-white">{product.rating}</span>
          </span>
        </div>

        <button
          onClick={() => toggleCart(product.uniqueId)}
          className={`w-full flex items-center justify-center gap-2 text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer ${
            inCart
              ? "bg-white/10 text-[#c8f400] border border-[#c8f400]/40"
              : "bg-[#c8f400] text-[#0d0d0d] hover:bg-[#e2ff66] hover:shadow-[0_0_15px_rgba(200,244,0,0.3)]"
          }`}
        >
          {inCart ? (
            <>
              <Check className="w-4 h-4" />
              <span>In Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
