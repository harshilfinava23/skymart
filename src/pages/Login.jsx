import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck, Zap, ShoppingBag } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { registeredUser, setCurrentUser } = useContext(Auth);
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
      const user = registeredUser.find((val) => val.email === data.email && val.password === data.password);
      setLoading(false);

      if (!user) {
        toast.error("Invalid credentials or user does not exist");
        return;
      }

      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      reset();
      navigate("/");
      toast.success("Logged in successfully");
    }, 400);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#0d0d0d] px-4 py-12 overflow-hidden selection:bg-[#c8f400] selection:text-black">
      {/* Background Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#c8f400]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#c8f400]/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Background Decorative Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '24px 24px' }} 
      />

      <div className="w-full max-w-md relative z-10 animate-fade-up">
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <div className="badge badge-volt backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MEMBER PORTAL</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="auth-card backdrop-blur-xl border border-white/10 relative overflow-hidden">
          {/* Subtle Top Border Highlight Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c8f400] to-transparent opacity-80" />

          {/* E-Commerce Brand Logo & Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2.5 cursor-pointer mb-2" onClick={() => navigate('/')}>
              <div className="w-10 h-10 rounded-2xl bg-[#c8f400] flex items-center justify-center text-[#0d0d0d] shadow-[0_0_20px_rgba(200,244,0,0.4)] shrink-0">
                <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white">
                Sky<span className="text-[#c8f400]">Mart</span>
              </h1>
            </div>
            <p className="text-neutral-400 text-xs font-medium">
              Enter your credentials to access your member account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(formSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
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
                <p className="text-rose-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                  <span>•</span> {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
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
                <p className="text-rose-400 text-xs mt-1.5 font-medium flex items-center gap-1">
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
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Quick Perks Pill */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-2 text-center text-xs text-neutral-400">
            <div className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white/5 rounded-lg border border-white/5">
              <Zap className="w-3.5 h-3.5 text-[#c8f400]" />
              <span>Fast Checkout</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white/5 rounded-lg border border-white/5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c8f400]" />
              <span>Encrypted</span>
            </div>
          </div>

          {/* Redirect to Sign Up */}
          <p className="text-center text-xs text-neutral-400 mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/auth/register")}
              className="text-[#c8f400] font-bold hover:underline cursor-pointer inline-flex items-center gap-0.5 ml-1"
            >
              Sign up for free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
