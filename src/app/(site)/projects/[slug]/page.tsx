import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import MediaFrame from "@/components/MediaFrame";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { getPublishedContent } from "@/lib/content";
import { publicMediaUrl } from "@/lib/supabase";
import { T } from "@/context/LanguageContext";

export const instant = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { projects } = await getPublishedContent();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { projects } = await getPublishedContent();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Line Morelle`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const { projects } = await getPublishedContent();
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const coverUrl = publicMediaUrl(project.cover_path);

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <>
      {/* Back link */}
      <div className="mx-auto max-w-[1120px] px-6 pt-10 lg:px-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <T k="projects_page.backToProjects">Back to Projects</T>
        </Link>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 pb-10 pt-8 lg:px-8">
        <FadeIn direction="up">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-accent-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-text">
              {project.category}
            </span>
            {project.filters.map((f) => (
              <span
                key={f}
                className="rounded-full border border-border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted"
              >
                {f}
              </span>
            ))}
          </div>

          <h1 className="mt-5 font-serif text-[2.5rem] font-medium leading-[1.15] tracking-tight text-foreground sm:text-[3.25rem] lg:text-[3.75rem]">
            {project.title}
          </h1>

          <p className="mt-5 max-w-2xl text-[17px] leading-[1.7] text-muted">
            {project.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[14px] font-medium text-white transition-all hover:bg-accent-hover hover:shadow-md"
              >
                <T k="projects_page.viewLive">View Live</T>
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            )}
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-transparent px-6 py-3 text-[14px] font-medium text-foreground transition-colors hover:bg-foreground/5"
              >
                <T k="projects_page.sourceCode">Source Code</T>
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </FadeIn>
      </section>

      {/* Cover image */}
      {coverUrl && (
        <section className="mx-auto max-w-[1120px] px-6 pb-14 lg:px-8">
          <FadeIn direction="up">
            <div className="overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
              <MediaFrame
                src={coverUrl}
                alt={project.title}
                className="aspect-[16/9] w-full"
              />
            </div>
          </FadeIn>
        </section>
      )}

      {/* Description + Tags */}
      <section className="mx-auto max-w-[1120px] px-6 pb-20 lg:px-8 lg:pb-24">
        <FadeIn direction="up">
          <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-20">
            <div>
              <h2 className="font-serif text-[1.5rem] font-medium tracking-tight text-foreground">
                <T k="projects_page.aboutProject">About this project</T>
              </h2>
              <p className="mt-4 text-[16px] leading-[1.8] text-muted whitespace-pre-line">
                {project.description}
              </p>
            </div>

            <aside className="space-y-8">
              {project.tags.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-light">
                    <T k="projects_page.techStack">Tech Stack</T>
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted shadow-sm"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-4">
                {project.live_url && (
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-light">
                      <T k="projects_page.liveUrl">Live URL</T>
                    </p>
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 block truncate text-[14px] font-medium text-accent-text transition-colors hover:text-foreground"
                    >
                      {project.live_url}
                    </a>
                  </div>
                )}
                {project.repo_url && (
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-light">
                      <T k="projects_page.repository">Repository</T>
                    </p>
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 block truncate text-[14px] font-medium text-accent-text transition-colors hover:text-foreground"
                    >
                      {project.repo_url}
                    </a>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </FadeIn>
      </section>

      {/* Project Navigation Footer */}
      <section className="mx-auto max-w-[1120px] border-t border-border px-6 py-12 lg:px-8">
        <FadeIn direction="up">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex items-center gap-3 text-left transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white text-muted transition-colors group-hover:border-foreground/30 group-hover:text-foreground">
                  <ArrowLeftIcon className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-light">
                    <T k="blog.previous">Previous</T>
                  </span>
                  <span className="font-serif text-[15px] font-medium text-foreground transition-colors group-hover:text-accent-text">
                    {prevProject.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/projects"
              className="rounded-full border border-border bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <T k="projects_page.allProjects">All Projects</T>
            </Link>

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex items-center gap-3 text-right transition-colors"
              >
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-light">
                    <T k="blog.next">Next</T>
                  </span>
                  <span className="font-serif text-[15px] font-medium text-foreground transition-colors group-hover:text-accent-text">
                    {nextProject.title}
                  </span>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white text-muted transition-colors group-hover:border-foreground/30 group-hover:text-foreground">
                  <ArrowRightIcon className="h-4 w-4" />
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </FadeIn>
      </section>
    </>
  );
}
