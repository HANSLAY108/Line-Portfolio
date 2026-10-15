"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-700 text-white font-semibold text-xs">
            N
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            Nova Analytics
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-600">
          <Link href="/dashboard" className="hover:text-slate-900 transition-colors">
            Dashboard
          </Link>
          <Link href="/onboarding" className="hover:text-slate-900 transition-colors">
            Setup Snippet
          </Link>
          <a href="#pricing" className="hover:text-slate-900 transition-colors">
            Pricing
          </a>
          <Link href="/dashboard" className="flex items-center gap-1.5 text-sky-700 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live Telemetry
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-sky-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-sky-500 transition-colors shadow-xs"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
