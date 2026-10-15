"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Globe,
  Code2,
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
  Radio,
  Sparkles,
  Zap,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [domain, setDomain] = useState("linemorelle.dev");
  const [siteName, setSiteName] = useState("Line Morelle Portfolio");
  const [timezone, setTimezone] = useState("Europe/Paris (UTC+1)");
  const [currency, setCurrency] = useState("EUR (€)");

  const [siteId] = useState("site_nova_893xkd2");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"waiting" | "connected">("waiting");

  const snippetCode = `<script defer src="https://nova-analytics.app/tracker.js" data-site-id="${siteId}"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippetCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateFirstEvent = () => {
    setStatus("connected");
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between pb-6 border-b border-sky-100">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 text-white shadow-sm">
            <BarChart3 className="h-5 w-5" />
          </div>
          <span className="text-base font-bold text-slate-900">
            Nova <span className="text-sky-600 font-semibold">Analytics</span>
          </span>
        </Link>
        <span className="text-xs font-semibold text-slate-400">Step {step} of 3</span>
      </div>

      {/* Main Card */}
      <div className="max-w-2xl mx-auto w-full my-auto">
        {/* Step Progress Indicators */}
        <div className="flex items-center justify-between mb-8 px-4">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                step >= 1 ? "bg-sky-600 text-white shadow-sm shadow-sky-600/30" : "bg-slate-200 text-slate-600"
              }`}
            >
              1
            </div>
            <span className={`text-xs font-semibold ${step >= 1 ? "text-slate-900" : "text-slate-400"}`}>
              Add Site
            </span>
          </div>

          <div className={`h-0.5 flex-1 mx-3 ${step >= 2 ? "bg-sky-600" : "bg-slate-200"}`} />

          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                step >= 2 ? "bg-sky-600 text-white shadow-sm shadow-sky-600/30" : "bg-slate-200 text-slate-600"
              }`}
            >
              2
            </div>
            <span className={`text-xs font-semibold ${step >= 2 ? "text-slate-900" : "text-slate-400"}`}>
              Install Snippet
            </span>
          </div>

          <div className={`h-0.5 flex-1 mx-3 ${step >= 3 ? "bg-sky-600" : "bg-slate-200"}`} />

          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                step >= 3 ? "bg-sky-600 text-white shadow-sm shadow-sky-600/30" : "bg-slate-200 text-slate-600"
              }`}
            >
              3
            </div>
            <span className={`text-xs font-semibold ${step >= 3 ? "text-slate-900" : "text-slate-400"}`}>
              Verify & Launch
            </span>
          </div>
        </div>

        {/* STEP 1: Add Website */}
        {step === 1 && (
          <div className="rounded-2xl border border-sky-100 bg-white p-6 sm:p-10 shadow-xl shadow-sky-950/5 animate-in fade-in duration-200">
            <div className="mb-6">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Add your website
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Enter your domain details to configure tracking parameters and currency.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Domain Name
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Globe className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="example.com"
                    className="block w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 bg-slate-50/40"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Exclude protocol (e.g. enter <code>linemorelle.dev</code> without https://)
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Site Display Name
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="My Portfolio"
                  className="block w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 bg-slate-50/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Reporting Timezone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-slate-50/40 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  >
                    <option value="Europe/Paris (UTC+1)">Europe/Paris (UTC+1)</option>
                    <option value="Europe/London (UTC+0)">Europe/London (UTC+0)</option>
                    <option value="America/New_York (UTC-5)">America/New_York (UTC-5)</option>
                    <option value="America/Los_Angeles (UTC-8)">America/Los_Angeles (UTC-8)</option>
                    <option value="Asia/Tokyo (UTC+9)">Asia/Tokyo (UTC+9)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Goal Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-slate-50/40 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  >
                    <option value="EUR (€)">EUR (€)</option>
                    <option value="USD ($)">USD ($)</option>
                    <option value="GBP (£)">GBP (£)</option>
                    <option value="CAD ($)">CAD ($)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 transition-all"
              >
                Continue to Snippet
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Install Snippet */}
        {step === 2 && (
          <div className="rounded-2xl border border-sky-100 bg-white p-6 sm:p-10 shadow-xl shadow-sky-950/5 animate-in fade-in duration-200">
            <div className="mb-6">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Add tracking snippet
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Paste this single script line into the <code>&lt;head&gt;</code> of your website.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500">Your Unique Site ID:</span>
                  <span className="ml-2 font-mono font-bold text-sky-700">{siteId}</span>
                </div>
                <span className="rounded-md bg-sky-100/70 px-2 py-0.5 font-semibold text-[10px] text-sky-800">
                  Ready to Listen
                </span>
              </div>

              <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-sky-300">
                <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {snippetCode}
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-500 transition-all shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              <div className="rounded-xl bg-sky-50/70 border border-sky-100 p-3 text-xs text-sky-800 leading-relaxed">
                🚀 <strong>Zero performance overhead:</strong> Under 1KB in file size, loads asynchronously without delay, and creates zero cookies.
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 transition-all"
              >
                Verify Connection
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Verify & Connected Radar */}
        {step === 3 && (
          <div className="rounded-2xl border border-sky-100 bg-white p-6 sm:p-10 shadow-xl shadow-sky-950/5 text-center animate-in fade-in duration-200">
            {status === "waiting" ? (
              <>
                {/* Radar Pulse Animation */}
                <div className="relative mx-auto my-6 flex h-28 w-28 items-center justify-center">
                  <div className="absolute h-full w-full rounded-full bg-sky-400/20 animate-ping" />
                  <div className="absolute h-20 w-20 rounded-full bg-sky-400/30 animate-pulse" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-sky-600 text-white shadow-lg shadow-sky-600/30">
                    <Radio className="h-7 w-7 animate-pulse" />
                  </div>
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  Listening for first pageview...
                </h2>
                <p className="mt-2 text-xs text-slate-500 max-w-sm mx-auto">
                  Open <span className="font-semibold text-slate-800">{domain}</span> in another tab, or simulate a live visitor ping below.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleSimulateFirstEvent}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-sky-500 transition-all"
                  >
                    <Zap className="h-4 w-4" />
                    Simulate First Visitor Ping
                  </button>
                  <Link
                    href="/dashboard"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Skip to Dashboard
                  </Link>
                </div>
              </>
            ) : (
              <div className="py-4 animate-in zoom-in-95 duration-200">
                <div className="mx-auto my-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  First Pageview Received!
                </h2>
                <p className="mt-2 text-xs text-slate-500 max-w-md mx-auto">
                  Your website <span className="font-semibold text-slate-800">{domain}</span> is now actively streaming real-time analytics to your Nova dashboard.
                </p>

                <div className="mt-8">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-sky-600/25 hover:bg-sky-500 transition-all"
                  >
                    Launch Nova Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="hover:text-slate-600"
              >
                ← Back to Snippet
              </button>
              <span>Site ID: {siteId}</span>
            </div>
          </div>
        )}
      </div>

      <div className="text-center text-xs text-slate-400 mt-6">
        Need assistance? Check our quick installation guides for Next.js, WordPress, Webflow, and Shopify.
      </div>
    </div>
  );
}
