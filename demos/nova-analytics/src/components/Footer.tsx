"use client";

import Link from "next/link";
import { BarChart3, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-sky-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 text-white shadow-sm">
                <BarChart3 className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-slate-900">
                Nova <span className="text-sky-600 font-semibold">Analytics</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Simple, ethical, privacy-first web analytics. See all your crucial website metrics without tracking personal data or needing cookie consent banners.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/60 px-3 py-1 text-xs font-medium text-sky-700">
              <ShieldCheck className="h-4 w-4 text-sky-600" />
              100% GDPR, CCPA & PECR Compliant • Zero Cookies
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">Product</h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li><Link href="/dashboard" className="hover:text-sky-600 transition-colors">Live Demo Dashboard</Link></li>
              <li><Link href="/onboarding" className="hover:text-sky-600 transition-colors">Install Snippet</Link></li>
              <li><Link href="/signup" className="hover:text-sky-600 transition-colors">Free 14-Day Trial</Link></li>
              <li><a href="#pricing" className="hover:text-sky-600 transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">Line Morelle Portfolio</h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li><a href="/" target="_blank" rel="noreferrer" className="hover:text-sky-600 transition-colors">Main Portfolio</a></li>
              <li><a href="/projects" target="_blank" rel="noreferrer" className="hover:text-sky-600 transition-colors">All Projects</a></li>
              <li><span className="text-slate-400">Project: Nova Analytics</span></li>
              <li><span className="text-slate-400">Stack: Next.js + Supabase + Recharts</span></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 pt-8 text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Nova Analytics. Crafted for Line Morelle&apos;s Portfolio showcase.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Privacy Policy</span>
            <span className="text-slate-400">Terms of Service</span>
            <span className="text-slate-400">Status: All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
