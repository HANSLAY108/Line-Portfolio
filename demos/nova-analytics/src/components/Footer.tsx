"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-700 text-white font-semibold text-xs">
                N
              </div>
              <span className="text-sm font-semibold text-slate-900">
                Nova Analytics
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Simple, privacy-friendly website analytics. Monitor key metrics without tracking cookies or intrusive cookie banners.
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-[11px] font-medium text-sky-700">
              <ShieldCheck className="h-3.5 w-3.5 text-sky-600" />
              100% GDPR, CCPA & PECR Compliant • Zero Cookies
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-900 mb-3">Product</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><Link href="/dashboard" className="hover:text-slate-900 transition-colors">Live Dashboard</Link></li>
              <li><Link href="/onboarding" className="hover:text-slate-900 transition-colors">Install Snippet</Link></li>
              <li><Link href="/signup" className="hover:text-slate-900 transition-colors">14-Day Free Trial</Link></li>
              <li><a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-900 mb-3">Portfolio Project</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><a href="/" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">Main Portfolio</a></li>
              <li><a href="/projects" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">Projects Showcase</a></li>
              <li><span>Nova Analytics Demo</span></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 pt-6 text-[11px] text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Nova Analytics • Designed for Line Morelle&apos;s Portfolio.</p>
          <div className="flex items-center gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
