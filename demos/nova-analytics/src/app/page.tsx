"use client";

import React, { useState } from "react";

// Custom Rich Icons
function LogoIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-xl bg-gradient-to-tr from-[#008779] to-[#00C49F] text-white font-black shadow-sm ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
  );
}

function OverviewIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function AccountsIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

function CardsIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

function TransactionsIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  );
}

function PaymentsIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );
}

function InvestmentsIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function CryptoIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
  );
}

function ReportsIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export default function NovaFinEdgeApp() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [timeFilter, setTimeFilter] = useState("This Week");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Overview", icon: OverviewIcon },
    { name: "Accounts", icon: AccountsIcon },
    { name: "Cards", icon: CardsIcon },
    { name: "Transactions", icon: TransactionsIcon },
    { name: "Payments", icon: PaymentsIcon },
    { name: "Investments", icon: InvestmentsIcon },
    { name: "Crypto", icon: CryptoIcon },
    { name: "Analytics", icon: AnalyticsIcon },
    { name: "Reports", icon: ReportsIcon },
    { name: "Settings", icon: SettingsIcon },
  ];

  return (
    <div className="flex min-h-screen bg-[#EDF7F7] text-slate-800">
      {/* 1. SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/95 backdrop-blur-xl border-r border-[#E0EFEF] p-6 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 px-2">
            <LogoIcon className="h-8 w-8" />
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-none">
                Fin<span className="text-[#008779]">Edge</span>
              </span>
              <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
                Financial Intel
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#D9F3F1] text-[#008075] shadow-xs"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4 pt-6">
          {/* Upgrade Card */}
          <div className="rounded-2xl border border-[#D5EFEF] bg-gradient-to-br from-[#EAF8F8] to-[#DEF3F3] p-4 text-center shadow-xs">
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#008779] shadow-xs text-base">
              💎
            </div>
            <h4 className="mt-2.5 text-xs font-bold text-slate-900">Upgrade to Premium</h4>
            <p className="mt-1 text-[11px] text-slate-500 leading-tight">
              Unlock exclusive features and higher transaction limits.
            </p>
            <button
              onClick={() => alert("Upgrading account: Unlimited real-time Kafka streaming enabled.")}
              className="mt-3 w-full rounded-xl bg-[#008779] py-2 text-xs font-bold text-white shadow-xs hover:bg-[#007367] transition-all"
            >
              Upgrade Now &gt;
            </button>
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center justify-between rounded-xl p-2 hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D5EFEF] text-xs font-bold text-[#008075]">
                LM
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900 leading-none">Line Morelle</p>
                <p className="text-[10px] text-slate-400 mt-1 leading-none">Portfolio Admin</p>
              </div>
            </div>
            <span className="text-slate-400 text-xs">▼</span>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-[#E0EFEF] bg-white/70 px-6 lg:px-10 backdrop-blur-md">
          {/* Greeting & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                Overview
              </h1>
              <p className="hidden sm:block text-xs text-slate-500 mt-0.5">
                Welcome back, Line! Here&apos;s what&apos;s happening with your finances today.
              </p>
            </div>
          </div>

          {/* Right Search, Notification, Date */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search anything..."
                className="w-48 lg:w-60 rounded-full border border-[#D5E5E5] bg-white/90 px-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-[#008779] focus:bg-white"
              />
            </div>

            {/* Notification Bell */}
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#D5E5E5] text-slate-600 cursor-pointer hover:bg-slate-50">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#10B981] text-[9px] font-bold text-white">
                2
              </span>
            </div>

            {/* Date Pill */}
            <div className="flex items-center gap-2 rounded-full border border-[#D5E5E5] bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs">
              <span>📅</span>
              <span>May 12 – May 18, 2024</span>
            </div>
          </div>
        </header>

        {/* Dashboard Grid Container */}
        <div className="p-6 lg:p-8 space-y-6">
          {/* 3. ROW 1: TOP 5 STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Card 1: Total Balance */}
            <div className="rounded-2xl border border-white/80 bg-white p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-medium text-slate-400">Total Balance</span>
                <p className="text-xl font-extrabold text-slate-900">$24,580.50</p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#10B981]">
                  <span>↑ 12.5%</span>
                  <span className="text-slate-400 font-normal">vs last 7 days</span>
                </div>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E0F4F3] text-[#008779]">
                💼
              </div>
            </div>

            {/* Card 2: Total Income */}
            <div className="rounded-2xl border border-white/80 bg-white p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-medium text-slate-400">Total Income</span>
                <p className="text-xl font-extrabold text-slate-900">$8,925.40</p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#10B981]">
                  <span>↑ 8.1%</span>
                  <span className="text-slate-400 font-normal">vs last 7 days</span>
                </div>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E6F8F0] text-[#10B981]">
                💵
              </div>
            </div>

            {/* Card 3: Total Expenses */}
            <div className="rounded-2xl border border-white/80 bg-white p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-medium text-slate-400">Total Expenses</span>
                <p className="text-xl font-extrabold text-slate-900">$4,320.20</p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#F43F5E]">
                  <span>↓ 6.4%</span>
                  <span className="text-slate-400 font-normal">vs last 7 days</span>
                </div>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F4ECFB] text-[#8B5CF6]">
                📉
              </div>
            </div>

            {/* Card 4: Net Profit */}
            <div className="rounded-2xl border border-white/80 bg-white p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-medium text-slate-400">Net Profit</span>
                <p className="text-xl font-extrabold text-slate-900">$4,605.20</p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#10B981]">
                  <span>↑ 10.2%</span>
                  <span className="text-slate-400 font-normal">vs last 7 days</span>
                </div>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E8F1FC] text-[#3B82F6]">
                📈
              </div>
            </div>

            {/* Card 5: Net Cash Flow */}
            <div className="rounded-2xl border border-white/80 bg-white p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-medium text-slate-400">Net Cash Flow</span>
                <p className="text-xl font-extrabold text-slate-900">$4,605.20</p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#10B981]">
                  <span>↑ 10.2%</span>
                  <span className="text-slate-400 font-normal">vs last 7 days</span>
                </div>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E0F8F5] text-[#00C49F]">
                📊
              </div>
            </div>
          </div>

          {/* 4. ROW 2: MIDDLE ANALYTICS (BALANCE CHART + SPENDING DONUT + TRANSACTIONS) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Balance Overview Wave Chart (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl border border-white/80 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between pb-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Balance Overview
                  </h3>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-slate-900">$24,580.50</span>
                    <span className="text-xs font-bold text-[#10B981]">↑ 12.5%</span>
                    <span className="text-[11px] text-slate-400">vs last 7 days</span>
                  </div>
                </div>

                <div className="relative">
                  <select
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className="cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 outline-none hover:border-slate-400"
                  >
                    <option value="This Week">This Week</option>
                    <option value="This Month">This Month</option>
                    <option value="This Year">This Year</option>
                  </select>
                </div>
              </div>

              {/* Interactive Smooth Wave Chart */}
              <div className="relative mt-4 h-56 w-full">
                <svg className="h-full w-full" viewBox="0 0 500 220" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00A896" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#00A896" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal gridlines */}
                  <line x1="0" y1="40" x2="500" y2="40" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="160" x2="500" y2="160" stroke="#F1F5F9" strokeWidth="1" />

                  {/* Area fill */}
                  <path
                    d="M 0,170 C 60,160 100,100 160,120 C 220,140 280,80 340,95 C 400,110 450,50 500,60 L 500,220 L 0,220 Z"
                    fill="url(#balanceGradient)"
                  />

                  {/* Wave line */}
                  <path
                    d="M 0,170 C 60,160 100,100 160,120 C 220,140 280,80 340,95 C 400,110 450,50 500,60"
                    fill="none"
                    stroke="#00A896"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Data Tooltip Pin at May 16 */}
                  <circle cx="340" cy="95" r="5" fill="#008779" stroke="#FFFFFF" strokeWidth="3" />
                </svg>

                {/* Floating Tooltip Label */}
                <div className="absolute top-10 left-[62%] -translate-x-1/2 rounded-xl bg-white border border-slate-200 p-2 shadow-lg text-center pointer-events-none">
                  <p className="text-[10px] text-slate-400">May 16</p>
                  <p className="text-xs font-extrabold text-slate-900">$18,320</p>
                </div>

                {/* X Axis labels */}
                <div className="flex justify-between text-[10px] font-semibold text-slate-400 pt-2 px-1">
                  <span>May 12</span>
                  <span>May 13</span>
                  <span>May 14</span>
                  <span>May 15</span>
                  <span>May 16</span>
                  <span>May 17</span>
                  <span>May 18</span>
                </div>
              </div>
            </div>

            {/* Spending by Category Donut Chart (4 cols) */}
            <div className="lg:col-span-4 rounded-2xl border border-white/80 bg-white p-6 shadow-xs flex flex-col justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Spending by Category
              </h3>

              <div className="flex items-center justify-between gap-6 my-auto pt-2">
                {/* SVG Donut */}
                <div className="relative h-40 w-40 shrink-0 flex items-center justify-center">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                    {/* Shopping: 37.5% -> strokeDasharray="37.5 62.5" */}
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#00A896" strokeWidth="12" strokeDasharray="37.5 62.5" strokeDashoffset="0" />
                    {/* Bills: 25.9% */}
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#00C49F" strokeWidth="12" strokeDasharray="25.9 74.1" strokeDashoffset="-37.5" />
                    {/* Transport: 18.1% */}
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#38BDF8" strokeWidth="12" strokeDasharray="18.1 81.9" strokeDashoffset="-63.4" />
                    {/* Food & Dining: 13.0% */}
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#818CF8" strokeWidth="12" strokeDasharray="13.0 87.0" strokeDashoffset="-81.5" />
                    {/* Others: 5.5% */}
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#CBD5E1" strokeWidth="12" strokeDasharray="5.5 94.5" strokeDashoffset="-94.5" />
                  </svg>

                  <div className="absolute text-center">
                    <p className="text-base font-extrabold text-slate-900">$4,320.20</p>
                    <p className="text-[10px] text-slate-400">Total</p>
                  </div>
                </div>

                {/* Legend List */}
                <div className="space-y-2 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#00A896]" />
                    <div>
                      <span className="font-semibold">Shopping</span>
                      <p className="text-[10px] text-slate-400">$1,620.50 (37.5%)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#00C49F]" />
                    <div>
                      <span className="font-semibold">Bills & Utilities</span>
                      <p className="text-[10px] text-slate-400">$1,120.30 (25.9%)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#38BDF8]" />
                    <div>
                      <span className="font-semibold">Transport</span>
                      <p className="text-[10px] text-slate-400">$780.40 (18.1%)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#818CF8]" />
                    <div>
                      <span className="font-semibold">Food & Dining</span>
                      <p className="text-[10px] text-slate-400">$560.00 (13.0%)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#CBD5E1]" />
                    <div>
                      <span className="font-semibold">Others</span>
                      <p className="text-[10px] text-slate-400">$239.00 (5.5%)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions (3 cols) */}
            <div className="lg:col-span-3 rounded-2xl border border-white/80 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Recent Transactions
                </h3>
                <button
                  onClick={() => alert("Viewing all 148 past transactions.")}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4 pt-1">
                {/* Tx 1 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600 font-bold text-sm">
                      a
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Amazon Purchase</p>
                      <p className="text-[10px] text-slate-400">May 18, 2024</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">-$129.99</span>
                </div>

                {/* Tx 2 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 font-bold text-sm">
                      💼
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Salary Received</p>
                      <p className="text-[10px] text-slate-400">May 17, 2024</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#10B981]">+$3,850.00</span>
                </div>

                {/* Tx 3 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 font-bold text-sm">
                      ⚡
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Electricity Bill</p>
                      <p className="text-[10px] text-slate-400">May 16, 2024</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">-$86.40</span>
                </div>

                {/* Tx 4 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 font-bold text-sm">
                      🚗
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Uber Ride</p>
                      <p className="text-[10px] text-slate-400">May 15, 2024</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">-$24.50</span>
                </div>

                {/* Tx 5 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-bold text-sm">
                      ⇄
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Transfer to Savings</p>
                      <p className="text-[10px] text-slate-400">May 15, 2024</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">-$500.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. ROW 3: BOTTOM ROW (MY CARDS + CRYPTO + CASH FLOW) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* My Cards (4 cols) */}
            <div className="lg:col-span-4 rounded-2xl border border-white/80 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  My Cards
                </h3>
                <button
                  onClick={() => alert("Viewing all 3 connected payment cards.")}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  View All
                </button>
              </div>

              <div className="flex items-center gap-4 py-2">
                {/* Physical-style Metallic Teal VISA Card */}
                <div className="relative h-44 w-68 rounded-2xl bg-gradient-to-tr from-[#025950] via-[#008779] to-[#00A896] p-5 text-white shadow-xl flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 right-0 -mr-6 -mt-6 h-32 w-32 rounded-full bg-white/10 blur-xl pointer-events-none" />

                  <div className="flex items-center justify-between">
                    {/* Chip */}
                    <div className="h-7 w-9 rounded-md bg-gradient-to-tr from-amber-200 to-amber-400 border border-amber-300 shadow-inner flex items-center justify-center">
                      <div className="h-4 w-6 border border-amber-500/50 rounded-sm" />
                    </div>
                    <span className="font-extrabold tracking-widest text-lg italic">VISA</span>
                  </div>

                  <div>
                    <p className="font-mono text-base tracking-widest text-white/90">
                      •••• •••• •••• 4242
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-semibold text-white/80">
                    <span>Line Morelle</span>
                    <span>08/28</span>
                  </div>
                </div>

                {/* Add New Card dashed card */}
                <div
                  onClick={() => alert("Adding a new card: Please enter your card details.")}
                  className="flex h-44 w-24 shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#008779] hover:bg-[#E0F4F3]/30 cursor-pointer transition-colors text-slate-400 hover:text-[#008779]"
                >
                  <span className="text-xl">+</span>
                  <span className="text-[10px] font-bold mt-1 text-center">Add Card</span>
                </div>
              </div>

              {/* Slider dots */}
              <div className="flex justify-center gap-1.5 pt-2">
                <span className="h-1.5 w-4 rounded-full bg-[#008779]" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
              </div>
            </div>

            {/* Crypto Portfolio (4 cols) */}
            <div className="lg:col-span-4 rounded-2xl border border-white/80 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Crypto Portfolio
                </h3>
                <button
                  onClick={() => alert("Opening full Web3 crypto vault.")}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3.5">
                {/* USDT */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white font-extrabold text-xs shadow-xs">
                      ₮
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">USDT</p>
                      <p className="text-[10px] text-slate-400">Tether</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900">1,240.50</p>
                    <p className="text-[10px] text-slate-400">$1,240.50</p>
                  </div>
                  <span className="text-xs font-bold text-[#10B981]">↑ 1.2%</span>
                </div>

                {/* BTC */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white font-extrabold text-xs shadow-xs">
                      ₿
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">BTC</p>
                      <p className="text-[10px] text-slate-400">Bitcoin</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900">0.0456</p>
                    <p className="text-[10px] text-slate-400">$2,856.45</p>
                  </div>
                  <span className="text-xs font-bold text-[#10B981]">↑ 2.3%</span>
                </div>

                {/* ETH */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white font-extrabold text-xs shadow-xs">
                      Ξ
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">ETH</p>
                      <p className="text-[10px] text-slate-400">Ethereum</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900">0.8500</p>
                    <p className="text-[10px] text-slate-400">$2,125.30</p>
                  </div>
                  <span className="text-xs font-bold text-[#10B981]">↑ 1.8%</span>
                </div>

                {/* BNB */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-white font-extrabold text-xs shadow-xs">
                      ❖
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">BNB</p>
                      <p className="text-[10px] text-slate-400">BNB</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900">2.35</p>
                    <p className="text-[10px] text-slate-400">$1,104.25</p>
                  </div>
                  <span className="text-xs font-bold text-[#10B981]">↑ 0.9%</span>
                </div>
              </div>
            </div>

            {/* Cash Flow Inflow / Outflow Bars (4 cols) */}
            <div className="lg:col-span-4 rounded-2xl border border-white/80 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Cash Flow
                  </h3>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-slate-900">$4,605.20</span>
                    <span className="text-xs font-bold text-[#10B981]">↑ 10.2%</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold">
                    <span className="h-2 w-2 rounded-full bg-[#008779]" />
                    <span className="text-slate-600">Inflow</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold">
                    <span className="h-2 w-2 rounded-full bg-[#F43F5E]" />
                    <span className="text-slate-600">Outflow</span>
                  </div>
                </div>
              </div>

              {/* Bar Chart Representation */}
              <div className="mt-2 h-44 w-full flex items-center justify-between px-2">
                {[
                  { day: "May 12", inH: 60, outH: 25 },
                  { day: "May 13", inH: 45, outH: 30 },
                  { day: "May 14", inH: 80, outH: 15 },
                  { day: "May 15", inH: 30, outH: 70 },
                  { day: "May 16", inH: 95, outH: 40 },
                  { day: "May 17", inH: 70, outH: 20 },
                  { day: "May 18", inH: 85, outH: 35 },
                ].map((b) => (
                  <div key={b.day} className="flex flex-col items-center gap-1 h-full justify-end">
                    <div className="flex items-end gap-1 h-32">
                      <div
                        className="w-2.5 rounded-t-sm bg-[#008779] transition-all hover:bg-[#006F63]"
                        style={{ height: `${b.inH}%` }}
                      />
                      <div
                        className="w-2.5 rounded-t-sm bg-[#F43F5E] transition-all hover:bg-[#E11D48]"
                        style={{ height: `${b.outH}%` }}
                      />
                    </div>
                    <span className="text-[9px] font-semibold text-slate-400 mt-1">{b.day.split(" ")[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
