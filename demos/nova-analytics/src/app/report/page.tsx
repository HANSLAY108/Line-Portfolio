"use client";

import React, { useState, useEffect, Suspense } from "react";
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
  ArrowRight,
  Zap,
  Activity,
  Layers,
  ChevronRight,
  Server,
  Lock,
} from "lucide-react";
import type { AuditResult, AuditIssue } from "../../lib/audit/engine";

function ReportContent() {
  const searchParams = useSearchParams();
  const domainParam = searchParams.get("domain") || "linemorelle.dev";

  const [activeFilter, setActiveFilter] = useState<"All" | "Security" | "Performance" | "SEO" | "Accessibility">("All");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [auditData, setAuditData] = useState<AuditResult | null>(null);
  const [progressStep, setProgressStep] = useState("Resolving DNS & SSRF validation...");

  const fetchAudit = async (targetDomain: string) => {
    setLoading(true);
    setErrorMsg(null);
    setProgressStep("Inspecting SSL certificate & response headers...");

    const stepTimer = setTimeout(() => {
      setProgressStep("Executing Lighthouse Core Web Vitals diagnostics...");
    }, 1500);

    const stepTimer2 = setTimeout(() => {
      setProgressStep("Detecting tech stack and indexing issues...");
    }, 3200);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetDomain }),
      });

      clearTimeout(stepTimer);
      clearTimeout(stepTimer2);

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Audit scan failed.");
      }

      setAuditData(data.audit);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred during the audit.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudit(domainParam);
  }, [domainParam]);

  const filteredIssues =
    auditData?.issues.filter((i) => (activeFilter === "All" ? true : i.category === activeFilter)) || [];

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
            <span className="font-bold text-slate-900">Live Audit Engine</span>
            <span className="text-slate-300">›</span>
            <span className="font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md font-semibold">
              {domainParam}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              disabled={loading || !auditData}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-colors shadow-xs"
            >
              <Download className="h-3.5 w-3.5 text-slate-400" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={() => fetchAudit(domainParam)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
            >
              <RotateCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>{loading ? "Scanning..." : "Re-scan Site"}</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* ================= STATE 1: SCANNING IN PROGRESS ANIMATION ================= */}
          {loading && (
            <div className="rounded-3xl border border-slate-200/90 bg-white p-12 text-center shadow-xl shadow-blue-900/5 space-y-6 animate-fade-scale">
              <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
                <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                <Globe className="h-10 w-10 text-blue-600 animate-pulse" />
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Running Live Audit on {domainParam}
                </h2>
                <p className="text-xs text-blue-600 font-mono font-medium animate-pulse">
                  {progressStep}
                </p>
                <p className="text-xs text-slate-400">
                  Inspecting PageSpeed scores, security headers, SSL certificates, and detecting technologies...
                </p>
              </div>

              {/* Progress visual bar */}
              <div className="w-full max-w-sm mx-auto h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-2/3 animate-pulse" />
              </div>
            </div>
          )}

          {/* ================= STATE 2: ERROR STATE ================= */}
          {!loading && errorMsg && (
            <div className="rounded-3xl border border-rose-200 bg-rose-50/70 p-8 text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="text-base font-bold text-slate-900">Audit Request Blocked or Failed</h3>
                <p className="text-xs text-rose-700 mt-1">{errorMsg}</p>
              </div>
              <button
                onClick={() => fetchAudit(domainParam)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 shadow-sm"
              >
                <RotateCw className="h-3.5 w-3.5" />
                <span>Retry Scan</span>
              </button>
            </div>
          )}

          {/* ================= STATE 3: LIVE RESULTS REVEAL ANIMATION ================= */}
          {!loading && auditData && (
            <div className="space-y-6 animate-fade-scale">
              {/* Header Title Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Audit Report
                  </h1>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span className="flex items-center gap-1 font-mono text-slate-700 font-semibold">
                      <Globe className="h-3.5 w-3.5 text-blue-600" />
                      {auditData.targetUrl}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-400" />
                      {new Date(auditData.scannedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-xs font-bold text-emerald-800 self-start sm:self-auto shadow-xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Passed {auditData.passedChecks} of {auditData.totalChecks} checks</span>
                </div>
              </div>

              {/* 4 Real Score Cards (Circle Gauges) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Performance */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col items-center text-center hover:shadow-md transition-all">
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
                        className={`${
                          auditData.performanceScore >= 90
                            ? "text-emerald-500"
                            : auditData.performanceScore >= 70
                            ? "text-amber-500"
                            : "text-rose-500"
                        } transition-all duration-1000`}
                        strokeDasharray={`${auditData.performanceScore}, 100`}
                        strokeWidth="3"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-2xl font-extrabold text-slate-900">{auditData.performanceScore}</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-600 font-semibold mt-2">
                    {auditData.metrics.fcp ? `FCP ${auditData.metrics.fcp}` : `${auditData.metrics.responseTimeMs}ms TTFB`}
                  </span>
                </div>

                {/* SEO */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col items-center text-center hover:shadow-md transition-all">
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
                        className="text-blue-600 transition-all duration-1000"
                        strokeDasharray={`${auditData.seoScore}, 100`}
                        strokeWidth="3"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-2xl font-extrabold text-slate-900">{auditData.seoScore}</span>
                    </div>
                  </div>
                  <span className="text-xs text-blue-600 font-semibold mt-2">Meta & Headings</span>
                </div>

                {/* Security */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col items-center text-center hover:shadow-md transition-all">
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
                        className={`${
                          auditData.securityScore >= 80
                            ? "text-emerald-500"
                            : auditData.securityScore >= 60
                            ? "text-amber-500"
                            : "text-rose-500"
                        } transition-all duration-1000`}
                        strokeDasharray={`${auditData.securityScore}, 100`}
                        strokeWidth="3"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-2xl font-extrabold text-slate-900">{auditData.securityScore}</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-600 font-semibold mt-2">Headers & SSL</span>
                </div>

                {/* Accessibility */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col items-center text-center hover:shadow-md transition-all">
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
                        className="text-emerald-500 transition-all duration-1000"
                        strokeDasharray={`${auditData.accessibilityScore}, 100`}
                        strokeWidth="3"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-2xl font-extrabold text-slate-900">{auditData.accessibilityScore}</span>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-600 font-semibold mt-2">WCAG AA Standard</span>
                </div>
              </div>

              {/* Two Columns: Prioritized Real Issues (Left) + Tech & SSL (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Real Issues List */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h2 className="text-base font-bold text-slate-900">
                      Detected Issues & Remediation ({filteredIssues.length})
                    </h2>
                    <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 text-xs font-semibold text-slate-600">
                      {(["All", "Security", "Performance", "SEO", "Accessibility"] as const).map((tab) => (
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
                    {filteredIssues.length === 0 ? (
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-8 text-center space-y-2">
                        <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                        <h3 className="text-sm font-bold text-slate-900">No critical issues detected in this category!</h3>
                        <p className="text-xs text-slate-500">Your web properties adhere to best practices.</p>
                      </div>
                    ) : (
                      filteredIssues.map((issue, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-2.5 hover:border-blue-300 transition-colors"
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
                            <p className="text-slate-500 font-mono text-[11px] leading-relaxed">
                              {issue.recommendation}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Right Column: Real Detected Tech & Server Diagnostics */}
                <div className="space-y-6">
                  {/* Detected Technologies */}
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Cpu className="h-4 w-4" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">Detected Technologies</h3>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      {auditData.detectedTechnologies.length === 0 ? (
                        <p className="text-slate-400 py-2">No explicit framework signatures identified.</p>
                      ) : (
                        auditData.detectedTechnologies.map((tech, idx) => (
                          <div key={idx} className="flex justify-between items-center py-1.5 border-b border-slate-50 last:border-0">
                            <span className="text-slate-500">{tech.category}</span>
                            <strong className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded font-mono font-semibold">
                              {tech.name}
                            </strong>
                          </div>
                        ))
                      )}
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
                        <span className={`font-semibold flex items-center gap-1 ${auditData.sslValid ? "text-emerald-600" : "text-rose-600"}`}>
                          {auditData.sslValid ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                          {auditData.sslValid ? "TLS / HTTPS Encrypted" : "Insecure HTTP"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Issuer</span>
                        <span className="font-semibold text-slate-800">{auditData.sslIssuer}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Page Weight</span>
                        <span className="font-semibold text-slate-800 font-mono">{auditData.metrics.pageSizeKb} KB</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Server Response (TTFB)</span>
                        <span className="font-semibold text-slate-800 font-mono">{auditData.metrics.responseTimeMs} ms</span>
                      </div>
                    </div>
                  </div>

                  {/* Return to Dashboard */}
                  <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-5 space-y-2.5 text-xs text-blue-900">
                    <div className="font-bold flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-blue-600" />
                      <span>Ready to track visitors?</span>
                    </div>
                    <p className="text-blue-700 leading-relaxed">
                      Now that your audit is complete, install the lightweight snippet on {auditData.domain} to see live visitor analytics.
                    </p>
                    <Link
                      href="/onboarding"
                      className="inline-flex items-center gap-1 pt-1 font-bold text-blue-700 hover:text-blue-800 underline"
                    >
                      <span>Install Tracking Snippet</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
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
            <span>Initializing Nova Live Audit Engine...</span>
          </div>
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}
