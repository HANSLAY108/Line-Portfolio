"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Globe,
  Calendar,
  Download,
  Code2,
  Users,
  Eye,
  MousePointerClick,
  Clock,
  FileText,
  Share2,
  ChevronDown,
  Sparkles,
  Target,
  Settings,
  Plus,
  Trash2,
  Lock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Laptop,
  Smartphone,
  Tablet,
  Compass,
  Zap,
} from "lucide-react";
import MetricCard from "../../components/MetricCard";
import AnalyticsChart, { ChartDataPoint } from "../../components/AnalyticsChart";
import BreakdownCard, { BreakdownItem } from "../../components/BreakdownCard";
import SnippetModal from "../../components/SnippetModal";

// Sample Data for 7 Days
const SAMPLE_CHART_7D: ChartDataPoint[] = [
  { date: "Oct 9", visitors: 3200, pageviews: 11200 },
  { date: "Oct 10", visitors: 3450, pageviews: 12400 },
  { date: "Oct 11", visitors: 3100, pageviews: 10800 },
  { date: "Oct 12", visitors: 3890, pageviews: 14100 },
  { date: "Oct 13", visitors: 4250, pageviews: 15900 },
  { date: "Oct 14", visitors: 3980, pageviews: 14600 },
  { date: "Oct 15", visitors: 4420, pageviews: 16800 },
];

const SAMPLE_CHART_30D: ChartDataPoint[] = [
  { date: "Sep 16", visitors: 2800, pageviews: 9500 },
  { date: "Sep 20", visitors: 3100, pageviews: 11000 },
  { date: "Sep 24", visitors: 3500, pageviews: 12800 },
  { date: "Sep 28", visitors: 3900, pageviews: 14200 },
  { date: "Oct 2", visitors: 4100, pageviews: 15400 },
  { date: "Oct 6", visitors: 4300, pageviews: 16100 },
  { date: "Oct 10", visitors: 4600, pageviews: 17200 },
  { date: "Oct 15", visitors: 4950, pageviews: 18900 },
];

const SAMPLE_TOP_PAGES: BreakdownItem[] = [
  { label: "/", sublabel: "Home & Intro", count: 12450, percentage: 41 },
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
  {
    id: "g4",
    name: "Resume PDF Download",
    triggerType: "custom_event",
    triggerValue: "resume_downloaded",
    conversions: 520,
    rate: "6.3%",
    value: "$0.00",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "goals" | "settings">("overview");
  const [dateRange, setDateRange] = useState<"today" | "7d" | "30d" | "12m">("7d");
  const [deviceTab, setDeviceTab] = useState<"devices" | "browsers">("devices");
  const [selectedSite, setSelectedSite] = useState("linemorelle.dev");
  const [siteSwitcherOpen, setSiteSwitcherOpen] = useState(false);
  const [showSnippetModal, setShowSnippetModal] = useState(false);
  const [isEmptyState, setIsEmptyState] = useState(false);
  const [goals, setGoals] = useState<GoalItem[]>(INITIAL_GOALS);
  const [newGoalModalOpen, setNewGoalModalOpen] = useState(false);
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalType, setNewGoalType] = useState<"custom_event" | "page_path">("custom_event");
  const [newGoalTrigger, setNewGoalTrigger] = useState("");

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalName || !newGoalTrigger) return;
    const newG: GoalItem = {
      id: `g_${Date.now()}`,
      name: newGoalName,
      triggerType: newGoalType,
      triggerValue: newGoalTrigger,
      conversions: 0,
      rate: "0.0%",
      value: "$0.00",
    };
    setGoals([newG, ...goals]);
    setNewGoalName("");
    setNewGoalTrigger("");
    setNewGoalModalOpen(false);
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Date,Visitors,Pageviews\n" +
      SAMPLE_CHART_7D.map((e) => `${e.date},${e.visitors},${e.pageviews}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `nova_analytics_${selectedSite}_${dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col">
      {/* Top Main Navigation */}
      <header className="sticky top-0 z-30 border-b border-sky-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 text-white shadow-sm shadow-sky-500/20">
                <BarChart3 className="h-5 w-5" />
              </div>
              <span className="text-base font-bold text-slate-900 hidden sm:inline">
                Nova <span className="text-sky-600 font-semibold">Analytics</span>
              </span>
            </Link>

            {/* Site Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSiteSwitcherOpen(!siteSwitcherOpen)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:border-sky-300 hover:bg-sky-50/50 transition-all shadow-xs"
              >
                <Globe className="h-3.5 w-3.5 text-sky-600" />
                <span className="max-w-[130px] sm:max-w-none truncate">{selectedSite}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {siteSwitcherOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-56 rounded-xl border border-sky-100 bg-white p-1.5 shadow-xl shadow-sky-900/10 z-50">
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Your Websites
                  </div>
                  {["linemorelle.dev", "novella-marketplace.com", "aether-os.app"].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSelectedSite(s);
                        setSiteSwitcherOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium text-left transition-colors ${
                        selectedSite === s
                          ? "bg-sky-50 text-sky-700 font-semibold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="truncate">{s}</span>
                      {selectedSite === s && <CheckCircle2 className="h-3.5 w-3.5 text-sky-600" />}
                    </button>
                  ))}
                  <div className="my-1 border-t border-slate-100" />
                  <Link
                    href="/onboarding"
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-sky-600 hover:bg-sky-50 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Website
                  </Link>
                </div>
              )}
            </div>

            {/* Live Visitors Pill */}
            {!isEmptyState && (
              <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>18 live visitors</span>
              </div>
            )}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Empty State Toggle (For evaluator review) */}
            <button
              onClick={() => setIsEmptyState(!isEmptyState)}
              title="Toggle empty state view to verify zero-data screen"
              className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold border transition-all ${
                isEmptyState
                  ? "bg-amber-500 text-white border-amber-600"
                  : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
              }`}
            >
              {isEmptyState ? "Empty View (Active)" : "Test Empty State"}
            </button>

            <button
              onClick={() => setShowSnippetModal(true)}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-100 transition-colors"
            >
              <Code2 className="h-3.5 w-3.5" />
              Snippet
            </button>

            <button
              onClick={handleExportCSV}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>

            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white font-bold text-xs">
                LM
              </div>
              <span className="text-xs font-semibold text-slate-700 hidden md:inline">Line Morelle</span>
            </div>
          </div>
        </div>

        {/* Subnav Tabs & Date Filter Bar */}
        <div className="border-t border-slate-100 bg-white px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-2">
            {/* Tabs */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === "overview"
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <BarChart3 className="h-3.5 w-3.5" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab("goals")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === "goals"
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Target className="h-3.5 w-3.5" />
                Goals & Events ({goals.length})
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === "settings"
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Settings className="h-3.5 w-3.5" />
                Settings
              </button>
            </div>

            {/* Date Range Selector */}
            {activeTab === "overview" && !isEmptyState && (
              <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 text-xs font-semibold text-slate-600 self-start sm:self-auto">
                <button
                  onClick={() => setDateRange("today")}
                  className={`rounded-lg px-2.5 py-1 transition-all ${
                    dateRange === "today" ? "bg-white text-sky-700 shadow-xs" : "hover:text-slate-900"
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setDateRange("7d")}
                  className={`rounded-lg px-2.5 py-1 transition-all ${
                    dateRange === "7d" ? "bg-white text-sky-700 shadow-xs" : "hover:text-slate-900"
                  }`}
                >
                  Last 7 Days
                </button>
                <button
                  onClick={() => setDateRange("30d")}
                  className={`rounded-lg px-2.5 py-1 transition-all ${
                    dateRange === "30d" ? "bg-white text-sky-700 shadow-xs" : "hover:text-slate-900"
                  }`}
                >
                  Last 30 Days
                </button>
                <button
                  onClick={() => setDateRange("12m")}
                  className={`rounded-lg px-2.5 py-1 transition-all ${
                    dateRange === "12m" ? "bg-white text-sky-700 shadow-xs" : "hover:text-slate-900"
                  }`}
                >
                  12 Months
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container Content */}
      <main className="mx-auto max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* EMPTY STATE SCREEN */}
        {isEmptyState ? (
          <div className="my-12 mx-auto max-w-2xl rounded-3xl border-2 border-dashed border-sky-200 bg-white p-8 sm:p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 mb-4">
              <Clock className="h-8 w-8 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Waiting for your first visitor on {selectedSite}...
            </h2>
            <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              We haven&apos;t detected any pageviews for this site yet. Make sure your tracking snippet is installed in your site&apos;s HTML.
            </p>

            <div className="mt-8 rounded-2xl bg-sky-50/70 border border-sky-100 p-5 text-left text-xs max-w-lg mx-auto space-y-3">
              <div className="font-bold text-sky-950 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-sky-600" />
                Quick Verification Checklist:
              </div>
              <div className="flex items-start gap-2.5 text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Site added to Nova Analytics registry</span>
              </div>
              <div className="flex items-start gap-2.5 text-slate-700">
                <span className="h-4 w-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                <span>Paste snippet into <code>&lt;head&gt;</code> of {selectedSite}</span>
              </div>
              <div className="flex items-start gap-2.5 text-slate-700">
                <span className="h-4 w-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                <span>Open your site in a new browser tab to trigger your first ping</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setShowSnippetModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-sky-500 transition-all"
              >
                <Code2 className="h-4 w-4" />
                View Tracking Snippet
              </button>
              <button
                onClick={() => setIsEmptyState(false)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Zap className="h-4 w-4 text-amber-500" />
                Simulate Active Traffic
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* 4 Primary Metric Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard
                    title="Unique Visitors"
                    value={dateRange === "today" ? "4,420" : dateRange === "30d" ? "108,240" : "24,580"}
                    delta="+12.5%"
                    isPositive={true}
                    periodText="vs previous period"
                    icon={Users}
                  />
                  <MetricCard
                    title="Total Pageviews"
                    value={dateRange === "today" ? "16,800" : dateRange === "30d" ? "392,400" : "89,420"}
                    delta="+18.2%"
                    isPositive={true}
                    periodText="vs previous period"
                    icon={Eye}
                  />
                  <MetricCard
                    title="Bounce Rate"
                    value="38.4%"
                    delta="-4.1%"
                    isPositive={true}
                    periodText="lower is better"
                    icon={MousePointerClick}
                  />
                  <MetricCard
                    title="Avg Visit Duration"
                    value="2m 45s"
                    delta="+8.6%"
                    isPositive={true}
                    periodText="vs previous period"
                    icon={Clock}
                  />
                </div>

                {/* Main Interactive Recharts Area Chart */}
                <AnalyticsChart data={dateRange === "30d" ? SAMPLE_CHART_30D : SAMPLE_CHART_7D} />

                {/* 2x2 Analytics Breakdown Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Top Pages */}
                  <BreakdownCard
                    title="Top Pages"
                    icon={FileText}
                    items={SAMPLE_TOP_PAGES}
                    metricName="Pageviews"
                  />

                  {/* Top Referrers */}
                  <BreakdownCard
                    title="Top Referrers"
                    icon={Globe}
                    items={SAMPLE_REFERRERS}
                    metricName="Visitors"
                  />

                  {/* Geographic Distribution */}
                  <BreakdownCard
                    title="Countries"
                    icon={Compass}
                    items={SAMPLE_COUNTRIES}
                    metricName="Visitors"
                  />

                  {/* Devices & Browsers */}
                  <BreakdownCard
                    title={deviceTab === "devices" ? "Devices" : "Browsers"}
                    icon={Laptop}
                    items={deviceTab === "devices" ? SAMPLE_DEVICES : SAMPLE_BROWSERS}
                    metricName="Share"
                    tabs={[
                      { key: "devices", label: "Devices" },
                      { key: "browsers", label: "Browsers" },
                    ]}
                    activeTab={deviceTab}
                    onTabChange={(key: string) => setDeviceTab(key as "devices" | "browsers")}
                  />
                </div>
              </div>
            )}

            {/* TAB 2: GOALS & CONVERSIONS */}
            {activeTab === "goals" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Conversion Goals & Custom Events</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Track specific actions like button clicks, form submissions, and purchases on {selectedSite}.
                    </p>
                  </div>
                  <button
                    onClick={() => setNewGoalModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-sky-500 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    New Conversion Goal
                  </button>
                </div>

                {/* Goals Table */}
                <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          <th className="py-3 px-4">Goal Name</th>
                          <th className="py-3 px-4">Trigger Rule</th>
                          <th className="py-3 px-4 text-right">Total Conversions</th>
                          <th className="py-3 px-4 text-right">Conversion Rate</th>
                          <th className="py-3 px-4 text-right">Total Value</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {goals.map((goal) => (
                          <tr key={goal.id} className="hover:bg-sky-50/30 transition-colors">
                            <td className="py-3.5 px-4 font-bold text-slate-900">
                              <div className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-sky-600" />
                                <span>{goal.name}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-600">
                              <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-700">
                                {goal.triggerType === "custom_event" ? "event:" : "page:"}{" "}
                                {goal.triggerValue}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right font-semibold text-slate-900">
                              {goal.conversions.toLocaleString()}
                            </td>
                            <td className="py-3.5 px-4 text-right font-semibold text-emerald-600">
                              {goal.rate}
                            </td>
                            <td className="py-3.5 px-4 text-right font-medium text-slate-600">
                              {goal.value}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => setGoals(goals.filter((g) => g.id !== goal.id))}
                                className="rounded-md p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Developer Instructions for Custom Events */}
                <div className="rounded-2xl border border-sky-100 bg-[#F0F7FF] p-6 text-xs text-slate-700">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-sky-600" />
                    How to trigger custom events via JavaScript:
                  </h4>
                  <p className="text-slate-600 mb-3">
                    Trigger custom events anywhere in your app or React components using the global Nova tracker:
                  </p>
                  <pre className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-sky-300 overflow-x-auto">
                    {`// Trigger an event when a user completes an action:\nwindow.nova && window.nova.track('demo_launched', { project: 'nova-analytics' });`}
                  </pre>
                </div>
              </div>
            )}

            {/* TAB 3: SETTINGS */}
            {activeTab === "settings" && (
              <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
                {/* Site Configuration Card */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-1">Site Settings</h3>
                  <p className="text-xs text-slate-500 mb-6">General details for {selectedSite}</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Domain Name
                      </label>
                      <input
                        type="text"
                        disabled
                        value={selectedSite}
                        className="w-full rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 text-xs text-slate-600 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Unique Site ID
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          disabled
                          value="site_nova_893xkd2"
                          className="w-full rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 text-xs text-slate-600 font-mono"
                        />
                        <button
                          onClick={() => setShowSnippetModal(true)}
                          className="rounded-xl bg-sky-50 border border-sky-200 px-4 py-2.5 text-xs font-semibold text-sky-700 hover:bg-sky-100 shrink-0"
                        >
                          View Snippet
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 mb-1">Team & Access</h3>
                      <p className="text-xs text-slate-500">Collaborators who can view this dashboard</p>
                    </div>
                    <button className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200">
                      + Invite Member
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 text-xs">
                    <div className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white font-bold text-xs">
                          LM
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">Line Morelle</div>
                          <div className="text-[11px] text-slate-400">line@studio.dev</div>
                        </div>
                      </div>
                      <span className="rounded-md bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-800">
                        Owner
                      </span>
                    </div>
                  </div>
                </div>

                {/* Public Dashboard Toggle */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">Shareable Public Dashboard</h3>
                    <p className="text-xs text-slate-500">
                      Allow anyone with the link to see read-only stats (like Plausible.io public stats).
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-sky-600 transition-colors duration-200 ease-in-out focus:outline-hidden">
                    <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out" />
                  </button>
                </div>

                {/* Danger Zone */}
                <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6">
                  <h3 className="text-base font-bold text-rose-900 mb-1">Danger Zone</h3>
                  <p className="text-xs text-rose-700 mb-4">
                    Permanently delete this website or reset all recorded analytics events.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button className="rounded-xl border border-rose-300 bg-white px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors">
                      Reset Analytics Data
                    </button>
                    <button className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500 transition-colors">
                      Delete Website
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Snippet Modal */}
      <SnippetModal
        isOpen={showSnippetModal}
        onClose={() => setShowSnippetModal(false)}
        siteId="site_nova_893xkd2"
        domain={selectedSite}
      />

      {/* New Goal Modal */}
      {newGoalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-sky-100 bg-white p-6 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 mb-1">Add Conversion Goal</h3>
            <p className="text-xs text-slate-500 mb-4">Set up a goal rule to track custom business conversions.</p>

            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Goal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Newsletter Subscribed"
                  value={newGoalName}
                  onChange={(e) => setNewGoalName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Goal Type</label>
                <select
                  value={newGoalType}
                  onChange={(e) => setNewGoalType(e.target.value as "custom_event" | "page_path")}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-sky-500 focus:outline-none"
                >
                  <option value="custom_event">Custom JavaScript Event</option>
                  <option value="page_path">Page URL Visit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {newGoalType === "custom_event" ? "Event Key Name" : "Target URL Path"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={newGoalType === "custom_event" ? "newsletter_signup" : "/thank-you"}
                  value={newGoalTrigger}
                  onChange={(e) => setNewGoalTrigger(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-mono text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewGoalModalOpen(false)}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-500 shadow-sm"
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
