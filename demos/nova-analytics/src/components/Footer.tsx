"use client";

import Link from "next/link";
import { BarChart3, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs">
                <BarChart3 className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold text-slate-900">
                Nova Analytics
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              The leading performance and security tracking platform for modern web experiences.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-slate-500">
              <span className="hover:text-blue-600 cursor-pointer">Twitter / X</span>
              <span>•</span>
              <span className="hover:text-blue-600 cursor-pointer">GitHub</span>
              <span>•</span>
              <span className="hover:text-blue-600 cursor-pointer">LinkedIn</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-3">Product</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><Link href="/dashboard" className="hover:text-slate-900 transition-colors">Overview</Link></li>
              <li><Link href="/report" className="hover:text-slate-900 transition-colors">Site Audit</Link></li>
              <li><Link href="/onboarding" className="hover:text-slate-900 transition-colors">Integrations</Link></li>
              <li><a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-3">Company</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><a href="#" className="hover:text-slate-900 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Press Kit</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-3">Legal</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 pt-6 text-[11px] text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Nova Analytics Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>System Operational</span>
            <span>•</span>
            <span>English ▼</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
