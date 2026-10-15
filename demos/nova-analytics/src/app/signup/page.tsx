"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/onboarding");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row text-slate-800 font-sans">
      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16">
        <div>
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-700 text-white font-semibold text-xs">
              N
            </div>
            <span className="text-sm font-semibold tracking-tight text-slate-900">
              Nova Analytics
            </span>
          </Link>
        </div>

        <div className="max-w-sm w-full mx-auto my-auto py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-normal text-slate-900 tracking-tight">
              Create your account
            </h1>
            <p className="text-xs text-slate-500 mt-1.5">
              Start your 14-day free trial. No credit card required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Elena Rostova"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Work email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elena@studio.dev"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                minLength={8}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-sky-600 py-2.5 text-xs font-medium text-white hover:bg-sky-500 transition-colors shadow-xs disabled:opacity-50 mt-2"
            >
              {loading ? "Creating account..." : "Start Free Trial"}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-sky-600 hover:text-sky-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <div className="text-xs text-slate-400">
          © {new Date().getFullYear()} Nova Analytics • Privacy by design
        </div>
      </div>

      {/* Right Column: Clean Analytics Card Preview */}
      <div className="hidden lg:flex w-1/2 bg-[#F0F7FF] p-12 items-center justify-center border-l border-slate-200/80">
        <div className="max-w-md w-full space-y-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold text-slate-900">myportfolio.com</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Live Telemetry</span>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                Unique Visitors
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-light text-slate-900 tracking-tight">31,220</span>
                <span className="text-xs font-medium text-emerald-600">+14.2%</span>
              </div>
            </div>

            <div className="h-24 w-full">
              <svg viewBox="0 0 300 80" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="blueGradSignup" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,60 Q50,40 100,50 T200,25 T300,10 L300,80 L0,80 Z"
                  fill="url(#blueGradSignup)"
                />
                <path
                  d="M0,60 Q50,40 100,50 T200,25 T300,10"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 text-[11px]">Bounce Rate</span>
                <div className="font-medium text-slate-800 text-sm mt-0.5">36.4%</div>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">Avg Visit Duration</span>
                <div className="font-medium text-slate-800 text-sm mt-0.5">3m 12s</div>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-slate-600 pl-2">
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-sky-600 shrink-0" />
              <span>Full access to all analytics features during trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-sky-600 shrink-0" />
              <span>No credit card required to get started</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-sky-600 shrink-0" />
              <span>Set up tracking in under 60 seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
