"use client";

import React, { useState, useMemo } from "react";

// Types
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: string;
  image: string;
  badge?: string;
  tag?: string;
  description: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// 1. Categories with SVG avatars
const CATEGORIES = [
  { id: "electronics", name: "Electronics", count: "140+ items", icon: "🎧", bg: "bg-slate-100" },
  { id: "fashion", name: "Fashion", count: "320+ items", icon: "🧥", bg: "bg-neutral-100" },
  { id: "home", name: "Home & Living", count: "210+ items", icon: "🛋️", bg: "bg-amber-50" },
  { id: "beauty", name: "Beauty", count: "95+ items", icon: "🧴", bg: "bg-rose-50" },
  { id: "baby", name: "Baby & Kids", count: "80+ items", icon: "🧸", bg: "bg-orange-50" },
  { id: "sports", name: "Sports", count: "115+ items", icon: "🏋️", bg: "bg-emerald-50" },
  { id: "books", name: "Books", count: "450+ items", icon: "📖", bg: "bg-blue-50" },
  { id: "groceries", name: "Groceries", count: "180+ items", icon: "🧺", bg: "bg-yellow-50" },
];

// 2. Trending Products
const TRENDING_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    price: 59.99,
    originalPrice: 89.99,
    rating: 4.8,
    reviewsCount: "1.2k",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
    badge: "SAVE 33%",
    description: "Active noise cancellation with 32-hour battery life and spatial audio immersion.",
  },
  {
    id: "prod-2",
    name: "Minimalist Urban Backpack",
    category: "Fashion",
    price: 34.99,
    originalPrice: 69.99,
    rating: 4.9,
    reviewsCount: "845",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    badge: "50% OFF",
    description: "Water-repellent ballistic nylon with dedicated 16-inch padded laptop compartment.",
  },
  {
    id: "prod-3",
    name: "Scented Soy Candle",
    category: "Home & Living",
    price: 18.99,
    originalPrice: 29.99,
    rating: 4.7,
    reviewsCount: "632",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80",
    description: "Hand-poured cedarwood, vanilla, and white sage with natural wooden crackling wick.",
  },
  {
    id: "prod-4",
    name: "Smart Watch Series 8",
    category: "Electronics",
    price: 129.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviewsCount: "973",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80",
    badge: "HOT DEAL",
    description: "Always-on Retina display, ECG biometric monitoring, and 50m water resistance.",
  },
  {
    id: "prod-5",
    name: "Botanical Skincare Set",
    category: "Beauty",
    price: 24.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviewsCount: "1.1k",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
    description: "Gentle hydrating cleanser, hyaluronic essence, and restorative barrier balm.",
  },
];

// 3. Recommended Products
const RECOMMENDED_PRODUCTS: Product[] = [
  {
    id: "prod-6",
    name: "Rugged Bluetooth Speaker",
    category: "Electronics",
    price: 39.99,
    originalPrice: 69.99,
    rating: 4.7,
    reviewsCount: "512",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80",
    description: "360-degree bass radiator with IPX7 waterproof rating and 24h continuous playtime.",
  },
  {
    id: "prod-7",
    name: "Heavyweight Fleece Hoodie",
    category: "Fashion",
    price: 29.99,
    originalPrice: 49.99,
    rating: 4.9,
    reviewsCount: "1.4k",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
    description: "100% organic combed cotton with relaxed drop-shoulder cut and double-lined hood.",
  },
  {
    id: "prod-8",
    name: "Artisan Drip Coffee Maker",
    category: "Home & Living",
    price: 49.99,
    originalPrice: 89.99,
    rating: 4.8,
    reviewsCount: "389",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&auto=format&fit=crop&q=80",
    description: "Precision temperature brewing system with borosilicate glass carafe.",
  },
  {
    id: "prod-9",
    name: "Eyeshadow Palette & Brush Kit",
    category: "Beauty",
    price: 19.99,
    originalPrice: 34.99,
    rating: 4.6,
    reviewsCount: "740",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=80",
    description: "18 highly pigmented warm neutral and shimmer shades with synthetic vegan brushes.",
  },
  {
    id: "prod-10",
    name: "Compact Travel Stroller",
    category: "Baby & Kids",
    price: 99.99,
    originalPrice: 159.99,
    rating: 4.9,
    reviewsCount: "298",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&auto=format&fit=crop&q=80",
    description: "One-hand ultra-compact gravity fold certified for airline overhead compartments.",
  },
];

export default function NovellaEcommerceApp() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<string[]>(["prod-1", "prod-4"]);
  const [cart, setCart] = useState<CartItem[]>([
    { product: TRENDING_PRODUCTS[0]!, quantity: 1 },
    { product: TRENDING_PRODUCTS[3]!, quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [checkoutModal, setCheckoutModal] = useState(false);

  // Cart helper calculations
  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  const toggleWishlist = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const nextQ = item.quantity + delta;
            return nextQ > 0 ? { ...item, quantity: nextQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Filter products by category & search
  const filterList = (items: Product[]) => {
    return items.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  };

  const filteredTrending = useMemo(() => filterList(TRENDING_PRODUCTS), [selectedCategory, searchQuery]);
  const filteredRecommended = useMemo(() => filterList(RECOMMENDED_PRODUCTS), [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-800 antialiased selection:bg-slate-900 selection:text-white">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="border-b border-slate-200/80 bg-white px-4 py-2 text-[12px] text-slate-500">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-900">🚚 Free shipping on orders over $50</span>
            <span className="text-slate-300">|</span>
            <span>Easy 30-day returns</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <a href="#track" className="hover:text-slate-900 transition-colors">Track Order</a>
            <a href="#help" className="hover:text-slate-900 transition-colors">Help Center</a>
            <a href="#sell" className="hover:text-slate-900 transition-colors font-medium text-slate-700">Sell on Novella</a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER WITH SEARCH & ACTIONS */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white font-bold text-lg shadow-sm">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <a href="#" className="flex flex-col">
              <span className="font-extrabold tracking-tight text-2xl text-slate-900 font-sans">
                NOVELLA
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
                Everyday Marketplace
              </span>
            </a>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-2xl hidden md:block">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-slate-200 bg-slate-50/80 px-6 py-2.5 pr-14 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-slate-900 focus:bg-white focus:ring-1 focus:ring-slate-900"
              />
              <button
                type="button"
                className="absolute right-1.5 flex h-8 w-10 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* User Utilities */}
          <div className="flex items-center gap-5 sm:gap-7 shrink-0">
            {/* Account */}
            <div className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-[11px] text-slate-400 leading-none">Hello, Sign In</span>
                <span className="text-xs font-semibold text-slate-800 leading-none mt-1">Account</span>
              </div>
            </div>

            {/* Wishlist */}
            <div
              onClick={() => alert(`You have ${wishlist.length} saved items in your wishlist.`)}
              className="relative flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900"
            >
              <div className="relative">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-xs font-semibold text-slate-800">Wishlist</span>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition-all"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-slate-900 ml-0.5">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Secondary Category Navigation Bar */}
        <div className="border-t border-slate-100 bg-white">
          <div className="mx-auto flex h-11 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8 overflow-x-auto text-xs font-medium text-slate-600">
            {/* Categories Menu Pill */}
            <button
              onClick={() => setSelectedCategory("All")}
              className={`flex items-center gap-2 font-bold transition-colors ${
                selectedCategory === "All" ? "text-slate-900" : "hover:text-slate-900"
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>Categories</span>
            </button>

            {["New Arrivals", "Top Deals", "Best Sellers", "Home Essentials", "Electronics", "Fashion", "Beauty", "Baby & Kids"].map((item) => {
              const isHot = item === "Top Deals";
              const isSelected = selectedCategory.toLowerCase() === item.toLowerCase();
              return (
                <button
                  key={item}
                  onClick={() => setSelectedCategory(item)}
                  className={`relative shrink-0 transition-colors flex items-center gap-1.5 ${
                    isSelected ? "font-bold text-slate-900 border-b-2 border-slate-900 pb-1" : "hover:text-slate-900"
                  }`}
                >
                  <span>{item}</span>
                  {isHot && (
                    <span className="rounded-full bg-rose-500 px-1.5 py-0.2 text-[9px] font-bold text-white uppercase tracking-wider">
                      Hot
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* 3. HERO BANNER WITH LIFESTYLE SCENE */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#F7ECE1] via-[#F2E5D8] to-[#EBE0D3] shadow-sm border border-[#E8DACB]">
          <div className="relative z-10 flex flex-col justify-center px-8 py-16 sm:px-14 sm:py-24 max-w-2xl">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#C06030] uppercase mb-3">
              Quality. Style. Everyday.
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Everything You Love, <br />
              <span className="text-slate-900">All in One Place.</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-lg leading-relaxed">
              Shop top-quality products across all categories with unbeatable prices, verified customer reviews, and a seamless shopping experience.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#trending"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3 text-sm font-bold text-white shadow-md hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
              >
                <span>Shop Now</span>
                <span>→</span>
              </a>
            </div>

            {/* Badges beneath */}
            <div className="mt-12 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-base">💳</span>
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">🛡️</span>
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">🚀</span>
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>

          {/* Hero Lifestyle Background Image Simulation */}
          <div className="absolute top-0 right-0 h-full w-full lg:w-1/2 pointer-events-none opacity-90 lg:opacity-100 flex items-center justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop&q=80"
              alt="Cozy modern living room interior"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F7ECE1] via-transparent to-transparent hidden lg:block" />
          </div>
        </div>
      </section>

      {/* 4. SHOP BY CATEGORY (CIRCULAR AVATARS) */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Shop by Category
          </h2>
          <button
            onClick={() => setSelectedCategory("All")}
            className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            <span>View all categories</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 sm:gap-6 pt-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className="group flex flex-col items-center cursor-pointer"
              >
                <div
                  className={`flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full transition-all duration-300 shadow-xs border ${
                    isSelected
                      ? "border-slate-900 ring-2 ring-slate-900 bg-white scale-105"
                      : "border-slate-200/80 bg-white group-hover:scale-105 group-hover:shadow-md"
                  }`}
                >
                  <span className="text-3xl transition-transform group-hover:scale-110">
                    {cat.icon}
                  </span>
                </div>
                <span className={`mt-3 text-center text-xs font-semibold ${isSelected ? "text-slate-900 font-bold" : "text-slate-700"}`}>
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. PROMOTIONAL CARDS GRID (3 CARDS) */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Promo 1: Deal of the Day */}
          <div className="relative overflow-hidden rounded-2xl bg-[#FBF0F0] border border-[#F3DDDD] p-6 flex items-center justify-between shadow-xs">
            <div className="space-y-1.5 z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                Deal of the Day
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Up to 60% Off
              </h3>
              <p className="text-xs text-slate-500">On selected items only</p>
              <button
                onClick={() => setSelectedCategory("Electronics")}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 pt-2 hover:underline"
              >
                <span>Shop Deals</span>
                <span>→</span>
              </button>
            </div>
            <div className="h-28 w-28 shrink-0 rounded-xl overflow-hidden shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80"
                alt="Watch Deal"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Promo 2: New Arrivals */}
          <div className="relative overflow-hidden rounded-2xl bg-[#F0F5FA] border border-[#DFEAF5] p-6 flex items-center justify-between shadow-xs">
            <div className="space-y-1.5 z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                New Arrivals
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Fresh Finds
              </h3>
              <p className="text-xs text-slate-500">Check out the latest products just for you</p>
              <button
                onClick={() => setSelectedCategory("Fashion")}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 pt-2 hover:underline"
              >
                <span>Explore Now</span>
                <span>→</span>
              </button>
            </div>
            <div className="h-28 w-28 shrink-0 rounded-xl overflow-hidden shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80"
                alt="Sneakers Arrival"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Promo 3: Member Exclusive (Dark Card) */}
          <div className="relative overflow-hidden rounded-2xl bg-[#141416] text-white p-6 flex items-center justify-between shadow-md">
            <div className="space-y-1.5 z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Member Exclusive
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                Extra 10% Off
              </h3>
              <p className="text-xs text-slate-400">On prepaid orders this weekend</p>
              <button
                onClick={() => alert("Promo code APPLIED: MEMBER10 applied to all purchases.")}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 pt-2 hover:underline"
              >
                <span>Shop Now</span>
                <span>→</span>
              </button>
            </div>
            <div className="h-24 w-24 shrink-0 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 flex items-center justify-center font-extrabold text-2xl shadow-lg">
              %
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRENDING NOW SECTION (5 PRODUCTS) */}
      <section id="trending" className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Trending Now
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Top-rated items customers are loving right now</p>
          </div>
          <button
            onClick={() => setSelectedCategory("All")}
            className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            <span>View all products</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredTrending.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                onClick={() => setQuickViewProduct(product)}
                className="group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs hover:border-slate-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Product Thumbnail */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Wishlist Heart Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-xs transition-transform hover:scale-110"
                  >
                    <svg
                      className={`h-4 w-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : "text-slate-600"}`}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={isWishlisted ? "0" : "2"}
                    >
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 rounded-full bg-rose-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-xs">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="mt-3 flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-slate-700 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{product.category}</p>

                    {/* Star Rating */}
                    <div className="mt-1 flex items-center gap-1 text-[11px]">
                      <span className="text-amber-400">★★★★★</span>
                      <span className="text-slate-400 font-medium">({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Price & Cart button */}
                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
                    <div>
                      <span className="text-sm font-extrabold text-slate-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-1.5 text-[11px] text-slate-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => addToCart(product, e)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-800 shadow-2xs hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. TRUST & VALUE PROPOSITION BAR (4 TILES) */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">
              🚚
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Free Shipping</h4>
              <p className="text-[11px] text-slate-500">On orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">
              🔄
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Easy Returns</h4>
              <p className="text-[11px] text-slate-500">30-day money back</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">
              🔒
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Secure Payments</h4>
              <p className="text-[11px] text-slate-500">100% protected checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">
              🎧
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">24/7 Support</h4>
              <p className="text-[11px] text-slate-500">We&apos;re here to help anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RECOMMENDED FOR YOU SECTION (5 PRODUCTS) */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Recommended for You
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Personalized recommendations based on your browsing</p>
          </div>
          <button
            onClick={() => setSelectedCategory("All")}
            className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            <span>View all recommendations</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredRecommended.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                onClick={() => setQuickViewProduct(product)}
                className="group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs hover:border-slate-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Product Thumbnail */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Wishlist Heart Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-xs transition-transform hover:scale-110"
                  >
                    <svg
                      className={`h-4 w-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : "text-slate-600"}`}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={isWishlisted ? "0" : "2"}
                    >
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* Product Info */}
                <div className="mt-3 flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-slate-700 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{product.category}</p>

                    {/* Star Rating */}
                    <div className="mt-1 flex items-center gap-1 text-[11px]">
                      <span className="text-amber-400">★★★★★</span>
                      <span className="text-slate-400 font-medium">({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Price & Cart button */}
                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
                    <div>
                      <span className="text-sm font-extrabold text-slate-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-1.5 text-[11px] text-slate-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => addToCart(product, e)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-800 shadow-2xs hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. STAY IN THE LOOP (NEWSLETTER STRIP) */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-[#F6EFE9] border border-[#EBE1D8] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm text-3xl">
              ✉️
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Stay in the Loop
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md">
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto">
            {!newsletterSubscribed ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail.includes("@")) setNewsletterSubscribed(true);
                }}
                className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full sm:w-72 rounded-full border border-slate-300 bg-white px-5 py-3 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto shrink-0 rounded-full bg-slate-900 px-7 py-3 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition-transform active:scale-95"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="rounded-full bg-emerald-600 px-6 py-2.5 text-xs font-semibold text-white shadow-xs">
                ✓ You&apos;re subscribed! Welcome to Novella.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 10. DARK FOOTER */}
      <footer className="bg-[#12141A] text-slate-400 text-xs">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
            {/* Brand column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-950 font-bold">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="font-extrabold text-xl text-white tracking-tight">NOVELLA</span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Your trusted marketplace for quality products across every part of your life. Shop smart. Live better. Designed by Line Morelle.
              </p>
              <div className="flex items-center gap-3 pt-2">
                {["facebook", "instagram", "twitter", "pinterest", "youtube"].map((social) => (
                  <div
                    key={social}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-white hover:text-slate-950 cursor-pointer transition-colors"
                  >
                    <span className="text-xs uppercase font-bold">{social[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-4">Shop</h5>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-white transition-colors">All Categories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Top Deals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Clearance Sale</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-4">Customer Service</h5>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* About Novella & Apps */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-4">About Novella</h5>
              <ul className="space-y-2.5 mb-6">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press & News</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sell on Novella</a></li>
              </ul>

              <h6 className="font-bold text-white text-[11px] uppercase tracking-wider mb-2">Download Our App</h6>
              <div className="space-y-2">
                <div className="flex items-center gap-2 rounded-lg bg-slate-800/80 px-3 py-1.5 text-[11px] text-white hover:bg-slate-700 cursor-pointer">
                  <span>▶</span>
                  <div>
                    <p className="text-[8px] text-slate-400 uppercase">Get it on</p>
                    <p className="font-bold leading-none">Google Play</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-slate-800/80 px-3 py-1.5 text-[11px] text-white hover:bg-slate-700 cursor-pointer">
                  <span></span>
                  <div>
                    <p className="text-[8px] text-slate-400 uppercase">Download on the</p>
                    <p className="font-bold leading-none">App Store</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <p>© 2025 Novella Marketplace. Built with Next.js by Line Morelle.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400">Terms of Service</a>
              <a href="#" className="hover:text-slate-400">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 11. SLIDE-OVER SHOPPING CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-slate-900">Your Cart</h3>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700">
                    {cartCount} items
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-900"
                >
                  ✕
                </button>
              </div>

              {/* Free Shipping Meter */}
              <div className="bg-amber-50/70 border-b border-amber-100 px-6 py-3 text-xs text-amber-900">
                <div className="flex justify-between font-medium">
                  <span>
                    {cartTotal >= 50
                      ? "🎉 You have earned FREE Standard Shipping!"
                      : `Add $${(50 - cartTotal).toFixed(2)} more for Free Shipping`}
                  </span>
                  <span className="font-bold">{Math.min(100, Math.round((cartTotal / 50) * 100))}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-amber-200 overflow-hidden">
                  <div
                    className="h-full bg-amber-600 transition-all duration-300"
                    style={{ width: `${Math.min(100, (cartTotal / 50) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Cart List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-slate-100">
                {cart.length === 0 ? (
                  <div className="py-20 text-center text-slate-400">
                    <p className="text-base font-semibold text-slate-700">Your cart is empty</p>
                    <p className="text-xs mt-1">Explore our trending items and deals.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="py-4 flex gap-4 items-center">
                      <div className="h-16 w-16 shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-slate-400">{item.product.category}</p>
                        <p className="text-xs font-extrabold text-slate-900 mt-1">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center rounded-lg border border-slate-200 bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="px-2 py-0.5 text-xs text-slate-500 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="px-2 py-0.5 text-xs text-slate-500 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Subtotal & Checkout */}
              {cart.length > 0 && (
                <div className="border-t border-slate-200 bg-slate-50 p-6 space-y-3">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Estimated Shipping</span>
                    <span className="font-bold text-slate-900">
                      {cartTotal >= 50 ? "FREE" : "$4.99"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-slate-900 border-t border-slate-200 pt-2">
                    <span>Total</span>
                    <span>${(cartTotal + (cartTotal >= 50 ? 0 : 4.99)).toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => {
                      setCheckoutModal(true);
                    }}
                    className="w-full rounded-full bg-slate-900 py-3 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition-all"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 12. QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setQuickViewProduct(null)}
          />

          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col sm:flex-row">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-900 shadow-sm hover:bg-white"
            >
              ✕
            </button>

            <div className="w-full sm:w-1/2 aspect-square bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                  {quickViewProduct.category}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  {quickViewProduct.name}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-amber-500">
                  <span>★★★★★</span>
                  <span className="text-slate-400 font-medium">({quickViewProduct.reviewsCount} reviews)</span>
                </div>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900">
                    ${quickViewProduct.price.toFixed(2)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      ${quickViewProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-xs text-slate-600 leading-relaxed">
                  {quickViewProduct.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3">
                <button
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 rounded-full bg-slate-900 py-3 text-xs font-bold text-white shadow-sm hover:bg-slate-800"
                >
                  Add to Cart — ${quickViewProduct.price.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 13. CHECKOUT MODAL */}
      {checkoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setCheckoutModal(false)}
          />

          <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">Demo Checkout Complete</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Simulated order placed on Novella marketplace. Sub-50ms edge processing engineered by Line Morelle.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setCheckoutModal(false);
                  setIsCartOpen(false);
                  setCart([]);
                }}
                className="rounded-full bg-slate-900 px-8 py-3 text-xs font-bold text-white hover:bg-slate-800"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
