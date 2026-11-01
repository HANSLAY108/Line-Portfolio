import { connection } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import {
  deleteService,
  reorderServices,
  saveServicesPageContent,
  toggleServicePublished,
  upsertService,
} from "@/lib/actions/services";
import { PageTitle } from "@/components/cms/ui";
import ServicesManager from "@/components/cms/ServicesManager";
import {
  fallbackServices,
  fallbackServicesPageContent,
} from "@/lib/fallbacks";
import type { ServiceItem, ServicesPageContent } from "@/lib/types";

export const instant = false;

export default async function ServicesAdminPage() {
  await connection();
  const { supabase } = await requireAdmin();

  const [servicesRes, pageContentRes] = await Promise.all([
    supabase.from("services").select("*").order("sort_order"),
    supabase
      .from("services_page_content")
      .select("*")
      .eq("id", 1)
      .maybeSingle(),
  ]);

  const services: ServiceItem[] =
    (servicesRes.data as ServiceItem[] | null)?.length
      ? (servicesRes.data as ServiceItem[])
      : fallbackServices;

  const rawPage = pageContentRes.data as ServicesPageContent | null;
  const pageContent: ServicesPageContent = rawPage
    ? {
        ...fallbackServicesPageContent,
        ...rawPage,
        steps:
          Array.isArray(rawPage.steps) && rawPage.steps.length > 0
            ? rawPage.steps
            : fallbackServicesPageContent.steps,
        faqs:
          Array.isArray(rawPage.faqs) && rawPage.faqs.length > 0
            ? rawPage.faqs
            : fallbackServicesPageContent.faqs,
      }
    : fallbackServicesPageContent;

  return (
    <div className="space-y-8">
      <PageTitle
        eyebrow="Content & Offerings"
        title="Services & Process"
        subtitle="Manage your 8 service cards, bilingual EN/FR descriptions, How I Work steps, and FAQ items."
      />

      <ServicesManager
        initialServices={services}
        pageContent={pageContent}
        upsertServiceAction={upsertService}
        deleteServiceAction={deleteService}
        togglePublishedAction={toggleServicePublished}
        reorderServicesAction={reorderServices}
        savePageContentAction={saveServicesPageContent}
      />
    </div>
  );
}

