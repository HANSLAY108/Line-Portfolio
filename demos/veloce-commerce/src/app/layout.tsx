import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VELOCE — Minimalist Luxury & Headless Commerce",
  description: "Curated architectural timepieces, leather goods, and refined objects designed by Line Morelle. Built on a headless Next.js, GraphQL, and Shopify architecture.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased selection:bg-[#121212] selection:text-white">
        {children}
      </body>
    </html>
  );
}
