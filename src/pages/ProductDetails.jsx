import React, { useContext } from "react";
import { useParams, NavLink } from "react-router";
import { Heart, ShoppingCart, Check, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { toast } from "react-toastify";
import { ProductsContext } from "../context/ProductsContext";
import { Auth } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { uniqueId } = useParams();
  const { products } = useContext(ProductsContext);
  const { currentUser, setCurrentUser, registeredUser, setRegisteredUser } = useContext(Auth);

  const product = products.find((p) => p.uniqueId === uniqueId);

  const updateUser = (updatedUser) => {
    const updateAllUsers = registeredUser.map((user) => (user.id === currentUser.id ? updatedUser : user));

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem("registeredUsers", JSON.stringify(updateAllUsers));
    setCurrentUser(updatedUser);
    setRegisteredUser(updateAllUsers);
  };

  if (!product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-neutral-400">
        <p className="text-lg font-bold text-[#c8f400]">Product not found</p>
      </div>
    );
  }

  const liked = currentUser?.wishlist?.includes(product.uniqueId) || false;
  const inCart = currentUser?.cart?.some((item) => item.uniqueId === product.uniqueId) || false;

  const toggleWishlist = () => {
    if (!currentUser) return;
    const updatedWishlist = liked
      ? currentUser.wishlist.filter((id) => id !== product.uniqueId)
      : [...currentUser.wishlist, product.uniqueId];

    updateUser({ ...currentUser, wishlist: updatedWishlist });

    liked
      ? toast("Removed from wishlist", { icon: <Heart className="w-4 h-4 text-neutral-400" /> })
      : toast.success("Added to wishlist", {
          icon: <Heart className="w-4 h-4 text-[#c8f400] fill-[#c8f400]" />,
        });
  };

  const toggleCart = () => {
    if (!currentUser) return;
    const updatedCart = inCart
      ? currentUser.cart.filter((item) => item.uniqueId !== product.uniqueId)
      : [...currentUser.cart, { uniqueId: product.uniqueId, quantity: 1 }];

    updateUser({ ...currentUser, cart: updatedCart });

    inCart
      ? toast("Removed from cart", { icon: <ShoppingCart className="w-4 h-4 text-neutral-400" /> })
      : toast.success("Added to cart", { icon: <ShoppingCart className="w-4 h-4 text-[#c8f400]" /> });
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.uniqueId !== product.uniqueId)
    .slice(0, 5);

  return (
    <div className="text-white py-8 max-w-6xl mx-auto px-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-neutral-400 mb-8">
        <NavLink to="/products" className="hover:text-[#c8f400]">
          Products
        </NavLink>
        <span>›</span>
        <NavLink to={`/products?category=${product.category}`} className="hover:text-[#c8f400] capitalize">
          {product.category}
        </NavLink>
        <span>›</span>
        <span className="text-white font-medium truncate max-w-xs">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image Panel */}
        <div className="relative bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 z-10 p-2.5 bg-[#0d0d0d]/80 backdrop-blur-md rounded-full border border-white/10 hover:border-[#c8f400] hover:scale-110 transition-all cursor-pointer"
            aria-label="Wishlist toggle"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                liked ? "text-[#c8f400] fill-[#c8f400]" : "text-white hover:text-[#c8f400]"
              }`}
            />
          </button>
          <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover aspect-square" />
        </div>

        {/* Product Details Panel */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="badge badge-volt mb-3">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white font-heading">{product.title}</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-extrabold text-white">${product.price}</span>
            {product.rating != null && (
              <span className="flex items-center gap-1.5 text-xs text-neutral-300 bg-white/5 border border-white/10 py-1 px-3 rounded-full">
                <Star className="w-4 h-4 fill-[#c8f400] text-[#c8f400]" />
                <span className="font-bold text-white">{product.rating}</span>
                <span className="text-neutral-500">/ 5.0</span>
              </span>
            )}
          </div>

          {product.stock != null && (
            <p className="text-xs text-neutral-400">
              Availability:{" "}
              {product.stock > 0 ? (
                <span className="text-emerald-400 font-bold">{product.stock} in stock</span>
              ) : (
                <span className="text-rose-400 font-bold">Out of stock</span>
              )}
            </p>
          )}

          {product.description && (
            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
              <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Product Description</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2">
            <button
              onClick={toggleCart}
              className={`w-full flex items-center justify-center gap-2 text-sm font-bold py-3.5 rounded-2xl transition-all cursor-pointer ${
                inCart
                  ? "bg-white/10 text-[#c8f400] border border-[#c8f400]/40"
                  : "btn-volt shadow-[0_0_20px_rgba(200,244,0,0.3)]"
              }`}
            >
              {inCart ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Item Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart - ${product.price}</span>
                </>
              )}
            </button>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center text-xs text-neutral-400">
            <div className="flex items-center justify-center gap-1.5">
              <Truck className="w-4 h-4 text-[#c8f400]" />
              <span>Fast Shipping</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#c8f400]" />
              <span>Guaranteed</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-[#c8f400]" />
              <span>Easy Return</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold text-white font-heading">Related Products</h2>
            <NavLink
              to={`/products?category=${product.category}`}
              className="text-xs font-bold text-[#c8f400] hover:underline"
            >
              View Category
            </NavLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.uniqueId} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
