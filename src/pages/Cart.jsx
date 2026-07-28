import React, { useContext } from "react";
import { NavLink } from "react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import { Auth } from "../context/AuthContext";
import { ProductsContext } from "../context/ProductsContext";

const Cart = () => {
  const { currentUser, setCurrentUser, registeredUser, setRegisteredUser } = useContext(Auth);
  const { products } = useContext(ProductsContext);

  const updateUser = (updatedUser) => {
    const updateAllUsers = registeredUser.map((user) => (user.id === currentUser.id ? updatedUser : user));

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem("registeredUsers", JSON.stringify(updateAllUsers));
    setCurrentUser(updatedUser);
    setRegisteredUser(updateAllUsers);
  };

  const items = (currentUser?.cart || [])
    .map((cartItem) => {
      const product = products.find((p) => p.uniqueId === cartItem.uniqueId);
      if (!product) return null;
      return { ...product, quantity: cartItem.quantity };
    })
    .filter(Boolean);

  const updateQuantity = (uniqueId, delta) => {
    const updatedCart = currentUser.cart.map((item) =>
      item.uniqueId === uniqueId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item,
    );

    updateUser({ ...currentUser, cart: updatedCart });
  };

  const removeItem = (uniqueId) => {
    const updatedCart = currentUser.cart.filter((item) => item.uniqueId !== uniqueId);
    updateUser({ ...currentUser, cart: updatedCart });
  };

  const clearCart = () => {
    updateUser({ ...currentUser, cart: [] });
    toast("Cart cleared", { icon: <Trash2 className="w-4 h-4 text-neutral-400" /> });
  };

  const handleCheckout = () => {
    const updatedOrders = (currentUser.orders || 0) + items.length;

    updateUser({ ...currentUser, cart: [], orders: updatedOrders });

    toast.success("Order placed successfully");
  };

  const totalItems = items.length;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 4.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center text-white max-w-7xl mx-auto px-6">
        <div className="p-4 rounded-3xl bg-white/5 border border-white/10">
          <ShoppingBag className="h-12 w-12 text-[#c8f400]" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-extrabold font-heading">Your cart is empty</h1>
        <p className="max-w-sm text-xs text-neutral-400 leading-relaxed">
          Looks like you haven't added anything to your cart yet. Explore our curated drop catalog.
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
    <div className="flex flex-col gap-8 py-12 text-white max-w-7xl mx-auto px-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white font-heading">
          Shopping Cart <span className="text-base font-medium text-neutral-400">({totalItems} items)</span>
        </h1>
        <p className="text-xs text-neutral-400 mt-1">Review your selected items before checkout</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items List */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.uniqueId}
              className="flex items-center gap-4 rounded-3xl border border-white/10 bg-[#111111] p-5 hover:border-[#c8f400]/30 transition-all shadow-md"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-20 w-16 shrink-0 rounded-2xl bg-white/5 object-cover border border-white/10"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-white">{item.title}</p>
                <p className="text-xs text-neutral-400 capitalize">{item.category}</p>
                <p className="mt-1 text-sm font-extrabold text-[#c8f400]">${item.price.toFixed(2)}</p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <button
                  onClick={() => updateQuantity(item.uniqueId, -1)}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
                <span className="w-4 text-center text-xs font-bold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.uniqueId, 1)}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.uniqueId)}
                className="shrink-0 p-2 text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Panel */}
        <div className="flex h-fit flex-col gap-4 rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-2xl">
          <h2 className="text-lg font-extrabold text-white font-heading">Order Summary</h2>

          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Subtotal</span>
            <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Shipping</span>
            <span className="font-semibold text-white">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>

          {subtotal < 50 && subtotal > 0 && (
            <div className="p-2.5 rounded-xl bg-[#c8f400]/10 border border-[#c8f400]/20 text-[11px] text-[#c8f400]">
              Add ${(50 - subtotal).toFixed(2)} more to qualify for Free Shipping!
            </div>
          )}

          <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-4 text-base font-extrabold">
            <span>Total</span>
            <span className="text-[#c8f400] text-xl">${total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="btn-volt w-full mt-2 cursor-pointer shadow-[0_0_15px_rgba(200,244,0,0.3)]"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 mt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c8f400]" />
            <span>Encrypted & Safe Checkout</span>
          </div>

          <button
            onClick={clearCart}
            className="text-center text-xs text-neutral-500 hover:text-rose-400 transition-colors mt-2 cursor-pointer"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
