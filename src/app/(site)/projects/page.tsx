import type { Metadata } from "next";
import Link from "next/link";
import MediaFrame from "@/components/MediaFrame";
import FadeIn from "@/components/FadeIn";
import ProjectGrid from "@/components/ProjectGrid";
import { ArrowRightIcon, DownloadIcon } from "@/components/icons";
import { getPublishedContent } from "@/lib/content";
import { skillIcon } from "@/lib/icons-map";
import { publicMediaUrl } from "@/lib/supabase";
import { T } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Projects — Line Morelle",
  description:
    "Explore software architecture, distributed systems, and modern web applications engineered by Line Morelle.",
};

export default async function ProjectsPage() {
  const { settings, skills, projects } = await getPublishedContent();
  const s = settings!;
  const philosophy = skills.filter((item) => item.section === "philosophy");
  const cvHref = publicMediaUrl(s.cv_path) ?? "/Line-Morelle-CV.pdf";

  return (
    <>
      <section className="mx-auto max-w-[1120px] px-6 pb-6 pt-14 text-center lg:px-8 lg:pt-20">
        <FadeIn direction="up">
          <span className="inline-flex rounded-full bg-accent-soft px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-text">
            <T k="projects_page.badge">{s.projects_badge}</T>
          </span>

          <h1 className="mt-6 font-serif text-[2.5rem] font-medium leading-[1.15] tracking-tight text-foreground sm:text-[3.25rem] lg:text-[3.5rem]">
            <T k="projects_page.heading_before">{s.projects_heading_before}</T>{" "}
            <span className="font-serif italic font-medium text-accent-text">
              <T k="projects_page.heading_accent">{s.projects_heading_accent}</T>
            </span>{" "}
            <T k="projects_page.heading_after">{s.projects_heading_after}</T>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.7] text-muted">
            <T k="projects_page.intro">{s.projects_intro}</T>
          </p>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 pb-16 lg:px-8 lg:pb-20">
        <FadeIn direction="up">
          <ProjectGrid
            projects={projects.map((project) => ({
              title: project.title,
              slug: project.slug,
              category: project.category,
              filter: project.filters,
              description: project.description,
              tags: project.tags,
              imageLabel: project.title,
              coverUrl: publicMediaUrl(project.cover_path),
              href: project.live_url ?? project.repo_url,
            }))}
          />
        </FadeIn>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 pb-20 lg:px-8">
        <FadeIn direction="up">
          <div className="border-t border-border pt-10 text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted-light">
              <T k="projects_page.archiveLabel">{s.archive_label}</T>
            </p>
            {s.github_archive_url && (
              <a
                href={s.github_archive_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent-text transition-colors hover:text-foreground"
              >
                <T k="projects_page.archiveLink">{s.archive_link_label || "View Project"}</T>
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 py-16 lg:px-8 lg:py-24">
        <FadeIn direction="up">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-text">
                <T k="projects_page.philosophyLabel">{s.philosophy_label}</T>
              </span>
              <h2 className="mt-3 font-serif text-[2.2rem] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[2.75rem]">
                <T k="projects_page.philosophy_heading_before">{s.philosophy_heading_before}</T>{" "}
                <span className="italic-accent">
                  <T k="projects_page.philosophy_heading_accent">{s.philosophy_heading_accent}</T>
                </span>{" "}
                <T k="projects_page.philosophy_heading_after">{s.philosophy_heading_after}</T>
              </h2>
              <p className="mt-6 text-[16px] leading-[1.7] text-muted">
                <T k="projects_page.philosophy_body">{s.philosophy_body}</T>
              </p>

              <div className="mt-8 space-y-4">
                {philosophy.map((item) => {
                  const Icon = skillIcon(item.icon_key);
                  return (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-icon-bg text-icon-stroke">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-[13px] leading-relaxed text-muted">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={cvHref}
                  download="Line-Morelle-CV.pdf"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-[14px] font-medium text-white transition-all hover:bg-accent-hover hover:shadow-md"
                >
                  <DownloadIcon className="h-4 w-4" />
                  <T k="projects_page.downloadCv">Download Resume (PDF)</T>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-foreground/15 bg-transparent px-6 py-3 text-[14px] font-medium text-foreground transition-colors hover:bg-foreground/5"
                >
                  <T k="projects_page.bookCall">Book an Intro Call</T>
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[440px] lg:max-w-none">
              <div className="overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.1)]">
                <MediaFrame
                  src={publicMediaUrl(s.philosophy_image_path)}
                  alt="Architectural philosophy visual"
                  placeholderLabel="Explore Architecture"
                  className="aspect-[4/3] w-full"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-xl bg-white px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-text">
                  <T k="projects_page.systemDesign">01 / System Design</T>
                </p>
                <p className="mt-0.5 font-serif text-[15px] font-medium text-foreground">
                  <T k="projects_page.vitalsBadge">{s.philosophy_badge}</T>
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 pb-20 pt-8 lg:px-8 lg:pb-28">
        <FadeIn direction="up">
          <div className="rounded-3xl bg-[#eef0f3] p-8 text-center sm:p-14 lg:p-20">
            <h2 className="font-serif text-[2.2rem] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[3rem]">
              <T k="projects_page.cta_heading_before">{s.projects_cta_heading_before}</T>{" "}
              <span className="italic-accent">
                <T k="projects_page.cta_heading_accent">{s.projects_cta_heading_accent}</T>
              </span>{" "}
              <T k="projects_page.cta_heading_after">{s.projects_cta_heading_after}</T>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-[16px] leading-[1.7] text-muted">
              <T k="projects_page.cta_body">{s.projects_cta_body}</T>
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-7 py-3.5 text-[14px] font-medium text-white transition-all hover:bg-accent-hover hover:shadow-md"
              >
                <T k="projects_page.startProject">Start a Project</T>
              </Link>
              {s.email && (
                <a
                  href={`mailto:${s.email}`}
                  className="inline-flex items-center justify-center rounded-lg border border-foreground/15 bg-white px-7 py-3.5 text-[14px] font-medium text-foreground transition-colors hover:bg-foreground/5"
                >
                  <T k="home_cta.sendEmail">Send an Email</T>
                </a>
              )}
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}

