"use client";

import React, { useState } from "react";

// ─── SVG Icon Components (custom, no AI-generated, no emoji) ───────────────

const IconSearch = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <circle cx="11" cy="11" r="7" />
    <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
  </svg>
);

const IconUser = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconHeart = ({ className = "h-5 w-5", filled = false }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const IconBag = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path strokeLinecap="round" d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const IconMenu = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconX = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconStar = ({ className = "h-4 w-4", filled = true }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconChevronRight = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const IconChevronLeft = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconChevronDown = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconPlus = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconMinus = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconCheck = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconTruck = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 5v4h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const IconLeaf = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34" />
    <path d="M17 8C17 14 13 18 8 20c3.5-5 5-10 9-12z" />
    <path d="M2 22c1-1 3-2 5-2 2 0 3.5 1 5 1s3-1 4-2" />
  </svg>
);

const IconShield = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconRotateCcw = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
  </svg>
);

const IconDroplet = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
  </svg>
);

const IconSun = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const IconFlower = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3 3" />
    <path d="M12 23a3 3 0 003-3 3 3 0 003 3 3 3 0 00-3-3" />
    <path d="M1 12a3 3 0 003 3 3 3 0 00-3 3 3 3 0 003-3" />
    <path d="M23 12a3 3 0 00-3-3 3 3 0 003-3 3 3 0 00-3 3" />
  </svg>
);

const IconPackage = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const IconHeadphones = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 18v-6a9 9 0 0118 0v6" />
    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
  </svg>
);

const IconCreditCard = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const IconMail = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22 6 12 13 2 6" />
  </svg>
);

const IconInstagram = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const IconTwitter = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconPinterest = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

// ─── Data ──────────────────────────────────────────────────────────────────

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=800&auto=format&fit=crop&q=80",
];

const RELATED_PRODUCTS = [
  {
    id: "r1",
    name: "Radiance Serum",
    price: 42,
    originalPrice: 58,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&auto=format&fit=crop&q=80",
    badge: "NEW",
    rating: 4.8,
    reviews: "1.2k",
  },
  {
    id: "r2",
    name: "Deep Moisture Cream",
    price: 38,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop&q=80",
    badge: null,
    rating: 4.9,
    reviews: "845",
  },
  {
    id: "r3",
    name: "Vitamin C Brightener",
    price: 29,
    originalPrice: 44,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&auto=format&fit=crop&q=80",
    badge: "SALE",
    rating: 4.7,
    reviews: "632",
  },
  {
    id: "r4",
    name: "Botanical Face Oil",
    price: 54,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1585232350732-4f6ec3c41d43?w=600&auto=format&fit=crop&q=80",
    badge: "BEST",
    rating: 4.9,
    reviews: "973",
  },
];

const INGREDIENTS = [
  {
    name: "Hyaluronic Acid",
    desc: "Triple-weight molecules penetrate at every skin layer to deliver deep, lasting hydration.",
    image: "https://images.unsplash.com/photo-1614869949990-6e1c9e46c1e5?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Sea Kelp Extract",
    desc: "Rich in minerals and antioxidants to brighten complexion and strengthen barrier function.",
    image: "https://images.unsplash.com/photo-1600428853876-fb6e6c63caca?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Rose Hip Oil",
    desc: "Cold-pressed and rich in Vitamin A & C to fade dark spots and improve skin elasticity.",
    image: "https://images.unsplash.com/photo-1580401506548-fc7c8d7e3c3e?w=400&auto=format&fit=crop&q=80",
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "Sophie L.",
    avatar: "SL",
    rating: 5,
    date: "October 8, 2025",
    title: "Complete game changer for my skin",
    body: "I've struggled with dry patches for years. After two weeks of using this serum, my skin feels plump and deeply hydrated. The texture is lightweight and absorbs instantly — no greasy residue at all.",
    verified: true,
  },
  {
    id: 2,
    name: "Marcus R.",
    avatar: "MR",
    rating: 5,
    date: "September 22, 2025",
    title: "Visible results in under a week",
    body: "My partner noticed the difference before I did. The fine lines around my eyes are noticeably softer. This is worth every penny and I'll definitely be repurchasing.",
    verified: true,
  },
  {
    id: 3,
    name: "Amara T.",
    avatar: "AT",
    rating: 4,
    date: "September 14, 2025",
    title: "Love the formula — mild scent is a bonus",
    body: "Really impressive formula. The calming botanical scent is a nice touch without being overpowering. I dock one star only because the pump dispenser can be slightly unpredictable.",
    verified: true,
  },
];

const FAQS = [
  {
    q: "How often should I use this serum?",
    a: "Apply morning and evening after cleansing and toning. For first-time users, we recommend starting with once daily to allow your skin to adjust.",
  },
  {
    q: "Is this suitable for sensitive skin?",
    a: "Yes. Our formula is dermatologist-tested and free from parabens, sulfates, artificial fragrances, and synthetic dyes. However, we always recommend a patch test before full application.",
  },
  {
    q: "Can I use this under makeup?",
    a: "Absolutely. The lightweight, fast-absorbing formula creates a smooth base ideal for makeup application. Wait 60 seconds after application before applying primer or foundation.",
  },
  {
    q: "When will I see results?",
    a: "Most customers report visibly softer, more hydrated skin within 5–7 days. Optimal results are typically achieved after 4–6 weeks of consistent use.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 30-day satisfaction guarantee. If you're not completely happy with your purchase, contact our customer care team for a full refund or exchange — no questions asked.",
  },
];

// ─── Star Rating Component ─────────────────────────────────────────────────

function StarRating({ rating, max = 5, size = "sm" }: { rating: number; max?: number; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "h-5 w-5" : "h-3.5 w-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < Math.floor(rating) ? "text-amber-400" : "text-slate-200"}>
          <IconStar className={cls} filled={i < Math.floor(rating)} />
        </span>
      ))}
    </div>
  );
}

// ─── Main Page Component ───────────────────────────────────────────────────

export default function VelocePage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: "main", name: "Lumière Hydra-Boost Serum", price: 32, qty: 1, image: PRODUCT_IMAGES[0]! },
    { id: "r2", name: "Deep Moisture Cream", price: 38, qty: 1, image: RELATED_PRODUCTS[1]!.image },
  ]);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);

  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  const handleAddToCart = () => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === "main");
      if (existing) {
        return prev.map((i) => i.id === "main" ? { ...i, qty: i.qty + quantity } : i);
      }
      return [...prev, { id: "main", name: "Lumière Hydra-Boost Serum", price: 32, qty: quantity, image: PRODUCT_IMAGES[0]! }];
    });
    setCartCount((c) => c + quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    setCartOpen(true);
  };

  const navLinks = ["Skincare", "Body", "Hair", "Sets & Kits", "Best Sellers", "Sustainability"];

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-[Inter,system-ui,sans-serif]">

      {/* ═══════════════════════════════════════════
          ANNOUNCEMENT BAR
      ═══════════════════════════════════════════ */}
      <div className="bg-[#1a1a1a] text-white text-center py-2.5 text-[11px] font-medium tracking-wide">
        Free standard shipping on orders over $50 &nbsp;·&nbsp; 30-Day returns &nbsp;·&nbsp; Clean, vegan &amp; cruelty-free
      </div>

      {/* ═══════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#e8e8e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Hamburger — mobile */}
            <button
              className="md:hidden text-[#1a1a1a] p-1"
              onClick={() => setMobileMenuOpen(true)}
            >
              <IconMenu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 shrink-0">
              <div className="h-8 w-8 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                <IconLeaf className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[#1a1a1a]">
                Lumière
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-[#444]">
              {navLinks.map((link) => (
                <a key={link} href="#" className="hover:text-[#1a1a1a] transition-colors">
                  {link}
                </a>
              ))}
            </nav>

            {/* Utilities */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-[#444] hover:text-[#1a1a1a] transition-colors"
              >
                <IconSearch className="h-5 w-5" />
              </button>
              <button className="hidden sm:block text-[#444] hover:text-[#1a1a1a] transition-colors">
                <IconUser className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="relative text-[#444] hover:text-[#1a1a1a] transition-colors"
              >
                <IconBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-[#1a1a1a] text-white text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar (toggleable) */}
          {searchOpen && (
            <div className="pb-3 fade-up">
              <div className="relative">
                <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#999]" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search for products..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#e8e8e8] bg-[#f8f8f8] text-sm text-[#1a1a1a] placeholder:text-[#aaa] outline-none focus:border-[#1a1a1a] transition-colors"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 bg-white p-6 flex flex-col gap-6 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">Lumière</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <IconX className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-4 text-sm font-medium text-[#444]">
              {navLinks.map((link) => (
                <a key={link} href="#" className="py-1 border-b border-[#f0f0f0] hover:text-[#1a1a1a]" onClick={() => setMobileMenuOpen(false)}>
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          BREADCRUMB
      ═══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-[12px] text-[#999]">
          <a href="#" className="hover:text-[#1a1a1a] transition-colors">Home</a>
          <IconChevronRight className="h-3 w-3" />
          <a href="#" className="hover:text-[#1a1a1a] transition-colors">Skincare</a>
          <IconChevronRight className="h-3 w-3" />
          <a href="#" className="hover:text-[#1a1a1a] transition-colors">Serums</a>
          <IconChevronRight className="h-3 w-3" />
          <span className="text-[#1a1a1a] font-medium">Lumière Hydra-Boost Serum</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          PRODUCT DETAIL — HERO
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* LEFT — Image Gallery */}
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible">
              {PRODUCT_IMAGES.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`shrink-0 h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-[#1a1a1a]" : "border-transparent hover:border-[#d4d4d4]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`Product view ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 relative group">
              <div className="relative rounded-2xl overflow-hidden bg-[#f8f5f0] aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PRODUCT_IMAGES[selectedImage]!}
                  alt="Lumière Hydra-Boost Serum"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  Best Seller
                </span>
                {/* Nav arrows */}
                <button
                  onClick={() => setSelectedImage((selectedImage - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <IconChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setSelectedImage((selectedImage + 1) % PRODUCT_IMAGES.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <IconChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — Product Info */}
          <div className="flex flex-col justify-center">
            {/* Brand */}
            <p className="text-[11px] font-semibold tracking-widest text-[#6c5ce7] uppercase mb-2">Lumière</p>

            {/* Name */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] leading-tight tracking-tight">
              Hydra-Boost Advanced Serum
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-3">
              <StarRating rating={4.8} />
              <span className="text-sm font-semibold text-[#1a1a1a]">4.8</span>
              <span className="text-sm text-[#999]">/ 5</span>
              <span className="text-[12px] text-[#6b6b6b] border-l border-[#e8e8e8] pl-3">2,845 reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-5">
              <span className="text-3xl font-bold text-[#1a1a1a]">$32.00</span>
              <span className="text-lg text-[#aaa] line-through">$48.00</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                SAVE 33%
              </span>
            </div>

            {/* Short description */}
            <p className="mt-4 text-[14px] text-[#5a5a5a] leading-relaxed">
              A deeply hydrating daily serum formulated with triple-weight hyaluronic acid, sea kelp extract,
              and cold-pressed rosehip oil. Restores the skin barrier, plumps fine lines, and delivers
              clinically proven 72-hour moisture.
            </p>

            {/* Volume selector */}
            <div className="mt-6">
              <p className="text-[12px] font-semibold text-[#999] uppercase tracking-wider mb-2">Volume</p>
              <div className="flex gap-2">
                {["30 ml", "50 ml", "100 ml"].map((v, i) => (
                  <button
                    key={v}
                    className={`px-4 py-2 rounded-xl border text-[13px] font-medium transition-all ${
                      i === 1
                        ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                        : "border-[#e8e8e8] text-[#444] hover:border-[#1a1a1a]"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              {/* Qty stepper */}
              <div className="flex items-center border border-[#e8e8e8] rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-[#444] hover:bg-[#f5f5f5] transition-colors"
                >
                  <IconMinus className="h-4 w-4" />
                </button>
                <span className="px-5 text-sm font-semibold text-[#1a1a1a] min-w-[48px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-[#444] hover:bg-[#f5f5f5] transition-colors"
                >
                  <IconPlus className="h-4 w-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all ${
                  addedToCart
                    ? "bg-emerald-600 text-white"
                    : "bg-[#1a1a1a] text-white hover:bg-[#333]"
                }`}
              >
                {addedToCart ? (
                  <>
                    <IconCheck className="h-4 w-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <IconBag className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setWishlist(!wishlist)}
                className={`h-12 w-12 rounded-xl border flex items-center justify-center transition-all ${
                  wishlist ? "border-rose-300 text-rose-500 bg-rose-50" : "border-[#e8e8e8] text-[#444] hover:border-[#1a1a1a]"
                }`}
              >
                <IconHeart className="h-5 w-5" filled={wishlist} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-7 pt-6 border-t border-[#f0f0f0] grid grid-cols-2 gap-4">
              {[
                { Icon: IconTruck, label: "Free Shipping", sub: "On orders over $50" },
                { Icon: IconRotateCcw, label: "30-Day Returns", sub: "No questions asked" },
                { Icon: IconShield, label: "Secure Payment", sub: "256-bit SSL encryption" },
                { Icon: IconHeadphones, label: "Expert Support", sub: "Mon–Fri, 9am–6pm" },
              ].map(({ Icon, label, sub }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-[#f8f8f8] flex items-center justify-center shrink-0">
                    <Icon className="h-4.5 w-4.5 text-[#555]" />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-[#1a1a1a]">{label}</p>
                    <p className="text-[11px] text-[#999]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RELATED PRODUCTS
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-[#f0f0f0]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] tracking-tight">Related Products</h2>
            <p className="text-[13px] text-[#999] mt-1">Complete your skincare routine</p>
          </div>
          <a href="#" className="text-[12px] font-semibold text-[#444] hover:text-[#1a1a1a] flex items-center gap-1 transition-colors">
            View all <IconChevronRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {RELATED_PRODUCTS.map((p) => (
            <div key={p.id} className="group cursor-pointer">
              <div className="relative rounded-2xl overflow-hidden bg-[#f8f5f0] aspect-square mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {p.badge && (
                  <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    p.badge === "SALE" ? "bg-rose-500 text-white" :
                    p.badge === "NEW" ? "bg-[#6c5ce7] text-white" :
                    "bg-[#1a1a1a] text-white"
                  }`}>
                    {p.badge}
                  </span>
                )}
                <button
                  onClick={() => {
                    setCartItems((prev) => {
                      const ex = prev.find((i) => i.id === p.id);
                      if (ex) return prev.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
                      return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1, image: p.image }];
                    });
                    setCartCount((c) => c + 1);
                    setCartOpen(true);
                  }}
                  className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-[#1a1a1a] hover:text-white"
                >
                  <IconPlus className="h-3.5 w-3.5" />
                </button>
              </div>
              <h3 className="text-[13px] font-semibold text-[#1a1a1a] group-hover:text-[#444] transition-colors">{p.name}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <StarRating rating={p.rating} />
                <span className="text-[11px] text-[#999]">({p.reviews})</span>
              </div>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-sm font-bold text-[#1a1a1a]">${p.price}</span>
                {p.originalPrice && (
                  <span className="text-[12px] text-[#bbb] line-through">${p.originalPrice}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BENEFITS
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-[#f0f0f0]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-[#6c5ce7] uppercase">Why It Works</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mt-3 tracking-tight">
              Clinically proven benefits<br />your skin will love
            </h2>
            <p className="text-[14px] text-[#5a5a5a] leading-relaxed mt-4 mb-8">
              Developed in collaboration with leading dermatologists, our Hydra-Boost Serum
              targets every layer of the skin barrier with precision-engineered actives.
            </p>

            <div className="space-y-5">
              {[
                { Icon: IconDroplet, title: "72-Hour Deep Hydration", desc: "Triple-weight HA delivers moisture at every skin depth for continuous 3-day hydration." },
                { Icon: IconSun, title: "Brightens & Evens Skin Tone", desc: "Stabilised Vitamin C and Sea Kelp visibly fade dark spots and unify complexion." },
                { Icon: IconShield, title: "Barrier Repair & Protection", desc: "Ceramide complex reinforces the skin's natural barrier against environmental stressors." },
                { Icon: IconFlower, title: "Calms Redness & Irritation", desc: "Centella Asiatica and Aloe Vera reduce inflammation and soothe reactive skin types." },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-[#f0eeff] flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-[#6c5ce7]" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-semibold text-[#1a1a1a]">{title}</h4>
                    <p className="text-[12px] text-[#6b6b6b] mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image mosaic */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&auto=format&fit=crop&q=80"
                alt="Skincare routine"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl overflow-hidden aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80"
                  alt="Clean ingredients"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="rounded-2xl bg-[#f0eeff] flex items-center justify-center p-5">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#6c5ce7]">97%</div>
                  <div className="text-[11px] text-[#6b6b6b] mt-1 font-medium">of users reported visibly plumper skin after 4 weeks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INGREDIENTS
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-[#f0f0f0]">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-widest text-[#6c5ce7] uppercase">What's Inside</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mt-3 tracking-tight">Key Ingredients</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {INGREDIENTS.map((ing) => (
            <div key={ing.name} className="group rounded-2xl overflow-hidden border border-[#f0f0f0] hover:border-[#e0e0e0] hover:shadow-md transition-all">
              <div className="aspect-video overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ing.image}
                  alt={ing.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-[14px] font-bold text-[#1a1a1a]">{ing.name}</h3>
                <p className="text-[12px] text-[#6b6b6b] leading-relaxed mt-2">{ing.desc}</p>
                <a href="#" className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#6c5ce7] mt-3 hover:underline">
                  Learn more <IconChevronRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW TO USE
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-[#f0f0f0]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden aspect-video lg:aspect-square">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&auto=format&fit=crop&q=80"
              alt="How to apply serum"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <span className="text-[11px] font-bold tracking-widest text-[#6c5ce7] uppercase">Application</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mt-3 tracking-tight mb-8">
              How to Use
            </h2>

            <div className="space-y-6">
              {[
                { step: "01", title: "Cleanse", desc: "Start with a clean face using your preferred gentle cleanser. Pat skin dry leaving it slightly damp for better absorption." },
                { step: "02", title: "Tone", desc: "Apply your toner or essence as the first layer. Allow to absorb for 30 seconds before applying the serum." },
                { step: "03", title: "Apply Serum", desc: "Dispense 2–3 drops into your fingertips. Gently press into skin — cheeks, forehead, and neck — using upward motions." },
                { step: "04", title: "Moisturise", desc: "Follow immediately with your moisturiser to seal in the active ingredients and lock in lasting hydration." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex items-start gap-5">
                  <span className="text-2xl font-extrabold text-[#e8e8e8] leading-none shrink-0 w-8">{step}</span>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#1a1a1a]">{title}</h4>
                    <p className="text-[12px] text-[#6b6b6b] leading-relaxed mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          REVIEWS
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-[#f0f0f0]">
        {/* Summary row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] tracking-tight">Customer Reviews</h2>
            <div className="flex items-center gap-3 mt-2">
              <StarRating rating={4.8} size="lg" />
              <span className="text-2xl font-bold text-[#1a1a1a]">4.8</span>
              <span className="text-sm text-[#999]">Based on 2,845 reviews</span>
            </div>
          </div>
          <a href="#" className="text-[12px] font-semibold text-[#444] hover:text-[#1a1a1a] flex items-center gap-1 transition-colors">
            Write a review <IconChevronRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Rating breakdown */}
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
          {[5, 4, 3, 2, 1].map((s) => {
            const pct = s === 5 ? 72 : s === 4 ? 19 : s === 3 ? 6 : s === 2 ? 2 : 1;
            return (
              <div key={s} className="flex items-center gap-3 text-[12px]">
                <span className="text-[#999] w-4 text-right">{s}</span>
                <IconStar className="h-3.5 w-3.5 text-amber-400" />
                <div className="flex-1 h-1.5 rounded-full bg-[#f0f0f0] overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[#999] w-8">{pct}%</span>
              </div>
            );
          })}
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div key={review.id} className="rounded-2xl border border-[#f0f0f0] p-6 hover:border-[#e0e0e0] hover:shadow-sm transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-[11px] font-bold">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#1a1a1a]">{review.name}</p>
                    <p className="text-[11px] text-[#999]">{review.date}</p>
                  </div>
                </div>
                {review.verified && (
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <IconCheck className="h-3 w-3" /> Verified
                  </span>
                )}
              </div>
              <StarRating rating={review.rating} />
              <h4 className="text-[13px] font-semibold text-[#1a1a1a] mt-3 mb-2">{review.title}</h4>
              <p className="text-[12px] text-[#6b6b6b] leading-relaxed">{review.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-[#f0f0f0]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[11px] font-bold tracking-widest text-[#6c5ce7] uppercase">Support</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mt-3 tracking-tight">FAQs</h2>
          </div>

          <div className="divide-y divide-[#f0f0f0]">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  className="w-full flex items-center justify-between py-5 text-left gap-4"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span className={`text-[14px] font-semibold transition-colors ${faqOpen === i ? "text-[#6c5ce7]" : "text-[#1a1a1a]"}`}>
                    {faq.q}
                  </span>
                  <span className={`shrink-0 transition-transform ${faqOpen === i ? "rotate-180" : ""}`}>
                    <IconChevronDown className="h-4 w-4 text-[#999]" />
                  </span>
                </button>
                {faqOpen === i && (
                  <div className="pb-5 fade-up">
                    <p className="text-[13px] text-[#6b6b6b] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          NEWSLETTER
      ═══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-[#f0f0f0]">
        <div className="rounded-3xl bg-[#1a1a1a] px-8 py-12 sm:px-14 sm:py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Get 15% off your first order
            </h2>
            <p className="text-[14px] text-[#9a9a9a] mt-2 max-w-md">
              Subscribe to receive skincare tips, exclusive offers, and early access to new launches.
            </p>
          </div>
          <div className="w-full md:w-auto">
            {!newsletterDone ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail.includes("@")) setNewsletterDone(true);
                }}
                className="flex flex-col sm:flex-row gap-2 w-full max-w-md"
              >
                <div className="relative flex-1">
                  <IconMail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-sm text-[#1a1a1a] placeholder:text-[#aaa] outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-[#6c5ce7] px-7 py-3 text-sm font-bold text-white hover:bg-[#5a4bd4] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white">
                <IconCheck className="h-4 w-4" />
                <span>You're subscribed! Check your inbox for your discount code.</span>
              </div>
            )}
            <p className="text-[11px] text-[#666] mt-2 text-center sm:text-left">
              No spam, ever. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}
      <footer className="bg-[#f8f8f8] border-t border-[#e8e8e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-12 border-b border-[#e8e8e8]">
            {/* Brand */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                  <IconLeaf className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-lg text-[#1a1a1a]">Lumière</span>
              </div>
              <p className="text-[12px] text-[#6b6b6b] max-w-xs leading-relaxed">
                Clean, science-backed skincare crafted with nature-derived ingredients.
                Vegan, cruelty-free, and sustainably packaged. Designed by Line Morelle.
              </p>
              <div className="flex items-center gap-2.5 pt-1">
                {[IconInstagram, IconTwitter, IconPinterest].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="h-8 w-8 rounded-full border border-[#e8e8e8] bg-white flex items-center justify-center text-[#444] hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-all"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: "Shop", links: ["All Products", "Serums", "Moisturisers", "Cleansers", "Sets & Kits", "Gift Cards"] },
              { title: "Company", links: ["Our Story", "Sustainability", "Press", "Careers", "Partners"] },
              { title: "Support", links: ["Help Centre", "Track Order", "Returns & Refunds", "Shipping Info", "Contact Us"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h5 className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider mb-4">{title}</h5>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-[12px] text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#999]">
            <p>© 2025 Lumière. All rights reserved. Built with Next.js by Line Morelle.</p>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-[#1a1a1a] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#1a1a1a] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#1a1a1a] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════
          CART DRAWER
      ═══════════════════════════════════════════ */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md bg-white flex flex-col shadow-2xl">
              {/* Cart Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0f0f0]">
                <div className="flex items-center gap-2.5">
                  <IconBag className="h-5 w-5 text-[#1a1a1a]" />
                  <h3 className="font-bold text-[#1a1a1a]">Your Cart</h3>
                  <span className="rounded-full bg-[#f0f0f0] px-2.5 py-0.5 text-[11px] font-bold text-[#444]">
                    {cartItems.reduce((s, i) => s + i.qty, 0)} items
                  </span>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="h-8 w-8 rounded-xl flex items-center justify-center text-[#999] hover:bg-[#f5f5f5] hover:text-[#1a1a1a] transition-colors"
                >
                  <IconX className="h-4 w-4" />
                </button>
              </div>

              {/* Free shipping meter */}
              <div className="px-6 py-3.5 bg-[#fafafa] border-b border-[#f0f0f0]">
                <div className="flex justify-between text-[12px] font-medium text-[#1a1a1a] mb-2">
                  <span>
                    {cartTotal >= 50
                      ? "You've earned free shipping!"
                      : `$${(50 - cartTotal).toFixed(2)} more for free shipping`}
                  </span>
                  <span>{Math.min(100, Math.round((cartTotal / 50) * 100))}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#e8e8e8] overflow-hidden">
                  <div
                    className="h-full bg-[#6c5ce7] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (cartTotal / 50) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Cart items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#f5f5f5]">
                {cartItems.length === 0 ? (
                  <div className="py-20 text-center">
                    <IconBag className="h-10 w-10 text-[#e8e8e8] mx-auto mb-4" />
                    <p className="text-sm font-semibold text-[#1a1a1a]">Your cart is empty</p>
                    <p className="text-[12px] text-[#999] mt-1">Explore our skincare collection</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="py-4 flex gap-4 items-center">
                      <div className="h-16 w-16 shrink-0 rounded-xl overflow-hidden bg-[#f8f5f0]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[12px] font-semibold text-[#1a1a1a] line-clamp-2">{item.name}</h4>
                        <p className="text-[13px] font-bold text-[#1a1a1a] mt-1">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-1 border border-[#e8e8e8] rounded-lg px-1">
                        <button
                          onClick={() => {
                            setCartItems((prev) =>
                              prev
                                .map((i) => i.id === item.id ? { ...i, qty: i.qty - 1 } : i)
                                .filter((i) => i.qty > 0)
                            );
                            setCartCount((c) => Math.max(0, c - 1));
                          }}
                          className="px-2 py-1.5 text-[#444] hover:bg-[#f5f5f5] rounded text-sm"
                        >
                          <IconMinus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-[12px] font-bold text-[#1a1a1a]">{item.qty}</span>
                        <button
                          onClick={() => {
                            setCartItems((prev) => prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
                            setCartCount((c) => c + 1);
                          }}
                          className="px-2 py-1.5 text-[#444] hover:bg-[#f5f5f5] rounded text-sm"
                        >
                          <IconPlus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout */}
              {cartItems.length > 0 && (
                <div className="border-t border-[#f0f0f0] p-6 space-y-4 bg-[#fafafa]">
                  <div className="space-y-2 text-[12px]">
                    <div className="flex justify-between text-[#6b6b6b]">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#1a1a1a]">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#6b6b6b]">
                      <span>Shipping</span>
                      <span className="font-semibold text-[#1a1a1a]">{cartTotal >= 50 ? "Free" : "$4.99"}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-[#1a1a1a] pt-2 border-t border-[#e8e8e8]">
                      <span>Total</span>
                      <span>${(cartTotal + (cartTotal >= 50 ? 0 : 4.99)).toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      setCheckoutDone(true);
                    }}
                    className="w-full rounded-xl bg-[#1a1a1a] py-3.5 text-sm font-bold text-white hover:bg-[#333] transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="w-full rounded-xl border border-[#e8e8e8] py-3 text-sm font-medium text-[#444] hover:bg-[#f5f5f5] transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          CHECKOUT SUCCESS MODAL
      ═══════════════════════════════════════════ */}
      {checkoutDone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCheckoutDone(false)} />
          <div className="relative w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl text-center space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <IconCheck className="h-7 w-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-[#1a1a1a]">Order Confirmed!</h3>
            <p className="text-[13px] text-[#6b6b6b] leading-relaxed">
              Your demo order has been placed successfully. You'll receive a confirmation email shortly.
              <br /><br />
              <span className="text-[11px] text-[#aaa]">Demo checkout by Line Morelle.</span>
            </p>
            <button
              onClick={() => { setCheckoutDone(false); setCartItems([]); setCartCount(0); }}
              className="w-full rounded-xl bg-[#1a1a1a] py-3 text-sm font-bold text-white hover:bg-[#333] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
