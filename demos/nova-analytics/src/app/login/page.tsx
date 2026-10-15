"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, ShieldCheck, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDemoFill = () => {
    setEmail("elena@portfolio.dev");
    setPassword("password123");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
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
              Sign in to your account
            </h1>
            <p className="text-xs text-slate-500 mt-1.5">
              Welcome back. Enter your credentials to access your dashboard.
            </p>
          </div>

          {/* Demo fill button */}
          <div className="mb-6 flex items-center justify-between p-2.5 rounded-xl border border-sky-100 bg-sky-50/50 text-xs">
            <span className="text-slate-600 text-[11px]">Testing demo?</span>
            <button
              type="button"
              onClick={handleDemoFill}
              className="text-[11px] font-medium text-sky-700 hover:text-sky-800 underline"
            >
              Fill demo account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-700">
                  Password
                </label>
                <a href="#" className="text-[11px] text-slate-400 hover:text-slate-600">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-sky-600 py-2.5 text-xs font-medium text-white hover:bg-sky-500 transition-colors shadow-xs disabled:opacity-50 mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setTimeout(() => router.push("/dashboard"), 500);
              }}
              className="w-full rounded-full border border-slate-200 bg-white py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="text-center text-xs text-slate-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-sky-600 hover:text-sky-700 font-medium">
              Create an account
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
          {/* Preview Card */}
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

            {/* Smooth SVG Line */}
            <div className="h-24 w-full">
              <svg viewBox="0 0 300 80" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,60 Q50,40 100,50 T200,25 T300,10 L300,80 L0,80 Z"
                  fill="url(#blueGrad)"
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

          {/* Clean minimal value propositions */}
          <div className="space-y-2.5 text-xs text-slate-600 pl-2">
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-sky-600 shrink-0" />
              <span>Zero cookies, zero personal data, 100% GDPR compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-sky-600 shrink-0" />
              <span>Featherweight script (&lt; 1KB) that never slows down page load</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-sky-600 shrink-0" />
              <span>Sub-second live visitor metrics with zero lag</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
