"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  BarChart3,
  LayoutGrid,
  FileCheck,
  Globe,
  Settings,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCw,
  Download,
  Cpu,
  Sparkles,
  Info,
  Clock,
} from "lucide-react";

interface AuditIssue {
  id: string;
  category: "Performance" | "Security" | "SEO" | "Accessibility";
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  impact: string;
  recommendation: string;
}

const SAMPLE_ISSUES: AuditIssue[] = [
  {
    id: "i1",
    category: "Security",
    severity: "high",
    title: "Missing Content Security Policy (CSP)",
    description: "The server response header does not include Content-Security-Policy, exposing your users to potential cross-site scripting (XSS) attacks.",
    impact: "High risk of malicious script injection and data extraction.",
    recommendation: "Define a Content-Security-Policy header restricting trusted script sources.",
  },
  {
    id: "i2",
    category: "Security",
    severity: "medium",
    title: "HSTS Header Missing Preload",
    description: "Strict-Transport-Security header is present but lacks the 'preload' directive required for browser preloading inclusion lists.",
    impact: "Initial HTTP request before redirection could be intercepted by a man-in-the-middle.",
    recommendation: "Add max-age=63072000; includeSubDomains; preload to your HSTS response header.",
  },
  {
    id: "i3",
    category: "SEO",
    severity: "medium",
    title: "Missing Open Graph Image Tag",
    description: "Page lacks an og:image meta tag, resulting in blank or generic card previews when shared on X, LinkedIn, or Slack.",
    impact: "Reduced click-through rates from social platforms and search engines.",
    recommendation: "Add <meta property=\"og:image\" content=\"https://...\" /> to the HTML <head>.",
  },
  {
    id: "i4",
    category: "Performance",
    severity: "low",
    title: "Serve Images in Next-Gen Formats",
    description: "Detected 3 PNG images that could be converted to WebP or AVIF for an estimated savings of 142 KB.",
    impact: "Slower Largest Contentful Paint (LCP) on mobile network connections.",
    recommendation: "Use modern image formats or Next.js Image component optimization.",
  },
  {
    id: "i5",
    category: "Accessibility",
    severity: "low",
    title: "Insufficient Heading Order Hierarchy",
    description: "An <h4> element follows an <h2> without an intermediate <h3> tag in the portfolio breakdown section.",
    impact: "Screen reader users experience irregular navigation cues.",
    recommendation: "Ensure headings follow sequential numeric levels (h1 -> h2 -> h3).",
  },
];

function ReportContent() {
  const searchParams = useSearchParams();
  const domainParam = searchParams.get("domain") || "linemorelle.dev";

  const [activeFilter, setActiveFilter] = useState<"All" | "Security" | "Performance" | "SEO">("All");
  const [scanning, setScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState("Just now");

  const handleRescan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setLastScanned("Just now");
    }, 1200);
  };

  const filteredIssues =
    activeFilter === "All"
      ? SAMPLE_ISSUES
      : SAMPLE_ISSUES.filter((i) => i.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col md:flex-row antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-60 border-r border-slate-200/90 bg-white flex flex-col justify-between shrink-0">
        <div>
          <div className="p-4 border-b border-slate-100 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm">
              <BarChart3 className="h-4 w-4" />
            </div>
            <Link href="/" className="text-sm font-bold tracking-tight text-slate-900 hover:text-blue-600">
              Nova<span className="text-blue-600">Analytics</span>
            </Link>
          </div>

          <nav className="p-3 space-y-1">
            <Link
              href="/dashboard"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <LayoutGrid className="h-4 w-4 text-slate-400" />
              <span>Dashboard</span>
            </Link>
            <div className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-sm">
              <FileCheck className="h-4 w-4 text-white" />
              <span>Audit Report</span>
            </div>
            <Link
              href="/onboarding"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Globe className="h-4 w-4 text-slate-400" />
              <span>Sites</span>
            </Link>
            <Link
              href="/dashboard"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Settings className="h-4 w-4 text-slate-400" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              LM
            </div>
            <div className="text-left">
              <div className="font-semibold text-slate-800 leading-tight text-xs">Line Morelle</div>
              <div className="text-[10px] text-slate-400">Portfolio Owner</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Report Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200/90 bg-white px-6 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Analytics</span>
            <span className="text-slate-300">›</span>
            <span className="font-bold text-slate-900">Audit Report</span>
            <span className="text-slate-300">›</span>
            <span className="font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md font-semibold">
              {domainParam}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <Download className="h-3.5 w-3.5 text-slate-400" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={handleRescan}
              disabled={scanning}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
            >
              <RotateCw className={`h-3.5 w-3.5 ${scanning ? "animate-spin" : ""}`} />
              <span>{scanning ? "Scanning..." : "Re-scan Site"}</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Header Title Bar matching Audit Report Screenshot */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Audit Report
              </h1>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3 text-slate-400" />
                  https://{domainParam}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-slate-400" />
                  Last scan: {lastScanned}
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800 self-start sm:self-auto">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>Passed 28 out of 33 checks</span>
            </div>
          </div>

          {/* 4 Score Cards (Circle Gauges) matching Screenshot: Performance, SEO, Security, Accessibility */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Performance */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col items-center text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                Performance
              </span>
              <div className="relative flex h-20 w-20 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-500"
                    strokeDasharray="96, 100"
                    strokeWidth="3"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-extrabold text-slate-900">96</span>
                </div>
              </div>
              <span className="text-xs text-emerald-600 font-bold mt-2">Optimal Speed</span>
            </div>

            {/* SEO */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col items-center text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                SEO Score
              </span>
              <div className="relative flex h-20 w-20 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-600"
                    strokeDasharray="94, 100"
                    strokeWidth="3"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-extrabold text-slate-900">94</span>
                </div>
              </div>
              <span className="text-xs text-blue-600 font-bold mt-2">Crawling Ready</span>
            </div>

            {/* Security */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col items-center text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                Security
              </span>
              <div className="relative flex h-20 w-20 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-amber-500"
                    strokeDasharray="72, 100"
                    strokeWidth="3"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-extrabold text-slate-900">72</span>
                </div>
              </div>
              <span className="text-xs text-amber-500 font-bold mt-2">2 Warnings</span>
            </div>

            {/* Accessibility */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col items-center text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                Accessibility
              </span>
              <div className="relative flex h-20 w-20 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-500"
                    strokeDasharray="98, 100"
                    strokeWidth="3"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-extrabold text-slate-900">98</span>
                </div>
              </div>
              <span className="text-xs text-emerald-600 font-bold mt-2">WCAG AA Standard</span>
            </div>
          </div>

          {/* Two Columns: Issues List (Left) + Detected Technologies & SSL (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Prioritized Issues List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h2 className="text-base font-bold text-slate-900">
                  Audit Issues & Recommendations
                </h2>
                <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 text-xs font-semibold text-slate-600">
                  {(["All", "Security", "Performance", "SEO"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveFilter(tab)}
                      className={`rounded-lg px-2.5 py-1 transition-all ${
                        activeFilter === tab
                          ? "bg-white text-blue-600 shadow-xs"
                          : "hover:text-slate-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {filteredIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-2.5 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {issue.severity === "high" ? (
                          <div className="h-6 w-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                            <XCircle className="h-4 w-4" />
                          </div>
                        ) : issue.severity === "medium" ? (
                          <div className="h-6 w-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                            <AlertTriangle className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="h-6 w-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <Info className="h-4 w-4" />
                          </div>
                        )}
                        <h3 className="text-sm font-bold text-slate-900">{issue.title}</h3>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                        issue.severity === "high"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : issue.severity === "medium"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}>
                        {issue.severity}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pl-8">
                      {issue.description}
                    </p>

                    <div className="pl-8 pt-1 text-xs space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="text-slate-700 font-semibold flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                        <span>How to fix:</span>
                      </div>
                      <p className="text-slate-500 font-mono text-[11px]">
                        {issue.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Detected Tech, SSL & Server Diagnostics */}
            <div className="space-y-6">
              {/* Detected Technologies */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Detected Technologies</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                    <span className="text-slate-500">Framework</span>
                    <strong className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded font-mono">Next.js 16</strong>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                    <span className="text-slate-500">Styling</span>
                    <strong className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded font-mono">Tailwind CSS 4</strong>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                    <span className="text-slate-500">Hosting</span>
                    <strong className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded font-mono">Vercel Edge</strong>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                    <span className="text-slate-500">Analytics</span>
                    <strong className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded font-mono">Nova Privacy Telemetry</strong>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-slate-500">Database & Auth</span>
                    <strong className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded font-mono">Supabase RLS</strong>
                  </div>
                </div>
              </div>

              {/* SSL & Security Certificate */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">SSL & Security Certificate</h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Protocol</span>
                    <span className="font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      TLS 1.3 (HTTPS)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Issuer</span>
                    <span className="font-semibold text-slate-800">Let&apos;s Encrypt Authority</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Expiry</span>
                    <span className="font-semibold text-slate-800">In 78 days (Dec 2026)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Robots.txt & Sitemap</span>
                    <span className="font-semibold text-emerald-600">Valid & Indexable</span>
                  </div>
                </div>
              </div>

              {/* Callout Card */}
              <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-5 space-y-2.5 text-xs text-blue-900">
                <div className="font-bold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <span>Continuous Monitoring</span>
                </div>
                <p className="text-blue-700 leading-relaxed">
                  Automated background audits run every 24 hours to alert you on expired certificates, broken links, or performance drops.
                </p>
                <Link
                  href="/dashboard"
                  className="inline-block pt-1 font-bold text-blue-700 hover:text-blue-800 underline"
                >
                  Return to Dashboard →
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 text-xs text-slate-500 font-sans">
          <div className="flex items-center gap-2">
            <RotateCw className="h-4 w-4 animate-spin text-blue-600" />
            <span>Loading Audit Report...</span>
          </div>
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}
