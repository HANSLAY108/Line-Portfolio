"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, BarChart3 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-sky-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 text-white shadow-sm shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
              Nova <span className="text-sky-600 font-semibold">Analytics</span>
            </span>
            <span className="text-[10px] font-medium text-slate-400 -mt-0.5">Privacy-First SaaS</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-sky-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-sky-600 transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-sky-600 transition-colors">Pricing</a>
          <Link href="/dashboard" className="flex items-center gap-1.5 text-sky-600 hover:text-sky-700 font-semibold transition-colors">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Demo
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-600 hover:text-sky-600 px-3 py-2 transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-sky-600/30 hover:bg-sky-500 transition-all hover:shadow"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
