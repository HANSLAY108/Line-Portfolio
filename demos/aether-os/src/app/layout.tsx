import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AETHER OS — Conceptual Spatial Web Desktop",
  description: "An experimental spatial operating system environment designed for creative engineers by Line Morelle. Built with Rust, WebAssembly, and Canvas API.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden antialiased text-white">
        {children}
      </body>
    </html>
  );
}
