"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { slugify } from "@/lib/media";
import { uploadToMedia } from "./upload";

function csv(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
}

async function postPayload(formData: FormData, existingSlug?: string) {
  const title = String(formData.get("title") ?? "").trim();
  const cover = formData.get("cover") as File | null;

  const payload: Record<string, unknown> = {
    title,
    slug: slugify(String(formData.get("slug") ?? title)) || existingSlug || slugify(title),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    tags: csv(formData.get("tags")),
    published: formData.get("published") === "on",
    published_at: formData.get("published") === "on" ? new Date().toISOString() : null,
  };

  if (cover && cover.size > 0) {
    payload.cover_path = await uploadToMedia(cover, "blog");
  } else if (formData.get("cover_remove") === "true") {
    payload.cover_path = null;
  }

  return payload;
}

export async function createPost(formData: FormData) {
  const { supabase } = await requireAdmin();
  const payload = await postPayload(formData);
  const { error } = await supabase.from("posts").insert(payload);
  if (error) throw new Error(error.message);
  updateTag("blog-posts");
  revalidatePath("/blog", "layout");
  revalidatePath("/cms/posts");
  redirect("/cms/posts");
}

export async function updatePost(id: string, formData: FormData) {
  const { supabase } = await requireAdmin();
  const existing = await supabase.from("posts").select("slug, published_at").eq("id", id).single();
  const payload = await postPayload(formData, existing.data?.slug);

  // Keep existing published_at if already set and still published
  if (
    formData.get("published") === "on" &&
    existing.data?.published_at
  ) {
    payload.published_at = existing.data.published_at;
  }

  const { error } = await supabase.from("posts").update(payload).eq("id", id);
  if (error) throw new Error(error.message);
  updateTag("blog-posts");
  revalidatePath("/blog", "layout");
  revalidatePath("/cms/posts");
  redirect("/cms/posts");
}

export async function deletePost(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  updateTag("blog-posts");
  revalidatePath("/blog", "layout");
  revalidatePath("/cms/posts");
}
