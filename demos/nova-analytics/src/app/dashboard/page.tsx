"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
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
  Edit2,
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
} from "lucide-react";
import AnalyticsChart, { ChartDataPoint } from "../../components/AnalyticsChart";
import MetricCard from "../../components/MetricCard";
import BreakdownCard, { BreakdownItem } from "../../components/BreakdownCard";

// Sample Analytics Data
const SAMPLE_CHART_7D: ChartDataPoint[] = [
  { date: "Oct 9", visitors: 3200, pageviews: 11200 },
  { date: "Oct 10", visitors: 3450, pageviews: 12400 },
  { date: "Oct 11", visitors: 3100, pageviews: 10800 },
  { date: "Oct 12", visitors: 3890, pageviews: 14100 },
  { date: "Oct 13", visitors: 4250, pageviews: 15900 },
  { date: "Oct 14", visitors: 3980, pageviews: 14600 },
  { date: "Oct 15", visitors: 4420, pageviews: 16800 },
];

const SAMPLE_TOP_PAGES: BreakdownItem[] = [
  { label: "/", sublabel: "Home & Portfolio", count: 12450, percentage: 41 },
  { label: "/projects", sublabel: "Case Studies & Work", count: 6890, percentage: 23 },
  { label: "/blog/system-architecture", sublabel: "Blog Post", count: 4120, percentage: 14 },
  { label: "/about", sublabel: "Biography & Background", count: 3210, percentage: 11 },
  { label: "/contact", sublabel: "Contact & Inquiries", count: 2150, percentage: 7 },
  { label: "/resume", sublabel: "PDF Resume View", count: 1200, percentage: 4 },
];

const SAMPLE_REFERRERS: BreakdownItem[] = [
  { label: "Direct / None", count: 11200, percentage: 37, icon: "🔗" },
  { label: "Google Search", count: 8400, percentage: 28, icon: "🔍" },
  { label: "Twitter / X", count: 4950, percentage: 16, icon: "🐦" },
  { label: "GitHub Repositories", count: 3100, percentage: 10, icon: "🐙" },
  { label: "LinkedIn Feed", count: 1850, percentage: 6, icon: "💼" },
  { label: "ProductHunt", count: 920, percentage: 3, icon: "🚀" },
];

const SAMPLE_COUNTRIES: BreakdownItem[] = [
  { label: "United States", count: 9800, percentage: 33, icon: "🇺🇸" },
  { label: "United Kingdom", count: 4600, percentage: 15, icon: "🇬🇧" },
  { label: "Germany", count: 3700, percentage: 12, icon: "🇩🇪" },
  { label: "France", count: 3400, percentage: 11, icon: "🇫🇷" },
  { label: "Japan", count: 2100, percentage: 7, icon: "🇯🇵" },
  { label: "Canada", count: 1950, percentage: 6, icon: "🇨🇦" },
];

const SAMPLE_DEVICES: BreakdownItem[] = [
  { label: "Desktop", count: 19450, percentage: 64, icon: "💻" },
  { label: "Mobile", count: 9420, percentage: 31, icon: "📱" },
  { label: "Tablet", count: 1520, percentage: 5, icon: "📟" },
];

const SAMPLE_BROWSERS: BreakdownItem[] = [
  { label: "Chrome", count: 17200, percentage: 57, icon: "🌐" },
  { label: "Safari", count: 7400, percentage: 24, icon: "🧭" },
  { label: "Firefox", count: 3600, percentage: 12, icon: "🦊" },
  { label: "Edge", count: 2190, percentage: 7, icon: "🌀" },
];

interface RegisteredSite {
  id: string;
  domain: string;
  label: string;
  status: "Active tracking" | "Waiting for data";
  timezone: string;
  publicDashboard: boolean;
}

const INITIAL_SITES: RegisteredSite[] = [
  {
    id: "s1",
    domain: "myportfolio.com",
    label: "Line's Portfolio",
    status: "Active tracking",
    timezone: "Europe/London",
    publicDashboard: false,
  },
  {
    id: "s2",
    domain: "atellernoir.co",
    label: "Client Studio",
    status: "Active tracking",
    timezone: "America/New_York",
    publicDashboard: true,
  },
];

interface GoalItem {
  id: string;
  name: string;
  triggerType: "custom_event" | "page_path";
  triggerValue: string;
  conversions: number;
  rate: string;
  value: string;
}

const INITIAL_GOALS: GoalItem[] = [
  {
    id: "g1",
    name: "Portfolio Project Demo Click",
    triggerType: "custom_event",
    triggerValue: "demo_launched",
    conversions: 1840,
    rate: "22.4%",
    value: "$0.00",
  },
  {
    id: "g2",
    name: "Contact Form Inquiry Sent",
    triggerType: "custom_event",
    triggerValue: "contact_submitted",
    conversions: 342,
    rate: "4.2%",
    value: "$0.00",
  },
  {
    id: "g3",
    name: "Client Contract Signed",
    triggerType: "page_path",
    triggerValue: "/hire/confirmation",
    conversions: 48,
    rate: "0.6%",
    value: "$24,000.00",
  },
];

export default function DashboardPage() {
  // Navigation Sidebar State
  const [activeNav, setActiveNav] = useState<
    "Overview" | "Pages" | "Sources" | "Locations" | "Devices" | "Goals" | "Settings"
  >("Settings");

  // Settings Sub-tab State
  const [settingsTab, setSettingsTab] = useState<
    "general" | "snippet" | "profile" | "team" | "billing"
  >("general");

  // Site state
  const [sites, setSites] = useState<RegisteredSite[]>(INITIAL_SITES);
  const [activeSite, setActiveSite] = useState<string>("myportfolio.com");
  const [siteDropdownOpen, setSiteDropdownOpen] = useState(false);

  // Snippet copy state
  const [copied, setCopied] = useState(false);

  // Settings Toggles
  const [customDomainProxy, setCustomDomainProxy] = useState(false);
  const [excludeOwnVisits, setExcludeOwnVisits] = useState(true);
  const [respectDNT, setRespectDNT] = useState(true);

  // Goals
  const [goals, setGoals] = useState<GoalItem[]>(INITIAL_GOALS);
  const [newGoalModalOpen, setNewGoalModalOpen] = useState(false);
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalTrigger, setNewGoalTrigger] = useState("");

  // Add Site Modal
  const [addSiteModalOpen, setAddSiteModalOpen] = useState(false);
  const [newSiteDomain, setNewSiteDomain] = useState("");
  const [newSiteLabel, setNewSiteLabel] = useState("");
  const [newSiteTimezone, setNewSiteTimezone] = useState("Europe/Paris");

  const snippetCode = `<!-- Nova Analytics lightweight Privacy Script -->\n<script defer data-domain="${activeSite}" src="https://cdn.nova-analytics.io/js/telemetry.js"></script>`;

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(snippetCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSiteDomain) return;
    const newS: RegisteredSite = {
      id: `s_${Date.now()}`,
      domain: newSiteDomain,
      label: newSiteLabel || newSiteDomain,
      status: "Active tracking",
      timezone: newSiteTimezone,
      publicDashboard: false,
    };
    setSites([...sites, newS]);
    setActiveSite(newSiteDomain);
    setNewSiteDomain("");
    setNewSiteLabel("");
    setAddSiteModalOpen(false);
  };

  const handleDeleteSite = (id: string) => {
    setSites(sites.filter((s) => s.id !== id));
  };

  const navItems = [
    { name: "Overview", icon: LayoutGrid },
    { name: "Pages", icon: FileText },
    { name: "Sources", icon: Share2 },
    { name: "Locations", icon: Globe },
    { name: "Devices", icon: Monitor },
    { name: "Goals", icon: Flag },
    { name: "Settings", icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col md:flex-row antialiased">
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-full md:w-64 border-r border-slate-200/80 bg-white flex flex-col justify-between shrink-0">
        <div>
          {/* Brand & Site Switcher */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-700 text-white font-semibold text-sm shadow-xs">
                N
              </div>
              <div className="flex-1 min-w-0">
                <Link href="/" className="text-sm font-semibold text-slate-900 block hover:text-sky-600 transition-colors">
                  Nova Analytics
                </Link>
                <div className="relative mt-0.5">
                  <button
                    onClick={() => setSiteDropdownOpen(!siteDropdownOpen)}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors group"
                  >
                    <span className="truncate max-w-[120px]">{activeSite}</span>
                    <span className="text-[10px] text-slate-400 group-hover:text-slate-600">⇅</span>
                  </button>

                  {siteDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 rounded-xl border border-sky-100 bg-white p-1 shadow-lg z-50 text-xs">
                      <div className="px-2 py-1 text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                        Select Site
                      </div>
                      {sites.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            setActiveSite(s.domain);
                            setSiteDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                            activeSite === s.domain ? "bg-sky-50 text-sky-700 font-medium" : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span className="truncate">{s.domain}</span>
                          {activeSite === s.domain && <Check className="h-3 w-3 text-sky-600" />}
                        </button>
                      ))}
                      <div className="my-1 border-t border-slate-100" />
                      <button
                        onClick={() => {
                          setSiteDropdownOpen(false);
                          setAddSiteModalOpen(true);
                        }}
                        className="w-full text-left px-2 py-1.5 rounded-lg text-sky-600 hover:bg-sky-50 font-medium flex items-center gap-1.5"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add Website
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-sky-50/80 text-sky-800 border-l-2 border-sky-600 font-semibold shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-sky-600" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom: Pro Tier & Support */}
        <div className="p-3 border-t border-slate-100 space-y-3">
          {/* Pro Tier Widget */}
          <div className="rounded-xl border border-sky-100 bg-sky-50/40 p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                PRO TIER
              </span>
              <span className="rounded-full bg-sky-100 px-2 py-0.2 text-[10px] font-medium text-sky-700">
                Active
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight mb-2">
              34% of 100k views used this month.
            </p>
            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mb-2.5">
              <div className="h-full bg-sky-500 rounded-full w-[34%]" />
            </div>
            <button className="w-full rounded-lg border border-slate-200 bg-white py-1.5 text-[11px] font-medium text-slate-700 hover:border-sky-300 hover:text-sky-700 transition-colors shadow-xs">
              Upgrade Plan
            </button>
          </div>

          {/* Links */}
          <div className="space-y-1 pt-1 text-xs text-slate-500">
            <a href="#" className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:text-slate-800 transition-colors">
              <BookOpen className="h-3.5 w-3.5 text-slate-400" />
              <span>Documentation</span>
            </a>
            <a href="#" className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:text-slate-800 transition-colors">
              <Headphones className="h-3.5 w-3.5 text-slate-400" />
              <span>Support</span>
            </a>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-slate-200/80 bg-white px-6 flex items-center justify-between gap-4 shrink-0">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Dashboard</span>
            <span className="text-slate-300">›</span>
            <span className="font-semibold text-slate-800">{activeNav}</span>
          </div>

          {/* Search Bar & Actions */}
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search settings, domains, keys..."
                className="w-64 rounded-full border border-slate-200 bg-slate-50/60 pl-9 pr-3.5 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <button className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-xs">
              <BookOpen className="h-3.5 w-3.5 text-slate-400" />
              Docs
            </button>

            <button className="rounded-full p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-sky-500" />
            </button>

            <button className="rounded-full p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600">
              <SlidersHorizontal className="h-4 w-4" />
            </button>

            <div className="h-5 w-px bg-slate-200 mx-1" />

            {/* User Profile */}
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-sky-600 to-sky-400 text-white flex items-center justify-center text-xs font-medium">
                ER
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-medium text-slate-800 leading-tight">Elena Rostova</div>
                <div className="text-[10px] text-slate-400">Owner</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Workspace Body */}
        <main className="flex-1 p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {/* ================= VIEW: SETTINGS (Exact replica of user screenshot in blue) ================= */}
          {activeNav === "Settings" && (
            <div className="space-y-6">
              {/* Page Title */}
              <div>
                <h1 className="text-2xl font-normal text-slate-900 tracking-tight">
                  Workspace Preferences
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Configure your privacy-preserving web analytics, active domains, script embeds, and team access permissions.
                </p>
              </div>

              {/* Horizontal Tabs with Icons */}
              <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-medium text-slate-500 overflow-x-auto pb-px">
                <button
                  onClick={() => setSettingsTab("general")}
                  className={`flex items-center gap-2 pb-2.5 transition-colors whitespace-nowrap ${
                    settingsTab === "general"
                      ? "border-b-2 border-sky-600 text-sky-800 font-semibold"
                      : "hover:text-slate-800"
                  }`}
                >
                  <Globe className="h-3.5 w-3.5 text-sky-600" />
                  General & Sites
                </button>
                <button
                  onClick={() => setSettingsTab("snippet")}
                  className={`flex items-center gap-2 pb-2.5 transition-colors whitespace-nowrap ${
                    settingsTab === "snippet"
                      ? "border-b-2 border-sky-600 text-sky-800 font-semibold"
                      : "hover:text-slate-800"
                  }`}
                >
                  <Code2 className="h-3.5 w-3.5" />
                  Tracking Snippet
                </button>
                <button
                  onClick={() => setSettingsTab("profile")}
                  className={`flex items-center gap-2 pb-2.5 transition-colors whitespace-nowrap ${
                    settingsTab === "profile"
                      ? "border-b-2 border-sky-600 text-sky-800 font-semibold"
                      : "hover:text-slate-800"
                  }`}
                >
                  <User className="h-3.5 w-3.5" />
                  Profile
                </button>
                <button
                  onClick={() => setSettingsTab("team")}
                  className={`flex items-center gap-2 pb-2.5 transition-colors whitespace-nowrap ${
                    settingsTab === "team"
                      ? "border-b-2 border-sky-600 text-sky-800 font-semibold"
                      : "hover:text-slate-800"
                  }`}
                >
                  <Users className="h-3.5 w-3.5" />
                  Team Members
                </button>
                <button
                  onClick={() => setSettingsTab("billing")}
                  className={`flex items-center gap-2 pb-2.5 transition-colors whitespace-nowrap ${
                    settingsTab === "billing"
                      ? "border-b-2 border-sky-600 text-sky-800 font-semibold"
                      : "hover:text-slate-800"
                  }`}
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  Billing & Plans
                </button>
              </div>

              {/* TAB CONTENT: General & Sites */}
              {settingsTab === "general" && (
                <div className="space-y-6">
                  {/* Section 1: Registered Websites */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <h2 className="text-sm font-semibold text-slate-900">Registered Websites</h2>
                        <p className="text-xs text-slate-500">
                          Manage the domains and client websites receiving telemetry events without cookies.
                        </p>
                      </div>
                      <button
                        onClick={() => setAddSiteModalOpen(true)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:border-sky-300 hover:text-sky-700 shadow-xs self-start sm:self-auto transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                        Add Another Website
                      </button>
                    </div>

                    {/* Site Cards */}
                    <div className="space-y-3">
                      {sites.map((site) => (
                        <div
                          key={site.id}
                          className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-sky-200 transition-colors"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 shrink-0">
                              <AppWindow className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-semibold text-slate-900">{site.domain}</span>
                                <span className="text-xs text-slate-400">({site.label})</span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-200/50">
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                  {site.status}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-1">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {site.timezone}
                                </span>
                                <span>•</span>
                                <span>
                                  Public Dashboard: <strong className="font-medium text-slate-600">{site.publicDashboard ? "On" : "Off"}</strong>
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            {site.publicDashboard && (
                              <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-xs">
                                <Share2 className="h-3 w-3 text-slate-400" />
                                Share Link
                              </button>
                            )}
                            <button className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-xs">
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteSite(site.id)}
                              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:text-rose-600 hover:border-rose-200 transition-colors shadow-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 2: Embed Tracking Snippet */}
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 shrink-0">
                          <Code2 className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900">Embed Tracking Snippet</h3>
                          <p className="text-xs text-slate-500">
                            Insert this ultra-lightweight (&lt; 1KB), zero-cookie snippet into your site&apos;s <code>&lt;head&gt;</code> tag.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleCopySnippet}
                        className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-sky-500 transition-colors shadow-xs self-start sm:self-auto"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            Copy Snippet
                          </>
                        )}
                      </button>
                    </div>

                    {/* Script box with soft light blue tint */}
                    <div className="rounded-xl border border-sky-100 bg-[#F0F7FF]/50 p-4 font-mono text-xs text-slate-700 overflow-x-auto leading-relaxed">
                      <span className="text-slate-400 block mb-1">
                        &lt;!-- Nova Analytics lightweight Privacy Script --&gt;
                      </span>
                      <code>
                        &lt;script defer data-domain=&quot;{activeSite}&quot; src=&quot;https://cdn.nova-analytics.io/js/telemetry.js&quot;&gt;&lt;/script&gt;
                      </code>
                    </div>

                    {/* 3 Privacy & Proxy Toggles */}
                    <div className="space-y-4 pt-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Toggle 1 */}
                        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                          <div>
                            <div className="text-xs font-medium text-slate-800">Custom Domain Proxy</div>
                            <div className="text-[11px] text-slate-400">
                              Bypass aggressive ad-blockers with a reverse CNAME proxy.
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setCustomDomainProxy(!customDomainProxy)}
                            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                              customDomainProxy ? "bg-sky-600" : "bg-slate-300"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                                customDomainProxy ? "translate-x-4" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>

                        {/* Toggle 2 */}
                        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                          <div>
                            <div className="text-xs font-medium text-slate-800">Exclude own visits</div>
                            <div className="text-[11px] text-slate-400">
                              Sets an internal exclusion flag in your current browser.
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setExcludeOwnVisits(!excludeOwnVisits)}
                            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                              excludeOwnVisits ? "bg-sky-600" : "bg-slate-300"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                                excludeOwnVisits ? "translate-x-4" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Toggle 3 */}
                      <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                        <div>
                          <div className="text-xs font-medium text-slate-800">Respect Do Not Track (DNT)</div>
                          <div className="text-[11px] text-slate-400">
                            Automatically discards metrics from clients broadcasting the DNT or Global Privacy Control header.
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setRespectDNT(!respectDNT)}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                            respectDNT ? "bg-sky-600" : "bg-slate-300"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                              respectDNT ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other settings tabs fallback preview */}
              {settingsTab !== "general" && (
                <div className="rounded-2xl border border-slate-200/90 bg-white p-8 text-center text-xs text-slate-500">
                  <p>Configuration panel for <strong>{settingsTab}</strong> is active in workspace mode.</p>
                </div>
              )}
            </div>
          )}

          {/* ================= VIEW: OVERVIEW ================= */}
          {activeNav === "Overview" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-normal text-slate-900 tracking-tight">
                    Website Analytics Overview
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Real-time privacy-preserving telemetry for {activeSite}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 self-start sm:self-auto">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  18 active visitors right now
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                  title="Avg Duration"
                  value="2m 45s"
                  delta="+8.6%"
                  isPositive={true}
                  icon={Clock}
                />
              </div>

              {/* Main Chart */}
              <AnalyticsChart data={SAMPLE_CHART_7D} />

              {/* 2-column breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BreakdownCard
                  title="Top Visited Pages"
                  icon={FileText}
                  items={SAMPLE_TOP_PAGES}
                  metricName="Pageviews"
                />
                <BreakdownCard
                  title="Traffic Sources"
                  icon={Share2}
                  items={SAMPLE_REFERRERS}
                  metricName="Visitors"
                />
              </div>
            </div>
          )}

          {/* ================= VIEW: PAGES ================= */}
          {activeNav === "Pages" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-normal text-slate-900 tracking-tight">Pages & URL Traffic</h1>
                <p className="text-xs text-slate-500 mt-1">Detailed pageview performance across all paths on {activeSite}.</p>
              </div>
              <BreakdownCard
                title="All Tracked Pages"
                icon={FileText}
                items={SAMPLE_TOP_PAGES}
                metricName="Pageviews"
                maxDisplay={10}
              />
            </div>
          )}

          {/* ================= VIEW: SOURCES ================= */}
          {activeNav === "Sources" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-normal text-slate-900 tracking-tight">Referral Sources & Channels</h1>
                <p className="text-xs text-slate-500 mt-1">Discover where your audience is discovering your website.</p>
              </div>
              <BreakdownCard
                title="Referral Channels"
                icon={Share2}
                items={SAMPLE_REFERRERS}
                metricName="Visitors"
                maxDisplay={10}
              />
            </div>
          )}

          {/* ================= VIEW: LOCATIONS ================= */}
          {activeNav === "Locations" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-normal text-slate-900 tracking-tight">Geographic Audience</h1>
                <p className="text-xs text-slate-500 mt-1">Country-level visitor breakdown resolved anonymously without storing user IPs.</p>
              </div>
              <BreakdownCard
                title="Countries"
                icon={Globe}
                items={SAMPLE_COUNTRIES}
                metricName="Visitors"
                maxDisplay={10}
              />
            </div>
          )}

          {/* ================= VIEW: DEVICES ================= */}
          {activeNav === "Devices" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-normal text-slate-900 tracking-tight">Devices & Browsers</h1>
                <p className="text-xs text-slate-500 mt-1">Client platforms and screen resolutions from aggregated user-agent headers.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BreakdownCard
                  title="Device Type"
                  icon={Monitor}
                  items={SAMPLE_DEVICES}
                  metricName="Share"
                />
                <BreakdownCard
                  title="Web Browsers"
                  icon={Globe}
                  items={SAMPLE_BROWSERS}
                  metricName="Share"
                />
              </div>
            </div>
          )}

          {/* ================= VIEW: GOALS ================= */}
          {activeNav === "Goals" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-normal text-slate-900 tracking-tight">Conversion Goals</h1>
                  <p className="text-xs text-slate-500 mt-1">Track key business events, demo launches, and signup funnels.</p>
                </div>
                <button
                  onClick={() => setNewGoalModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-sky-500 transition-colors shadow-xs self-start sm:self-auto"
                >
                  <Plus className="h-3 w-3" />
                  Add Conversion Goal
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Goal Name</th>
                      <th className="py-3 px-4">Trigger</th>
                      <th className="py-3 px-4 text-right">Conversions</th>
                      <th className="py-3 px-4 text-right">Rate</th>
                      <th className="py-3 px-4 text-right">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {goals.map((g) => (
                      <tr key={g.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4 font-medium text-slate-800 flex items-center gap-2">
                          <Flag className="h-3.5 w-3.5 text-sky-600" />
                          <span>{g.name}</span>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                          {g.triggerType === "custom_event" ? "event:" : "page:"} {g.triggerValue}
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-slate-800">
                          {g.conversions.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-emerald-600">
                          {g.rate}
                        </td>
                        <td className="py-3 px-4 text-right text-slate-500">{g.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ================= MODAL: Add Another Website ================= */}
      {addSiteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Add Another Website</h3>
              <p className="text-xs text-slate-500">Register a new domain to collect privacy-first analytics.</p>
            </div>
            <form onSubmit={handleAddSite} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Domain Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. app.myproject.com"
                  value={newSiteDomain}
                  onChange={(e) => setNewSiteDomain(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-sky-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Display Label</label>
                <input
                  type="text"
                  placeholder="e.g. Client Web App"
                  value={newSiteLabel}
                  onChange={(e) => setNewSiteLabel(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-sky-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Reporting Timezone</label>
                <select
                  value={newSiteTimezone}
                  onChange={(e) => setNewSiteTimezone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-sky-500 focus:outline-none"
                >
                  <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                  <option value="Europe/London">Europe/London (UTC+0)</option>
                  <option value="America/New_York">America/New_York (UTC-5)</option>
                  <option value="America/Los_Angeles">America/Los_Angeles (UTC-8)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddSiteModalOpen(false)}
                  className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-sky-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-sky-500 shadow-xs"
                >
                  Save Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: Add Conversion Goal ================= */}
      {newGoalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Add Conversion Goal</h3>
              <p className="text-xs text-slate-500">Track a custom event or target URL path.</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newGoalName || !newGoalTrigger) return;
                setGoals([
                  ...goals,
                  {
                    id: `g_${Date.now()}`,
                    name: newGoalName,
                    triggerType: "custom_event",
                    triggerValue: newGoalTrigger,
                    conversions: 0,
                    rate: "0.0%",
                    value: "$0.00",
                  },
                ]);
                setNewGoalName("");
                setNewGoalTrigger("");
                setNewGoalModalOpen(false);
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Goal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Newsletter Subscribed"
                  value={newGoalName}
                  onChange={(e) => setNewGoalName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-sky-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Event Key</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. newsletter_signup"
                  value={newGoalTrigger}
                  onChange={(e) => setNewGoalTrigger(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono text-slate-800 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewGoalModalOpen(false)}
                  className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-sky-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-sky-500 shadow-xs"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
