import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOVA FinEdge — Real-Time Financial Analytics & Intelligence",
  description: "High-performance financial analytics and intelligence platform designed by Line Morelle. Real-time cash flow monitoring, multi-asset portfolio, and sub-second metrics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#EDF7F7] text-slate-800 antialiased selection:bg-[#008779]/20 selection:text-[#008779]">
        {children}
      </body>
    </html>
  );
}
