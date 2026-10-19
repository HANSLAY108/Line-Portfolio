"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Globe,
  Code2,
  Copy,
  Check,
  Radio,
  ArrowRight,
  BookOpen,
  AppWindow,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [domain, setDomain] = useState("linemorelle.dev");
  const [siteLabel, setSiteLabel] = useState("Line's Portfolio");
  const [timezone, setTimezone] = useState("Europe/Paris");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"waiting" | "connected">("waiting");

  const snippetCode = `<!-- Nova Analytics Privacy Tracking Script -->\n<script defer data-domain="${domain}" src="https://cdn.nova-analytics.io/js/telemetry.js"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippetCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateFirstEvent = () => {
    setStatus("connected");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col justify-between p-6 sm:p-10 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header with Steps */}
      <header className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm">
            <BarChart3 className="h-4 w-4" />
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900">
            Nova<span className="text-blue-600">Analytics</span>
          </span>
        </Link>

        {/* Step Progression Pills */}
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              step === 1
                ? "bg-blue-50 text-blue-700 font-bold border border-blue-200 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step === 1 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
            }`}>1</span>
            <span>Add Domain</span>
          </button>
          <span className="text-slate-300">›</span>
          <button
            onClick={() => setStep(2)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              step === 2
                ? "bg-blue-50 text-blue-700 font-bold border border-blue-200 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step === 2 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
            }`}>2</span>
            <span>Snippet</span>
          </button>
          <span className="text-slate-300">›</span>
          <button
            onClick={() => setStep(3)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              step === 3
                ? "bg-blue-50 text-blue-700 font-bold border border-blue-200 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step === 3 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
            }`}>3</span>
            <span>Verify</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto w-full my-8">
        {/* STEP 1: Add Website Domain */}
        {step === 1 && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-sm space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                STEP 1 OF 3
              </span>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                Add your website domain
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Enter your site URL to register your site and initialize instant telemetry & audits.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Domain Name (without https://)
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Globe className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="linemorelle.dev"
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Display Label
                </label>
                <input
                  type="text"
                  value={siteLabel}
                  onChange={(e) => setSiteLabel(e.target.value)}
                  placeholder="Line's Portfolio"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Reporting Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
                >
                  <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                  <option value="Europe/London">Europe/London (UTC+0)</option>
                  <option value="America/New_York">America/New_York (UTC-5)</option>
                  <option value="America/Los_Angeles">America/Los_Angeles (UTC-8)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <Link
                href="/report"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Skip to instant link audit →
              </Link>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-sm"
              >
                Continue to Snippet →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Embed Snippet */}
        {step === 2 && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-sm space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                STEP 2 OF 3
              </span>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                Install tracking snippet
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Insert this lightweight script into the <code>&lt;head&gt;</code> of <strong>{domain}</strong> to enable real visitor telemetry.
              </p>
            </div>

            {/* Dark Snippet Code Box */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 font-mono text-xs text-blue-300 relative shadow-md">
              <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed pr-24">
                {snippetCode}
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue-500 transition-all shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-300" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy Code
                  </>
                )}
              </button>
            </div>

            {/* 3 Framework Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs space-y-1">
                <span className="font-bold text-slate-900 block">Standard HTML</span>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Paste script directly before <code>&lt;/head&gt;</code> in your HTML.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs space-y-1">
                <span className="font-bold text-slate-900 block">Next.js App</span>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Use <code>&lt;Script strategy=&quot;afterInteractive&quot; /&gt;</code> in layout.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs space-y-1">
                <span className="font-bold text-slate-900 block">WordPress</span>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Insert via header plugin or child theme header.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
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
                className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-sm"
              >
                Verify Connection →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Verification Radar */}
        {step === 3 && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-sm text-center space-y-6">
            {status === "waiting" ? (
              <>
                <div className="relative mx-auto my-4 flex h-24 w-24 items-center justify-center">
                  <div className="absolute h-full w-full rounded-full bg-blue-200/50 animate-ping" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
                    <Radio className="h-7 w-7 animate-pulse" />
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Listening for first pageview...
                  </h2>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
                    Open <span className="font-semibold text-slate-800">{domain}</span> in another browser tab, or simulate a live telemetry event below.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSimulateFirstEvent}
                    className="w-full sm:w-auto rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-sm"
                  >
                    Simulate First Visitor Ping
                  </button>
                  <Link
                    href="/dashboard"
                    className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Skip to Dashboard
                  </Link>
                </div>
              </>
            ) : (
              <div className="space-y-4 py-2">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Snippet Verified & Connected!
                  </h2>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    Telemetry is active on <span className="font-semibold text-slate-800">{domain}</span>. Visitor traffic and metrics will now display.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <Link
                    href="/dashboard"
                    className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-sm"
                  >
                    Open Live Dashboard →
                  </Link>
                  <Link
                    href="/report"
                    className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Run Instant Site Audit →
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer link */}
      <footer className="max-w-4xl mx-auto w-full text-center text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5 text-slate-400" />
          Need assistance? Read the installation docs or contact support.
        </span>
      </footer>
    </div>
  );
}
