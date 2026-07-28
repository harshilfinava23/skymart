import React, { useContext } from "react";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { NavLink } from "react-router";
import { toast } from "react-toastify";
import { ProductsContext } from "../../context/ProductsContext";
import { Auth } from "../../context/AuthContext";

const TopPicks = () => {
  const { products } = useContext(ProductsContext);
  const { currentUser, setCurrentUser, registeredUser, setRegisteredUser } = useContext(Auth);

  const updateUser = (updatedUser) => {
    const updateAllUsers = registeredUser.map((user) => (user.id === currentUser.id ? updatedUser : user));

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem("registeredUsers", JSON.stringify(updateAllUsers));
    setCurrentUser(updatedUser);
    setRegisteredUser(updateAllUsers);
  };

  const toggleWishlist = (uniqueId) => {
    if (!currentUser) return;
    const liked = currentUser.wishlist.includes(uniqueId);
    const updatedWishlist = liked
      ? currentUser.wishlist.filter((id) => id !== uniqueId)
      : [...currentUser.wishlist, uniqueId];

    updateUser({ ...currentUser, wishlist: updatedWishlist });

    liked
      ? toast("Removed from wishlist", { icon: <Heart className="w-4 h-4 text-neutral-400" /> })
      : toast.success("Added to wishlist", {
          icon: <Heart className="w-4 h-4 text-[#c8f400] fill-[#c8f400]" />,
        });
  };

  const toggleCart = (uniqueId) => {
    if (!currentUser) return;
    const inCart = currentUser.cart.some((item) => item.uniqueId === uniqueId);
    const updatedCart = inCart
      ? currentUser.cart.filter((item) => item.uniqueId !== uniqueId)
      : [...currentUser.cart, { uniqueId, quantity: 1 }];

    updateUser({ ...currentUser, cart: updatedCart });

    inCart
      ? toast("Removed from cart", { icon: <ShoppingCart className="w-4 h-4 text-neutral-400" /> })
      : toast.success("Added to cart", {
          icon: <ShoppingCart className="w-4 h-4 text-[#c8f400]" />,
        });
  };

  const topProducts = products.slice(0, 3);
  const wishlistedProducts = products.filter((p) => currentUser?.wishlist?.includes(p.uniqueId)).slice(0, 3);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Top Products Panel */}
      <div className="rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-xl relative overflow-hidden">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white font-heading">Top Products</h2>
          <NavLink
            to="/products"
            className="text-xs font-bold text-[#c8f400] hover:underline"
          >
            View All Products
          </NavLink>
        </div>

        <div className="flex flex-col divide-y divide-white/10">
          {topProducts.map((product) => {
            const inCart = currentUser?.cart?.some((item) => item.uniqueId === product.uniqueId);

            return (
              <div key={product.uniqueId} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <NavLink to={`/products/${product.uniqueId}`} className="flex items-center gap-4 min-w-0 flex-1 group">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-16 w-14 shrink-0 rounded-xl bg-white/5 object-cover border border-white/10 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white group-hover:text-[#c8f400] transition-colors">{product.title}</p>
                    <p className="text-xs text-neutral-400 capitalize">{product.category}</p>
                    <p className="text-sm font-extrabold text-white mt-1">${product.price}</p>
                  </div>
                </NavLink>

                <button
                  onClick={() => toggleCart(product.uniqueId)}
                  className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    inCart
                      ? "bg-white/10 text-[#c8f400] border border-[#c8f400]/40"
                      : "bg-[#c8f400] text-[#0d0d0d] hover:bg-[#e2ff66] shadow-[0_0_10px_rgba(200,244,0,0.2)]"
                  }`}
                >
                  {inCart ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Added
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-3.5 h-3.5" /> Add
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wishlist Quick Access Panel */}
      <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-xl relative overflow-hidden">
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-white font-heading">Wishlist Quick View</h2>
            <NavLink
              to="/wishlist"
              className="text-xs font-bold text-[#c8f400] hover:underline"
            >
              View All
            </NavLink>
          </div>

          {wishlistedProducts.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center">
              <Heart className="h-10 w-10 text-neutral-600" strokeWidth={1.5} />
              <p className="text-sm text-neutral-400">No items in your wishlist yet</p>
            </div>
          ) : (
            <div className="flex flex-1 flex-col divide-y divide-white/10">
              {wishlistedProducts.map((product) => (
                <div key={product.uniqueId} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <NavLink to={`/products/${product.uniqueId}`} className="flex items-center gap-4 min-w-0 flex-1 group">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-14 w-12 shrink-0 rounded-xl bg-white/5 object-cover border border-white/10 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white group-hover:text-[#c8f400] transition-colors">{product.title}</p>
                      <p className="text-sm font-bold text-neutral-300">${product.price}</p>
                    </div>
                  </NavLink>

                  <button
                    onClick={() => toggleWishlist(product.uniqueId)}
                    className="shrink-0 p-2 text-[#c8f400] hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Heart className="h-5 w-5 fill-[#c8f400]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <NavLink
          to="/wishlist"
          className="btn-ghost w-full mt-4 !py-2.5 text-xs font-bold text-center justify-center cursor-pointer"
        >
          Go to Wishlist
        </NavLink>
      </div>
    </div>
  );
};

export default TopPicks;
