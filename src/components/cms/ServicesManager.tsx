"use client";

import { useState, useTransition } from "react";
import {
  EditIcon,
  ExternalIcon,
  PlusIcon,
  SkillsIcon,
  TrashIcon,
} from "./CMSIcons";
import { Card, SaveButton, StatusBadge } from "./ui";
import { serviceIcon } from "@/lib/icons-map";
import type {
  ServiceFaqItem,
  ServiceItem,
  ServiceProcessStep,
  ServicesPageContent,
} from "@/lib/types";
import Link from "next/link";

const AVAILABLE_ICONS = [
  { key: "globe", label: "Globe (Websites)" },
  { key: "code", label: "Code (Web Apps)" },
  { key: "palette", label: "Palette (UI to Code)" },
  { key: "server", label: "Server (Backend & API)" },
  { key: "sliders", label: "Dashboard (CMS & Admin)" },
  { key: "shield", label: "Shield (Security & Audit)" },
  { key: "languages", label: "Languages (Multilingual)" },
  { key: "compass", label: "Compass (Consulting)" },
  { key: "monitor", label: "Monitor" },
  { key: "cloud", label: "Cloud" },
  { key: "chip", label: "Chip" },
  { key: "bolt", label: "Bolt" },
  { key: "layers", label: "Layers" },
  { key: "terminal", label: "Terminal" },
];

interface ServicesManagerProps {
  initialServices: ServiceItem[];
  pageContent: ServicesPageContent;
  upsertServiceAction: (formData: FormData) => Promise<void>;
  deleteServiceAction: (id: string) => Promise<void>;
  togglePublishedAction: (id: string, published: boolean) => Promise<void>;
  reorderServicesAction: (orderedIds: string[]) => Promise<void>;
  savePageContentAction: (formData: FormData) => Promise<void>;
}

export default function ServicesManager({
  initialServices,
  pageContent,
  upsertServiceAction,
  deleteServiceAction,
  togglePublishedAction,
  reorderServicesAction,
  savePageContentAction,
}: ServicesManagerProps) {
  const [activeSection, setActiveSection] = useState<"services" | "copy">(
    "services",
  );
  const [isPending, startTransition] = useTransition();

  // ── Services state ──
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [serviceLangTab, setServiceLangTab] = useState<"en" | "fr">("en");
  const [isTranslatingService, setIsTranslatingService] = useState(false);

  // Controlled form state for Add/Edit Service so EN/FR tabs & Translate button work seamlessly
  const [formId, setFormId] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formIconKey, setFormIconKey] = useState("globe");
  const [formSortOrder, setFormSortOrder] = useState(0);
  const [formPublished, setFormPublished] = useState(true);
  const [formTitleEn, setFormTitleEn] = useState("");
  const [formTitleFr, setFormTitleFr] = useState("");
  const [formDescEn, setFormDescEn] = useState("");
  const [formDescFr, setFormDescFr] = useState("");
  const [formBulletsEn, setFormBulletsEn] = useState("");
  const [formBulletsFr, setFormBulletsFr] = useState("");

  function openAddService() {
    setEditingService(null);
    setIsAddingService(true);
    setServiceLangTab("en");
    setFormId("");
    setFormSlug("");
    setFormIconKey("globe");
    setFormSortOrder(initialServices.length);
    setFormPublished(true);
    setFormTitleEn("");
    setFormTitleFr("");
    setFormDescEn("");
    setFormDescFr("");
    setFormBulletsEn("");
    setFormBulletsFr("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openEditService(svc: ServiceItem) {
    setIsAddingService(false);
    setEditingService(svc);
    setServiceLangTab("en");
    setFormId(svc.id);
    setFormSlug(svc.slug);
    setFormIconKey(svc.icon_key || "globe");
    setFormSortOrder(svc.sort_order ?? 0);
    setFormPublished(svc.published);
    setFormTitleEn(svc.title_en ?? "");
    setFormTitleFr(svc.title_fr ?? "");
    setFormDescEn(svc.description_en ?? "");
    setFormDescFr(svc.description_fr ?? "");
    setFormBulletsEn((svc.bullets_en ?? []).join("\n"));
    setFormBulletsFr((svc.bullets_fr ?? []).join("\n"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeServiceForm() {
    setIsAddingService(false);
    setEditingService(null);
  }

  async function handleTranslateServiceToFrench() {
    setIsTranslatingService(true);
    try {
      const bulletLines = formBulletsEn
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);
      const textsToTranslate = [formTitleEn, formDescEn, ...bulletLines];
      const res = await fetch("/api/cms/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: textsToTranslate }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        translations?: string[];
      };
      if (data.ok && Array.isArray(data.translations)) {
        const [tTitle, tDesc, ...tBullets] = data.translations;
        if (tTitle) setFormTitleFr(tTitle);
        if (tDesc) setFormDescFr(tDesc);
        if (tBullets.length > 0) setFormBulletsFr(tBullets.join("\n"));
        setServiceLangTab("fr");
      }
    } finally {
      setIsTranslatingService(false);
    }
  }

  function handleMoveService(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= initialServices.length) return;
    const next = [...initialServices];
    const [moved] = next.splice(index, 1);
    next.splice(targetIndex, 0, moved);
    const orderedIds = next.map((s) => s.id);
    startTransition(async () => {
      await reorderServicesAction(orderedIds);
    });
  }

  // ── Page Copy state (Hero, How I Work, FAQ) ──
  const [copyLangTab, setCopyLangTab] = useState<"en" | "fr">("en");
  const [isTranslatingCopy, setIsTranslatingCopy] = useState(false);
  const [copySavedMessage, setCopySavedMessage] = useState(false);

  const [heroBadgeEn, setHeroBadgeEn] = useState(pageContent.hero_badge_en ?? "");
  const [heroBadgeFr, setHeroBadgeFr] = useState(pageContent.hero_badge_fr ?? "");
  const [heroBeforeEn, setHeroBeforeEn] = useState(
    pageContent.hero_title_before_en ?? "",
  );
  const [heroBeforeFr, setHeroBeforeFr] = useState(
    pageContent.hero_title_before_fr ?? "",
  );
  const [heroAccentEn, setHeroAccentEn] = useState(
    pageContent.hero_title_accent_en ?? "",
  );
  const [heroAccentFr, setHeroAccentFr] = useState(
    pageContent.hero_title_accent_fr ?? "",
  );
  const [heroAfterEn, setHeroAfterEn] = useState(
    pageContent.hero_title_after_en ?? "",
  );
  const [heroAfterFr, setHeroAfterFr] = useState(
    pageContent.hero_title_after_fr ?? "",
  );
  const [heroSubtitleEn, setHeroSubtitleEn] = useState(
    pageContent.hero_subtitle_en ?? "",
  );
  const [heroSubtitleFr, setHeroSubtitleFr] = useState(
    pageContent.hero_subtitle_fr ?? "",
  );
  const [heroCtaEn, setHeroCtaEn] = useState(pageContent.hero_cta_en ?? "");
  const [heroCtaFr, setHeroCtaFr] = useState(pageContent.hero_cta_fr ?? "");

  const [processBadgeEn, setProcessBadgeEn] = useState(
    pageContent.process_badge_en ?? "",
  );
  const [processBadgeFr, setProcessBadgeFr] = useState(
    pageContent.process_badge_fr ?? "",
  );
  const [processHeadingEn, setProcessHeadingEn] = useState(
    pageContent.process_heading_en ?? "",
  );
  const [processHeadingFr, setProcessHeadingFr] = useState(
    pageContent.process_heading_fr ?? "",
  );
  const [processSubtitleEn, setProcessSubtitleEn] = useState(
    pageContent.process_subtitle_en ?? "",
  );
  const [processSubtitleFr, setProcessSubtitleFr] = useState(
    pageContent.process_subtitle_fr ?? "",
  );
  const [steps, setSteps] = useState<ServiceProcessStep[]>(
    pageContent.steps ?? [],
  );

  const [faqBadgeEn, setFaqBadgeEn] = useState(pageContent.faq_badge_en ?? "");
  const [faqBadgeFr, setFaqBadgeFr] = useState(pageContent.faq_badge_fr ?? "");
  const [faqHeadingEn, setFaqHeadingEn] = useState(
    pageContent.faq_heading_en ?? "",
  );
  const [faqHeadingFr, setFaqHeadingFr] = useState(
    pageContent.faq_heading_fr ?? "",
  );
  const [faqSubtitleEn, setFaqSubtitleEn] = useState(
    pageContent.faq_subtitle_en ?? "",
  );
  const [faqSubtitleFr, setFaqSubtitleFr] = useState(
    pageContent.faq_subtitle_fr ?? "",
  );
  const [faqs, setFaqs] = useState<ServiceFaqItem[]>(pageContent.faqs ?? []);

  async function handleTranslatePageCopyToFrench() {
    setIsTranslatingCopy(true);
    try {
      const texts: string[] = [
        heroBadgeEn,
        heroBeforeEn,
        heroAccentEn,
        heroAfterEn,
        heroSubtitleEn,
        heroCtaEn,
        processBadgeEn,
        processHeadingEn,
        processSubtitleEn,
        faqBadgeEn,
        faqHeadingEn,
        faqSubtitleEn,
      ];

      steps.forEach((s) => {
        texts.push(s.title_en, s.description_en);
      });
      faqs.forEach((f) => {
        texts.push(f.question_en, f.answer_en);
      });

      const res = await fetch("/api/cms/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        translations?: string[];
      };

      if (data.ok && Array.isArray(data.translations)) {
        let cursor = 0;
        const nextVal = () => data.translations![cursor++] ?? "";

        setHeroBadgeFr(nextVal());
        setHeroBeforeFr(nextVal());
        setHeroAccentFr(nextVal());
        setHeroAfterFr(nextVal());
        setHeroSubtitleFr(nextVal());
        setHeroCtaFr(nextVal());
        setProcessBadgeFr(nextVal());
        setProcessHeadingFr(nextVal());
        setProcessSubtitleFr(nextVal());
        setFaqBadgeFr(nextVal());
        setFaqHeadingFr(nextVal());
        setFaqSubtitleFr(nextVal());

        const updatedSteps = steps.map((s) => ({
          ...s,
          title_fr: nextVal() || s.title_fr,
          description_fr: nextVal() || s.description_fr,
        }));
        setSteps(updatedSteps);

        const updatedFaqs = faqs.map((f) => ({
          ...f,
          question_fr: nextVal() || f.question_fr,
          answer_fr: nextVal() || f.answer_fr,
        }));
        setFaqs(updatedFaqs);

        setCopyLangTab("fr");
      }
    } finally {
      setIsTranslatingCopy(false);
    }
  }

  function updateStep(
    index: number,
    field: keyof ServiceProcessStep,
    value: string,
  ) {
    setSteps((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item,
      ),
    );
  }

  function updateFaq(
    index: number,
    field: keyof ServiceFaqItem,
    value: string,
  ) {
    setFaqs((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item,
      ),
    );
  }

  function addFaqItem() {
    setFaqs((prev) => [
      ...prev,
      {
        question_en: "",
        question_fr: "",
        answer_en: "",
        answer_fr: "",
      },
    ]);
  }

  function removeFaqItem(index: number) {
    setFaqs((prev) => prev.filter((_, idx) => idx !== index));
  }

  const SelectedFormIcon = serviceIcon(formIconKey);

  return (
    <div className="space-y-6">
      {/* ── Top Switcher: Services Grid vs Page Copy (Hero, How I Work, FAQ) ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-full border border-[#F3E2E4] bg-white p-1 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveSection("services")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold transition-all ${
              activeSection === "services"
                ? "bg-[#CE6A73] text-white shadow-xs"
                : "text-[#7A6B6E] hover:text-[#292022]"
            }`}
          >
            <SkillsIcon className="h-4 w-4" />
            Services ({initialServices.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSection("copy")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold transition-all ${
              activeSection === "copy"
                ? "bg-[#CE6A73] text-white shadow-xs"
                : "text-[#7A6B6E] hover:text-[#292022]"
            }`}
          >
            Hero, How I Work &amp; FAQ
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/services"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#EED7DA] bg-white px-4 py-2 text-[12px] font-semibold text-[#7A6B6E] hover:bg-[#FAF0F2] hover:text-[#292022] transition-colors"
          >
            <ExternalIcon className="h-3.5 w-3.5" />
            View Live Page
          </Link>

          {activeSection === "services" && (
            <button
              type="button"
              onClick={openAddService}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#CE6A73] px-4 py-2 text-[12px] font-semibold text-white shadow-xs transition-colors hover:bg-[#B85860]"
            >
              <PlusIcon className="h-3.5 w-3.5" />
              Add Service
            </button>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 1: SERVICES CARDS MANAGER
      ─────────────────────────────────────────────────────────────────── */}
      {activeSection === "services" && (
        <div className="space-y-6">
          {(isAddingService || editingService) && (
            <Card className="border-2 border-[#CE6A73]/30 bg-white">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#F7EBEB] pb-4">
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#292022]">
                    {editingService
                      ? `Edit Service: ${editingService.title_en}`
                      : "Add New Service"}
                  </h3>
                  <p className="text-xs text-[#7A6B6E]">
                    Edit English and French content or auto-translate from English.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* EN / FR Tabs */}
                  <div className="inline-flex rounded-full border border-[#EED7DA] bg-[#FDF8F9] p-0.5">
                    <button
                      type="button"
                      onClick={() => setServiceLangTab("en")}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                        serviceLangTab === "en"
                          ? "bg-[#CE6A73] text-white"
                          : "text-[#7A6B6E] hover:text-[#292022]"
                      }`}
                    >
                      EN (English)
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceLangTab("fr")}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                        serviceLangTab === "fr"
                          ? "bg-[#CE6A73] text-white"
                          : "text-[#7A6B6E] hover:text-[#292022]"
                      }`}
                    >
                      FR (Français)
                    </button>
                  </div>

                  {/* Translate to French Button */}
                  <button
                    type="button"
                    disabled={isTranslatingService || !formTitleEn.trim()}
                    onClick={handleTranslateServiceToFrench}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#EED7DA] bg-[#FAF0F2] px-3.5 py-1.5 text-xs font-semibold text-[#B85560] transition-colors hover:bg-[#F3E2E4] disabled:opacity-50"
                  >
                    <span>✦</span>
                    {isTranslatingService
                      ? "Translating..."
                      : "Translate to French"}
                  </button>

                  <button
                    type="button"
                    onClick={closeServiceForm}
                    className="rounded-lg px-2.5 py-1 text-xs font-semibold text-[#7A6B6E] hover:bg-[#FAF0F2] hover:text-[#292022]"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <form
                action={async (formData) => {
                  startTransition(async () => {
                    await upsertServiceAction(formData);
                    closeServiceForm();
                  });
                }}
                className="space-y-4"
              >
                {formId && <input type="hidden" name="id" value={formId} />}
                <input type="hidden" name="title_en" value={formTitleEn} />
                <input type="hidden" name="title_fr" value={formTitleFr} />
                <input type="hidden" name="description_en" value={formDescEn} />
                <input type="hidden" name="description_fr" value={formDescFr} />
                <input type="hidden" name="bullets_en" value={formBulletsEn} />
                <input type="hidden" name="bullets_fr" value={formBulletsFr} />

                {/* Common settings row: Icon, Slug, Sort Order */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label
                      htmlFor="icon_key"
                      className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]"
                    >
                      SVG Icon
                    </label>
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FAF0F2] text-[#CE6A73]">
                        <SelectedFormIcon className="h-5 w-5" />
                      </span>
                      <select
                        id="icon_key"
                        name="icon_key"
                        value={formIconKey}
                        onChange={(e) => setFormIconKey(e.target.value)}
                        className="w-full rounded-xl border border-[#EED7DA] bg-white px-3 py-2.5 text-[14px] text-[#292022] outline-none focus:border-[#CE6A73]"
                      >
                        {AVAILABLE_ICONS.map((ic) => (
                          <option key={ic.key} value={ic.key}>
                            {ic.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="slug"
                      className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]"
                    >
                      Slug (auto-generated if blank)
                    </label>
                    <input
                      id="slug"
                      name="slug"
                      type="text"
                      value={formSlug}
                      onChange={(e) => setFormSlug(e.target.value)}
                      placeholder="custom-website-development"
                      className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px] text-[#292022] outline-none focus:border-[#CE6A73]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sort_order"
                      className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]"
                    >
                      Sort Order
                    </label>
                    <input
                      id="sort_order"
                      name="sort_order"
                      type="number"
                      value={formSortOrder}
                      onChange={(e) => setFormSortOrder(Number(e.target.value))}
                      className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px] text-[#292022] outline-none focus:border-[#CE6A73]"
                    />
                  </div>
                </div>

                {/* English Tab Fields */}
                {serviceLangTab === "en" ? (
                  <div className="space-y-4 rounded-2xl border border-[#F3E2E4] bg-[#FDFBFB] p-4 sm:p-5">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]">
                        Service Title (English) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formTitleEn}
                        onChange={(e) => setFormTitleEn(e.target.value)}
                        placeholder="e.g. Custom Website Development"
                        className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px] text-[#292022] outline-none focus:border-[#CE6A73]"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]">
                        One-Line Description (English) *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={formDescEn}
                        onChange={(e) => setFormDescEn(e.target.value)}
                        placeholder="Concise one-line summary of the service..."
                        className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px] text-[#292022] outline-none focus:border-[#CE6A73]"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]">
                        Included Points (English — 1 point per line, 3 to 4 points)
                      </label>
                      <textarea
                        rows={4}
                        value={formBulletsEn}
                        onChange={(e) => setFormBulletsEn(e.target.value)}
                        placeholder={
                          "Responsive layout across all devices\nTechnical SEO and semantic HTML\nSub-second page loads"
                        }
                        className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px] text-[#292022] outline-none focus:border-[#CE6A73]"
                      />
                    </div>
                  </div>
                ) : (
                  /* French Tab Fields */
                  <div className="space-y-4 rounded-2xl border border-[#F3E2E4] bg-[#FDFBFB] p-4 sm:p-5">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]">
                        Service Title (Français — falls back to English if empty)
                      </label>
                      <input
                        type="text"
                        value={formTitleFr}
                        onChange={(e) => setFormTitleFr(e.target.value)}
                        placeholder="ex. Développement de Sites Web sur Mesure"
                        className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px] text-[#292022] outline-none focus:border-[#CE6A73]"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]">
                        One-Line Description (Français)
                      </label>
                      <textarea
                        rows={2}
                        value={formDescFr}
                        onChange={(e) => setFormDescFr(e.target.value)}
                        placeholder="Résumé concis du service en une ligne..."
                        className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px] text-[#292022] outline-none focus:border-[#CE6A73]"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]">
                        Included Points (Français — 1 point par ligne)
                      </label>
                      <textarea
                        rows={4}
                        value={formBulletsFr}
                        onChange={(e) => setFormBulletsFr(e.target.value)}
                        placeholder={
                          "Design réactif sur tous les écrans\nSEO technique et HTML sémantique\nChargement ultra-rapide"
                        }
                        className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px] text-[#292022] outline-none focus:border-[#CE6A73]"
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <label className="inline-flex items-center gap-2 text-sm text-[#292022] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="published"
                      checked={formPublished}
                      onChange={(e) => setFormPublished(e.target.checked)}
                      className="h-4 w-4 rounded border-[#EED7DA] text-[#CE6A73] accent-[#CE6A73]"
                    />
                    <span>Visible on public Services page</span>
                  </label>

                  <SaveButton
                    label={
                      isPending
                        ? "Saving..."
                        : editingService
                          ? "Update Service"
                          : "Create Service"
                    }
                    disabled={isPending || !formTitleEn.trim()}
                  />
                </div>
              </form>
            </Card>
          )}

          {/* Services List */}
          <div className="space-y-3.5">
            {initialServices.map((svc, idx) => {
              const Icon = serviceIcon(svc.icon_key);
              const hasFr = Boolean(
                svc.title_fr && svc.title_fr.trim().length > 0,
              );

              return (
                <Card
                  key={svc.id}
                  className="transition-all hover:border-[#CE6A73]/30 hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4 max-w-3xl">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FAF0F2] text-[#CE6A73]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-md bg-[#FAF0F2] px-2 py-0.5 text-[10px] font-bold text-[#CE6A73]">
                            #{idx + 1}
                          </span>
                          <h3 className="font-serif text-lg font-medium text-[#292022]">
                            {svc.title_en}
                          </h3>
                          <StatusBadge
                            published={svc.published}
                            label={svc.published ? "Visible" : "Hidden"}
                          />
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              hasFr
                                ? "bg-[#EAF7EE] text-[#2E7D32]"
                                : "bg-[#FFF3E0] text-[#D84315]"
                            }`}
                          >
                            {hasFr ? "EN / FR" : "EN only (FR fallback)"}
                          </span>
                        </div>

                        {svc.title_fr && (
                          <p className="text-xs font-medium text-[#9C8D90]">
                            FR: {svc.title_fr}
                          </p>
                        )}

                        <p className="text-sm text-[#594B4E] leading-relaxed">
                          {svc.description_en}
                        </p>

                        {svc.bullets_en?.length > 0 && (
                          <ul className="flex flex-wrap gap-1.5 pt-1">
                            {svc.bullets_en.map((b, i) => (
                              <li
                                key={i}
                                className="rounded-full border border-[#EED7DA] bg-[#FDF8F9] px-2.5 py-0.5 text-[11px] text-[#7A6B6E]"
                              >
                                ✓ {b}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* Actions: Reorder, Show/Hide, Edit, Delete */}
                    <div className="flex flex-wrap items-center gap-1.5 shrink-0 self-end sm:self-start">
                      <button
                        type="button"
                        disabled={idx === 0 || isPending}
                        onClick={() => handleMoveService(idx, -1)}
                        title="Move Up"
                        className="rounded-lg border border-[#EED7DA] bg-white px-2.5 py-1.5 text-xs font-bold text-[#7A6B6E] hover:bg-[#FAF0F2] hover:text-[#292022] disabled:opacity-35"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        disabled={
                          idx === initialServices.length - 1 || isPending
                        }
                        onClick={() => handleMoveService(idx, 1)}
                        title="Move Down"
                        className="rounded-lg border border-[#EED7DA] bg-white px-2.5 py-1.5 text-xs font-bold text-[#7A6B6E] hover:bg-[#FAF0F2] hover:text-[#292022] disabled:opacity-35"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => {
                          startTransition(async () => {
                            await togglePublishedAction(svc.id, !svc.published);
                          });
                        }}
                        className="rounded-lg border border-[#EED7DA] bg-white px-3 py-1.5 text-xs font-semibold text-[#7A6B6E] hover:bg-[#FAF0F2] hover:text-[#292022]"
                      >
                        {svc.published ? "Hide" : "Show"}
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditService(svc)}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#EED7DA] bg-white px-3 py-1.5 text-xs font-semibold text-[#CE6A73] hover:bg-[#FAF0F2] hover:border-[#CE6A73]"
                      >
                        <EditIcon className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => {
                          if (confirm(`Delete service "${svc.title_en}"?`)) {
                            startTransition(async () => {
                              await deleteServiceAction(svc.id);
                            });
                          }
                        }}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50/50 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100/60"
                        title="Delete Service"
                      >
                        <TrashIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 2: HERO, HOW I WORK & FAQ COPY EDITOR
      ─────────────────────────────────────────────────────────────────── */}
      {activeSection === "copy" && (
        <form
          action={async (formData) => {
            setCopySavedMessage(false);
            startTransition(async () => {
              await savePageContentAction(formData);
              setCopySavedMessage(true);
            });
          }}
          className="space-y-6"
        >
          {/* Hidden JSON payloads for both languages */}
          <input type="hidden" name="hero_badge_en" value={heroBadgeEn} />
          <input type="hidden" name="hero_badge_fr" value={heroBadgeFr} />
          <input
            type="hidden"
            name="hero_title_before_en"
            value={heroBeforeEn}
          />
          <input
            type="hidden"
            name="hero_title_before_fr"
            value={heroBeforeFr}
          />
          <input
            type="hidden"
            name="hero_title_accent_en"
            value={heroAccentEn}
          />
          <input
            type="hidden"
            name="hero_title_accent_fr"
            value={heroAccentFr}
          />
          <input
            type="hidden"
            name="hero_title_after_en"
            value={heroAfterEn}
          />
          <input
            type="hidden"
            name="hero_title_after_fr"
            value={heroAfterFr}
          />
          <input
            type="hidden"
            name="hero_subtitle_en"
            value={heroSubtitleEn}
          />
          <input
            type="hidden"
            name="hero_subtitle_fr"
            value={heroSubtitleFr}
          />
          <input type="hidden" name="hero_cta_en" value={heroCtaEn} />
          <input type="hidden" name="hero_cta_fr" value={heroCtaFr} />

          <input type="hidden" name="process_badge_en" value={processBadgeEn} />
          <input type="hidden" name="process_badge_fr" value={processBadgeFr} />
          <input
            type="hidden"
            name="process_heading_en"
            value={processHeadingEn}
          />
          <input
            type="hidden"
            name="process_heading_fr"
            value={processHeadingFr}
          />
          <input
            type="hidden"
            name="process_subtitle_en"
            value={processSubtitleEn}
          />
          <input
            type="hidden"
            name="process_subtitle_fr"
            value={processSubtitleFr}
          />
          <input
            type="hidden"
            name="steps_json"
            value={JSON.stringify(steps)}
          />

          <input type="hidden" name="faq_badge_en" value={faqBadgeEn} />
          <input type="hidden" name="faq_badge_fr" value={faqBadgeFr} />
          <input type="hidden" name="faq_heading_en" value={faqHeadingEn} />
          <input type="hidden" name="faq_heading_fr" value={faqHeadingFr} />
          <input type="hidden" name="faq_subtitle_en" value={faqSubtitleEn} />
          <input type="hidden" name="faq_subtitle_fr" value={faqSubtitleFr} />
          <input type="hidden" name="faqs_json" value={JSON.stringify(faqs)} />

          {/* Language Bar for Page Copy */}
          <Card className="flex flex-wrap items-center justify-between gap-4 py-4">
            <div>
              <h3 className="font-serif text-lg font-medium text-[#292022]">
                Page Sections Copy ({copyLangTab.toUpperCase()})
              </h3>
              <p className="text-xs text-[#7A6B6E]">
                Switch between English and French or auto-translate all sections to French.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex rounded-full border border-[#EED7DA] bg-[#FDF8F9] p-0.5">
                <button
                  type="button"
                  onClick={() => setCopyLangTab("en")}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    copyLangTab === "en"
                      ? "bg-[#CE6A73] text-white"
                      : "text-[#7A6B6E] hover:text-[#292022]"
                  }`}
                >
                  EN (English)
                </button>
                <button
                  type="button"
                  onClick={() => setCopyLangTab("fr")}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    copyLangTab === "fr"
                      ? "bg-[#CE6A73] text-white"
                      : "text-[#7A6B6E] hover:text-[#292022]"
                  }`}
                >
                  FR (Français)
                </button>
              </div>

              <button
                type="button"
                disabled={isTranslatingCopy}
                onClick={handleTranslatePageCopyToFrench}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#EED7DA] bg-[#FAF0F2] px-4 py-1.5 text-xs font-semibold text-[#B85560] transition-colors hover:bg-[#F3E2E4] disabled:opacity-50"
              >
                <span>✦</span>
                {isTranslatingCopy
                  ? "Translating..."
                  : "Translate to French"}
              </button>
            </div>
          </Card>

          {/* 1. HERO SECTION COPY */}
          <Card>
            <h3 className="mb-4 font-serif text-xl font-medium text-[#292022]">
              1. Hero Section ({copyLangTab.toUpperCase()})
            </h3>
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]">
                    Hero Badge
                  </label>
                  <input
                    type="text"
                    value={copyLangTab === "en" ? heroBadgeEn : heroBadgeFr}
                    onChange={(e) =>
                      copyLangTab === "en"
                        ? setHeroBadgeEn(e.target.value)
                        : setHeroBadgeFr(e.target.value)
                    }
                    className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]">
                    Hero CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={copyLangTab === "en" ? heroCtaEn : heroCtaFr}
                    onChange={(e) =>
                      copyLangTab === "en"
                        ? setHeroCtaEn(e.target.value)
                        : setHeroCtaFr(e.target.value)
                    }
                    className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]">
                    Title (Before Accent)
                  </label>
                  <input
                    type="text"
                    value={copyLangTab === "en" ? heroBeforeEn : heroBeforeFr}
                    onChange={(e) =>
                      copyLangTab === "en"
                        ? setHeroBeforeEn(e.target.value)
                        : setHeroBeforeFr(e.target.value)
                    }
                    className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]">
                    Title (Italic Accent)
                  </label>
                  <input
                    type="text"
                    value={copyLangTab === "en" ? heroAccentEn : heroAccentFr}
                    onChange={(e) =>
                      copyLangTab === "en"
                        ? setHeroAccentEn(e.target.value)
                        : setHeroAccentFr(e.target.value)
                    }
                    className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]">
                    Title (After Accent)
                  </label>
                  <input
                    type="text"
                    value={copyLangTab === "en" ? heroAfterEn : heroAfterFr}
                    onChange={(e) =>
                      copyLangTab === "en"
                        ? setHeroAfterEn(e.target.value)
                        : setHeroAfterFr(e.target.value)
                    }
                    className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]">
                  Hero Subtitle
                </label>
                <textarea
                  rows={3}
                  value={copyLangTab === "en" ? heroSubtitleEn : heroSubtitleFr}
                  onChange={(e) =>
                    copyLangTab === "en"
                      ? setHeroSubtitleEn(e.target.value)
                      : setHeroSubtitleFr(e.target.value)
                  }
                  className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px]"
                />
              </div>
            </div>
          </Card>

          {/* 2. HOW I WORK (4 STEPS) */}
          <Card>
            <h3 className="mb-4 font-serif text-xl font-medium text-[#292022]">
              2. How I Work — 4 Steps ({copyLangTab.toUpperCase()})
            </h3>
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]">
                    Section Badge
                  </label>
                  <input
                    type="text"
                    value={copyLangTab === "en" ? processBadgeEn : processBadgeFr}
                    onChange={(e) =>
                      copyLangTab === "en"
                        ? setProcessBadgeEn(e.target.value)
                        : setProcessBadgeFr(e.target.value)
                    }
                    className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={
                      copyLangTab === "en" ? processHeadingEn : processHeadingFr
                    }
                    onChange={(e) =>
                      copyLangTab === "en"
                        ? setProcessHeadingEn(e.target.value)
                        : setProcessHeadingFr(e.target.value)
                    }
                    className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]">
                  Section Subtitle
                </label>
                <textarea
                  rows={2}
                  value={
                    copyLangTab === "en" ? processSubtitleEn : processSubtitleFr
                  }
                  onChange={(e) =>
                    copyLangTab === "en"
                      ? setProcessSubtitleEn(e.target.value)
                      : setProcessSubtitleFr(e.target.value)
                  }
                  className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px]"
                />
              </div>

              <div className="mt-2 grid gap-4 sm:grid-cols-2">
                {steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="space-y-3 rounded-2xl border border-[#F3E2E4] bg-[#FDFBFB] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#CE6A73]">
                        Step {step.number || `0${idx + 1}`}
                      </span>
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#7A6B6E]">
                        Step Title ({copyLangTab.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={
                          copyLangTab === "en" ? step.title_en : step.title_fr
                        }
                        onChange={(e) =>
                          updateStep(
                            idx,
                            copyLangTab === "en" ? "title_en" : "title_fr",
                            e.target.value,
                          )
                        }
                        className="w-full rounded-xl border border-[#EED7DA] bg-white px-3 py-2 text-[13px]"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#7A6B6E]">
                        Step Description ({copyLangTab.toUpperCase()})
                      </label>
                      <textarea
                        rows={3}
                        value={
                          copyLangTab === "en"
                            ? step.description_en
                            : step.description_fr
                        }
                        onChange={(e) =>
                          updateStep(
                            idx,
                            copyLangTab === "en"
                              ? "description_en"
                              : "description_fr",
                            e.target.value,
                          )
                        }
                        className="w-full rounded-xl border border-[#EED7DA] bg-white px-3 py-2 text-[13px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* 3. FAQ SECTION */}
          <Card>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-serif text-xl font-medium text-[#292022]">
                3. Frequently Asked Questions ({copyLangTab.toUpperCase()})
              </h3>
              <button
                type="button"
                onClick={addFaqItem}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#EED7DA] bg-[#FAF0F2] px-3.5 py-1.5 text-xs font-semibold text-[#CE6A73] hover:bg-[#F3E2E4]"
              >
                <PlusIcon className="h-3.5 w-3.5" />
                Add Question
              </button>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]">
                    FAQ Badge
                  </label>
                  <input
                    type="text"
                    value={copyLangTab === "en" ? faqBadgeEn : faqBadgeFr}
                    onChange={(e) =>
                      copyLangTab === "en"
                        ? setFaqBadgeEn(e.target.value)
                        : setFaqBadgeFr(e.target.value)
                    }
                    className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]">
                    FAQ Heading
                  </label>
                  <input
                    type="text"
                    value={copyLangTab === "en" ? faqHeadingEn : faqHeadingFr}
                    onChange={(e) =>
                      copyLangTab === "en"
                        ? setFaqHeadingEn(e.target.value)
                        : setFaqHeadingFr(e.target.value)
                    }
                    className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]">
                  FAQ Subtitle
                </label>
                <textarea
                  rows={2}
                  value={copyLangTab === "en" ? faqSubtitleEn : faqSubtitleFr}
                  onChange={(e) =>
                    copyLangTab === "en"
                      ? setFaqSubtitleEn(e.target.value)
                      : setFaqSubtitleFr(e.target.value)
                  }
                  className="w-full rounded-xl border border-[#EED7DA] bg-white px-3.5 py-2.5 text-[14px]"
                />
              </div>

              <div className="mt-2 space-y-4">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="space-y-3 rounded-2xl border border-[#F3E2E4] bg-[#FDFBFB] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#CE6A73]">
                        FAQ #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFaqItem(idx)}
                        className="text-xs font-semibold text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#7A6B6E]">
                        Question ({copyLangTab.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={
                          copyLangTab === "en"
                            ? faq.question_en
                            : faq.question_fr
                        }
                        onChange={(e) =>
                          updateFaq(
                            idx,
                            copyLangTab === "en"
                              ? "question_en"
                              : "question_fr",
                            e.target.value,
                          )
                        }
                        className="w-full rounded-xl border border-[#EED7DA] bg-white px-3 py-2 text-[13px]"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#7A6B6E]">
                        Answer ({copyLangTab.toUpperCase()})
                      </label>
                      <textarea
                        rows={3}
                        value={
                          copyLangTab === "en" ? faq.answer_en : faq.answer_fr
                        }
                        onChange={(e) =>
                          updateFaq(
                            idx,
                            copyLangTab === "en" ? "answer_en" : "answer_fr",
                            e.target.value,
                          )
                        }
                        className="w-full rounded-xl border border-[#EED7DA] bg-white px-3 py-2 text-[13px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="flex items-center gap-4">
            <SaveButton
              label={isPending ? "Saving..." : "Save Services Page Copy"}
              disabled={isPending}
            />
            {copySavedMessage && (
              <span className="text-xs font-semibold text-[#2E7D32]">
                ✓ Saved successfully
              </span>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
