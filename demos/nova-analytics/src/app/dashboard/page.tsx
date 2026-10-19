"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  LayoutGrid,
  FileText,
  Share2,
  Globe,
  Monitor,
  Flag,
  Settings,
  BookOpen,
  Headphones,
  Bell,
  SlidersHorizontal,
  Search,
  Plus,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  AppWindow,
  Code2,
  Trash2,
  Users,
  Eye,
  MousePointerClick,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  User,
  Radio,
  FileCheck,
  Download,
  AlertTriangle,
  RotateCw,
} from "lucide-react";
import AnalyticsChart, { ChartDataPoint } from "../../components/AnalyticsChart";
import SnippetModal from "../../components/SnippetModal";

// 7-day demo traffic data
const SAMPLE_CHART_7D: ChartDataPoint[] = [
  { date: "Oct 9", visitors: 3200, pageviews: 11200 },
  { date: "Oct 10", visitors: 3450, pageviews: 12400 },
  { date: "Oct 11", visitors: 3100, pageviews: 10800 },
  { date: "Oct 12", visitors: 3890, pageviews: 14100 },
  { date: "Oct 13", visitors: 4250, pageviews: 15900 },
  { date: "Oct 14", visitors: 3980, pageviews: 14600 },
  { date: "Oct 15", visitors: 4420, pageviews: 16800 },
];

interface RegisteredSite {
  id: string;
  domain: string;
  label: string;
  status: "Active tracking" | "Snippet not installed";
  timezone: string;
  hasSnippet: boolean;
  healthScore: number;
}

const INITIAL_SITES: RegisteredSite[] = [
  {
    id: "s1",
    domain: "linemorelle.dev",
    label: "Line's Portfolio",
    status: "Active tracking",
    timezone: "Europe/Paris",
    hasSnippet: true,
    healthScore: 87,
  },
  {
    id: "s2",
    domain: "demo-client.com",
    label: "Client Showcase",
    status: "Snippet not installed",
    timezone: "America/New_York",
    hasSnippet: false,
    healthScore: 92,
  },
];

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState<
    "Dashboard" | "Audit Report" | "Sites" | "Goals" | "Settings"
  >("Dashboard");

  const [sites, setSites] = useState<RegisteredSite[]>(INITIAL_SITES);
  const [activeSiteDomain, setActiveSiteDomain] = useState<string>("linemorelle.dev");
  const [siteDropdownOpen, setSiteDropdownOpen] = useState(false);
  const [snippetModalOpen, setSnippetModalOpen] = useState(false);
  const [addSiteModalOpen, setAddSiteModalOpen] = useState(false);

  // New site form state
  const [newDomain, setNewDomain] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newTimezone, setNewTimezone] = useState("Europe/Paris");

  // Settings State
  const [settingsTab, setSettingsTab] = useState<"general" | "snippet" | "privacy">("general");
  const [customDomainProxy, setCustomDomainProxy] = useState(false);
  const [excludeOwnVisits, setExcludeOwnVisits] = useState(true);
  const [respectDNT, setRespectDNT] = useState(true);

  // Find active site object
  const currentSite = sites.find((s) => s.domain === activeSiteDomain) || sites[0];

  const handleAddSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain.trim()) return;
    const cleanDomain = newDomain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    const newSite: RegisteredSite = {
      id: `site_${Date.now()}`,
      domain: cleanDomain,
      label: newLabel || cleanDomain,
      status: "Snippet not installed",
      timezone: newTimezone,
      hasSnippet: false,
      healthScore: 85,
    };
    setSites([...sites, newSite]);
    setActiveSiteDomain(cleanDomain);
    setNewDomain("");
    setNewLabel("");
    setAddSiteModalOpen(false);
  };

  const navItems = [
    { name: "Dashboard", icon: LayoutGrid },
    { name: "Audit Report", icon: FileCheck },
    { name: "Sites", icon: Globe },
    { name: "Goals", icon: Flag },
    { name: "Settings", icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col md:flex-row antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* ================= LEFT SIDEBAR (Matching reference exactly) ================= */}
      <aside className="w-full md:w-60 border-r border-slate-200/90 bg-white flex flex-col justify-between shrink-0">
        <div>
          {/* Brand */}
          <div className="p-4 border-b border-slate-100 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm">
              <BarChart3 className="h-4 w-4" />
            </div>
            <Link href="/" className="text-sm font-bold tracking-tight text-slate-900 hover:text-blue-600">
              Nova<span className="text-blue-600">Analytics</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveNav(item.name)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom: User & Support */}
        <div className="p-3 border-t border-slate-100 space-y-2">
          <Link
            href={`/report?domain=${encodeURIComponent(currentSite.domain)}`}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-blue-100 bg-blue-50/50 hover:bg-blue-50 text-xs font-semibold text-blue-700 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>Instant Audit</span>
            </span>
            <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
              {currentSite.healthScore}
            </span>
          </Link>

          <div className="flex items-center justify-between p-2 rounded-xl text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                LM
              </div>
              <div className="text-left">
                <div className="font-semibold text-slate-800 leading-tight">Line Morelle</div>
                <div className="text-[10px] text-slate-400">Owner</div>
              </div>
            </div>
            <Settings className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer" onClick={() => setActiveNav("Settings")} />
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar with Site Selector & Live Telemetry pill */}
        <header className="h-16 border-b border-slate-200/90 bg-white px-6 flex items-center justify-between gap-4 shrink-0">
          {/* Site Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSiteDropdownOpen(!siteDropdownOpen)}
              className="flex items-center gap-2.5 py-1.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-xs font-semibold text-slate-800 transition-colors shadow-xs"
            >
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{currentSite.domain}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {siteDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-30 space-y-1">
                <div className="px-2 py-1 text-[10px] uppercase font-bold text-slate-400">
                  Select Domain
                </div>
                {sites.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setActiveSiteDomain(s.domain);
                      setSiteDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-colors ${
                      s.domain === activeSiteDomain
                        ? "bg-blue-50 font-bold text-blue-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="truncate">{s.domain}</span>
                    {s.hasSnippet ? (
                      <span className="text-[10px] text-emerald-600 font-semibold">Active</span>
                    ) : (
                      <span className="text-[10px] text-amber-500 font-semibold">No snippet</span>
                    )}
                  </button>
                ))}
                <div className="border-t border-slate-100 pt-1 mt-1">
                  <button
                    onClick={() => {
                      setSiteDropdownOpen(false);
                      setAddSiteModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add New Website</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            <Link
              href={`/report?domain=${encodeURIComponent(currentSite.domain)}`}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/60 px-3.5 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100/60 transition-colors"
            >
              <FileCheck className="h-3.5 w-3.5" />
              <span>Full Audit Report</span>
            </Link>

            <button
              onClick={() => setSnippetModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Tracking Snippet</span>
            </button>

            <button
              onClick={() => setAddSiteModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Site</span>
            </button>
          </div>
        </header>

        {/* Content Views */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* ================= VIEW 1: DASHBOARD (Analytics Dashboard from Reference) ================= */}
          {activeNav === "Dashboard" && (
            <>
              {/* Site has snippet active: Display full numbers */}
              {currentSite.hasSnippet ? (
                <div className="space-y-6">
                  {/* Top Bar: Performance Overview & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        Performance Overview
                      </h1>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Real-time visitor telemetry for <strong className="text-slate-700">{currentSite.domain}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>18 Active Visitors</span>
                      </div>
                      <button
                        onClick={() => {
                          const csvContent = "data:text/csv;charset=utf-8,Date,Visitors,Pageviews\n" +
                            SAMPLE_CHART_7D.map(e => `${e.date},${e.visitors},${e.pageviews}`).join("\n");
                          const encodedUri = encodeURI(csvContent);
                          const link = document.createElement("a");
                          link.setAttribute("href", encodedUri);
                          link.setAttribute("download", `nova_${currentSite.domain}_traffic.csv`);
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
                      >
                        <Download className="h-3 w-3 text-slate-500" />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* 4 Stat Cards from Screenshot */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card 1: Total Visitors */}
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Total Visitors
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          +18.4%
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        84,210
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                        <span className="text-slate-500 font-medium">8,120</span> unique today
                      </div>
                    </div>

                    {/* Card 2: Avg Session Time */}
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Avg Session Time
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          +8.2%
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        04:12
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        +14s vs previous week
                      </div>
                    </div>

                    {/* Card 3: Bounce Rate */}
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Bounce Rate
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          -4.1%
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        32.4%
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Healthy reader engagement
                      </div>
                    </div>

                    {/* Card 4: Conversion Rate */}
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Conversion Rate
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          +1.8%
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        4.62%
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        342 goal completions
                      </div>
                    </div>
                  </div>

                  {/* Main Grid: Visitor Traffic Chart (Left) + Site Health Score (Right) */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <AnalyticsChart data={SAMPLE_CHART_7D} />
                    </div>

                    {/* Site Health Score Card (matching reference screenshot circle 87) */}
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <h3 className="text-sm font-bold text-slate-900">Site Health Score</h3>
                          <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                            Optimal
                          </span>
                        </div>

                        {/* Circular Score Badge */}
                        <div className="py-6 flex flex-col items-center justify-center">
                          <div className="relative flex h-28 w-28 items-center justify-center">
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
                                strokeDasharray={`${currentSite.healthScore}, 100`}
                                strokeWidth="3"
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                            </svg>
                            <div className="absolute text-center">
                              <span className="text-3xl font-extrabold text-slate-900">
                                {currentSite.healthScore}
                              </span>
                              <span className="text-[10px] text-slate-400 block -mt-1">/ 100</span>
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 mt-2 font-medium">
                            SEO, Speed & Security verified
                          </p>
                        </div>

                        <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
                          <div className="flex justify-between text-slate-600">
                            <span>Performance</span>
                            <strong className="text-emerald-600">98 / 100</strong>
                          </div>
                          <div className="flex justify-between text-slate-600">
                            <span>SEO Optimization</span>
                            <strong className="text-blue-600">94 / 100</strong>
                          </div>
                          <div className="flex justify-between text-slate-600">
                            <span>Security Headers</span>
                            <strong className="text-amber-500">82 / 100</strong>
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/report?domain=${encodeURIComponent(currentSite.domain)}`}
                        className="mt-4 w-full text-center rounded-xl bg-blue-50 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
                      >
                        Inspect Audit Report →
                      </Link>
                    </div>
                  </div>

                  {/* 2 Bottom Breakdown Cards matching screenshot */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Performing Pages */}
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-slate-900">Top Performing Pages</h3>
                        <span className="text-[11px] text-slate-400">Ranked by pageviews</span>
                      </div>
                      <div className="space-y-3">
                        {[
                          { path: "/", views: "37,440", rate: "44.4%" },
                          { path: "/projects", views: "18,720", rate: "22.2%" },
                          { path: "/blog/system-architecture", views: "14,150", rate: "16.8%" },
                          { path: "/about", views: "8,920", rate: "10.6%" },
                          { path: "/contact", views: "4,980", rate: "5.9%" },
                        ].map((p, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50 last:border-0">
                            <span className="font-mono text-slate-800 truncate pr-2">{p.path}</span>
                            <div className="flex items-center gap-4 shrink-0">
                              <span className="font-semibold text-slate-900">{p.views}</span>
                              <span className="text-[10px] text-slate-400 font-mono w-10 text-right">{p.rate}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Device Distribution & Top Referrers */}
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900">Device Distribution</h3>
                        <span className="text-[11px] text-slate-400">Aggregated client</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center py-2">
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-[10px] text-slate-400 uppercase font-medium">Desktop</span>
                          <div className="text-base font-bold text-slate-900 mt-0.5">64%</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-[10px] text-slate-400 uppercase font-medium">Mobile</span>
                          <div className="text-base font-bold text-slate-900 mt-0.5">31%</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-[10px] text-slate-400 uppercase font-medium">Tablet</span>
                          <div className="text-base font-bold text-slate-900 mt-0.5">5%</div>
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-bold text-slate-900">Top Referrers</h4>
                        </div>
                        <div className="space-y-2 text-xs">
                          {[
                            { source: "google.com", count: "34,120" },
                            { source: "direct / none", count: "26,400" },
                            { source: "github.com/line", count: "12,850" },
                            { source: "twitter.com", count: "6,410" },
                          ].map((ref, idx) => (
                            <div key={idx} className="flex justify-between items-center text-slate-700">
                              <span>{ref.source}</span>
                              <strong className="text-slate-900">{ref.count}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* ================= EMPTY STATE (Snippet Not Installed) ================= */
                <div className="space-y-6">
                  <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-slate-900">
                          Tracking snippet not installed for {currentSite.domain}
                        </h2>
                        <p className="text-xs text-slate-600 mt-0.5">
                          In strict accordance with privacy rules, visitor traffic is only measured after embedding the tracking snippet.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setSnippetModalOpen(true)}
                        className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-sm"
                      >
                        Install Snippet
                      </button>
                      <button
                        onClick={() => {
                          // Simulate install
                          setSites(
                            sites.map((s) =>
                              s.id === currentSite.id
                                ? { ...s, hasSnippet: true, status: "Active tracking" }
                                : s
                            )
                          );
                        }}
                        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Simulate Installation
                      </button>
                    </div>
                  </div>

                  {/* Even without snippet, Site Audit is ALWAYS available */}
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-8 text-center space-y-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                      <Sparkles className="h-7 w-7" />
                    </div>
                    <div className="max-w-md mx-auto">
                      <h3 className="text-lg font-bold text-slate-900">
                        Instant Link Audit is Ready
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Link audits do not require snippet installation. Scan performance, security headers, SSL, and SEO right now.
                      </p>
                    </div>
                    <Link
                      href={`/report?domain=${encodeURIComponent(currentSite.domain)}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 shadow-sm"
                    >
                      <FileCheck className="h-4 w-4" />
                      <span>View Instant Audit Report for {currentSite.domain}</span>
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ================= VIEW 2: AUDIT REPORT REDIRECT ================= */}
          {activeNav === "Audit Report" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Site Audit Engine</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Instant diagnostic for {currentSite.domain}</p>
                </div>
                <Link
                  href={`/report?domain=${encodeURIComponent(currentSite.domain)}`}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-sm inline-flex items-center gap-1.5"
                >
                  <span>Launch Detailed Scan View</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="p-8 rounded-2xl border border-slate-200/90 bg-white text-center space-y-3">
                <p className="text-xs text-slate-600">
                  Click below to open the dedicated report page with PageSpeed metrics, detected technologies, and prioritized issues.
                </p>
                <Link
                  href={`/report?domain=${encodeURIComponent(currentSite.domain)}`}
                  className="inline-block rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 shadow-sm"
                >
                  Open Audit Report for {currentSite.domain} →
                </Link>
              </div>
            </div>
          )}

          {/* ================= VIEW 3: SITES ================= */}
          {activeNav === "Sites" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Registered Websites</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Manage domains receiving telemetry events and link audits.</p>
                </div>
                <button
                  onClick={() => setAddSiteModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Website</span>
                </button>
              </div>

              <div className="space-y-3">
                {sites.map((site) => (
                  <div
                    key={site.id}
                    className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
                        <AppWindow className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{site.domain}</span>
                          <span className="text-xs text-slate-400">({site.label})</span>
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            site.hasSnippet
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${site.hasSnippet ? "bg-emerald-500" : "bg-amber-500"}`} />
                            {site.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-3">
                          <span>Timezone: {site.timezone}</span>
                          <span>•</span>
                          <span>Audit Health: <strong className="text-blue-600 font-semibold">{site.healthScore}/100</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <Link
                        href={`/report?domain=${encodeURIComponent(site.domain)}`}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
                      >
                        Audit
                      </Link>
                      <button
                        onClick={() => {
                          setActiveSiteDomain(site.domain);
                          setSnippetModalOpen(true);
                        }}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
                      >
                        Snippet
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= VIEW 4: GOALS ================= */}
          {activeNav === "Goals" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Conversion Goals</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Track key user actions, form submissions, and demo launches.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Goal Name</th>
                      <th className="py-3 px-4">Event Trigger</th>
                      <th className="py-3 px-4 text-right">Completions</th>
                      <th className="py-3 px-4 text-right">Conversion Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: "Portfolio Demo Click", event: "demo_launched", completions: 1840, rate: "22.4%" },
                      { name: "Contact Form Inquiry", event: "contact_submitted", completions: 342, rate: "4.2%" },
                      { name: "CV Downloaded", event: "cv_download", completions: 512, rate: "6.1%" },
                    ].map((g, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-800 flex items-center gap-2">
                          <Flag className="h-3.5 w-3.5 text-blue-600" />
                          <span>{g.name}</span>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{g.event}</td>
                        <td className="py-3 px-4 text-right font-semibold text-slate-900">{g.completions.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right font-bold text-emerald-600">{g.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= VIEW 5: SETTINGS ================= */}
          {activeNav === "Settings" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Workspace Preferences</h1>
                <p className="text-xs text-slate-500 mt-0.5">Configure tracking parameters, reverse proxy domains, and exclusions.</p>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
                <h2 className="text-sm font-bold text-slate-900">Privacy & Exclusion Rules</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                    <div>
                      <div className="text-xs font-semibold text-slate-800">Custom Domain Proxy</div>
                      <div className="text-[11px] text-slate-400">Bypass adblockers through a first-party CNAME proxy</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCustomDomainProxy(!customDomainProxy)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                        customDomainProxy ? "bg-blue-600" : "bg-slate-300"
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 ${
                        customDomainProxy ? "translate-x-4" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                    <div>
                      <div className="text-xs font-semibold text-slate-800">Exclude Own Visits</div>
                      <div className="text-[11px] text-slate-400">Sets an internal exclusion flag in this browser</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setExcludeOwnVisits(!excludeOwnVisits)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                        excludeOwnVisits ? "bg-blue-600" : "bg-slate-300"
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 ${
                        excludeOwnVisits ? "translate-x-4" : "translate-x-0"
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Snippet Modal */}
      <SnippetModal
        isOpen={snippetModalOpen}
        onClose={() => setSnippetModalOpen(false)}
        siteId={currentSite.id}
        domain={currentSite.domain}
      />

      {/* Add Site Modal */}
      {addSiteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Add Website</h3>
              <p className="text-xs text-slate-500">Register a new domain for link audits and visitor tracking.</p>
            </div>
            <form onSubmit={handleAddSite} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Website URL / Domain
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. atellernoir.co"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. Client Web App"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddSiteModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-sm"
                >
                  Save Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
