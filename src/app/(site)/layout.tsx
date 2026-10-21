import { Suspense } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import RouteProgress from "@/components/RouteProgress";
import PageTransition from "@/components/PageTransition";
import { LanguageProvider } from "@/context/LanguageContext";
import Script from 'next/script';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Preloader />
      <RouteProgress />
      <Navbar />
 <Script
  strategy="afterInteractive"
  src="https://nova-analytics.app/tracker.js"
  data-site-id="site_1792591639360"
/>
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Suspense>
        <Footer />
      </Suspense>
    </LanguageProvider>
  );
}

