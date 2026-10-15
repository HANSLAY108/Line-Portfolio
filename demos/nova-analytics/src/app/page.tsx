"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MetricCard from "../components/MetricCard";
import AnalyticsChart, { ChartDataPoint } from "../components/AnalyticsChart";
import {
  ShieldCheck,
  Zap,
  Target,
  BarChart2,
  CheckCircle2,
  ArrowRight,
  Eye,
  Clock,
  Sparkles,
  MousePointerClick,
  Users,
} from "lucide-react";

const SAMPLE_CHART_DATA: ChartDataPoint[] = [
  { date: "Oct 9", visitors: 2840, pageviews: 9420 },
  { date: "Oct 10", visitors: 3120, pageviews: 11250 },
  { date: "Oct 11", visitors: 2950, pageviews: 10180 },
  { date: "Oct 12", visitors: 3680, pageviews: 13400 },
  { date: "Oct 13", visitors: 4100, pageviews: 15600 },
  { date: "Oct 14", visitors: 3820, pageviews: 14210 },
  { date: "Oct 15", visitors: 4070, pageviews: 15360 },
];

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Soft light blue radial gradient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-sky-200/40 via-sky-100/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-semibold text-sky-800 mb-6 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-sky-600" />
            <span>The Lightweight, Privacy-First Google Analytics Alternative</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
            Simple, honest website analytics.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-400">
              Zero cookie banners.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Get essential traffic insights in one clean, sub-second dashboard. No cookies, 100% GDPR & CCPA compliant, and a tracking snippet under 1KB.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-sky-600/25 hover:bg-sky-500 hover:shadow-lg transition-all"
            >
              Start 14-Day Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-xs hover:border-sky-300 hover:text-sky-700 transition-all"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Explore Interactive Demo
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-sky-600" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-sky-600" /> 1-minute setup
            </span>
            <span className="flex items-center gap-1.5 hidden sm:flex">
              <CheckCircle2 className="h-4 w-4 text-sky-600" /> Free demo sandbox
            </span>
          </div>

          {/* Interactive Live Dashboard Preview */}
          <div className="mt-14 relative mx-auto max-w-5xl rounded-2xl border border-sky-100 bg-white/80 p-3 sm:p-5 shadow-2xl shadow-sky-950/5 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 text-left">
              <div className="flex items-center gap-2.5">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-mono font-medium text-slate-400">
                  https://nova-analytics.app/dashboard/demo
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  18 live visitors
                </span>
                <Link
                  href="/dashboard"
                  className="rounded-lg bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-100 transition-colors"
                >
                  Full View →
                </Link>
              </div>
            </div>

            {/* Quick 4 Metrics Preview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-left mb-4">
              <MetricCard
                title="Unique Visitors"
                value="24,580"
                delta="+12.5%"
                isPositive={true}
                icon={Users}
              />
              <MetricCard
                title="Total Pageviews"
                value="89,420"
                delta="+18.2%"
                isPositive={true}
                icon={Eye}
              />
              <MetricCard
                title="Bounce Rate"
                value="38.4%"
                delta="-4.1%"
                isPositive={true}
                icon={MousePointerClick}
              />
              <MetricCard
                title="Avg Visit Duration"
                value="2m 45s"
                delta="+8.6%"
                isPositive={true}
                icon={Clock}
              />
            </div>

            {/* Main Interactive Chart */}
            <AnalyticsChart data={SAMPLE_CHART_DATA} />
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section id="features" className="py-20 bg-white border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
              Why Nova Analytics
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Everything you need to understand your traffic, nothing you don&apos;t.
            </h3>
            <p className="mt-4 text-base text-slate-500">
              Replace bloated tag managers with an intuitive, single-page command center.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-sky-100 bg-[#F0F7FF]/50 p-8 hover:bg-[#F0F7FF] transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white mb-6 shadow-sm shadow-sky-600/30">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">100% Privacy by Design</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                No personal data, no IP addresses stored, and zero cross-site tracking cookies. Completely compliant with GDPR, CCPA, and PECR without needing annoying consent banners.
              </p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-[#F0F7FF]/50 p-8 hover:bg-[#F0F7FF] transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white mb-6 shadow-sm shadow-sky-600/30">
                <Zap className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">&lt; 1 KB Script Size</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                45 times lighter than Google Analytics. Loads asynchronously without blocking page rendering, preserving your Google Core Web Vitals and lightning-fast SEO scores.
              </p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-[#F0F7FF]/50 p-8 hover:bg-[#F0F7FF] transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white mb-6 shadow-sm shadow-sky-600/30">
                <Target className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Custom Conversion Goals</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Measure what actually drives revenue. Track newsletter signups, purchase button clicks, and trial activations with a single JavaScript helper or URL match rule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
              Setup in 60 Seconds
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              From zero to live analytics in three quick steps
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 font-bold text-sm mb-4">
                1
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Create Your Account</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Sign up with your email and enter your website domain name. No credit card or complex credentials required.
              </p>
            </div>

            <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 font-bold text-sm mb-4">
                2
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Paste 1 Line of Code</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Copy your customized lightweight snippet and insert it into your website&apos;s &lt;head&gt; tag or Next.js layout.
              </p>
            </div>

            <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 font-bold text-sm mb-4">
                3
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Enjoy Real-Time Data</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Watch visitors browse your pages in real time, monitor conversion funnels, and share private or public dashboards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Matrix */}
      <section id="pricing" className="py-20 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
              Transparent Pricing
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Simple plans for projects of every scale
            </h3>
            <p className="mt-4 text-base text-slate-500">
              All plans include complete privacy features, unlimited team seats, and zero cookie popups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">Starter</h4>
                <p className="text-xs text-slate-500 mb-6">For personal blogs & side projects</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">$0</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-600" /> Up to 10,000 monthly pageviews
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-600" /> 1 website domain
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-600" /> 30 days data retention
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-600" /> Standard traffic metrics
                  </li>
                </ul>
              </div>
              <Link
                href="/signup"
                className="w-full text-center rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-700 hover:border-sky-300 hover:bg-sky-50 transition-colors"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro (Highlighted) */}
            <div className="rounded-2xl border-2 border-sky-500 bg-white p-8 shadow-xl shadow-sky-600/10 flex flex-col justify-between relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sky-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                Most Popular
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">Pro</h4>
                <p className="text-xs text-slate-500 mb-6">For growing startups & creators</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">$14</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-600" /> Up to 100,000 monthly pageviews
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-600" /> Unlimited websites
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-600" /> 2 years data retention
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-600" /> Custom event & goal tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-600" /> CSV exports & email reports
                  </li>
                </ul>
              </div>
              <Link
                href="/signup"
                className="w-full text-center rounded-xl bg-sky-600 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-sky-500 transition-colors"
              >
                Start 14-Day Free Trial
              </Link>
            </div>

            {/* Agency */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">Agency</h4>
                <p className="text-xs text-slate-500 mb-6">For client portfolios & teams</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">$49</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-600" /> 1,000,000+ monthly pageviews
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-600" /> Unlimited team members & sites
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-600" /> White-label public dashboards
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-600" /> Priority API ingestion
                  </li>
                </ul>
              </div>
              <Link
                href="/signup"
                className="w-full text-center rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-700 hover:border-sky-300 hover:bg-sky-50 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-extrabold sm:text-4xl tracking-tight mb-4">
            Ready to upgrade your website analytics?
          </h3>
          <p className="text-sky-100 text-base max-w-2xl mx-auto mb-8">
            Join thousands of modern creators who respect their visitors&apos; privacy while gaining clear, actionable insight.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="w-full sm:w-auto rounded-full bg-white px-8 py-3.5 text-sm font-bold text-sky-700 shadow-lg hover:bg-sky-50 transition-all"
            >
              Get Started for Free
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto rounded-full border border-sky-300 bg-sky-500/20 px-8 py-3.5 text-sm font-bold text-white hover:bg-sky-500/30 transition-all"
            >
              Open Live Dashboard
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
