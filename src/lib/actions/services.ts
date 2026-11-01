"use server";

import { revalidatePath, updateTag } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { slugify } from "@/lib/media";
import type { ServiceFaqItem, ServiceProcessStep } from "@/lib/types";

function parseLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function upsertService(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "").trim();
  const titleEn = String(formData.get("title_en") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();

  const payload = {
    slug: slugify(rawSlug || titleEn) || `service-${Date.now()}`,
    icon_key: String(formData.get("icon_key") ?? "globe").trim() || "globe",
    title_en: titleEn,
    title_fr: String(formData.get("title_fr") ?? "").trim(),
    description_en: String(formData.get("description_en") ?? "").trim(),
    description_fr: String(formData.get("description_fr") ?? "").trim(),
    bullets_en: parseLines(formData.get("bullets_en")),
    bullets_fr: parseLines(formData.get("bullets_fr")),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    published: formData.get("published") === "on",
  };

  const { error } = id
    ? await supabase.from("services").update(payload).eq("id", id)
    : await supabase.from("services").insert(payload);

  if (error) {
    throw new Error(error.message);
  }

  updateTag("site-content");
  revalidatePath("/", "layout");
  revalidatePath("/services");
  revalidatePath("/cms/services");
}

export async function deleteService(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw new Error(error.message);

  updateTag("site-content");
  revalidatePath("/", "layout");
  revalidatePath("/services");
  revalidatePath("/cms/services");
}

export async function toggleServicePublished(id: string, published: boolean) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("services")
    .update({ published })
    .eq("id", id);
  if (error) throw new Error(error.message);

  updateTag("site-content");
  revalidatePath("/", "layout");
  revalidatePath("/services");
  revalidatePath("/cms/services");
}

export async function reorderServices(orderedIds: string[]) {
  const { supabase } = await requireAdmin();
  await Promise.all(
    orderedIds.map((id, idx) =>
      supabase.from("services").update({ sort_order: idx }).eq("id", id),
    ),
  );

  updateTag("site-content");
  revalidatePath("/", "layout");
  revalidatePath("/services");
  revalidatePath("/cms/services");
}

export async function saveServicesPageContent(formData: FormData) {
  const { supabase } = await requireAdmin();

  let steps: ServiceProcessStep[] = [];
  let faqs: ServiceFaqItem[] = [];

  try {
    const rawSteps = String(formData.get("steps_json") ?? "[]");
    steps = JSON.parse(rawSteps);
  } catch {
    steps = [];
  }

  try {
    const rawFaqs = String(formData.get("faqs_json") ?? "[]");
    faqs = JSON.parse(rawFaqs);
  } catch {
    faqs = [];
  }

  const payload = {
    id: 1,
    hero_badge_en: String(formData.get("hero_badge_en") ?? "").trim(),
    hero_badge_fr: String(formData.get("hero_badge_fr") ?? "").trim(),
    hero_title_before_en: String(
      formData.get("hero_title_before_en") ?? "",
    ).trim(),
    hero_title_before_fr: String(
      formData.get("hero_title_before_fr") ?? "",
    ).trim(),
    hero_title_accent_en: String(
      formData.get("hero_title_accent_en") ?? "",
    ).trim(),
    hero_title_accent_fr: String(
      formData.get("hero_title_accent_fr") ?? "",
    ).trim(),
    hero_title_after_en: String(
      formData.get("hero_title_after_en") ?? "",
    ).trim(),
    hero_title_after_fr: String(
      formData.get("hero_title_after_fr") ?? "",
    ).trim(),
    hero_subtitle_en: String(formData.get("hero_subtitle_en") ?? "").trim(),
    hero_subtitle_fr: String(formData.get("hero_subtitle_fr") ?? "").trim(),
    hero_cta_en: String(formData.get("hero_cta_en") ?? "").trim(),
    hero_cta_fr: String(formData.get("hero_cta_fr") ?? "").trim(),
    process_badge_en: String(formData.get("process_badge_en") ?? "").trim(),
    process_badge_fr: String(formData.get("process_badge_fr") ?? "").trim(),
    process_heading_en: String(formData.get("process_heading_en") ?? "").trim(),
    process_heading_fr: String(formData.get("process_heading_fr") ?? "").trim(),
    process_subtitle_en: String(
      formData.get("process_subtitle_en") ?? "",
    ).trim(),
    process_subtitle_fr: String(
      formData.get("process_subtitle_fr") ?? "",
    ).trim(),
    steps,
    faq_badge_en: String(formData.get("faq_badge_en") ?? "").trim(),
    faq_badge_fr: String(formData.get("faq_badge_fr") ?? "").trim(),
    faq_heading_en: String(formData.get("faq_heading_en") ?? "").trim(),
    faq_heading_fr: String(formData.get("faq_heading_fr") ?? "").trim(),
    faq_subtitle_en: String(formData.get("faq_subtitle_en") ?? "").trim(),
    faq_subtitle_fr: String(formData.get("faq_subtitle_fr") ?? "").trim(),
    faqs,
  };

  const { error } = await supabase
    .from("services_page_content")
    .upsert(payload, { onConflict: "id" });

  if (error) {
    throw new Error(error.message);
  }

  updateTag("site-content");
  revalidatePath("/", "layout");
  revalidatePath("/services");
  revalidatePath("/cms/services");
}

export async function markServiceRequestRead(id: string, read: boolean) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("service_requests")
    .update({ read })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/cms", "layout");
  revalidatePath("/cms/service-requests");
}

export async function deleteServiceRequest(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("service_requests")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/cms", "layout");
  revalidatePath("/cms/service-requests");
}

