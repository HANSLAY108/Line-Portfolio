import { cacheLife, cacheTag } from "next/cache";
import {
  fallbackCertificates,
  fallbackEducations,
  fallbackProjects,
  fallbackSettings,
  fallbackSkills,
  fallbackSocials,
  fallbackTestimonials,
} from "./fallbacks";
import { createAnonClient } from "./supabase";
import type {
  Certificate,
  Education,
  ProjectRow,
  SiteContent,
  SiteSettings,
  Skill,
  SocialLink,
  Testimonial,
} from "./types";

async function loadPublishedContent(): Promise<SiteContent> {
  const supabase = createAnonClient();
  if (!supabase) {
    return {
      settings: fallbackSettings,
      skills: fallbackSkills,
      testimonials: fallbackTestimonials,
      projects: fallbackProjects,
      socials: fallbackSocials,
      educations: fallbackEducations,
      certificates: fallbackCertificates,
    };
  }

  try {
    const [
      settingsRes,
      skillsRes,
      testimonialsRes,
      projectsRes,
      socialsRes,
      educationsRes,
      certificatesRes,
    ] = await Promise.all([
      supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
      supabase.from("skills").select("*").eq("published", true).order("sort_order"),
      supabase
        .from("testimonials")
        .select("*")
        .eq("published", true)
        .order("sort_order"),
      supabase.from("projects").select("*").eq("published", true).order("sort_order"),
      supabase
        .from("social_links")
        .select("*")
        .eq("published", true)
        .order("sort_order"),
      supabase
        .from("educations")
        .select("*")
        .eq("published", true)
        .order("sort_order"),
      supabase
        .from("certificates")
        .select("*")
        .eq("published", true)
        .order("sort_order"),
    ]);

    return {
      settings: (settingsRes?.data as SiteSettings | null) ?? fallbackSettings,
      skills: (skillsRes?.data as Skill[] | null)?.length
        ? (skillsRes.data as Skill[])
        : fallbackSkills,
      testimonials: (testimonialsRes?.data as Testimonial[] | null)?.length
        ? (testimonialsRes.data as Testimonial[])
        : fallbackTestimonials,
      projects: (projectsRes?.data as ProjectRow[] | null)?.length
        ? (projectsRes.data as ProjectRow[])
        : fallbackProjects,
      socials: (socialsRes?.data as SocialLink[] | null)?.length
        ? (socialsRes.data as SocialLink[])
        : fallbackSocials,
      educations: (educationsRes?.data as Education[] | null)?.length
        ? (educationsRes.data as Education[])
        : fallbackEducations,
      certificates: (certificatesRes?.data as Certificate[] | null)?.length
        ? (certificatesRes.data as Certificate[])
        : fallbackCertificates,
    };
  } catch {
    return {
      settings: fallbackSettings,
      skills: fallbackSkills,
      testimonials: fallbackTestimonials,
      projects: fallbackProjects,
      socials: fallbackSocials,
      educations: fallbackEducations,
      certificates: fallbackCertificates,
    };
  }
}

export async function getPublishedContent(): Promise<SiteContent> {
  "use cache";
  cacheTag("site-content");
  cacheLife("minutes");
  return loadPublishedContent();
}

export function pickSocials(
  socials: SocialLink[],
  placement: SocialLink["placement"],
) {
  return socials.filter(
    (item) => item.placement === placement || item.placement === "all",
  );
}
