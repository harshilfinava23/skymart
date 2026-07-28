import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Pencil, Save, X, Mail, Phone, MapPin, Package, Heart, Sparkles } from "lucide-react";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { currentUser, setCurrentUser, setRegisteredUser, registeredUser } = useContext(Auth);
  const [editing, setEditing] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      const parsed = JSON.parse(saved);
      reset(parsed);
    }
  }, [reset]);

  const DEFAULT_AVATAR = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.fullName || "User")}&background=c8f400&color=0d0d0d&bold=true&size=256`;

  const onSave = (data) => {
    const updatedData = {
      ...data,
      imageUrl: data.imageUrl?.trim() ? data.imageUrl : DEFAULT_AVATAR,
    };

    const updatedUsers = registeredUser.map((val) => (val.id === currentUser.id ? { ...val, ...updatedData } : val));
    setRegisteredUser(updatedUsers);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    const updatedCurrentUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedCurrentUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));

    toast.success("Profile updated!");
    setEditing(false);
  };

  const handleCancle = () => {
    reset(currentUser);
    setEditing(false);
  };

  const stats = [
    { icon: Package, label: "Orders Placed", value: currentUser?.orders || 0 },
    { icon: Heart, label: "Wishlist Items", value: currentUser?.wishlist?.length || 0 },
    { icon: MapPin, label: "Location", value: currentUser?.location || "Not set" },
  ];

  return (
    <div className="flex flex-col gap-8 py-10 text-white max-w-7xl mx-auto px-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white font-heading">My Profile</h1>
        <p className="text-xs text-neutral-400 mt-1">Manage your identity and member settings</p>
      </div>

      {/* Header Profile Info Card */}
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-[#111111] p-8 sm:flex-row sm:items-center sm:justify-between shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c8f400]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center gap-4 sm:flex-row z-10">
          <img
            src={currentUser?.imageUrl || DEFAULT_AVATAR}
            alt={currentUser?.fullName}
            className="h-24 w-24 rounded-2xl border-2 border-[#c8f400] object-cover shadow-[0_0_20px_rgba(200,244,0,0.3)]"
          />
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h2 className="text-2xl font-extrabold text-white">{currentUser?.fullName}</h2>
              <span className="badge badge-volt text-[10px]">VERIFIED MEMBER</span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">{currentUser?.bio || "No bio added yet."}</p>
          </div>
        </div>

        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="btn-ghost z-10 !py-2.5 !px-5 text-xs font-bold cursor-pointer"
          >
            <Pencil className="h-4 w-4" strokeWidth={1.75} />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#111111] p-5 hover:border-[#c8f400]/30 transition-all shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-[#c8f400]" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-base font-extrabold text-white">{value}</p>
              <p className="text-xs text-neutral-400">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View Contact Details */}
      {!editing && (
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#111111] p-8 shadow-xl">
          <h2 className="text-lg font-extrabold text-white font-heading">Contact Information</h2>
          <div className="flex items-center gap-3 text-xs text-neutral-300">
            <Mail className="h-4 w-4 text-[#c8f400]" strokeWidth={1.75} />
            <span>{currentUser?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-neutral-300">
            <Phone className="h-4 w-4 text-[#c8f400]" strokeWidth={1.75} />
            <span>{currentUser?.phone || "No phone number added"}</span>
          </div>
        </div>
      )}

      {/* Edit Form */}
      {editing && (
        <form
          onSubmit={handleSubmit(onSave)}
          className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-[#111111] p-8 shadow-2xl animate-fade-up"
        >
          <h2 className="text-xl font-extrabold text-white font-heading">Edit Profile Settings</h2>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: "Name is required" })}
              className="field"
            />
            {errors.fullName && <span className="text-xs text-rose-400 font-medium">• {errors.fullName.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Profile Image URL</label>
            <input
              type="url"
              {...register("imageUrl", {
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Enter a valid image URL",
                },
              })}
              placeholder="https://example.com/photo.jpg"
              className="field"
            />
            {errors.imageUrl && <span className="text-xs text-rose-400 font-medium">• {errors.imageUrl.message}</span>}
            {watch("imageUrl") && (
              <img
                src={watch("imageUrl")}
                alt="Preview"
                className="mt-2 h-16 w-16 rounded-xl border border-[#c8f400] object-cover"
              />
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Bio</label>
            <input
              type="text"
              {...register("bio")}
              className="field"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email",
                  },
                })}
                className="field"
              />
              {errors.email && <span className="text-xs text-rose-400 font-medium">• {errors.email.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Phone</label>
              <input
                type="tel"
                {...register("phone")}
                className="field"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Location</label>
            <input
              type="text"
              {...register("location")}
              className="field"
              placeholder="City, Country"
            />
          </div>

          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="btn-volt cursor-pointer"
            >
              <Save className="h-4 w-4" strokeWidth={2} />
              <span>Save Changes</span>
            </button>
            <button
              type="button"
              onClick={handleCancle}
              className="btn-ghost cursor-pointer"
            >
              <X className="h-4 w-4" strokeWidth={2} />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
