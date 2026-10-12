"use server";

import { revalidatePath, updateTag } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { uploadToMedia } from "./upload";

function str(form: FormData, key: string) {
  const value = String(form.get(key) ?? "").trim();
  return value.length ? value : null;
}

async function patchSettings(patch: Record<string, unknown>) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("site_settings").update(patch).eq("id", 1);
  if (error) throw new Error(error.message);
  updateTag("site-content");
  revalidatePath("/", "layout");
}

export async function saveHome(formData: FormData) {
  const portrait = formData.get("portrait") as File | null;
  const portraitRemove = formData.get("portrait_remove") === "true";

  const patch: Record<string, unknown> = {
    hero_badge: str(formData, "hero_badge"),
    hero_heading_before: str(formData, "hero_heading_before"),
    hero_heading_accent: str(formData, "hero_heading_accent"),
    hero_heading_after: str(formData, "hero_heading_after"),
    hero_body: str(formData, "hero_body"),
    available: formData.get("available") === "on",
    available_label: str(formData, "available_label"),
    expertise_label: str(formData, "expertise_label"),
    expertise_heading: str(formData, "expertise_heading"),
    portfolio_label: str(formData, "portfolio_label"),
    portfolio_heading: str(formData, "portfolio_heading"),
    home_cta_heading_before: str(formData, "home_cta_heading_before"),
    home_cta_heading_accent: str(formData, "home_cta_heading_accent"),
    home_cta_heading_after: str(formData, "home_cta_heading_after"),
    home_cta_body: str(formData, "home_cta_body"),
    home_cta_button: str(formData, "home_cta_button"),
  };

  if (portrait && portrait.size > 0) {
    patch.portrait_path = await uploadToMedia(portrait, "portraits");
  } else if (portraitRemove) {
    patch.portrait_path = null;
  }

  await patchSettings(patch);
  revalidatePath("/", "layout");
  revalidatePath("/cms/home");
}

export async function saveContact(formData: FormData) {
  const contactPortrait = formData.get("contact_portrait") as File | null;
  const contactPortraitRemove = formData.get("contact_portrait_remove") === "true";

  const patch: Record<string, unknown> = {
    contact_eyebrow: str(formData, "contact_eyebrow"),
    contact_heading_before: str(formData, "contact_heading_before"),
    contact_heading_accent: str(formData, "contact_heading_accent"),
    contact_intro: str(formData, "contact_intro"),
    form_heading: str(formData, "form_heading"),
    form_intro: str(formData, "form_intro"),
    contact_stack_prompt: str(formData, "contact_stack_prompt"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    location: str(formData, "location"),
  };

  let uploadedPath: string | null = null;
  if (contactPortrait && contactPortrait.size > 0) {
    uploadedPath = await uploadToMedia(contactPortrait, "contact");
  }

  const { supabase } = await requireAdmin();

  if (uploadedPath) {
    const testPatch = { ...patch, contact_portrait_path: uploadedPath };
    const { error } = await supabase.from("site_settings").update(testPatch).eq("id", 1);
    if (error && error.message.includes("contact_portrait_path")) {
      patch.portrait_path = uploadedPath;
      await patchSettings(patch);
    } else if (error) {
      throw new Error(error.message);
    }
  } else if (contactPortraitRemove) {
    const testPatch = { ...patch, contact_portrait_path: null };
    const { error } = await supabase.from("site_settings").update(testPatch).eq("id", 1);
    if (error && error.message.includes("contact_portrait_path")) {
      patch.portrait_path = null;
      await patchSettings(patch);
    } else if (error) {
      throw new Error(error.message);
    }
  } else {
    await patchSettings(patch);
  }

  revalidatePath("/", "layout");
  revalidatePath("/cms/contact");
}

export async function saveProjectsPage(formData: FormData) {
  const philosophyImage = formData.get("philosophy_image") as File | null;
  const philosophyRemove = formData.get("philosophy_image_remove") === "true";
  const cv = formData.get("cv") as File | null;
  const cvRemove = formData.get("cv_remove") === "true";

  const patch: Record<string, unknown> = {
    projects_badge: str(formData, "projects_badge"),
    projects_heading_before: str(formData, "projects_heading_before"),
    projects_heading_accent: str(formData, "projects_heading_accent"),
    projects_heading_after: str(formData, "projects_heading_after"),
    projects_intro: str(formData, "projects_intro"),
    archive_label: str(formData, "archive_label"),
    archive_link_label: str(formData, "archive_link_label"),
    github_archive_url: str(formData, "github_archive_url"),
    philosophy_label: str(formData, "philosophy_label"),
    philosophy_heading_before: str(formData, "philosophy_heading_before"),
    philosophy_heading_accent: str(formData, "philosophy_heading_accent"),
    philosophy_heading_after: str(formData, "philosophy_heading_after"),
    philosophy_body: str(formData, "philosophy_body"),
    philosophy_badge: str(formData, "philosophy_badge"),
    projects_cta_heading_before: str(formData, "projects_cta_heading_before"),
    projects_cta_heading_accent: str(formData, "projects_cta_heading_accent"),
    projects_cta_heading_after: str(formData, "projects_cta_heading_after"),
    projects_cta_body: str(formData, "projects_cta_body"),
  };

  if (philosophyImage && philosophyImage.size > 0) {
    patch.philosophy_image_path = await uploadToMedia(philosophyImage, "philosophy");
  } else if (philosophyRemove) {
    patch.philosophy_image_path = null;
  }

  if (cv && cv.size > 0) {
    patch.cv_path = await uploadToMedia(cv, "cv");
  } else if (cvRemove) {
    patch.cv_path = null;
  }

  await patchSettings(patch);
  revalidatePath("/", "layout");
  revalidatePath("/projects");
  revalidatePath("/cms/projects");
}

export async function saveSettings(formData: FormData) {
  const philosophyImage = formData.get("philosophy_image") as File | null;
  const philosophyRemove = formData.get("philosophy_image_remove") === "true";
  const cv = formData.get("cv") as File | null;
  const cvRemove = formData.get("cv_remove") === "true";

  const patch: Record<string, unknown> = {
    display_name: str(formData, "display_name") ?? "Line Morelle",
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    location: str(formData, "location"),
    projects_badge: str(formData, "projects_badge"),
    projects_heading_before: str(formData, "projects_heading_before"),
    projects_heading_accent: str(formData, "projects_heading_accent"),
    projects_heading_after: str(formData, "projects_heading_after"),
    projects_intro: str(formData, "projects_intro"),
    archive_label: str(formData, "archive_label"),
    archive_link_label: str(formData, "archive_link_label"),
    github_archive_url: str(formData, "github_archive_url"),
    philosophy_label: str(formData, "philosophy_label"),
    philosophy_heading_before: str(formData, "philosophy_heading_before"),
    philosophy_heading_accent: str(formData, "philosophy_heading_accent"),
    philosophy_heading_after: str(formData, "philosophy_heading_after"),
    philosophy_body: str(formData, "philosophy_body"),
    philosophy_badge: str(formData, "philosophy_badge"),
    projects_cta_heading_before: str(formData, "projects_cta_heading_before"),
    projects_cta_heading_accent: str(formData, "projects_cta_heading_accent"),
    projects_cta_heading_after: str(formData, "projects_cta_heading_after"),
    projects_cta_body: str(formData, "projects_cta_body"),
    contact_eyebrow: str(formData, "contact_eyebrow"),
    contact_heading_before: str(formData, "contact_heading_before"),
    contact_heading_accent: str(formData, "contact_heading_accent"),
    contact_intro: str(formData, "contact_intro"),
    form_heading: str(formData, "form_heading"),
    form_intro: str(formData, "form_intro"),
    contact_stack_prompt: str(formData, "contact_stack_prompt"),
  };

  if (philosophyImage && philosophyImage.size > 0) {
    patch.philosophy_image_path = await uploadToMedia(
      philosophyImage,
      "philosophy",
    );
  } else if (philosophyRemove) {
    patch.philosophy_image_path = null;
  }

  if (cv && cv.size > 0) {
    patch.cv_path = await uploadToMedia(cv, "cv");
  } else if (cvRemove) {
    patch.cv_path = null;
  }

  await patchSettings(patch);
  revalidatePath("/", "layout");
  revalidatePath("/projects");
  revalidatePath("/cms/settings");
}
