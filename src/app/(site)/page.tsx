import type { Metadata } from "next";
import Link from "next/link";
import MediaFrame from "@/components/MediaFrame";
import FadeIn from "@/components/FadeIn";
import { UserIcon, ArrowRightIcon } from "@/components/icons";
import { getPublishedContent, pickSocials } from "@/lib/content";
import { skillIcon, socialIcon } from "@/lib/icons-map";
import { publicMediaUrl } from "@/lib/supabase";
import { T } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Line Morelle — Software Engineer",
  description:
    "Line Morelle architects high-performance web applications and scalable systems with a focus on minimalist aesthetics and robust engineering.",
};

export default async function Home() {
  const { settings, skills, testimonials, projects, socials } =
    await getPublishedContent();
  const s = settings!;
  const expertise = skills.filter((item) => item.section === "expertise");
  const quote = testimonials[0];
  const featured =
    projects.find((project) => project.featured) ?? projects[0];
  const secondary = projects
    .filter((project) => project.id !== featured?.id)
    .slice(0, 2);
  const ctaSocials = pickSocials(socials, "cta").filter(
    (item) => item.icon_key !== "twitter",
  );

  return (
    <>
      <section className="mx-auto max-w-[1120px] px-6 pb-20 pt-14 lg:px-8 lg:pb-28 lg:pt-20">
        <FadeIn direction="up" duration={700}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-xl">
              <span className="inline-flex rounded-md bg-accent-soft px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-text">
                <T k="hero.badge">{s.hero_badge}</T>
              </span>

              <h1 className="mt-6 font-serif text-[2.5rem] font-medium leading-[1.15] tracking-tight text-foreground sm:text-[3.25rem] lg:text-[3.5rem]">
                <T k="hero.heading_before">{s.hero_heading_before}</T>{" "}
                <span className="italic-accent">
                  <T k="hero.heading_accent">{s.hero_heading_accent}</T>
                </span>{" "}
                <T k="hero.heading_after">{s.hero_heading_after}</T>
              </h1>

              <p className="mt-6 max-w-md text-[16px] leading-[1.7] text-muted">
                <T k="hero.body">{s.hero_body}</T>
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-[14px] font-medium text-white transition-all hover:bg-accent-hover hover:shadow-md"
                >
                  <T k="hero.viewProjects">View Projects</T>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-foreground/15 bg-transparent px-6 py-3 text-[14px] font-medium text-foreground transition-colors hover:bg-foreground/5"
                >
                  <T k="hero.getInTouch">Get in Touch</T>
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
              <div className="overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:scale-[1.01]">
                <MediaFrame
                  src={publicMediaUrl(s.portrait_path)}
                  alt={`${s.display_name} portrait`}
                  placeholderLabel="Portrait placeholder"
                  className="aspect-[4/5] w-full"
                />
              </div>
              {s.available && (
                <div className="absolute bottom-5 left-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.1)] sm:left-5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground">
                    <T k="hero.available">{s.available_label}</T>
                  </span>
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 py-16 lg:px-8 lg:py-24">
        <FadeIn direction="up">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-text">
            <T k="expertise.label">{s.expertise_label}</T>
          </p>
          <h2 className="mt-3 font-serif text-[2rem] font-medium tracking-tight text-foreground sm:text-[2.5rem]">
            <T k="expertise.heading">{s.expertise_heading}</T>
          </h2>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.35fr_0.9fr] lg:items-stretch lg:gap-10">
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {expertise.map((item) => {
                const Icon = skillIcon(item.icon_key);
                return (
                  <div key={item.id} className="transition-transform duration-300 hover:translate-y-[-2px]">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-icon-bg text-icon-stroke">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-[1.15rem] font-medium text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.65] text-muted">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {quote && (
              <div className="flex flex-col justify-between rounded-2xl bg-white p-8 ring-1 ring-border/80 shadow-sm lg:p-10">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-text">
                  <T k="quote.label">Client Endorsement</T>
                </span>
                <blockquote className="my-6 font-serif text-[1.2rem] font-medium leading-[1.4] text-foreground sm:text-[1.3rem]">
                  &ldquo;{quote.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-foreground">
                      {quote.author_name}
                    </p>
                    <p className="text-[12px] text-muted">
                      {quote.author_role}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 py-16 lg:px-8 lg:py-24">
        <FadeIn direction="up">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-text">
            <T k="featured.label">{s.portfolio_label}</T>
          </p>
          <h2 className="mt-3 font-serif text-[2rem] font-medium tracking-tight text-foreground sm:text-[2.5rem]">
            <T k="featured.heading">{s.portfolio_heading}</T>
          </h2>

          {featured && (() => {
            const isFeaturedExternal = Boolean(
              featured.live_url && /^https?:\/\//.test(featured.live_url),
            );
            const featuredHref = featured.live_url || `/projects/${featured.slug}`;

            return (
              <div className="mt-12 overflow-hidden rounded-3xl bg-white p-8 ring-1 ring-border shadow-sm sm:p-10 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                <div>
                  <span className="inline-flex rounded-full bg-accent-soft px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-text">
                    Featured Project · {featured.category}
                  </span>
                  <h3 className="mt-5 font-serif text-[2rem] font-medium tracking-tight text-foreground">
                    {isFeaturedExternal ? (
                      <a
                        href={featuredHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-accent-text"
                      >
                        {featured.title}
                      </a>
                    ) : (
                      <Link
                        href={featuredHref}
                        className="transition-colors hover:text-accent-text"
                      >
                        {featured.title}
                      </Link>
                    )}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.7] text-muted">
                    {featured.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    {isFeaturedExternal ? (
                      <>
                        <a
                          href={featured.live_url!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-accent-hover"
                        >
                          View Live Project
                          <ArrowRightIcon className="h-4 w-4" />
                        </a>
                        <Link
                          href={`/projects/${featured.slug}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-5 py-2.5 text-[13px] font-medium text-foreground transition-colors hover:bg-accent-soft hover:text-accent-text"
                        >
                          Case Study
                        </Link>
                      </>
                    ) : (
                      <Link
                        href={`/projects/${featured.slug}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-accent-hover"
                      >
                        Explore Project
                        <ArrowRightIcon className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>

                <div className="mt-8 overflow-hidden rounded-2xl shadow-md lg:mt-0">
                  {isFeaturedExternal ? (
                    <a
                      href={featuredHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <MediaFrame
                        src={publicMediaUrl(featured.cover_path)}
                        alt={featured.title}
                        placeholderLabel={featured.title}
                        className="aspect-[16/11] w-full transition-transform duration-500 hover:scale-[1.02]"
                      />
                    </a>
                  ) : (
                    <Link href={featuredHref} className="block">
                      <MediaFrame
                        src={publicMediaUrl(featured.cover_path)}
                        alt={featured.title}
                        placeholderLabel={featured.title}
                        className="aspect-[16/11] w-full transition-transform duration-500 hover:scale-[1.02]"
                      />
                    </Link>
                  )}
                </div>
              </div>
            );
          })()}

          {secondary.length > 0 && (
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {secondary.map((project) => {
                const isSecExternal = Boolean(
                  project.live_url && /^https?:\/\//.test(project.live_url),
                );
                const secHref = project.live_url || `/projects/${project.slug}`;

                return (
                  <div
                    key={project.id}
                    className="group flex flex-col justify-between rounded-2xl bg-white p-7 ring-1 ring-border shadow-sm transition-transform duration-300 hover:translate-y-[-2px]"
                  >
                    <div>
                      {isSecExternal ? (
                        <a
                          href={secHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block overflow-hidden rounded-xl"
                        >
                          <MediaFrame
                            src={publicMediaUrl(project.cover_path)}
                            alt={project.title}
                            placeholderLabel={project.title}
                            className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-105"
                          />
                        </a>
                      ) : (
                        <Link
                          href={secHref}
                          className="block overflow-hidden rounded-xl"
                        >
                          <MediaFrame
                            src={publicMediaUrl(project.cover_path)}
                            alt={project.title}
                            placeholderLabel={project.title}
                            className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-105"
                          />
                        </Link>
                      )}
                      <span className="mt-5 inline-block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-text">
                        {project.category}
                      </span>
                      <h3 className="mt-2 font-serif text-[1.4rem] font-medium text-foreground">
                        {isSecExternal ? (
                          <a
                            href={secHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-accent-text"
                          >
                            {project.title}
                          </a>
                        ) : (
                          <Link
                            href={secHref}
                            className="transition-colors hover:text-accent-text"
                          >
                            {project.title}
                          </Link>
                        )}
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.65] text-muted">
                        {project.summary}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                      <span className="text-[12px] font-medium text-muted">
                        {project.tags.slice(0, 3).join(" · ")}
                      </span>
                      {isSecExternal ? (
                        <div className="flex items-center gap-3">
                          <a
                            href={secHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent-text transition-colors hover:text-foreground"
                          >
                            View Live
                            <ArrowRightIcon className="h-3.5 w-3.5" />
                          </a>
                          <Link
                            href={`/projects/${project.slug}`}
                            className="text-[12px] font-medium text-muted hover:text-foreground"
                          >
                            Details
                          </Link>
                        </div>
                      ) : (
                        <Link
                          href={secHref}
                          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent-text transition-colors hover:text-foreground"
                        >
                          Explore Project
                          <ArrowRightIcon className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-6 py-3 text-[14px] font-medium text-foreground transition-colors hover:bg-accent-soft hover:border-accent-text/30"
            >
              <T k="featured.allProjects">View All Projects</T>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 py-16 lg:px-8 lg:py-24">
        <FadeIn direction="up">
          <div className="rounded-3xl bg-[#eef0f3] p-8 text-center sm:p-14 lg:p-20">
            <h2 className="font-serif text-[2.2rem] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[3rem]">
              <T k="home_cta.heading_before">{s.home_cta_heading_before}</T>{" "}
              <span className="italic-accent">
                <T k="home_cta.heading_accent">{s.home_cta_heading_accent}</T>
              </span>{" "}
              <T k="home_cta.heading_after">{s.home_cta_heading_after}</T>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-[16px] leading-[1.7] text-muted">
              <T k="home_cta.body">{s.home_cta_body}</T>
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-7 py-3.5 text-[14px] font-medium text-white transition-all hover:bg-accent-hover hover:shadow-md"
              >
                <T k="home_cta.button">{s.home_cta_button || "Start a Conversation"}</T>
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

            {ctaSocials.length > 0 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-foreground/10 pt-8">
                {ctaSocials.map((social) => {
                  const Icon = socialIcon(social.icon_key);
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-foreground"
                    >
                      <Icon className="h-4 w-4" />
                      {social.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </FadeIn>
      </section>
    </>
  );
}
