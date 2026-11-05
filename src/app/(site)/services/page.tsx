import type { Metadata } from "next";
import ServicesPageClient from "@/components/ServicesPageClient";
import { getPublishedContent } from "@/lib/content";
import {
  fallbackServices,
  fallbackServicesPageContent,
} from "@/lib/fallbacks";

export const metadata: Metadata = {
  title: "Services - Line Morelle",
  description:
    "Custom website development, full-stack web applications, UI implementation, backend APIs, CMS dashboards, performance audits, and technical consulting by Line Morelle.",
};

export default async function ServicesPage() {
  const { services, servicesPage } = await getPublishedContent();

  const publishedServices = (services ?? fallbackServices).filter(
    (s) => s.published,
  );
  const pageContent = servicesPage ?? fallbackServicesPageContent;

  return (
    <ServicesPageClient
      services={publishedServices}
      pageContent={pageContent}
    />
  );
}

