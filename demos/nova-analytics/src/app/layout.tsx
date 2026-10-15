import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOVA Telemetry — Real-Time Distributed Infrastructure Analytics",
  description: "Enterprise streaming telemetry and infrastructure observability engine designed by Line Morelle. Built with Go microservices, Kafka pipelines, and D3 visualization.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#06080E] text-[#F0F4FC] antialiased selection:bg-[#00F2FE]/20 selection:text-[#00F2FE]">
        {children}
      </body>
    </html>
  );
}
