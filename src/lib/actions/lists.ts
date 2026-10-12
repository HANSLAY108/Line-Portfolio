"use server";

import { revalidatePath, updateTag } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { uploadToMedia } from "./upload";

export async function upsertSkill(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const payload = {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    icon_key: String(formData.get("icon_key") ?? "monitor"),
    section: String(formData.get("section") ?? "expertise"),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    published: formData.get("published") === "on",
  };
  const { error } = id
    ? await supabase.from("skills").update(payload).eq("id", id)
    : await supabase.from("skills").insert(payload);
  if (error) throw new Error(error.message);
  updateTag("site-content");
  revalidatePath("/", "layout");
  revalidatePath("/projects");
  revalidatePath("/cms/skills");
}

export async function deleteSkill(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("skills").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  revalidatePath("/projects");
  revalidatePath("/cms/skills");
}

export async function upsertTestimonial(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const avatar = formData.get("avatar") as File | null;
  const payload: Record<string, unknown> = {
    quote: String(formData.get("quote") ?? "").trim(),
    author_name: String(formData.get("author_name") ?? "").trim(),
    author_role: String(formData.get("author_role") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    published: formData.get("published") === "on",
  };
  if (avatar && avatar.size > 0) {
    payload.avatar_path = await uploadToMedia(avatar, "avatars");
  } else if (formData.get("avatar_remove") === "true") {
    payload.avatar_path = null;
  }
  const { error } = id
    ? await supabase.from("testimonials").update(payload).eq("id", id)
    : await supabase.from("testimonials").insert(payload);
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  revalidatePath("/cms/testimonials");
}

export async function deleteTestimonial(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  revalidatePath("/cms/testimonials");
}

export async function upsertSocial(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const payload = {
    platform: String(formData.get("platform") ?? "").trim(),
    label: String(formData.get("label") ?? "").trim(),
    url: String(formData.get("url") ?? "").trim(),
    icon_key: String(formData.get("icon_key") ?? "github"),
    placement: String(formData.get("placement") ?? "all"),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    published: formData.get("published") === "on",
  };
  const { error } = id
    ? await supabase.from("social_links").update(payload).eq("id", id)
    : await supabase.from("social_links").insert(payload);
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  revalidatePath("/contact");
  revalidatePath("/cms/social");
}

export async function deleteSocial(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("social_links").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  revalidatePath("/contact");
  revalidatePath("/cms/social");
}

export async function markMessageRead(id: string, read: boolean) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("messages").update({ read }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/cms/messages");
}

export async function deleteMessage(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("messages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/cms/messages");
}
