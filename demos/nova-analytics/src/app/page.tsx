"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Zap,
  Shield,
  Gauge,
  Radio,
  Users,
  FileCheck,
  Check,
  ArrowRight,
  Globe,
  Lock,
  Layers,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LandingPage() {
  const router = useRouter();
  const [auditUrl, setAuditUrl] = useState("");

  const handleInstantAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditUrl.trim()) return;
    let formatted = auditUrl.trim().toLowerCase();
    if (!formatted.startsWith("http://") && !formatted.startsWith("https://")) {
      formatted = `https://${formatted}`;
    }
    // Navigate to report page with domain query
    try {
      const urlObj = new URL(formatted);
      router.push(`/report?domain=${encodeURIComponent(urlObj.hostname)}`);
    } catch {
      router.push(`/report?domain=${encodeURIComponent(formatted.replace(/^https?:\/\//, ""))}`);
    }
  };

  const featureCards = [
    {
      title: "Core Insights",
      description: "Deep dive into your user behavior, session durations, conversion funnels, and real-time retention.",
      icon: "⚡",
      badge: "Analytics",
    },
    {
      title: "Security Auditing",
      description: "Continuous vulnerability scanning, header audits, SSL certificate tracking, and threat mitigation.",
      icon: "🛡️",
      badge: "Security",
    },
    {
      title: "Performance Optimization",
      description: "Real-time Core Web Vitals, speed index diagnostics, and automated compression recommendations.",
      icon: "⚡",
      badge: "Speed",
    },
    {
      title: "Real-time Monitoring",
      description: "Track live active visitors, sub-second telemetry pings, and instantaneous anomaly detection.",
      icon: "📊",
      badge: "Telemetry",
    },
    {
      title: "User Tracking",
      description: "100% privacy-preserving telemetry without cookies, fingerprinting, or GDPR compliance headaches.",
      icon: "👥",
      badge: "Privacy",
    },
    {
      title: "Automated Reporting",
      description: "Schedule executive PDF & CSV summaries, stakeholder emails, and automated weekly digests.",
      icon: "📄",
      badge: "Reports",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Connect Your Site",
      desc: "Add our ultra-lightweight snippet (< 1KB) to your site or run an instant zero-install site audit.",
      icon: Globe,
    },
    {
      step: "02",
      title: "Analyze Data",
      desc: "Our AI engine inspects your performance, SEO, SSL certificates, headers, and visitor telemetry.",
      icon: Zap,
    },
    {
      step: "03",
      title: "Get Insights",
      desc: "Receive actionable recommendations, benchmarked audits, and clear steps to scale conversion.",
      icon: Sparkles,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
          Actionable Insights to Drive{" "}
          <span className="text-blue-600">Precision Growth</span>
        </h1>

        <p className="mt-5 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Monitor site health, follow user behavior, and optimize performance with our
          all-in-one analytics engine. Web audits have never been this effortless.
        </p>

        {/* Instant Audit Input Bar */}
        <form
          onSubmit={handleInstantAudit}
          className="mt-8 max-w-xl mx-auto flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all"
        >
          <div className="pl-3 text-slate-400">
            <Globe className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={auditUrl}
            onChange={(e) => setAuditUrl(e.target.value)}
            placeholder="https://yourwebsite.com"
            className="flex-1 min-w-0 bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none px-2"
          />
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 active:scale-98 transition-all shadow-sm shrink-0"
          >
            Analyze my site
          </button>
        </form>

        <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-emerald-500" /> Instant instant scan
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-emerald-500" /> No signup required
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-emerald-500" /> 100% free report
          </span>
        </div>

        {/* Hero Visual Mockup */}
        <div className="mt-12 rounded-3xl border border-slate-200/90 bg-white p-3 sm:p-5 shadow-xl shadow-blue-900/5 overflow-hidden">
          <div className="rounded-2xl border border-slate-100 overflow-hidden bg-slate-900 relative aspect-[16/9] flex items-center justify-center">
            {/* Visual gradient backdrop simulating screen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-950/80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.18),transparent_50%)]" />

            {/* Dashboard UI Frame */}
            <div className="relative z-10 w-[94%] h-[92%] rounded-xl border border-slate-700/60 bg-slate-900/95 shadow-2xl p-4 sm:p-6 flex flex-col justify-between text-left">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] text-slate-400 font-mono ml-2">app.nova-analytics.io/overview</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Telemetry
                </div>
              </div>

              {/* Mock Analytics Chart in Hero */}
              <div className="my-auto py-2 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                    <span className="text-[10px] uppercase text-slate-400 font-medium">Total Visitors</span>
                    <div className="text-xl sm:text-2xl font-bold text-white mt-1">84,210</div>
                    <span className="text-[10px] text-emerald-400 font-medium">+18.4%</span>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                    <span className="text-[10px] uppercase text-slate-400 font-medium">Avg Duration</span>
                    <div className="text-xl sm:text-2xl font-bold text-white mt-1">04:12</div>
                    <span className="text-[10px] text-emerald-400 font-medium">+8.2%</span>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                    <span className="text-[10px] uppercase text-slate-400 font-medium">Bounce Rate</span>
                    <div className="text-xl sm:text-2xl font-bold text-white mt-1">32.4%</div>
                    <span className="text-[10px] text-emerald-400 font-medium">-4.1%</span>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                    <span className="text-[10px] uppercase text-slate-400 font-medium">Site Health</span>
                    <div className="text-xl sm:text-2xl font-bold text-blue-400 mt-1">87 / 100</div>
                    <span className="text-[10px] text-blue-300 font-medium">Optimal</span>
                  </div>
                </div>

                {/* SVG Visual line */}
                <div className="h-20 sm:h-28 w-full pt-1">
                  <svg viewBox="0 0 600 120" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,80 Q75,40 150,70 T300,30 T450,55 T600,15 L600,120 L0,120 Z"
                      fill="url(#heroGradient)"
                    />
                    <path
                      d="M0,80 Q75,40 150,70 T300,30 T450,55 T600,15"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Domain: linemorelle.dev</span>
                <span>Active audit engine v2.4</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid: "Everything you need to scale" */}
      <section className="py-20 border-t border-slate-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Everything you need to scale
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
              From comprehensive link-based audits to real-time telemetry tracking, find everything
              you need to build and scale your presence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {featureCards.map((feat, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-slate-200/90 bg-[#F8FAFC]/50 p-6 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{feat.icon}</span>
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-700">
                    {feat.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Steps to Clarity */}
      <section className="py-20 bg-[#F8FAFC] border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-1 block">
            HOW IT WORKS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-14">
            Three steps to clarity
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
            {steps.map((st, i) => {
              const Icon = st.icon;
              return (
                <div key={i} className="flex flex-col items-center space-y-4 relative">
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-[10px] font-bold">
                      {st.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{st.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transparent, Scalable Pricing */}
      <section id="pricing" className="py-20 border-t border-slate-200/80 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Transparent, scalable pricing
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Choose the plan that fits your current needs. Upgrade or downgrade anytime as your site grows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Starter Plan */}
            <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFC]/60 p-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  STARTER
                </span>
                <div className="flex items-baseline gap-1 mt-2 mb-1">
                  <span className="text-3xl font-extrabold text-slate-900">$19</span>
                  <span className="text-xs text-slate-500">/mo</span>
                </div>
                <p className="text-xs text-slate-500">
                  Ideal for small personal sites and side projects.
                </p>

                <div className="mt-6 space-y-2.5 text-xs text-slate-600 border-t border-slate-200/80 pt-4">
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-blue-600" />
                    <span>Up to 10k monthly visitors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-blue-600" />
                    <span>Basic SEO auditing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-blue-600" />
                    <span>Weekly email reports</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-blue-600" />
                    <span>Community support</span>
                  </div>
                </div>
              </div>

              <Link
                href="/signup"
                className="w-full text-center rounded-xl border border-slate-300 bg-white py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
              >
                Get Started
              </Link>
            </div>

            {/* Professional Plan (Highlighted) */}
            <div className="rounded-2xl border-2 border-blue-600 bg-white p-6 flex flex-col justify-between space-y-6 shadow-xl shadow-blue-600/10 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                RECOMMENDED
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  PROFESSIONAL
                </span>
                <div className="flex items-baseline gap-1 mt-2 mb-1">
                  <span className="text-3xl font-extrabold text-slate-900">$49</span>
                  <span className="text-xs text-slate-500">/mo</span>
                </div>
                <p className="text-xs text-slate-500">
                  Perfect for growing businesses and active creators.
                </p>

                <div className="mt-6 space-y-2.5 text-xs text-slate-600 border-t border-slate-200/80 pt-4">
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-blue-600" />
                    <span>Up to 100k monthly visitors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-blue-600" />
                    <span>Advanced security scans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-blue-600" />
                    <span>Real-time user behavior</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-blue-600" />
                    <span>Priority email support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-blue-600" />
                    <span>API Access</span>
                  </div>
                </div>
              </div>

              <Link
                href="/signup"
                className="w-full text-center rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
              >
                Get Started
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFC]/60 p-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  ENTERPRISE
                </span>
                <div className="flex items-baseline gap-1 mt-2 mb-1">
                  <span className="text-3xl font-extrabold text-slate-900">Custom</span>
                </div>
                <p className="text-xs text-slate-500">
                  Tailored solutions for large-scale enterprise needs.
                </p>

                <div className="mt-6 space-y-2.5 text-xs text-slate-600 border-t border-slate-200/80 pt-4">
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-blue-600" />
                    <span>Unlimited monthly visitors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-blue-600" />
                    <span>Dedicated account manager</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-blue-600" />
                    <span>Custom event triggers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-blue-600" />
                    <span>SLA guarantees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-blue-600" />
                    <span>SSO & SAML integration</span>
                  </div>
                </div>
              </div>

              <Link
                href="/signup"
                className="w-full text-center rounded-xl border border-slate-300 bg-white py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Call-To-Action Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="rounded-3xl bg-[#0B1528] p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.25),transparent_60%)]" />
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to transform your site&apos;s performance?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Join 10,000+ developers and companies who trust Nova Analytics to keep their digital
              assets healthy and fast.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/signup"
                className="w-full sm:w-auto rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-sm"
              >
                Start your free trial
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
              >
                Explore Live Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
