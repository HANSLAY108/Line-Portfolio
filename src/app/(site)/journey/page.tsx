import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import JourneyTimeline from "@/components/JourneyTimeline";
import CertificatesGallery from "@/components/CertificatesGallery";
import { ArrowRightIcon, DownloadIcon } from "@/components/icons";
import { getPublishedContent } from "@/lib/content";
import { publicMediaUrl } from "@/lib/media";
import { T } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Journey — Line Morelle",
  description:
    "Explore the educational journey, academic computer science degrees, and industry-standard certifications of Line Morelle.",
};

export default async function JourneyPage() {
  const { settings, educations = [], certificates = [] } = await getPublishedContent();
  const s = settings!;
  const cvHref = publicMediaUrl(s.cv_path) ?? "/Line-Morelle-CV.pdf";

  // Filter only published entries for the public site
  const publishedEducations = educations.filter((e) => e.published);
  const publishedCertificates = certificates.filter((c) => c.published);

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="mx-auto max-w-[1120px] px-6 pb-12 pt-14 text-center lg:px-8 lg:pt-20">
        <FadeIn direction="up">
          <span className="inline-flex rounded-full bg-accent-soft px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-text">
            <T k="journey_page.badge">03 / Educational Journey &amp; Credentials</T>
          </span>

          <h1 className="mt-6 font-serif text-[2.5rem] font-medium leading-[1.15] tracking-tight text-foreground sm:text-[3.25rem] lg:text-[3.75rem]">
            <T k="journey_page.heading_before">Academic Rigor &amp;</T>{" "}
            <span className="font-serif italic font-medium text-accent-text">
              <T k="journey_page.heading_accent">Continuous</T>
            </span>{" "}
            <T k="journey_page.heading_after">Mastery.</T>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.7] text-muted">
            <T k="journey_page.intro">
              A chronicle of formal computer science foundations, systems research, and industry-validated certifications that cultivate my architectural intuition.
            </T>
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-accent-hover shadow-xs"
            >
              <DownloadIcon className="h-4 w-4" />
              <T k="journey_page.downloadCv">Download Resume (PDF)</T>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-6 py-3 text-[14px] font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-neutral-50 shadow-xs"
            >
              <T k="journey_page.contactPrompt">Discuss an Engagement</T>
              <ArrowRightIcon className="h-3.5 w-3.5 text-accent-text" />
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ── Key Highlights Row ── */}
      <section className="mx-auto max-w-[1120px] px-6 pb-16 lg:px-8">
        <FadeIn direction="up">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs text-center sm:text-left">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-text">
                Academic Degrees
              </span>
              <p className="mt-2 font-serif text-[1.8rem] font-medium text-foreground">
                <T k="journey_page.stats_degree">M.Sc. &amp; B.Sc.</T>
              </p>
              <p className="mt-1 text-[13px] text-muted">
                <T k="journey_page.stats_degree_desc">Computer Science &amp; Distributed Systems</T>
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs text-center sm:text-left">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-text">
                Alma Mater
              </span>
              <p className="mt-2 font-serif text-[1.8rem] font-medium text-foreground">
                <T k="journey_page.stats_alumni">ETH Zürich &amp; EPFL</T>
              </p>
              <p className="mt-1 text-[13px] text-muted">
                <T k="journey_page.stats_alumni_desc">Swiss Federal Institutes of Technology</T>
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs text-center sm:text-left sm:col-span-2 lg:col-span-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-text">
                Accreditations
              </span>
              <p className="mt-2 font-serif text-[1.8rem] font-medium text-foreground">
                <T k="journey_page.stats_certs">5+ Verified Credentials</T>
              </p>
              <p className="mt-1 text-[13px] text-muted">
                <T k="journey_page.stats_certs_desc">AWS Pro, Kubernetes CKA, GCP Architect</T>
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Section 1: Academic Milestones Timeline ── */}
      <section className="mx-auto max-w-[1120px] px-6 py-12 lg:px-8 lg:py-16">
        <FadeIn direction="up">
          <div className="mb-10 max-w-2xl">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-text">
              01 / Foundation
            </span>
            <h2 className="mt-2 font-serif text-[2.2rem] font-medium tracking-tight text-foreground sm:text-[2.6rem]">
              <T k="journey_page.education_section_title">Academic Foundations</T>
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              <T k="journey_page.education_section_subtitle">
                Theoretical rigor, algorithmic foundations, and distributed computing architectures from world-class research institutions.
              </T>
            </p>
          </div>

          <JourneyTimeline educations={publishedEducations} />
        </FadeIn>
      </section>

      {/* ── Section 2: Verified Certifications & Credentials ── */}
      <section className="mx-auto max-w-[1120px] px-6 py-16 lg:px-8 lg:py-24 border-t border-border">
        <FadeIn direction="up">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-text">
              02 / Accreditations
            </span>
            <h2 className="mt-2 font-serif text-[2.2rem] font-medium tracking-tight text-foreground sm:text-[2.75rem]">
              <T k="journey_page.certificates_section_title">Verified Certifications</T>
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              <T k="journey_page.certificates_section_subtitle">
                Professional cloud architect accreditations, container orchestration mastery, and specialized credentials.
              </T>
            </p>
          </div>

          <CertificatesGallery certificates={publishedCertificates} />
        </FadeIn>
      </section>

      {/* ── Section 3: Engineering Mindset & Pillars ── */}
      <section className="mx-auto max-w-[1120px] px-6 py-16 lg:px-8 lg:py-24 border-t border-border">
        <FadeIn direction="up">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-text">
                Philosophy
              </span>
              <h2 className="mt-3 font-serif text-[2.2rem] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[2.75rem]">
                <T k="journey_page.philosophy_title">The Engineering Mindset</T>
              </h2>
              <p className="mt-6 text-[16px] leading-[1.75] text-muted">
                <T k="journey_page.philosophy_body">
                  Frameworks and libraries fluctuate, but the foundational laws of computer science—distributed consensus, algorithmic bounds, memory cache locality, and clean concurrency—remain unyielding. My education informs every architecture I build.
                </T>
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-xs">
                <h3 className="font-serif text-lg font-medium text-foreground">
                  <T k="journey_page.pillar1_title">Mathematical Foundations</T>
                </h3>
                <p className="mt-1.5 text-sm text-muted leading-relaxed">
                  <T k="journey_page.pillar1_desc">
                    Formally reasoning about state invariants, concurrency safety, and system correctness.
                  </T>
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white p-6 shadow-xs">
                <h3 className="font-serif text-lg font-medium text-foreground">
                  <T k="journey_page.pillar2_title">Empirical Verification</T>
                </h3>
                <p className="mt-1.5 text-sm text-muted leading-relaxed">
                  <T k="journey_page.pillar2_desc">
                    Benchmarking under real saturation, observing tail latencies, and profiling resource bottlenecks.
                  </T>
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white p-6 shadow-xs">
                <h3 className="font-serif text-lg font-medium text-foreground">
                  <T k="journey_page.pillar3_title">Swiss Craftsmanship</T>
                </h3>
                <p className="mt-1.5 text-sm text-muted leading-relaxed">
                  <T k="journey_page.pillar3_desc">
                    Restraint, reliability, and precision engineered into every layer of software.
                  </T>
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Section 4: Bottom CTA Banner ── */}
      <section className="mx-auto max-w-[1120px] px-6 pb-24 pt-8 lg:px-8">
        <FadeIn direction="up">
          <div className="rounded-3xl border border-border bg-accent-soft p-8 text-center sm:p-12 lg:p-16">
            <h2 className="font-serif text-[2.2rem] font-medium leading-[1.2] text-foreground sm:text-[2.75rem]">
              Let&apos;s build something <span className="italic-accent">enduring</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              Whether you need strategic software architecture, high-concurrency systems design, or an audit of your cloud infrastructure.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-lg bg-accent px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-accent-hover shadow-xs"
              >
                Start a Conversation
              </Link>
              <Link
                href="/projects"
                className="rounded-lg border border-border bg-white px-6 py-3 text-[14px] font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-neutral-50 shadow-xs"
              >
                Explore Projects
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
