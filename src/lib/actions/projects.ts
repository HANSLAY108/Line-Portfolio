"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { slugify } from "@/lib/media";
import { uploadToMedia } from "./upload";

function csv(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

async function projectPayload(formData: FormData, existingSlug?: string) {
  const title = String(formData.get("title") ?? "").trim();
  const cover = formData.get("cover") as File | null;
  const payload: Record<string, unknown> = {
    title,
    slug: slugify(String(formData.get("slug") ?? title)) || existingSlug || slugify(title),
    category: String(formData.get("category") ?? "").trim(),
    filters: csv(formData.get("filters")),
    summary: String(formData.get("summary") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    tags: csv(formData.get("tags")),
    live_url: String(formData.get("live_url") ?? "").trim() || null,
    repo_url: String(formData.get("repo_url") ?? "").trim() || null,
    featured: formData.get("featured") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    published: formData.get("published") === "on",
  };

  if (cover && cover.size > 0) {
    payload.cover_path = await uploadToMedia(cover, "projects");
  } else if (formData.get("cover_remove") === "true") {
    payload.cover_path = null;
  }

  return payload;
}

export async function createProject(formData: FormData) {
  const { supabase } = await requireAdmin();
  const payload = await projectPayload(formData);
  const { error } = await supabase.from("projects").insert(payload);
  if (error) throw new Error(error.message);
  updateTag("site-content");
  revalidatePath("/", "layout");
  revalidatePath("/projects");
  revalidatePath("/cms/projects");
  redirect("/cms/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const { supabase } = await requireAdmin();
  const payload = await projectPayload(formData);
  const { error } = await supabase.from("projects").update(payload).eq("id", id);
  if (error) throw new Error(error.message);
  updateTag("site-content");
  revalidatePath("/", "layout");
  revalidatePath("/projects");
  revalidatePath("/cms/projects");
  redirect("/cms/projects");
}

export async function deleteProject(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  updateTag("site-content");
  revalidatePath("/", "layout");
  revalidatePath("/projects");
  revalidatePath("/cms/projects");
}
