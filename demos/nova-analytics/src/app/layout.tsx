import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../lib/supabase/auth-context";

export const metadata: Metadata = {
  title: "Nova Analytics — Simple, Privacy-Friendly Website Analytics",
  description: "Lightweight, privacy-first web analytics. No cookies, 100% GDPR compliant. Built with Next.js, Tailwind CSS, Supabase and Recharts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8FAFC] text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
