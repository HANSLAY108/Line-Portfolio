"use server";

import { revalidatePath, updateTag } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { uploadToMedia } from "./upload";

function csv(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

export async function upsertEducation(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");

  const payload = {
    degree: String(formData.get("degree") ?? "").trim(),
    institution: String(formData.get("institution") ?? "").trim(),
    period: String(formData.get("period") ?? "").trim(),
    field_of_study: String(formData.get("field_of_study") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim() || null,
    grade: String(formData.get("grade") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim(),
    coursework: csv(formData.get("coursework")),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    published: formData.get("published") === "on",
  };

  const { error } = id
    ? await supabase.from("educations").update(payload).eq("id", id)
    : await supabase.from("educations").insert(payload);

  if (error) {
    throw new Error(error.message);
  }

  updateTag("site-content");
  revalidatePath("/", "layout");
  revalidatePath("/journey");
  revalidatePath("/cms/journey");
}

export async function deleteEducation(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("educations").delete().eq("id", id);
  if (error) throw new Error(error.message);

  updateTag("site-content");
  revalidatePath("/", "layout");
  revalidatePath("/journey");
  revalidatePath("/cms/journey");
}

export async function upsertCertificate(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const image = formData.get("image") as File | null;

  const payload: Record<string, unknown> = {
    title: String(formData.get("title") ?? "").trim(),
    issuer: String(formData.get("issuer") ?? "").trim(),
    issue_date: String(formData.get("issue_date") ?? "").trim(),
    expiry_date: String(formData.get("expiry_date") ?? "").trim() || null,
    credential_id: String(formData.get("credential_id") ?? "").trim() || null,
    credential_url: String(formData.get("credential_url") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    skills: csv(formData.get("skills")),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    published: formData.get("published") === "on",
  };

  if (image && image.size > 0) {
    payload.image_path = await uploadToMedia(image, "certificates");
  } else if (formData.get("image_remove") === "true") {
    payload.image_path = null;
  }

  const { error } = id
    ? await supabase.from("certificates").update(payload).eq("id", id)
    : await supabase.from("certificates").insert(payload);

  if (error) {
    throw new Error(error.message);
  }

  updateTag("site-content");
  revalidatePath("/", "layout");
  revalidatePath("/journey");
  revalidatePath("/cms/journey");
}

export async function deleteCertificate(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("certificates").delete().eq("id", id);
  if (error) throw new Error(error.message);

  updateTag("site-content");
  revalidatePath("/", "layout");
  revalidatePath("/journey");
  revalidatePath("/cms/journey");
}
