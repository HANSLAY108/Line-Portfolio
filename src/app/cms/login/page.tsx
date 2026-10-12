"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { createBrowserSupabase } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState(
    params.get("error") === "forbidden"
      ? "This account is not authorized."
      : "",
  );
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const supabase = createBrowserSupabase();
    if (!supabase) {
      setError("Supabase is not configured. Check your environment variables.");
      setLoading(false);
      return;
    }
    const { error: signError } = await supabase.auth.signInWithPassword({
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    });
    if (signError) {
      setError(signError.message);
      setLoading(false);
      return;
    }
    router.replace("/cms");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] sm:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-text">
          Private studio
        </p>
        <h1 className="mt-3 font-serif text-3xl font-medium">Welcome back</h1>
        <p className="mt-2 text-sm text-muted">
          Sign in to manage Line Morelle&apos;s portfolio.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="field" htmlFor="email">
              Email
            </label>
            <input id="email" name="email" type="email" required autoComplete="username" />
          </div>
          <div>
            <label className="field" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-accent py-3 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-70"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
