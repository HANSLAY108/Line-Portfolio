import { cacheLife, cacheTag } from "next/cache";
import {
  fallbackCertificates,
  fallbackEducations,
  fallbackProjects,
  fallbackServices,
  fallbackServicesPageContent,
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
  ServiceItem,
  ServicesPageContent,
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
      services: fallbackServices,
      servicesPage: fallbackServicesPageContent,
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
      servicesRes,
      servicesPageRes,
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
      supabase
        .from("services")
        .select("*")
        .eq("published", true)
        .order("sort_order"),
      supabase
        .from("services_page_content")
        .select("*")
        .eq("id", 1)
        .maybeSingle(),
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
      services: (servicesRes?.data as ServiceItem[] | null)?.length
        ? (servicesRes.data as ServiceItem[])
        : fallbackServices,
      servicesPage: (servicesPageRes?.data as ServicesPageContent | null)
        ? {
            ...fallbackServicesPageContent,
            ...(servicesPageRes.data as ServicesPageContent),
            steps: Array.isArray((servicesPageRes.data as ServicesPageContent).steps) &&
              (servicesPageRes.data as ServicesPageContent).steps.length > 0
              ? (servicesPageRes.data as ServicesPageContent).steps
              : fallbackServicesPageContent.steps,
            faqs: Array.isArray((servicesPageRes.data as ServicesPageContent).faqs) &&
              (servicesPageRes.data as ServicesPageContent).faqs.length > 0
              ? (servicesPageRes.data as ServicesPageContent).faqs
              : fallbackServicesPageContent.faqs,
          }
        : fallbackServicesPageContent,
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
      services: fallbackServices,
      servicesPage: fallbackServicesPageContent,
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
