import { connection } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { PageTitle } from "@/components/cms/ui";
import JourneyManager from "@/components/cms/JourneyManager";
import {
  deleteCertificate,
  deleteEducation,
  upsertCertificate,
  upsertEducation,
} from "@/lib/actions/journey";
import { fallbackCertificates, fallbackEducations } from "@/lib/fallbacks";
import type { Certificate, Education } from "@/lib/types";

export const instant = false;

export default async function CMSJourneyPage() {
  await connection();
  const { supabase } = await requireAdmin();

  let educations: Education[] = fallbackEducations;
  let certificates: Certificate[] = fallbackCertificates;

  try {
    const [{ data: eduData, error: eduError }, { data: certData, error: certError }] =
      await Promise.all([
        supabase.from("educations").select("*").order("sort_order"),
        supabase.from("certificates").select("*").order("sort_order"),
      ]);

    if (!eduError && eduData && eduData.length > 0) {
      educations = eduData as Education[];
    }
    if (!certError && certData && certData.length > 0) {
      certificates = certData as Certificate[];
    }
  } catch {
    // Graceful fallback to default records if table not migrated yet
  }

  return (
    <>
      <PageTitle
        eyebrow="Credentials & History"
        title="Journey & Education"
        subtitle="Manage your academic degrees, university milestones, research theses, and verified industry certifications."
      />

      <JourneyManager
        educations={educations}
        certificates={certificates}
        upsertEducationAction={upsertEducation}
        deleteEducationAction={deleteEducation}
        upsertCertificateAction={upsertCertificate}
        deleteCertificateAction={deleteCertificate}
      />
    </>
  );
}
