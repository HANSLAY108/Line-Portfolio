"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Globe,
  Code2,
  Copy,
  Check,
  Radio,
  ArrowRight,
  BookOpen,
  AppWindow,
  CheckCircle2,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(2);
  const [domain, setDomain] = useState("myportfolio.com");
  const [siteLabel, setSiteLabel] = useState("Line's Portfolio");
  const [timezone, setTimezone] = useState("Europe/London");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"waiting" | "connected">("waiting");

  const snippetCode = `<!-- Nova Analytics Privacy Script -->\n<script defer data-domain="${domain}" src="https://cdn.nova-analytics.io/js/telemetry.js"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippetCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateFirstEvent = () => {
    setStatus("connected");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col justify-between p-6 sm:p-10 font-sans">
      {/* Top Header with Steps */}
      <header className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-700 text-white font-semibold text-xs">
            N
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            Nova Analytics
          </span>
        </Link>

        {/* Step Progression Pills */}
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors ${
              step === 1
                ? "bg-sky-50 text-sky-700 font-medium border border-sky-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span className="h-4 w-4 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-semibold">1</span>
            <span>Add Domain</span>
          </button>
          <span className="text-slate-300">›</span>
          <button
            onClick={() => setStep(2)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors ${
              step === 2
                ? "bg-sky-50 text-sky-700 font-medium border border-sky-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span className="h-4 w-4 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-semibold">2</span>
            <span>Snippet</span>
          </button>
          <span className="text-slate-300">›</span>
          <button
            onClick={() => setStep(3)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors ${
              step === 3
                ? "bg-sky-50 text-sky-700 font-medium border border-sky-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span className="h-4 w-4 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-semibold">3</span>
            <span>Verify</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto w-full my-8">
        {/* STEP 1: Add Website Domain */}
        {step === 1 && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs space-y-6">
            <div>
              <h1 className="text-2xl font-normal text-slate-900 tracking-tight">
                Add your website domain
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Enter your website URL to register telemetry listeners.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Domain Name
                </label>
                <input
                  type="text"
                  required
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="e.g. myportfolio.com"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Display Label
                </label>
                <input
                  type="text"
                  value={siteLabel}
                  onChange={(e) => setSiteLabel(e.target.value)}
                  placeholder="e.g. Personal Portfolio"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Reporting Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-sky-500 focus:outline-none"
                >
                  <option value="Europe/London">Europe/London (UTC+0)</option>
                  <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                  <option value="America/New_York">America/New_York (UTC-5)</option>
                  <option value="America/Los_Angeles">America/Los_Angeles (UTC-8)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-full bg-sky-600 px-6 py-2 text-xs font-medium text-white hover:bg-sky-500 transition-colors shadow-xs"
              >
                Continue to Snippet
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Embed Snippet (Matching Screen 2 from reference) */}
        {step === 2 && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs space-y-6">
            <div>
              <h1 className="text-2xl font-normal text-slate-900 tracking-tight">
                Set up your website tracking
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Insert this lightweight script into the <code>&lt;head&gt;</code> of <strong>{domain}</strong>.
              </p>
            </div>

            {/* Dark Snippet Code Box */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-sky-300 relative shadow-xs">
              <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed pr-24">
                {snippetCode}
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-500 transition-colors shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-300" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy Snippet
                  </>
                )}
              </button>
            </div>

            {/* 3 Framework Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs space-y-1">
                <span className="font-semibold text-slate-900 block">Standard HTML</span>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Paste script directly before <code>&lt;/head&gt;</code> in your index.html.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs space-y-1">
                <span className="font-semibold text-slate-900 block">Next.js App</span>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Use <code>&lt;Script strategy=&quot;afterInteractive&quot; /&gt;</code> in root layout.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs space-y-1">
                <span className="font-semibold text-slate-900 block">WordPress</span>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Insert via Header & Footer Code plugin or child theme header.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="rounded-full bg-sky-600 px-6 py-2 text-xs font-medium text-white hover:bg-sky-500 transition-colors shadow-xs"
              >
                Verify Connection →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Verification Radar (Matching Screen 2/3) */}
        {step === 3 && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs text-center space-y-6">
            {status === "waiting" ? (
              <>
                <div className="relative mx-auto my-4 flex h-24 w-24 items-center justify-center">
                  <div className="absolute h-full w-full rounded-full bg-sky-200/40 animate-ping" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-white shadow-xs">
                    <Radio className="h-6 w-6 animate-pulse" />
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-normal text-slate-900 tracking-tight">
                    Listening for first pageview...
                  </h2>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    Open <span className="font-medium text-slate-800">{domain}</span> in another browser tab, or simulate a live event below.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSimulateFirstEvent}
                    className="w-full sm:w-auto rounded-full bg-sky-600 px-5 py-2 text-xs font-medium text-white hover:bg-sky-500 transition-colors shadow-xs"
                  >
                    Simulate First Visitor Ping
                  </button>
                  <Link
                    href="/dashboard"
                    className="w-full sm:w-auto rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Skip to Dashboard
                  </Link>
                </div>
              </>
            ) : (
              <div className="space-y-4 py-2">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-normal text-slate-900 tracking-tight">
                    First Pageview Received!
                  </h2>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    Tracking is active on <span className="font-medium text-slate-800">{domain}</span>. You are ready to view your dashboard.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="rounded-full bg-sky-600 px-8 py-2.5 text-xs font-medium text-white hover:bg-sky-500 transition-colors shadow-xs"
                  >
                    Open Nova Dashboard →
                  </button>
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
          Need assistance? Read the tracking guide or reach out to support.
        </span>
      </footer>
    </div>
  );
}
