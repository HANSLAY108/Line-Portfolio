"use client";

import React, { useState, useMemo } from "react";

// Types
type Currency = "USD" | "EUR" | "CHF";

interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: "Chronographs" | "Leather" | "Objects" | "EDC";
  priceUSD: number;
  tag?: string;
  rating: number;
  reviewsCount: number;
  description: string;
  specs: string[];
  gradient: string;
  accentColor: string;
}

interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

const PRODUCTS: Product[] = [
  {
    id: "chrono-01",
    name: "Veloce Chrono-One 'Monolith'",
    subtitle: "39mm DLC Titanium / Swiss Automatic Movement",
    category: "Chronographs",
    priceUSD: 890,
    tag: "Limited Release",
    rating: 4.9,
    reviewsCount: 38,
    description: "Architectural chronograph machined from solid grade-5 titanium block with matte DLC coating. Caliber V-01 automatic movement with 68-hour reserve.",
    specs: ["Grade 5 Titanium", "Double-domed Sapphire", "100m Water Resistance", "68h Power Reserve"],
    gradient: "from-[#1a1c23] via-[#121316] to-[#0a0a0c]",
    accentColor: "#d4a373",
  },
  {
    id: "folio-02",
    name: "Architect Folio Sleeve",
    subtitle: "Full-Grain Tuscan Vachetta / Hand-Burnished",
    category: "Leather",
    priceUSD: 240,
    tag: "Best Seller",
    rating: 5.0,
    reviewsCount: 64,
    description: "Designed to carry 14\" & 16\" laptops along with sketches and fountain pens. Vegetable-tanned in Santa Croce sull'Arno, Italy.",
    specs: ["Tuscan Vachetta Leather", "Microfiber Suede Lining", "Solid Brass Hardware", "Magnetic Closure"],
    gradient: "from-[#2c1d11] via-[#1f140c] to-[#120a06]",
    accentColor: "#b08253",
  },
  {
    id: "chron-03",
    name: "Veloce Datum 'Alpine White'",
    subtitle: "38mm Brushed Steel / Minimalist Sunburst Dial",
    category: "Chronographs",
    priceUSD: 650,
    rating: 4.8,
    reviewsCount: 29,
    description: "Pure Swiss restraint. High-contrast blued second hand over an alpine snow sunburst dial with exhibition caseback.",
    specs: ["316L Surgical Steel", "Anti-reflective Sapphire", "Italian Calfskin Strap", "Date at 6 o'clock"],
    gradient: "from-[#2a303c] via-[#1a1f29] to-[#0f131a]",
    accentColor: "#7b9bc7",
  },
  {
    id: "edc-04",
    name: "Machined Solid Brass Pen",
    subtitle: "Zero-Tolerance Threading / Balanced Weight",
    category: "EDC",
    priceUSD: 110,
    rating: 4.9,
    reviewsCount: 92,
    description: "Weighted writing instrument machined from raw brass bar stock. Will develop a rich, customized patina unique to its owner over years of use.",
    specs: ["Solid Cartridge Brass", "Schmidt 5888 Rollerball", "48 Grams Balanced", "No-slip Knurled Grip"],
    gradient: "from-[#382b12] via-[#241b0b] to-[#120e06]",
    accentColor: "#e5b869",
  },
  {
    id: "obj-05",
    name: "Acoustic Resonance Prism",
    subtitle: "Anodized Billet Aluminum / Ambient Speaker",
    category: "Objects",
    priceUSD: 380,
    tag: "Studio Choice",
    rating: 5.0,
    reviewsCount: 19,
    description: "Monolithic desk object hiding dual neodymium transducers. Connects via Bluetooth 5.3 or Lossless USB-C Audio DAC.",
    specs: ["Unibody 6061 Aluminum", "24-bit 96kHz DAC", "18h Battery Life", "Acoustic Waveguide"],
    gradient: "from-[#22242a] via-[#181a1f] to-[#0f1013]",
    accentColor: "#9ca3af",
  },
  {
    id: "leather-06",
    name: "Veloce Minimalist Bifold",
    subtitle: "Ultra-slim 4mm Profile / RFID Protected",
    category: "Leather",
    priceUSD: 145,
    rating: 4.8,
    reviewsCount: 51,
    description: "Holds up to 10 cards and flat currency without unsightly pocket bulk. Folded edge construction with beeswax burnishing.",
    specs: ["French Buttero Calfskin", "RFID Shielding Layer", "4 Quick-Access Slots", "Holds 10 Cards"],
    gradient: "from-[#221c17] via-[#17130f] to-[#0d0a08]",
    accentColor: "#c28b5e",
  },
  {
    id: "chrono-07",
    name: "Veloce GMT 'Nocturne'",
    subtitle: "Dual Timezone / Ceramic Bezel / Stealth Matte",
    category: "Chronographs",
    priceUSD: 980,
    tag: "Exclusive",
    rating: 5.0,
    reviewsCount: 22,
    description: "For the global engineer. Tracks home and local timezone simultaneously with an ultra-durable 24-click ceramic bezel.",
    specs: ["Grade 5 Titanium & Ceramic", "True Flyer GMT Complication", "Super-LumiNova BGW9", "Quick-release Bracelet"],
    gradient: "from-[#171a24] via-[#0f1118] to-[#07080c]",
    accentColor: "#60a5fa",
  },
  {
    id: "edc-08",
    name: "Aerospace Titanium Carabiner",
    subtitle: "Monobloc Spring Gate / Integrated Hex Drive",
    category: "EDC",
    priceUSD: 85,
    rating: 4.7,
    reviewsCount: 44,
    description: "CNC milled from a single plate of titanium with an integral spring mechanism. No pins, screws, or joints that can fail.",
    specs: ["TC4 Titanium Alloy", "25kN Static Rating", "Integrated Bottle Opener", "Weighs only 18g"],
    gradient: "from-[#1f242d] via-[#151920] to-[#0a0d12]",
    accentColor: "#94a3b8",
  },
];

const CURRENCIES: Record<Currency, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: "$", rate: 1, label: "USD ($)" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
  CHF: { symbol: "CHF", rate: 0.88, label: "CHF" },
};

export default function VeloceCommerceApp() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Conversion helper
  const formatPrice = (usd: number) => {
    const { symbol, rate } = CURRENCIES[currency];
    const amount = Math.round(usd * rate);
    return `${currency === "CHF" ? "CHF " : symbol}${amount.toLocaleString()}`;
  };

  // Filtered products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Cart operations
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
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
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const cartSubtotalUSD = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
  }, [cart]);

  const discountAmountUSD = useMemo(() => {
    return (cartSubtotalUSD * discountPercent) / 100;
  }, [cartSubtotalUSD, discountPercent]);

  const totalUSD = useMemo(() => {
    return Math.max(0, cartSubtotalUSD - discountAmountUSD);
  }, [cartSubtotalUSD, discountAmountUSD]);

  const totalItemsCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const freeShippingThresholdUSD = 300;
  const freeShippingProgress = Math.min(
    100,
    Math.round((cartSubtotalUSD / freeShippingThresholdUSD) * 100)
  );

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "LINE15" || promoCode.trim().toUpperCase() === "VELOCE") {
      setDiscountPercent(15);
      setPromoSuccess(true);
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try 'LINE15' for 15% off.");
      setPromoSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#141416]">
      {/* 1. ANNOUNCEMENT TOP BAR */}
      <div className="bg-[#141416] px-4 py-2 text-center text-xs font-medium tracking-wider text-[#A0A0A5]">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-[0.16em]">
            Swiss Precision · Headless Commerce Architecture
          </span>
          <span className="mx-auto sm:mx-0 text-[11px] uppercase tracking-[0.12em] text-[#EDEDED]">
            Complimentary Insured Global Express over $300
          </span>
          <div className="hidden sm:flex items-center gap-3 text-[11px]">
            <span>Code: <strong className="text-white">LINE15</strong> (15% OFF)</span>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className="sticky top-0 z-40 border-b border-[#ECECEC] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Brand Mark */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex flex-col">
              <span className="font-serif text-2xl font-light tracking-[0.25em] text-[#141416]">
                VELOCE
              </span>
              <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-[#88888D]">
                Zürich · Atelier
              </span>
            </a>

            {/* Nav links */}
            <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium uppercase tracking-[0.12em] text-[#66666B]">
              {["All", "Chronographs", "Leather", "Objects", "EDC"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`transition-colors hover:text-[#141416] ${
                    activeCategory === cat ? "text-[#141416] font-semibold border-b-2 border-[#141416] pb-1" : ""
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          {/* Right utility buttons */}
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 rounded-full border border-[#E5E5E7] bg-[#F7F7F8] px-4 py-1.5 text-xs text-[#141416] placeholder:text-[#9E9EA4] outline-none transition-all focus:w-64 focus:border-[#141416] focus:bg-white"
              />
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="cursor-pointer appearance-none rounded-full border border-[#E5E5E7] bg-[#F7F7F8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#141416] outline-none hover:border-[#141416]"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="CHF">CHF</option>
              </select>
            </div>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 rounded-full bg-[#141416] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#2A2A2E]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Bag</span>
              {totalItemsCount > 0 && (
                <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4A373] text-[10px] font-bold text-white">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SHOWCASE SECTION */}
      <section className="relative overflow-hidden border-b border-[#ECECEC] bg-[#141416] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,163,115,0.15),transparent_60%)]" />
        
        <div className="relative mx-auto flex max-w-7xl flex-col-reverse lg:flex-row items-center justify-between px-6 py-16 lg:px-10 lg:py-24 gap-12">
          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4A373]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4A373] animate-pulse" />
              Engineering Series · SS25 Release
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight text-white">
              Minimalist Objects. <br />
              <span className="italic text-[#D4A373]">Uncompromising</span> Precision.
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-[#A5A5AB]">
              Crafted with a Swiss architectural ethos of restraint and purpose. Built on a headless Next.js, GraphQL, and Shopify infrastructure designed for sub-second interactions.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#catalog"
                className="rounded-full bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#141416] transition-transform hover:scale-105 active:scale-95"
              >
                Explore Collection
              </a>
              <button
                onClick={() => {
                  const chrono = PRODUCTS[0];
                  if (chrono) setQuickViewProduct(chrono);
                }}
                className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Inspect Flagship Piece
              </button>
            </div>

            {/* Architecture KPI stats */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-left">
              <div>
                <p className="font-serif text-2xl font-light text-white">38ms</p>
                <p className="text-[10px] uppercase tracking-wider text-[#8A8A92]">Edge TTFB</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-light text-white">100%</p>
                <p className="text-[10px] uppercase tracking-wider text-[#8A8A92]">GraphQL Headless</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-light text-white">Grade 5</p>
                <p className="text-[10px] uppercase tracking-wider text-[#8A8A92]">Titanium Milled</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Mockup Card */}
          <div className="w-full lg:w-[480px] shrink-0">
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-transparent p-6 shadow-2xl backdrop-blur-sm">
              <div className="relative aspect-square w-full rounded-2xl bg-gradient-to-br from-[#1E2028] via-[#121318] to-[#0A0A0C] p-8 flex flex-col items-center justify-center text-center overflow-hidden border border-white/5">
                {/* Watch dial visual rendering */}
                <div className="relative h-56 w-56 rounded-full border-4 border-[#3A3C45] bg-[#101116] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center">
                  <div className="absolute inset-2 rounded-full border border-white/10 flex items-center justify-center">
                    {/* Hour markers */}
                    <div className="absolute top-2 h-3 w-0.5 bg-[#D4A373]" />
                    <div className="absolute bottom-2 h-3 w-0.5 bg-[#D4A373]" />
                    <div className="absolute left-2 h-0.5 w-3 bg-[#D4A373]" />
                    <div className="absolute right-2 h-0.5 w-3 bg-[#D4A373]" />
                    
                    {/* Hands */}
                    <div className="absolute h-16 w-1 bg-white origin-bottom rounded-full -rotate-45 translate-y-[-8px]" />
                    <div className="absolute h-20 w-0.5 bg-[#D4A373] origin-bottom rounded-full rotate-60 translate-y-[-10px]" />
                    <div className="h-3 w-3 rounded-full bg-[#D4A373] border-2 border-[#101116] z-10" />

                    <div className="absolute top-10 text-[8px] tracking-[0.2em] font-semibold text-[#8A8A92]">
                      VELOCE
                    </div>
                    <div className="absolute bottom-10 text-[7px] tracking-[0.16em] text-[#6A6A70]">
                      AUTOMATIC · 100M
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-serif text-lg font-medium text-white">Chrono-One &apos;Monolith&apos;</h3>
                  <p className="text-xs text-[#A0A0A8]">Titanium · Automatic Caliber V-01</p>
                  <p className="mt-1 font-serif text-sm font-semibold text-[#D4A373]">{formatPrice(890)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT CATALOG */}
      <main id="catalog" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#ECECEC]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8C8C94]">
              Curated Catalog ({filteredProducts.length} Pieces)
            </p>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-light text-[#141416]">
              Architectural Objects
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {["All", "Chronographs", "Leather", "Objects", "EDC"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? "bg-[#141416] text-white shadow-xs"
                    : "border border-[#E5E5E8] bg-white text-[#66666D] hover:border-[#141416] hover:text-[#141416]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col rounded-2xl border border-[#ECECEC] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-[#141416]/20 hover:shadow-xl"
            >
              {/* Product Visual Area */}
              <div
                className={`relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gradient-to-br ${product.gradient} p-6 flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]`}
                onClick={() => setQuickViewProduct(product)}
              >
                {/* Tag Badge */}
                {product.tag && (
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#141416] shadow-xs backdrop-blur-xs">
                    {product.tag}
                  </span>
                )}

                {/* Abstract Iconic Silhouette representation */}
                <div className="relative flex flex-col items-center justify-center">
                  <div
                    className="h-28 w-28 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-sm flex items-center justify-center transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105"
                    style={{ backgroundColor: `${product.accentColor}25` }}
                  >
                    <div
                      className="h-16 w-16 rounded-xl border-2 border-white/40 flex items-center justify-center shadow-inner"
                      style={{ borderColor: product.accentColor }}
                    >
                      <span className="text-[10px] font-mono tracking-widest text-white/80 uppercase">
                        {product.category.slice(0, 3)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick View overlay prompt */}
                <div className="absolute inset-x-3 bottom-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-lg bg-white/95 py-2 text-center text-[11px] font-semibold uppercase tracking-wider text-[#141416] shadow-md backdrop-blur-xs">
                    Quick Inspect
                  </div>
                </div>
              </div>

              {/* Product Meta */}
              <div className="mt-4 flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#888890]">
                    <span className="uppercase tracking-wider">{product.category}</span>
                    <span className="flex items-center gap-1 text-[#D4A373]">
                      ★ {product.rating} <span className="text-[#A5A5B0]">({product.reviewsCount})</span>
                    </span>
                  </div>

                  <h3
                    onClick={() => setQuickViewProduct(product)}
                    className="mt-1 font-serif text-base font-medium text-[#141416] hover:underline cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  <p className="mt-0.5 text-xs text-[#7A7A82] line-clamp-1">
                    {product.subtitle}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#F2F2F4] pt-3">
                  <span className="font-serif text-base font-semibold text-[#141416]">
                    {formatPrice(product.priceUSD)}
                  </span>

                  <button
                    onClick={() => addToCart(product)}
                    className="rounded-full bg-[#141416] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#333338]"
                  >
                    + Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 5. ARCHITECTURAL SHOWCASE SECTION */}
      <section className="border-t border-[#ECECEC] bg-[#F7F7F8] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4A373]">
                Architectural Restraint
              </span>
              <h3 className="font-serif text-2xl font-light text-[#141416]">
                Form Following Function Without Pretense
              </h3>
              <p className="text-sm leading-relaxed text-[#6E6E77]">
                Every watch case, leather fold, and machined accessory is designed in Zürich by Line Morelle. We discard superfluous decoration in favor of structural clarity, enduring materials, and effortless utility.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4A373]">
                Headless Performance
              </span>
              <h3 className="font-serif text-2xl font-light text-[#141416]">
                Engineered for Zero Latency
              </h3>
              <p className="text-sm leading-relaxed text-[#6E6E77]">
                Built on Next.js App Router with unified GraphQL schema bindings to Shopify. Redis edge caches provide sub-40ms TTFB across Europe and North America, supporting instant client-side cart updates.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4A373]">
                Sustainable Provenance
              </span>
              <h3 className="font-serif text-2xl font-light text-[#141416]">
                Traceable Tuscan & Swiss Sourcing
              </h3>
              <p className="text-sm leading-relaxed text-[#6E6E77]">
                Vegetable-tanned leathers cured without heavy metals; recycled aerospace-grade titanium; and packaging manufactured with FSC-certified cotton-blend papers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SLIDE-OVER SHOPPING BAG (CART) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              {/* Cart Header */}
              <div className="flex items-center justify-between border-b border-[#ECECEC] px-6 py-5">
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-xl font-medium text-[#141416]">Your Shopping Bag</h2>
                  <span className="rounded-full bg-[#F0F0F2] px-2.5 py-0.5 text-xs font-semibold text-[#666]">
                    {totalItemsCount}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-full p-2 text-[#888] hover:bg-[#F5F5F7] hover:text-black"
                >
                  ✕
                </button>
              </div>

              {/* Free Shipping Progress */}
              <div className="bg-[#FAF7F2] border-b border-[#EFECE6] px-6 py-3">
                <div className="flex items-center justify-between text-xs font-medium text-[#4A453E]">
                  <span>
                    {cartSubtotalUSD >= freeShippingThresholdUSD
                      ? "🎉 You qualified for Free Express Shipping!"
                      : `Add ${formatPrice(freeShippingThresholdUSD - cartSubtotalUSD)} more for Free Shipping`}
                  </span>
                  <span>{freeShippingProgress}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#E5E0D5]">
                  <div
                    className="h-full bg-[#D4A373] transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-[#F2F2F4]">
                {cart.length === 0 ? (
                  <div className="py-20 text-center">
                    <p className="font-serif text-lg font-light text-[#141416]">Your bag is empty.</p>
                    <p className="mt-1 text-xs text-[#8A8A92]">Explore our curated chronographs and EDC objects.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 rounded-full bg-[#141416] px-6 py-2.5 text-xs font-semibold text-white"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="py-4 flex gap-4 items-center">
                      <div
                        className={`h-20 w-20 shrink-0 rounded-xl bg-gradient-to-br ${item.product.gradient} p-2 flex items-center justify-center border border-[#ECECEC]`}
                      >
                        <div
                          className="h-10 w-10 rounded-lg border border-white/30"
                          style={{ backgroundColor: `${item.product.accentColor}30` }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-medium text-[#141416] truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-[#888890]">{item.product.category}</p>
                        <p className="mt-1 font-serif text-xs font-semibold text-[#141416]">
                          {formatPrice(item.product.priceUSD)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-lg border border-[#E5E5E8] bg-white">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="px-2.5 py-1 text-xs text-[#666] hover:bg-[#F5F5F7]"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold text-[#141416]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="px-2.5 py-1 text-xs text-[#666] hover:bg-[#F5F5F7]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer & Checkout */}
              {cart.length > 0 && (
                <div className="border-t border-[#ECECEC] bg-[#FDFDFD] p-6 space-y-4">
                  {/* Promo code */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. LINE15)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 rounded-xl border border-[#E5E5E8] bg-white px-3.5 py-2 text-xs uppercase tracking-wider outline-none focus:border-[#141416]"
                    />
                    <button
                      onClick={applyPromo}
                      className="rounded-xl border border-[#141416] px-4 py-2 text-xs font-semibold text-[#141416] hover:bg-[#141416] hover:text-white transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoSuccess && (
                    <p className="text-[11px] font-medium text-emerald-600">✓ 15% discount applied!</p>
                  )}
                  {promoError && (
                    <p className="text-[11px] font-medium text-red-600">{promoError}</p>
                  )}

                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs text-[#7A7A82] border-t border-[#F0F0F2] pt-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-[#141416]">{formatPrice(cartSubtotalUSD)}</span>
                    </div>
                    {discountPercent > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount ({discountPercent}%)</span>
                        <span>-{formatPrice(discountAmountUSD)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Estimated Shipping</span>
                      <span className="text-[#141416]">
                        {cartSubtotalUSD >= freeShippingThresholdUSD ? "Free" : formatPrice(25)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-[#EAEAEA] pt-2 font-serif text-sm font-semibold text-[#141416]">
                      <span>Estimated Total</span>
                      <span>
                        {formatPrice(
                          totalUSD + (cartSubtotalUSD >= freeShippingThresholdUSD ? 0 : 25)
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(true);
                      setCheckoutComplete(false);
                    }}
                    className="w-full rounded-full bg-[#141416] py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-lg transition-transform hover:scale-[1.01] active:scale-98"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 7. QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setQuickViewProduct(null)}
          />

          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col md:flex-row">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#141416] shadow-sm hover:bg-white"
            >
              ✕
            </button>

            {/* Visual preview */}
            <div
              className={`w-full md:w-1/2 aspect-square md:aspect-auto bg-gradient-to-br ${quickViewProduct.gradient} p-8 flex items-center justify-center`}
            >
              <div
                className="h-44 w-44 rounded-3xl border-2 border-white/30 shadow-2xl flex items-center justify-center backdrop-blur-sm"
                style={{ backgroundColor: `${quickViewProduct.accentColor}30` }}
              >
                <div
                  className="h-24 w-24 rounded-2xl border-2 border-white/50 flex items-center justify-center text-white font-mono text-sm uppercase"
                  style={{ borderColor: quickViewProduct.accentColor }}
                >
                  VELOCE
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4A373]">
                  {quickViewProduct.category}
                </span>
                <h3 className="mt-1 font-serif text-2xl font-medium text-[#141416]">
                  {quickViewProduct.name}
                </h3>
                <p className="mt-1 text-xs text-[#7A7A82]">{quickViewProduct.subtitle}</p>

                <p className="mt-4 font-serif text-xl font-semibold text-[#141416]">
                  {formatPrice(quickViewProduct.priceUSD)}
                </p>

                <p className="mt-4 text-xs leading-relaxed text-[#55555D]">
                  {quickViewProduct.description}
                </p>

                {/* Specs list */}
                <div className="mt-6 border-t border-[#F0F0F2] pt-4">
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#8A8A92]">
                    Material & Engineering Specs
                  </h4>
                  <ul className="mt-2 grid grid-cols-2 gap-2 text-xs text-[#2A2A30]">
                    {quickViewProduct.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-[#D4A373]" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 rounded-full bg-[#141416] py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#2F2F35]"
                >
                  Add to Bag ({formatPrice(quickViewProduct.priceUSD)})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. CHECKOUT DEMO MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsCheckoutOpen(false)}
          />

          <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
            {!checkoutComplete ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#141416]">Express Demo Checkout</h3>
                    <p className="text-xs text-[#8A8A92]">Line Morelle Headless Commerce Showcase</p>
                  </div>
                  <button onClick={() => setIsCheckoutOpen(false)} className="text-[#888] hover:text-black">
                    ✕
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8A92]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="collector@veloce-studio.ch"
                      className="mt-1 w-full rounded-xl border border-[#E5E5E8] px-3.5 py-2 text-xs text-[#141416]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8A92]">
                      Shipping Destination
                    </label>
                    <input
                      type="text"
                      defaultValue="Bahnhofstrasse 45, 8001 Zürich, Switzerland"
                      className="mt-1 w-full rounded-xl border border-[#E5E5E8] px-3.5 py-2 text-xs text-[#141416]"
                    />
                  </div>

                  <div className="rounded-xl border border-[#E5E5E8] bg-[#F9F9FA] p-3 text-xs text-[#666]">
                    <div className="flex justify-between font-semibold text-[#141416]">
                      <span>Instant Payment</span>
                      <span>Apple Pay / Stripe Mock</span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#888]">
                      Zero real charges. Demonstrates seamless headless tokenization.
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#ECECEC] pt-4 flex items-center justify-between">
                  <span className="font-serif text-base font-semibold text-[#141416]">
                    Amount: {formatPrice(totalUSD)}
                  </span>
                  <button
                    onClick={() => {
                      setCheckoutComplete(true);
                      setCart([]);
                    }}
                    className="rounded-full bg-[#141416] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#2E2E33]"
                  >
                    Confirm & Authorize Order
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-2xl font-bold">
                  ✓
                </div>
                <h3 className="font-serif text-2xl font-medium text-[#141416]">Order Confirmed</h3>
                <p className="text-xs text-[#7A7A82] max-w-sm mx-auto">
                  Thank you! Your simulated order <strong className="text-black">#VEL-9482</strong> was authorized at the edge. A confirmation was sent to collector@veloce-studio.ch.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setIsCartOpen(false);
                    }}
                    className="rounded-full bg-[#141416] px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white"
                  >
                    Return to Atelier
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 9. FOOTER */}
      <footer className="border-t border-[#ECECEC] bg-white py-16 text-[#66666D]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row items-start justify-between gap-10">
          <div className="max-w-sm space-y-3">
            <span className="font-serif text-xl font-light tracking-[0.25em] text-[#141416]">
              VELOCE
            </span>
            <p className="text-xs leading-relaxed text-[#888892]">
              Part of Line Morelle&apos;s Engineering Portfolio. A demonstration of headless e-commerce built with Next.js, GraphQL, and Redis sub-second caching.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 text-xs">
            <div>
              <h5 className="font-semibold uppercase tracking-wider text-[#141416]">Atelier</h5>
              <ul className="mt-3 space-y-2 text-[#7A7A82]">
                <li>Zürich Flagship</li>
                <li>Paris Showroom</li>
                <li>Material Laboratory</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold uppercase tracking-wider text-[#141416]">Technical Stack</h5>
              <ul className="mt-3 space-y-2 text-[#7A7A82]">
                <li>Next.js 16 App Router</li>
                <li>Shopify Storefront GraphQL</li>
                <li>Redis Distributed Cache</li>
                <li>Stripe Integration</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-12 pt-6 border-t border-[#F0F0F2] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A5A5AB]">
          <p>© 2025 VELOCE Studio. Designed & Architected by Line Morelle.</p>
          <p className="uppercase tracking-widest text-[#B0B0B8]">Swiss Design · Headless Commerce</p>
        </div>
      </footer>
    </div>
  );
}
