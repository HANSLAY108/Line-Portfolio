"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BarChart3, Check, ArrowRight, ShieldCheck, Mail, Lock, AlertCircle } from "lucide-react";
import { createBrowserSupabase } from "../../lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  const handleDemoFill = () => {
    setEmail("sarah@company.com");
    setPassword("password123");
    setErrorMsg("");
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setErrorMsg("Please enter your email address first.");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    const supabase = createBrowserSupabase();
    if (!supabase) {
      setInfoMsg("Password reset email sent (demo mode fallback).");
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/login`,
    });
    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setInfoMsg("Check your inbox for password reset instructions.");
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    const supabase = createBrowserSupabase();
    if (!supabase) {
      router.push("/dashboard");
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");
    setLoading(true);

    const supabase = createBrowserSupabase();
    if (!supabase) {
      // Local demo mode fallback
      setTimeout(() => {
        setLoading(false);
        router.push("/dashboard");
      }, 400);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      // If credentials don't exist yet, fallback gently to demo mode or show error
      if (email === "sarah@company.com") {
        router.push("/dashboard");
      } else {
        setErrorMsg(error.message);
      }
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16">
        <div>
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm">
              <BarChart3 className="h-4 w-4" />
            </div>
            <span className="text-base font-bold tracking-tight text-slate-900">
              Nova<span className="text-blue-600">Analytics</span>
            </span>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto my-auto py-8">
          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
              START YOUR 14-DAY TRIAL
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Welcome back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              Enter your credentials to access your analytics dashboard.
            </p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => handleOAuth("github")}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-xs"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                  fill="currentColor"
                />
              </svg>
              <span>GitHub</span>
            </button>
            <button
              type="button"
              onClick={() => handleOAuth("google")}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-xs"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
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
              <span>Google</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="w-full border-t border-slate-200" />
            <span className="absolute bg-white px-3 text-[11px] text-slate-400 uppercase tracking-wider">
              Or with email
            </span>
          </div>

          {/* Feedback messages */}
          {errorMsg && (
            <div className="mb-4 flex items-center gap-2 p-3 rounded-xl border border-rose-200 bg-rose-50 text-xs text-rose-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {infoMsg && (
            <div className="mb-4 flex items-center gap-2 p-3 rounded-xl border border-blue-200 bg-blue-50 text-xs text-blue-700">
              <Check className="h-4 w-4 shrink-0" />
              <span>{infoMsg}</span>
            </div>
          )}

          {/* Demo fill button */}
          <div className="mb-4 flex items-center justify-between p-2.5 rounded-xl border border-blue-100 bg-blue-50/60 text-xs">
            <span className="text-slate-600 text-[11px]">Testing Line&apos;s portfolio demo?</span>
            <button
              type="button"
              onClick={handleDemoFill}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 underline"
            >
              Fill demo account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Work email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@company.com"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[11px] text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Remember me for 30 days</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 mt-2"
            >
              {loading ? "Signing in..." : "Sign in to Dashboard →"}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
              Start your 14-day free trial
            </Link>
          </p>
        </div>

        <div className="text-[11px] text-slate-400">
          © {new Date().getFullYear()} Nova Analytics Inc. All rights reserved.
        </div>
      </div>

      {/* Right Column: Hero Graphic Preview */}
      <div className="hidden lg:flex w-1/2 bg-[#EFF6FF] p-12 items-center justify-center border-l border-slate-200/80">
        <div className="max-w-md w-full space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Turn your data into actionable <span className="text-blue-600">growth strategies</span>.
            </h2>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Resolve vulnerabilities, track real user journeys, and improve conversion funnels through our intuitive dashboard.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-200/80 bg-white p-5 shadow-xl shadow-blue-500/10 space-y-4">
            <div className="rounded-xl overflow-hidden aspect-[4/3] bg-gradient-to-tr from-slate-900 via-blue-950 to-indigo-900 relative p-4 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-slate-200 text-xs">app.linemorelle.dev</span>
                </div>
                <span className="text-[10px] text-blue-200 bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-400/30">
                  Telemetry Active
                </span>
              </div>

              <div className="my-auto py-2 space-y-2">
                <div className="flex items-end gap-1.5 h-28 w-full pt-4 px-2">
                  {[45, 60, 52, 78, 65, 88, 95, 70, 85, 100, 92, 110].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-sm bg-gradient-to-t from-blue-600 to-cyan-400 shadow-sm"
                        style={{ height: `${(h / 120) * 100}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-300 border-t border-slate-700/60 pt-2">
                <span className="font-mono">84,210 Active sessions</span>
                <span className="text-emerald-400 font-semibold">+18.4% this week</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2">
              <p className="text-xs text-slate-600 italic leading-relaxed">
                &ldquo;Nova has completely replaced our traditional bloated analytics. The instant link audit and zero-cookie telemetry give us everything we need.&rdquo;
              </p>
              <div className="flex items-center gap-2 pt-1">
                <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                  LM
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-900 block leading-tight">Line Morelle</span>
                  <span className="text-[10px] text-slate-400">Lead Product Engineer & Designer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
