"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-sm shadow-sm shadow-blue-600/30">
            <BarChart3 className="h-4 w-4" />
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900">
            Nova<span className="text-blue-600">Analytics</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
          <a href="#features" className="hover:text-blue-600 transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">
            Pricing
          </a>
          <Link href="/report" className="hover:text-blue-600 transition-colors">
            Live Audit
          </Link>
          <Link href="/dashboard" className="flex items-center gap-1.5 text-blue-600 font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-semibold text-slate-700 hover:text-blue-600 px-3 py-1.5 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-all shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
