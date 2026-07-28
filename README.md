<div align="center">

  <!-- Animated Header Banner -->
  <a href="https://github.com/harshilfinava23/skymart">
    <img src="https://readme-typing-svg.demolab.com?font=Outfit&weight=800&size=40&duration=3000&pause=1000&color=C8F400&center=true&vCenter=true&width=700&height=70&lines=SkyMart+%E2%9A%A1+Gen-Z+E-Commerce;Next-Gen+Shopping+Experience;Obsidian+Dark+%2B+Neon+Volt+UI" alt="SkyMart Header Typing Banner" />
  </a>

  <p align="center">
    <b>A high-performance, ultra-sleek Gen-Z E-Commerce platform built with React 19, Vite, and Tailwind CSS.</b>
  </p>

  <!-- Badges -->
  <p align="center">
    <a href="https://github.com/harshilfinava23/skymart/stargazers">
      <img src="https://img.shields.io/github/stars/harshilfinava23/skymart?style=for-the-badge&color=c8f400&logoColor=0d0d0d&labelColor=111111" alt="GitHub Stars" />
    </a>
    <a href="https://github.com/harshilfinava23/skymart/network/members">
      <img src="https://img.shields.io/github/forks/harshilfinava23/skymart?style=for-the-badge&color=c8f400&logoColor=0d0d0d&labelColor=111111" alt="GitHub Forks" />
    </a>
    <a href="https://github.com/harshilfinava23/skymart/issues">
      <img src="https://img.shields.io/github/issues/harshilfinava23/skymart?style=for-the-badge&color=c8f400&logoColor=0d0d0d&labelColor=111111" alt="GitHub Issues" />
    </a>
    <a href="https://github.com/harshilfinava23/skymart/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-c8f400?style=for-the-badge&logoColor=0d0d0d&labelColor=111111" alt="License" />
    </a>
  </p>

  <p align="center">
    <a href="#-key-features">Key Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-project-structure">Project Structure</a> •
    <a href="#-author">Author</a>
  </p>

  ---
</div>

## 🌟 Overview

**SkyMart** is a state-of-the-art e-commerce application designed specifically for modern dynamic users. Featuring a deep obsidian canvas (`#0d0d0d`), elevated glassmorphic panels, Electric Neon Volt highlights (`#c8f400`), and premium typography powered by Google Fonts (`Outfit` & `Inter`).

It provides a complete end-to-end shopping experience—from authentication and user profile management to real-time search, catalog filtering, interactive cart state, and wishlist persistence.

---

## ✨ Key Features

- **⚡ Gen-Z Obsidian & Neon Volt UI**: High-contrast glassmorphism interface with ambient background lighting, interactive hover effects, and micro-animations.
- **🔒 Authentication & Security**: Member registration and login system with client-side form validation (`react-hook-form`), route protection, and multi-user profile persistence.
- **🛍️ 60+ Curated High-Res Catalog**: Beautiful products mapped across 7 distinct categories:
  - 📱 **Electronics**
  - 👕 **Clothings**
  - 👟 **Shoes**
  - 🛋️ **Furniture**
  - 🏠 **Home**
  - ⚽ **Sports**
  - 🕶️ **Accessories**
- **🔍 Instant Filter, Search & Sorting**: Real-time keyword search, single-click category filtering, and price/rating sorting.
- **🛒 Smart Cart & Checkout Engine**: Live item quantity adjustments, free shipping progress bar, subtotal calculation, and instant checkout flow.
- **💖 Wishlist Management**: Quick-save favorite items with instant badge counters across the app.
- **👤 Editable User Profile**: Custom bio, contact details, order counter, location settings, and auto-generated high-res avatar badges.
- **📱 100% Fully Responsive**: Pixel-perfect layout tailored for mobile devices, tablets, and desktop displays.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Core UI Library & Component Architecture |
| **[Vite 7](https://vitejs.dev/)** | Lightning-Fast Next-Gen Build Tool & Dev Server |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Custom Utility-First Styling & Design System |
| **[React Router v7](https://reactrouter.com/)** | Single Page Application (SPA) Routing & Layouts |
| **[Context API](https://react.dev/reference/react/createContext)** | Global Auth & Products State Management |
| **[React Hook Form](https://react-hook-form.com/)** | Lightweight & Performant Form Validation |
| **[Lucide React](https://lucide.dev/)** | Clean & Modern Vector Icon System |
| **[React Toastify](https://fkhadra.github.io/react-toastify/)** | Dark-Themed Floating Toast Notifications |
| **[Google Fonts](https://fonts.google.com/)** | Typography (`Outfit` & `Inter`) |

---

## 📁 Project Structure

```ascii
skymart/
├── public/               # Static public assets
├── src/
│   ├── assets/           # Slider banners and imagery
│   ├── components/       # Reusable components
│   │   ├── home/         # HeroCard, ShopByCategory, TopPicks, TrustBadges, ValueCard
│   │   ├── Footer.jsx    # Glassmorphic Footer
│   │   ├── Navbar.jsx    # Sticky Navigation Header
│   │   ├── ProductCard.jsx
│   │   ├── ScrollToTop.jsx
│   │   └── UserDropdown.jsx
│   ├── context/          # AuthContext, ProductsContext
│   ├── data/             # productsData.js (60+ Curated Products)
│   ├── layout/           # PublicLayout, AuthLayout, ProtectedLayout, MainLayout
│   ├── pages/            # Home, Products, ProductDetails, Cart, Wishlist, Profile, About, Login, Register
│   ├── routes/           # AppRoutes.jsx
│   ├── utils/            # Helper utilities (generateId, etc.)
│   ├── App.jsx
│   ├── index.css         # Global design tokens & utility classes
│   └── main.jsx
├── index.html            # Entry HTML & Font Preconnects
├── package.json
├── vercel.json           # SPA Deployment Rewrites
└── vite.config.js
```

---

## 🚀 Getting Started

Follow these steps to run **SkyMart** locally on your machine:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/harshilfinava23/skymart.git
   cd skymart
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`

4. **Build for Production**
   ```bash
   npm run build
   ```

---

## 🌐 Deployment

This project is optimized for instant deployment on [Vercel](https://vercel.com).

A custom `vercel.json` file is included to handle client-side SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 👨‍💻 Author

<div align="center">
  <a href="https://github.com/harshilfinava23">
    <img src="https://github.com/harshilfinava23.png" width="100px;" alt="Harshil Finava Avatar" style="border-radius: 50%; border: 3px solid #c8f400;" />
  </a>
  <br />
  <h3><b>Harshil Finava</b></h3>
  <p>Full-Stack Web Developer & UI/UX Enthusiast</p>

  <a href="https://github.com/harshilfinava23">
    <img src="https://img.shields.io/badge/GitHub-harshilfinava23-c8f400?style=for-the-badge&logo=github&logoColor=0d0d0d" alt="GitHub Profile" />
  </a>
</div>

---

<div align="center">
  <p>⭐ <b>If you like this project, please consider giving it a star on GitHub!</b> ⭐</p>
  <p>Crafted with ❤️ by <a href="https://github.com/harshilfinava23">Harshil Finava</a></p>
</div>