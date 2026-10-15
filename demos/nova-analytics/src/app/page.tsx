"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Target,
  Check,
  ArrowRight,
  BookOpen,
  AppWindow,
  Globe,
  Lock,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-800 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-600" />
          <span>Simple, Privacy-Friendly Website Analytics</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-slate-900 leading-tight">
          Website analytics that respect your visitors.
        </h1>

        <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Clean, real-time website traffic intelligence without invasive tracking cookies or complex tag managers. 100% GDPR, CCPA & PECR compliant.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/signup"
            className="w-full sm:w-auto rounded-full bg-sky-600 px-6 py-2.5 text-xs font-medium text-white hover:bg-sky-500 transition-colors shadow-xs"
          >
            Start 14-Day Free Trial
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto rounded-full border border-slate-200 bg-white px-6 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          >
            View Live Dashboard →
          </Link>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-sky-600" /> No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-sky-600" /> Script under 1KB
          </span>
          <span className="flex items-center gap-1.5 hidden sm:flex">
            <Check className="h-3.5 w-3.5 text-sky-600" /> Zero cookies
          </span>
        </div>

        {/* Minimal Dashboard Preview Card */}
        <div className="mt-12 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs text-left space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                <AppWindow className="h-4 w-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-900 block">myportfolio.com</span>
                <span className="text-[10px] text-slate-400">Live Traffic Intelligence</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-200/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                18 active visitors
              </span>
              <Link
                href="/dashboard"
                className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Open Full View
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-[10px] uppercase font-medium text-slate-400">Unique Visitors</span>
              <div className="text-2xl font-light text-slate-900 mt-1">31,220</div>
              <span className="text-[11px] text-emerald-600 font-medium">+14.2%</span>
            </div>
            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-[10px] uppercase font-medium text-slate-400">Total Pageviews</span>
              <div className="text-2xl font-light text-slate-900 mt-1">98,450</div>
              <span className="text-[11px] text-emerald-600 font-medium">+18.5%</span>
            </div>
            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-[10px] uppercase font-medium text-slate-400">Bounce Rate</span>
              <div className="text-2xl font-light text-slate-900 mt-1">36.4%</div>
              <span className="text-[11px] text-emerald-600 font-medium">-3.2%</span>
            </div>
            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-[10px] uppercase font-medium text-slate-400">Avg Duration</span>
              <div className="text-2xl font-light text-slate-900 mt-1">3m 12s</div>
              <span className="text-[11px] text-emerald-600 font-medium">+8.1%</span>
            </div>
          </div>

          {/* Minimal chart visual */}
          <div className="h-32 w-full pt-2">
            <svg viewBox="0 0 500 100" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="previewGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,70 Q80,50 160,65 T320,35 T500,15 L500,100 L0,100 Z"
                fill="url(#previewGrad)"
              />
              <path
                d="M0,70 Q80,50 160,65 T320,35 T500,15"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* 3 Core Minimal Value Props */}
      <section className="py-16 border-t border-slate-200/80 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-sky-700 mb-1">
              Privacy First
            </h2>
            <h3 className="text-2xl font-normal text-slate-900 tracking-tight">
              Honest analytics built for modern websites
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-6 space-y-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900">100% Privacy by Design</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                No personal data, no IP storage, and zero cross-site cookies. Full compliance without annoying consent banners.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-6 space-y-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <Zap className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900">&lt; 1KB Lightweight Script</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                45 times smaller than Google Analytics. Loads asynchronously without delaying page rendering or harming Core Web Vitals.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-6 space-y-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <Target className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900">Custom Conversion Goals</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Measure key business milestones, newsletter signups, and trial activations via simple custom JavaScript events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Minimal */}
      <section className="py-16 border-t border-slate-200/80 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-sky-700 mb-1">
            Pricing
          </h2>
          <h3 className="text-2xl font-normal text-slate-900 tracking-tight mb-10">
            Simple plans for every project
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 space-y-4">
              <div>
                <span className="text-xs font-semibold text-slate-900">Starter</span>
                <div className="text-2xl font-light text-slate-900 mt-1">$0</div>
                <span className="text-[11px] text-slate-400">For side projects & blogs</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-500">
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-sky-600" /> Up to 10k pageviews/mo</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-sky-600" /> 1 registered website</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-sky-600" /> 30 days retention</li>
              </ul>
              <Link
                href="/signup"
                className="block text-center rounded-full border border-slate-200 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Get Started
              </Link>
            </div>

            <div className="rounded-2xl border border-sky-400 bg-white p-6 space-y-4 shadow-xs relative">
              <span className="absolute -top-2.5 right-4 rounded-full bg-sky-600 px-2.5 py-0.5 text-[10px] font-medium text-white">
                Popular
              </span>
              <div>
                <span className="text-xs font-semibold text-slate-900">Pro</span>
                <div className="text-2xl font-light text-slate-900 mt-1">$14<span className="text-xs font-normal text-slate-400">/mo</span></div>
                <span className="text-[11px] text-slate-400">For growing creators & SaaS</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-500">
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-sky-600" /> Up to 100k pageviews/mo</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-sky-600" /> Unlimited websites</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-sky-600" /> Custom event & goal tracking</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-sky-600" /> 2 years data retention</li>
              </ul>
              <Link
                href="/signup"
                className="block text-center rounded-full bg-sky-600 py-2 text-xs font-medium text-white hover:bg-sky-500 transition-colors shadow-xs"
              >
                Start Free Trial
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 space-y-4">
              <div>
                <span className="text-xs font-semibold text-slate-900">Agency</span>
                <div className="text-2xl font-light text-slate-900 mt-1">$49<span className="text-xs font-normal text-slate-400">/mo</span></div>
                <span className="text-[11px] text-slate-400">For client studios & teams</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-500">
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-sky-600" /> 1M+ monthly pageviews</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-sky-600" /> Unlimited team members</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 text-sky-600" /> Public dashboard sharing</li>
              </ul>
              <Link
                href="/signup"
                className="block text-center rounded-full border border-slate-200 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
