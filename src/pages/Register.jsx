import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { generateId } from "../utils/generateId";
import { User, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck, Zap, Star, ShoppingBag } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { registeredUser, setRegisteredUser } = useContext(Auth);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      const alreadyUser = registeredUser.find((val) => val.email === data.email);

      if (alreadyUser) {
        setLoading(false);
        toast.error("User already exists with this email");
        return;
      }

      const newUser = {
        ...data,
        id: generateId(),
        imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.fullName)}&background=0ea5e9&color=fff&size=256`,
        phone: "",
        location: "",
        bio: "",
        wishlist: [],
        cart: [],
        orders: 0,
      };

      const arr = [...registeredUser, newUser];
      setRegisteredUser(arr);
      localStorage.setItem("registeredUsers", JSON.stringify(arr));
      setLoading(false);
      reset();
      navigate("/auth/login");
      toast.success("Account created successfully! Please sign in.");
    }, 400);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#0d0d0d] px-4 py-6 overflow-hidden selection:bg-[#c8f400] selection:text-black">
      {/* Background Ambient Glows */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#c8f400]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#c8f400]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '24px 24px' }} 
      />

      <div className="w-full max-w-md relative z-10 animate-fade-up">
        {/* Top Badge */}
        <div className="flex justify-center mb-4">
          <div className="badge badge-volt backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CREATE ACCOUNT</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="auth-card backdrop-blur-xl border border-white/10 relative overflow-hidden">
          {/* Subtle Top Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c8f400] to-transparent opacity-80" />

          {/* E-Commerce Brand Logo & Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2.5 cursor-pointer mb-1.5" onClick={() => navigate('/')}>
              <div className="w-9 h-9 rounded-2xl bg-[#c8f400] flex items-center justify-center text-[#0d0d0d] shadow-[0_0_20px_rgba(200,244,0,0.4)] shrink-0">
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white font-heading">
                Sky<span className="text-[#c8f400]">Mart</span>
              </h1>
            </div>
            <p className="text-neutral-400 text-xs font-medium">
              Join thousands of creators shopping premium drops
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit(formSubmit)} className="space-y-3.5">
            {/* Full Name Field */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5 font-heading">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                <input
                  type="text"
                  {...register("fullName", {
                    required: "Full Name is required",
                    minLength: {
                      value: 2,
                      message: "Minimum 2 characters required",
                    },
                  })}
                  placeholder="John Doe"
                  className="field pl-icon-left"
                />
              </div>
              {errors.fullName && (
                <p className="text-rose-400 text-xs mt-1 font-medium flex items-center gap-1">
                  <span>•</span> {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5 font-heading">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="you@example.com"
                  className="field pl-icon-left"
                />
              </div>
              {errors.email && (
                <p className="text-rose-400 text-xs mt-1 font-medium flex items-center gap-1">
                  <span>•</span> {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5 font-heading">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters required",
                    },
                  })}
                  placeholder="••••••••"
                  className="field pl-icon-left pr-icon-right"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-rose-400 text-xs mt-1 font-medium flex items-center gap-1">
                  <span>•</span> {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-volt w-full group mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Member Benefits Perks Grid */}
          <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-1.5 text-center text-[11px] text-neutral-400">
            <div className="flex flex-col items-center justify-center py-2 px-1 bg-white/5 rounded-lg border border-white/5">
              <Zap className="w-3.5 h-3.5 text-[#c8f400] mb-1" />
              <span className="font-medium">Instant Drop</span>
            </div>
            <div className="flex flex-col items-center justify-center py-2 px-1 bg-white/5 rounded-lg border border-white/5">
              <Star className="w-3.5 h-3.5 text-[#c8f400] mb-1" />
              <span className="font-medium">Rewards</span>
            </div>
            <div className="flex flex-col items-center justify-center py-2 px-1 bg-white/5 rounded-lg border border-white/5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c8f400] mb-1" />
              <span className="font-medium">Buyer Safe</span>
            </div>
          </div>

          {/* Redirect to Sign In */}
          <p className="text-center text-xs text-neutral-400 mt-5">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/auth/login")}
              className="text-[#c8f400] font-bold hover:underline cursor-pointer inline-flex items-center gap-0.5 ml-1"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
