import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOVELLA — Quality, Style & Everyday Marketplace",
  description: "Curated modern marketplace designed and architected by Line Morelle. Built on a headless Next.js, GraphQL, and sub-second edge architecture.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-[#FAFAFA] text-slate-800">
        {children}
      </body>
    </html>
  );
}
