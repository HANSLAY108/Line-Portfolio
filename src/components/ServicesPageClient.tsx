"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import FadeIn from "@/components/FadeIn";
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  SendIcon,
} from "@/components/icons";
import { serviceIcon } from "@/lib/icons-map";
import { useLanguage } from "@/context/LanguageContext";
import type { ServiceItem, ServicesPageContent } from "@/lib/types";

interface ServicesPageClientProps {
  services: ServiceItem[];
  pageContent: ServicesPageContent;
}

export default function ServicesPageClient({
  services,
  pageContent,
}: ServicesPageClientProps) {
  const { locale, t } = useLanguage();
  const isFr = locale === "fr";

  const [selectedService, setSelectedService] = useState<string>("");
  const [highlightSelect, setHighlightSelect] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [startedAt, setStartedAt] = useState<number | null>(null);

  const formSectionRef = useRef<HTMLElement | null>(null);
  const serviceSelectRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    setStartedAt(Date.now());
  }, []);

  const pick = (enVal: string | null | undefined, frVal: string | null | undefined) => {
    if (isFr && frVal && frVal.trim().length > 0) {
      return frVal;
    }
    return enVal ?? "";
  };

  function scrollToFormAndSelect(serviceTitleEn?: string) {
    if (serviceTitleEn) {
      setSelectedService(serviceTitleEn);
      setHighlightSelect(true);
      setTimeout(() => setHighlightSelect(false), 1800);
    }
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      if (serviceTitleEn) {
        setTimeout(() => {
          serviceSelectRef.current?.focus({ preventScroll: true });
        }, 650);
      }
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const fullName = String(data.get("fullName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const serviceNeeded = String(data.get("serviceNeeded") ?? selectedService).trim();
    const budgetRange = String(data.get("budgetRange") ?? "").trim();
    const timeline = String(data.get("timeline") ?? "").trim();
    const projectDetails = String(data.get("projectDetails") ?? "").trim();
    const companyWebsite = String(data.get("companyWebsite") ?? "").trim();
    const honeypot = String(data.get("fax_hp") ?? "").trim();

    // Client-side validation with translated messages
    if (fullName.length < 2 || fullName.length > 120) {
      setStatus("error");
      setErrorMessage(
        t(
          "services_page.error_name",
          "Please enter your full name (2 to 120 characters).",
        ),
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 160) {
      setStatus("error");
      setErrorMessage(
        t("services_page.error_email", "Please enter a valid email address."),
      );
      return;
    }

    if (!serviceNeeded) {
      setStatus("error");
      setErrorMessage(
        t("services_page.error_service", "Please select a service."),
      );
      return;
    }

    if (projectDetails.length < 15 || projectDetails.length > 5000) {
      setStatus("error");
      setErrorMessage(
        t(
          "services_page.error_details",
          "Please provide a few more details about your project (at least 15 characters).",
        ),
      );
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          serviceNeeded,
          budgetRange: budgetRange || null,
          timeline: timeline || null,
          projectDetails,
          companyWebsite: companyWebsite || null,
          honeypot,
          startedAt,
          locale,
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        code?: string;
      };

      if (!response.ok || !payload.ok) {
        setStatus("error");
        if (response.status === 429 || payload.code === "RATE_LIMIT") {
          setErrorMessage(
            t(
              "services_page.error_rate_limit",
              "Too many requests. Please wait a few minutes before submitting again.",
            ),
          );
        } else {
          setErrorMessage(
            payload.error ||
              t(
                "services_page.error_generic",
                "Something went wrong while sending your request. Please try again.",
              ),
          );
        }
        return;
      }

      form.reset();
      setSelectedService("");
      setStartedAt(Date.now());
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        t(
          "services_page.error_network",
          "Network error. Please check your connection and try again.",
        ),
      );
    }
  }

  return (
    <>
      {/* ── 1. HERO SECTION ── */}
      <section className="mx-auto max-w-[1120px] px-6 pb-12 pt-14 text-center lg:px-8 lg:pb-16 lg:pt-20">
        <FadeIn direction="up">
          <span className="inline-flex rounded-full bg-accent-soft px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-text">
            {pick(pageContent.hero_badge_en, pageContent.hero_badge_fr)}
          </span>

          <h1 className="mx-auto mt-6 max-w-3xl font-serif text-[2.5rem] font-medium leading-[1.15] tracking-tight text-foreground sm:text-[3.25rem] lg:text-[3.6rem]">
            {pick(pageContent.hero_title_before_en, pageContent.hero_title_before_fr)}{" "}
            <span className="font-serif italic font-medium text-accent-text">
              {pick(pageContent.hero_title_accent_en, pageContent.hero_title_accent_fr)}
            </span>{" "}
            {pick(pageContent.hero_title_after_en, pageContent.hero_title_after_fr)}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.7] text-muted">
            {pick(pageContent.hero_subtitle_en, pageContent.hero_subtitle_fr)}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollToFormAndSelect()}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-7 py-3.5 text-[14px] font-medium text-white transition-all hover:bg-accent-hover hover:shadow-md"
            >
              {pick(pageContent.hero_cta_en, pageContent.hero_cta_fr)}
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </FadeIn>
      </section>

      {/* ── 2. SERVICES GRID (8 CARDS) ── */}
      <section className="mx-auto max-w-[1120px] px-6 py-12 lg:px-8 lg:py-16">
        <FadeIn direction="up">
          <div className="mb-12 text-center sm:text-left">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-text">
              {t("services_page.grid_label", "Capabilities")}
            </p>
            <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <h2 className="font-serif text-[2rem] font-medium tracking-tight text-foreground sm:text-[2.5rem]">
                {t("services_page.grid_heading", "Tailored Engineering Services")}
              </h2>
              <p className="max-w-md text-[14px] leading-[1.65] text-muted">
                {t(
                  "services_page.grid_subtitle",
                  "End-to-end software development and architectural consulting designed for clarity, speed, and long-term maintainability.",
                )}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {services.map((service) => {
              const Icon = serviceIcon(service.icon_key);
              const title = pick(service.title_en, service.title_fr);
              const description = pick(
                service.description_en,
                service.description_fr,
              );
              const bullets =
                isFr &&
                Array.isArray(service.bullets_fr) &&
                service.bullets_fr.filter((b) => b.trim().length > 0).length > 0
                  ? service.bullets_fr
                  : service.bullets_en ?? [];

              return (
                <article
                  key={service.id}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-md sm:p-8"
                >
                  <div>
                    {/* Icon & Title */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-text transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-serif text-[1.35rem] font-medium leading-snug text-foreground transition-colors group-hover:text-accent-text">
                          {title}
                        </h3>
                        <p className="mt-2 text-[14px] leading-[1.65] text-muted">
                          {description}
                        </p>
                      </div>
                    </div>

                    {/* Included bullet points */}
                    {bullets.length > 0 && (
                      <div className="mt-6 border-t border-border/70 pt-5">
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-light">
                          {t("services_page.included_label", "What's included")}
                        </p>
                        <ul className="space-y-2.5">
                          {bullets.map((point, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-foreground/90"
                            >
                              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text">
                                <CheckIcon className="h-2.5 w-2.5" />
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Request this service link */}
                  <div className="mt-7 flex items-center justify-between border-t border-border/60 pt-4">
                    <button
                      type="button"
                      onClick={() => scrollToFormAndSelect(service.title_en)}
                      className="inline-flex cursor-pointer items-center gap-2 text-[13.5px] font-semibold text-accent-text transition-colors hover:text-foreground"
                    >
                      <span>
                        {t("services_page.request_service", "Request this service")}
                      </span>
                      <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </FadeIn>
      </section>

      {/* ── 3. HOW I WORK (4 STEPS) ── */}
      <section className="mx-auto max-w-[1120px] px-6 py-16 lg:px-8 lg:py-24 border-t border-border">
        <FadeIn direction="up">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-text">
              {pick(pageContent.process_badge_en, pageContent.process_badge_fr)}
            </span>
            <h2 className="mt-2 font-serif text-[2rem] font-medium tracking-tight text-foreground sm:text-[2.5rem]">
              {pick(pageContent.process_heading_en, pageContent.process_heading_fr)}
            </h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-muted">
              {pick(
                pageContent.process_subtitle_en,
                pageContent.process_subtitle_fr,
              )}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pageContent.steps.map((step, idx) => (
              <div
                key={idx}
                className="relative flex flex-col justify-between rounded-2xl border border-border bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-md sm:p-7"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft font-serif text-[15px] font-semibold text-accent-text">
                      {step.number || `0${idx + 1}`}
                    </span>
                    {idx < pageContent.steps.length - 1 && (
                      <span className="hidden text-border lg:inline-block">
                        <ArrowRightIcon className="h-4 w-4 text-muted-light/50" />
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 font-serif text-[1.3rem] font-medium text-foreground">
                    {pick(step.title_en, step.title_fr)}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-[1.7] text-muted">
                    {pick(step.description_en, step.description_fr)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── 4. FAQ SECTION ── */}
      <section className="mx-auto max-w-[1120px] px-6 py-16 lg:px-8 lg:py-24 border-t border-border">
        <FadeIn direction="up">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:items-start lg:gap-16">
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-text">
                {pick(pageContent.faq_badge_en, pageContent.faq_badge_fr)}
              </span>
              <h2 className="mt-2 font-serif text-[2rem] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[2.5rem]">
                {pick(pageContent.faq_heading_en, pageContent.faq_heading_fr)}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.7] text-muted">
                {pick(pageContent.faq_subtitle_en, pageContent.faq_subtitle_fr)}
              </p>
            </div>

            <div className="space-y-3.5">
              {pageContent.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`overflow-hidden rounded-2xl border bg-white transition-all ${
                      isOpen
                        ? "border-accent/50 shadow-sm"
                        : "border-border hover:border-foreground/20"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaqIndex(isOpen ? null : idx)
                      }
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-serif text-[1.1rem] font-medium text-foreground">
                        {pick(faq.question_en, faq.question_fr)}
                      </span>
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text transition-transform duration-200 ${
                          isOpen ? "rotate-180 bg-accent text-white" : ""
                        }`}
                      >
                        <ChevronDownIcon className="h-4 w-4" />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-border/60 px-6 pb-5 pt-4 text-[14px] leading-[1.75] text-muted animate-fade-in">
                        {pick(faq.answer_en, faq.answer_fr)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── 5. CALL-TO-ACTION SERVICE REQUEST FORM ── */}
      <section
        id="service-request-form"
        ref={formSectionRef}
        className="mx-auto max-w-[1120px] scroll-mt-24 px-6 pb-24 pt-8 lg:px-8 lg:pb-32"
      >
        <FadeIn direction="up">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-sm sm:p-12 lg:p-16">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex rounded-full bg-accent-soft px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-text">
                {t("services_page.form_badge", "Project Inquiry")}
              </span>
              <h2 className="mt-4 font-serif text-[2rem] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[2.6rem]">
                {t(
                  "services_page.form_title",
                  "Let's build something great together",
                )}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-muted">
                {t(
                  "services_page.form_subtitle",
                  "Tell me about your goals, timeline, and technical needs. I respond to all inquiries within 24 hours.",
                )}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mx-auto mt-10 max-w-3xl space-y-6"
            >
              {/* Honeypot field for spam protection */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="fax_hp">Fax</label>
                <input
                  id="fax_hp"
                  name="fax_hp"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Row 1: Full Name + Email */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
                  >
                    {t("services_page.full_name", "Full Name")} *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    maxLength={120}
                    placeholder={t(
                      "services_page.full_name_placeholder",
                      "Jane Doe",
                    )}
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-[14px] text-foreground outline-none transition-shadow placeholder:text-muted-light focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
                  >
                    {t("services_page.email", "Email Address")} *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={160}
                    placeholder={t(
                      "services_page.email_placeholder",
                      "jane@company.com",
                    )}
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-[14px] text-foreground outline-none transition-shadow placeholder:text-muted-light focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                  />
                </div>
              </div>

              {/* Row 2: Service Needed + Company/Website */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="serviceNeeded"
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
                  >
                    {t("services_page.service_needed", "Service Needed")} *
                  </label>
                  <select
                    id="serviceNeeded"
                    name="serviceNeeded"
                    ref={serviceSelectRef}
                    required
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-[14px] text-foreground outline-none transition-all focus:border-accent/50 focus:ring-2 focus:ring-accent/20 ${
                      highlightSelect
                        ? "border-accent ring-2 ring-accent/30 bg-accent-soft/20"
                        : "border-border"
                    }`}
                  >
                    <option value="">
                      {t(
                        "services_page.service_placeholder",
                        "Select a service...",
                      )}
                    </option>
                    {services.map((svc) => (
                      <option key={svc.id} value={svc.title_en}>
                        {pick(svc.title_en, svc.title_fr)}
                      </option>
                    ))}
                    <option value="Other">
                      {t("services_page.service_other", "Other")}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="companyWebsite"
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
                  >
                    {t(
                      "services_page.company_website",
                      "Company or Website (Optional)",
                    )}
                  </label>
                  <input
                    id="companyWebsite"
                    name="companyWebsite"
                    type="text"
                    maxLength={200}
                    placeholder={t(
                      "services_page.company_placeholder",
                      "Acme Inc. or https://acme.com",
                    )}
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-[14px] text-foreground outline-none transition-shadow placeholder:text-muted-light focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                  />
                </div>
              </div>

              {/* Row 3: Budget Range + Timeline */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="budgetRange"
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
                  >
                    {t("services_page.budget_range", "Budget Range (Optional)")}
                  </label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    defaultValue=""
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-[14px] text-foreground outline-none transition-shadow focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="">
                      {t(
                        "services_page.budget_placeholder",
                        "Select estimated budget...",
                      )}
                    </option>
                    <option value="Under $2,000">
                      {t("services_page.budget_under_2k", "Under $2,000")}
                    </option>
                    <option value="$2,000 – $5,000">
                      {t("services_page.budget_2k_5k", "$2,000 – $5,000")}
                    </option>
                    <option value="$5,000 – $10,000">
                      {t("services_page.budget_5k_10k", "$5,000 – $10,000")}
                    </option>
                    <option value="$10,000+">
                      {t("services_page.budget_10k_plus", "$10,000+")}
                    </option>
                    <option value="Flexible / Discuss">
                      {t(
                        "services_page.budget_discuss",
                        "Not sure yet / Let's discuss",
                      )}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="timeline"
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
                  >
                    {t("services_page.timeline", "Timeline (Optional)")}
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    defaultValue=""
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-[14px] text-foreground outline-none transition-shadow focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="">
                      {t(
                        "services_page.timeline_placeholder",
                        "Select preferred timeline...",
                      )}
                    </option>
                    <option value="ASAP">
                      {t("services_page.timeline_asap", "ASAP")}
                    </option>
                    <option value="1 month">
                      {t("services_page.timeline_1m", "1 month")}
                    </option>
                    <option value="2 to 3 months">
                      {t("services_page.timeline_2_3m", "2 to 3 months")}
                    </option>
                    <option value="Flexible">
                      {t("services_page.timeline_flexible", "Flexible")}
                    </option>
                  </select>
                </div>
              </div>

              {/* Row 4: Project Details */}
              <div>
                <label
                  htmlFor="projectDetails"
                  className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
                >
                  {t("services_page.project_details", "Project Details")} *
                </label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  rows={5}
                  required
                  maxLength={5000}
                  placeholder={t(
                    "services_page.project_details_placeholder",
                    "Describe your project scope, key features, target audience, or any specific technical requirements...",
                  )}
                  className="w-full resize-y rounded-xl border border-border bg-white px-4 py-3 text-[14px] text-foreground outline-none transition-shadow placeholder:text-muted-light focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-[14px] font-medium text-white transition-all hover:bg-accent-hover hover:shadow-md disabled:opacity-70"
                >
                  {status === "sending"
                    ? t("services_page.submitting", "Sending Request...")
                    : t("services_page.submit", "Submit Service Request")}
                  <SendIcon className="h-4 w-4" />
                </button>
              </div>

              {/* Status Feedback */}
              {status === "success" && (
                <div
                  className="animate-fade-in space-y-2 rounded-2xl bg-accent-soft/60 p-5 ring-1 ring-accent/30"
                  role="status"
                >
                  <p className="font-serif text-[17px] font-medium text-foreground">
                    {t(
                      "services_page.success_title",
                      "Service Request Received",
                    )}
                  </p>
                  <p className="text-[13.5px] leading-relaxed text-muted">
                    {t(
                      "services_page.success_body",
                      "Thank you for sharing your project details. I have received your inquiry and will get back to you within 24 hours.",
                    )}
                  </p>
                </div>
              )}

              {status === "error" && (
                <div
                  className="animate-fade-in rounded-xl border border-red-200 bg-red-50/70 px-4 py-3 text-[13.5px] text-red-700"
                  role="alert"
                >
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </FadeIn>
      </section>
    </>
  );
}

