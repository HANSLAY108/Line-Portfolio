"use client";

import { useState } from "react";
import Link from "next/link";
import MediaFrame from "@/components/MediaFrame";
import { ArrowUpRightIcon } from "@/components/icons";
import { useLanguage } from "@/context/LanguageContext";

export type Project = {
  title: string;
  slug: string;
  category: string;
  filter: string[];
  description: string;
  tags: string[];
  imageLabel: string;
  coverUrl?: string | null;
  /** Link configured in CMS (live_url ?? repo_url) */
  href?: string | null;
};

const filters = [
  "ALL WORK",
  "FRONTEND",
  "SAAS",
  "E-COMMERCE",
  "SYSTEM DESIGN",
] as const;

type ProjectGridProps = {
  projects: Project[];
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const { t } = useLanguage();
  const [active, setActive] = useState<(typeof filters)[number]>("ALL WORK");

  const visible =
    active === "ALL WORK"
      ? projects
      : projects.filter((project) => project.filter.includes(active));

  return (
    <>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {filters.map((filter) => {
          const isActive = active === filter;
          const displayLabel =
            filter === "ALL WORK"
              ? t("projects_page.allFilter", "ALL WORK")
              : filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={`relative pb-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                isActive
                  ? "text-foreground"
                  : "text-muted-light hover:text-foreground"
              }`}
            >
              {displayLabel}
              {isActive && (
                <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {visible.map((project, idx) => {
          const internalHref = `/projects/${project.slug}`;
          const isExternal = Boolean(
            project.href &&
              (/^https?:\/\//.test(project.href) || project.href.startsWith("//")),
          );
          // If an external link was set in CMS, it is the primary destination
          const primaryHref = project.href || internalHref;

          return (
            <article
              key={`${active}-${project.title}`}
              className="group animate-fade-in"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              {/* Cover image */}
              {isExternal ? (
                <a
                  href={primaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    <MediaFrame
                      src={project.coverUrl}
                      alt={project.imageLabel}
                      placeholderLabel={project.imageLabel}
                      className="aspect-[16/11] w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground shadow-sm">
                      {project.category}
                    </span>
                  </div>
                </a>
              ) : (
                <Link href={internalHref} className="block">
                  <div className="relative overflow-hidden rounded-2xl">
                    <MediaFrame
                      src={project.coverUrl}
                      alt={project.imageLabel}
                      placeholderLabel={project.imageLabel}
                      className="aspect-[16/11] w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground shadow-sm">
                      {project.category}
                    </span>
                  </div>
                </Link>
              )}

              {/* Title & Link Arrow */}
              <div className="mt-5 flex items-start justify-between gap-4">
                {isExternal ? (
                  <a
                    href={primaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-[1.5rem] font-medium tracking-tight text-foreground transition-colors hover:text-accent-text"
                  >
                    {project.title}
                  </a>
                ) : (
                  <Link
                    href={internalHref}
                    className="font-serif text-[1.5rem] font-medium tracking-tight text-foreground transition-colors hover:text-accent-text"
                  >
                    {project.title}
                  </Link>
                )}

                {isExternal ? (
                  <a
                    href={primaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
                  >
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    href={internalHref}
                    aria-label={`View ${project.title}`}
                    className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors group-hover:text-foreground"
                  >
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </Link>
                )}
              </div>

              <p className="mt-3 text-[14px] leading-[1.7] text-muted">
                {project.description}
              </p>

              {/* Tags & Dual Action Links */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                {isExternal && (
                  <div className="flex items-center gap-3 text-[12px]">
                    <a
                      href={primaryHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-accent-text hover:underline"
                    >
                      {t("projects_page.liveSite", "Live site")}
                      <ArrowUpRightIcon className="h-3 w-3" />
                    </a>
                    <span className="text-border">·</span>
                    <Link
                      href={internalHref}
                      className="font-medium text-muted hover:text-foreground hover:underline"
                    >
                      {t("projects_page.details", "Details")}
                    </Link>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
