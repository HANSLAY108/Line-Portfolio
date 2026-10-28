"use client";

import { useMemo, useState } from "react";
import type { Certificate } from "@/lib/types";
import { publicMediaUrl } from "@/lib/media";
import { ArrowRightIcon } from "./icons";
import { useLanguage } from "@/context/LanguageContext";

interface CertificatesGalleryProps {
  certificates: Certificate[];
}

export default function CertificatesGallery({ certificates }: CertificatesGalleryProps) {
  const { t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeModalCert, setActiveModalCert] = useState<Certificate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filters = [
    { id: "all", label: t("journey_page.filter_all", "All Credentials") },
    { id: "cloud", label: t("journey_page.filter_cloud", "Cloud Architecture") },
    { id: "containers", label: t("journey_page.filter_containers", "Containers & K8s") },
    { id: "systems", label: t("journey_page.filter_systems", "Systems & DevOps") },
    { id: "ai", label: t("journey_page.filter_ai", "AI & Deep Learning") },
  ];

  const filteredCertificates = useMemo(() => {
    if (selectedFilter === "all") return certificates;
    return certificates.filter((cert) => {
      const allText = `${cert.title} ${cert.issuer} ${cert.skills.join(" ")} ${cert.description ?? ""}`.toLowerCase();
      if (selectedFilter === "cloud") return allText.includes("cloud") || allText.includes("aws") || allText.includes("gcp");
      if (selectedFilter === "containers") return allText.includes("kubernetes") || allText.includes("container") || allText.includes("cka");
      if (selectedFilter === "systems") return allText.includes("terraform") || allText.includes("devops") || allText.includes("linux");
      if (selectedFilter === "ai") return allText.includes("deep learning") || allText.includes("neural") || allText.includes("ai") || allText.includes("machine learning");
      return true;
    });
  }, [certificates, selectedFilter]);

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setSelectedFilter(f.id)}
            className={`rounded-full px-4 py-2 text-[12px] font-semibold transition-all duration-200 ${
              selectedFilter === f.id
                ? "bg-accent text-white shadow-xs"
                : "border border-border bg-white text-muted hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Certificates Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCertificates.map((cert) => {
          const badgeUrl = publicMediaUrl(cert.image_path);
          return (
            <div
              key={cert.id}
              onClick={() => setActiveModalCert(cert)}
              className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-md"
            >
              <div>
                {/* Header: Badge & Status */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border bg-[#FAF7F5] p-2 transition-transform duration-300 group-hover:scale-105">
                    {badgeUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={badgeUrl}
                        alt={cert.title}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="font-serif text-2xl text-accent">✦</span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Verified
                  </span>
                </div>

                {/* Issuer & Title */}
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-text">
                  {cert.issuer}
                </p>

                <h3 className="mt-1 font-serif text-[1.25rem] font-medium leading-snug text-foreground transition-colors group-hover:text-accent-text">
                  {cert.title}
                </h3>

                {/* Dates & Credential ID */}
                <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[12px] text-muted-light">
                  <span>{cert.issue_date}</span>
                  {cert.expiry_date && <span>· Valid: {cert.expiry_date}</span>}
                </div>

                {cert.credential_id && (
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-[#FAF7F5] px-2 py-1 text-[11px] font-mono text-muted">
                    <span className="text-muted-light">ID:</span>
                    <span>{cert.credential_id}</span>
                    <button
                      type="button"
                      onClick={(e) => handleCopyId(cert.credential_id!, e)}
                      title="Copy Credential ID"
                      className="ml-1 text-[10px] font-sans font-semibold uppercase text-accent-text hover:underline"
                    >
                      {copiedId === cert.credential_id ? "Copied!" : "Copy"}
                    </button>
                  </div>
                )}

                {/* Description snippet */}
                {cert.description && (
                  <p className="mt-3 text-[13px] leading-[1.65] text-muted line-clamp-3">
                    {cert.description}
                  </p>
                )}
              </div>

              {/* Skills Tags & Verification Link */}
              <div className="mt-6 border-t border-border pt-4">
                {cert.skills?.length > 0 && (
                  <div className="mb-3.5 flex flex-wrap gap-1">
                    {cert.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border bg-[#FAF7F5] px-2.5 py-0.5 text-[10px] font-medium text-muted"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="rounded-full px-1.5 py-0.5 text-[10px] text-muted-light">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between text-[12px] font-medium text-accent-text">
                  <span className="group-hover:underline">View Details &amp; Credential</span>
                  <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Modal for Selected Certificate ── */}
      {activeModalCert && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveModalCert(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full overflow-hidden rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-2xl animate-scale-up"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveModalCert(null)}
              aria-label="Close modal"
              className="absolute right-5 top-5 rounded-full p-2 text-muted hover:bg-neutral-100 hover:text-foreground transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Modal Badge */}
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-border bg-[#FAF7F5] p-3 shadow-xs">
                {publicMediaUrl(activeModalCert.image_path) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={publicMediaUrl(activeModalCert.image_path)!}
                    alt={activeModalCert.title}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="font-serif text-3xl text-accent">✦</span>
                )}
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-text">
                  {activeModalCert.issuer}
                </span>
                <h3 className="font-serif text-[1.4rem] font-medium leading-snug text-foreground">
                  {activeModalCert.title}
                </h3>
              </div>
            </div>

            {/* Details */}
            <div className="mt-6 space-y-4 text-[13px] text-muted leading-relaxed">
              {activeModalCert.description && (
                <p>{activeModalCert.description}</p>
              )}

              <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-[#FAF7F5] p-4 text-[12px]">
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-muted-light">
                    Issued Date
                  </span>
                  <span className="font-medium text-foreground">{activeModalCert.issue_date}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-muted-light">
                    Expiration
                  </span>
                  <span className="font-medium text-foreground">
                    {activeModalCert.expiry_date ?? "Permanent / No Expiration"}
                  </span>
                </div>
                {activeModalCert.credential_id && (
                  <div className="col-span-2">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-muted-light">
                      Credential ID
                    </span>
                    <span className="font-mono text-foreground">{activeModalCert.credential_id}</span>
                  </div>
                )}
              </div>

              {activeModalCert.skills?.length > 0 && (
                <div>
                  <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-foreground">
                    Competencies &amp; Domains
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalCert.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-white px-3 py-1 text-[11px] font-medium text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="mt-8 flex items-center justify-end gap-3 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => setActiveModalCert(null)}
                className="rounded-full border border-border bg-white px-4 py-2 text-[12px] font-medium text-foreground hover:bg-neutral-50"
              >
                Close
              </button>
              {activeModalCert.credential_url && (
                <a
                  href={activeModalCert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2 text-[12px] font-medium text-white hover:bg-accent-hover transition-colors shadow-xs"
                >
                  Verify at {activeModalCert.issuer}
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
