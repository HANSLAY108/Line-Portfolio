import { connection } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import {
  deleteServiceRequest,
  markServiceRequestRead,
} from "@/lib/actions/services";
import { PageTitle } from "@/components/cms/ui";
import ServiceRequestsManager from "@/components/cms/ServiceRequestsManager";
import { fallbackServices } from "@/lib/fallbacks";
import type { ServiceItem, ServiceRequest } from "@/lib/types";

export const instant = false;

export default async function ServiceRequestsAdminPage() {
  await connection();
  const { supabase } = await requireAdmin();

  const [requestsRes, servicesRes] = await Promise.all([
    supabase
      .from("service_requests")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase.from("services").select("title_en").order("sort_order"),
  ]);

  const requests = (requestsRes.data ?? []) as ServiceRequest[];
  const serviceRows = (servicesRes.data ?? []) as Pick<
    ServiceItem,
    "title_en"
  >[];

  const serviceOptions =
    serviceRows.length > 0
      ? serviceRows.map((s) => s.title_en)
      : fallbackServices.map((s) => s.title_en);

  return (
    <div className="space-y-8">
      <PageTitle
        eyebrow="Inbox"
        title="Service Requests"
        subtitle="Manage client inquiries submitted from the Services page, filter by service, and track read/unread status."
      />

      <ServiceRequestsManager
        requests={requests}
        serviceOptions={serviceOptions}
        markReadAction={markServiceRequestRead}
        deleteAction={deleteServiceRequest}
      />
    </div>
  );
}

