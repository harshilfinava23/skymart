import { Heart, ShoppingBag, Menu, X, User, LogOut, Home, Package, Info } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import UserDropdown from "./UserDropdown";
import { useContext, useState } from "react";
import { Auth } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, setCurrentUser } = useContext(Auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = currentUser?.cart?.length || 0;
  const wishlistCount = currentUser?.wishlist?.length || 0;

  const DEFAULT_AVATAR = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.fullName || "User")}&background=c8f400&color=0d0d0d&bold=true&size=256`;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setMenuOpen(false);
    navigate("/auth/login");
  };

  const mobileLinks = [
    { label: "Home", to: "/", icon: Home },
    { label: "Products", to: "/products", icon: Package },
    { label: "Wishlist", to: "/wishlist", icon: Heart },
    { label: "Cart", to: "/cart", icon: ShoppingBag },
    { label: "Profile", to: "/profile", icon: User },
    { label: "About", to: "/about", icon: Info },
  ];

  return (
    <div className="sticky top-0 z-50 w-full bg-[#0d0d0d]/90 backdrop-blur-xl border-b border-white/10 text-white transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:text-[#c8f400] transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3">
          <NavLink to="/" className="group flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#c8f400] flex items-center justify-center text-[#0d0d0d] shadow-[0_0_15px_rgba(200,244,0,0.4)] shrink-0">
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white group-hover:opacity-90 transition-opacity">
              Sky<span className="text-[#c8f400]">Mart</span>
            </h1>
          </NavLink>
        </div>

        {/* Navigation Links Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative py-1 transition-colors hover:text-[#c8f400] ${
                isActive ? "text-[#c8f400] font-bold" : "text-neutral-400"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `relative py-1 transition-colors hover:text-[#c8f400] ${
                isActive ? "text-[#c8f400] font-bold" : "text-neutral-400"
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `relative py-1 transition-colors hover:text-[#c8f400] ${
                isActive ? "text-[#c8f400] font-bold" : "text-neutral-400"
              }`
            }
          >
            About
          </NavLink>
        </div>

        {/* User & Actions Section */}
        <div className="flex items-center gap-5">
          {currentUser && (
            <div className="hidden sm:flex items-center gap-2 text-sm bg-white/5 border border-white/10 rounded-full py-1.5 px-3">
              <img
                src={currentUser.imageUrl || DEFAULT_AVATAR}
                alt="User"
                className="h-6 w-6 rounded-full border border-[#c8f400]/50 object-cover"
              />
              <UserDropdown name={currentUser.fullName} />
            </div>
          )}

          {/* Wishlist Link */}
          <NavLink
            to="/wishlist"
            className="relative p-2 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-white/30 transition-all cursor-pointer group"
          >
            <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" strokeWidth={1.75} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#c8f400] text-[10px] font-bold text-black shadow-[0_0_8px_rgba(200,244,0,0.6)]">
                {wishlistCount}
              </span>
            )}
          </NavLink>

          {/* Cart Link */}
          <NavLink
            to="/cart"
            className="relative p-2 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-white/30 transition-all cursor-pointer group"
          >
            <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" strokeWidth={1.75} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#c8f400] text-[10px] font-bold text-black shadow-[0_0_8px_rgba(200,244,0,0.6)]">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#111111]/95 backdrop-blur-2xl px-6 py-5 animate-fade-up">
          {currentUser && (
            <div className="flex items-center gap-3 pb-4 mb-3 border-b border-white/10">
              <img
                src={currentUser.imageUrl || DEFAULT_AVATAR}
                alt="User"
                className="h-10 w-10 rounded-full border border-[#c8f400] object-cover"
              />
              <div>
                <span className="text-sm font-semibold text-white block">{currentUser.fullName}</span>
                <span className="text-xs text-neutral-400">{currentUser.email}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            {mobileLinks.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={label}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#c8f400]/15 text-[#c8f400] border border-[#c8f400]/30"
                      : "text-neutral-300 hover:bg-white/5"
                  }`
                }
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
                {label}
              </NavLink>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 py-2.5 px-3 text-sm font-semibold text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors text-left mt-3 border-t border-white/10 pt-4 cursor-pointer"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.75} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
