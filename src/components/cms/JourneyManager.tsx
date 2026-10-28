"use client";

import { useState, useTransition } from "react";
import ImageUpload from "./ImageUpload";
import {
  CertificateIcon,
  EditIcon,
  ExternalIcon,
  JourneyIcon,
  PlusIcon,
  TrashIcon,
} from "./CMSIcons";
import { Card, Check, Field, SaveButton, StatusBadge } from "./ui";
import type { Certificate, Education } from "@/lib/types";
import { publicMediaUrl } from "@/lib/media";

interface JourneyManagerProps {
  educations: Education[];
  certificates: Certificate[];
  upsertEducationAction: (formData: FormData) => Promise<void>;
  deleteEducationAction: (id: string) => Promise<void>;
  upsertCertificateAction: (formData: FormData) => Promise<void>;
  deleteCertificateAction: (id: string) => Promise<void>;
}

export default function JourneyManager({
  educations,
  certificates,
  upsertEducationAction,
  deleteEducationAction,
  upsertCertificateAction,
  deleteCertificateAction,
}: JourneyManagerProps) {
  const [activeTab, setActiveTab] = useState<"education" | "certificates">("education");
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [isAddingCert, setIsAddingCert] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      {/* ── Tab Switcher & Actions ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-full border border-[#F3E2E4] bg-white p-1 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab("education")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold transition-all ${
              activeTab === "education"
                ? "bg-[#CE6A73] text-white shadow-xs"
                : "text-[#7A6B6E] hover:text-[#292022]"
            }`}
          >
            <JourneyIcon className="h-4 w-4" />
            Education ({educations.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("certificates")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold transition-all ${
              activeTab === "certificates"
                ? "bg-[#CE6A73] text-white shadow-xs"
                : "text-[#7A6B6E] hover:text-[#292022]"
            }`}
          >
            <CertificateIcon className="h-4 w-4" />
            Certificates ({certificates.length})
          </button>
        </div>

        {activeTab === "education" ? (
          <button
            type="button"
            onClick={() => {
              setEditingEducation(null);
              setIsAddingEducation(true);
            }}
            className="inline-flex items-center gap-1.5 self-start rounded-full bg-[#CE6A73] px-4 py-2 text-[12px] font-semibold text-white shadow-xs transition-colors hover:bg-[#B85860]"
          >
            <PlusIcon className="h-3.5 w-3.5" />
            Add Education
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setEditingCert(null);
              setIsAddingCert(true);
            }}
            className="inline-flex items-center gap-1.5 self-start rounded-full bg-[#CE6A73] px-4 py-2 text-[12px] font-semibold text-white shadow-xs transition-colors hover:bg-[#B85860]"
          >
            <PlusIcon className="h-3.5 w-3.5" />
            Add Certificate
          </button>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: EDUCATIONS
      ─────────────────────────────────────────────────────────────── */}
      {activeTab === "education" && (
        <div className="space-y-6">
          {/* Add / Edit Form Modal / Expandable Card */}
          {(isAddingEducation || editingEducation) && (
            <Card className="border-2 border-[#CE6A73]/30 bg-white">
              <div className="mb-4 flex items-center justify-between border-b border-[#F7EBEB] pb-3">
                <h3 className="font-serif text-lg font-medium text-[#292022]">
                  {editingEducation ? "Edit Academic Milestone" : "Add Academic Milestone"}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingEducation(false);
                    setEditingEducation(null);
                  }}
                  className="rounded-lg px-2.5 py-1 text-xs font-semibold text-[#7A6B6E] hover:bg-[#FAF0F2] hover:text-[#292022]"
                >
                  Cancel
                </button>
              </div>

              <form
                action={async (formData) => {
                  startTransition(async () => {
                    await upsertEducationAction(formData);
                    setIsAddingEducation(false);
                    setEditingEducation(null);
                  });
                }}
                className="grid gap-4"
              >
                {editingEducation && (
                  <input type="hidden" name="id" value={editingEducation.id} />
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Degree / Qualification"
                    name="degree"
                    required
                    placeholder="e.g. Master of Science in Computer Science"
                    defaultValue={editingEducation?.degree}
                  />
                  <Field
                    label="Institution"
                    name="institution"
                    required
                    placeholder="e.g. ETH Zürich"
                    defaultValue={editingEducation?.institution}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <Field
                    label="Period / Years"
                    name="period"
                    required
                    placeholder="e.g. 2019 — 2021"
                    defaultValue={editingEducation?.period}
                  />
                  <Field
                    label="Location"
                    name="location"
                    placeholder="e.g. Zürich, Switzerland"
                    defaultValue={editingEducation?.location}
                  />
                  <Field
                    label="Honors / Grade"
                    name="grade"
                    placeholder="e.g. Summa Cum Laude"
                    defaultValue={editingEducation?.grade}
                  />
                </div>

                <Field
                  label="Field of Study / Specialization"
                  name="field_of_study"
                  placeholder="e.g. Distributed Systems & High-Performance Computing"
                  defaultValue={editingEducation?.field_of_study}
                />

                <Field
                  label="Description / Focus & Thesis"
                  name="description"
                  textarea
                  rows={4}
                  placeholder="Summary of research focus, thesis topic, and architectural specializations..."
                  defaultValue={editingEducation?.description}
                />

                <Field
                  label="Coursework & Highlights (comma-separated)"
                  name="coursework"
                  placeholder="Distributed Systems, Advanced Compilers, Fault Tolerance, Operating Systems"
                  defaultValue={editingEducation?.coursework?.join(", ")}
                  helperText="Separate key courses and technical highlights with commas."
                />

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-6">
                    <Field
                      label="Sort Order"
                      name="sort_order"
                      type="number"
                      defaultValue={editingEducation?.sort_order ?? 0}
                    />
                    <div className="pt-5">
                      <Check
                        name="published"
                        label="Published to live site"
                        defaultChecked={editingEducation ? editingEducation.published : true}
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <SaveButton
                      label={
                        isPending
                          ? "Saving..."
                          : editingEducation
                          ? "Update Milestone"
                          : "Save Milestone"
                      }
                      disabled={isPending}
                    />
                  </div>
                </div>
              </form>
            </Card>
          )}

          {/* Education List */}
          {educations.length === 0 ? (
            <Card className="text-center py-12">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF0F2] text-[#CE6A73]">
                <JourneyIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-medium text-[#292022]">
                No education records yet
              </h3>
              <p className="mt-1 text-sm text-[#7A6B6E]">
                Add university degrees, academic milestones, and research highlights.
              </p>
              <button
                type="button"
                onClick={() => setIsAddingEducation(true)}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#CE6A73] px-4 py-2 text-xs font-semibold text-white hover:bg-[#B85860]"
              >
                <PlusIcon className="h-3.5 w-3.5" />
                Add First Milestone
              </button>
            </Card>
          ) : (
            <div className="space-y-4">
              {educations.map((edu) => (
                <Card
                  key={edu.id}
                  className="transition-all hover:border-[#CE6A73]/30 hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge published={edu.published} />
                        <span className="rounded-full border border-[#F3E2E4] bg-[#FAF0F2] px-2.5 py-0.5 text-[11px] font-semibold text-[#CE6A73]">
                          {edu.period}
                        </span>
                        {edu.grade && (
                          <span className="rounded-full bg-[#EAF7EE] px-2.5 py-0.5 text-[11px] font-semibold text-[#2E7D32]">
                            {edu.grade}
                          </span>
                        )}
                        <span className="text-[11px] text-[#9C8D90]">
                          Order: {edu.sort_order}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-medium tracking-tight text-[#292022]">
                        {edu.degree}
                      </h3>

                      <p className="text-sm font-medium text-[#7A6B6E]">
                        {edu.institution}
                        {edu.location ? ` · ${edu.location}` : ""}
                        {edu.field_of_study ? ` (${edu.field_of_study})` : ""}
                      </p>

                      {edu.description && (
                        <p className="pt-1 text-sm text-[#594B4E] leading-relaxed">
                          {edu.description}
                        </p>
                      )}

                      {edu.coursework?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {edu.coursework.map((course) => (
                            <span
                              key={course}
                              className="rounded-full border border-[#EED7DA] bg-[#FDF8F9] px-2.5 py-0.5 text-[11px] text-[#7A6B6E]"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingEducation(false);
                          setEditingEducation(edu);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#EED7DA] bg-white px-3 py-1.5 text-xs font-semibold text-[#292022] hover:bg-[#FAF0F2] hover:border-[#CE6A73] transition-colors"
                      >
                        <EditIcon className="h-3.5 w-3.5 text-[#7A6B6E]" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete "${edu.degree}"?`)) {
                            startTransition(async () => {
                              await deleteEducationAction(edu.id);
                            });
                          }
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50/50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100/60 transition-colors"
                      >
                        <TrashIcon className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: CERTIFICATES
      ─────────────────────────────────────────────────────────────── */}
      {activeTab === "certificates" && (
        <div className="space-y-6">
          {/* Add / Edit Certificate Form */}
          {(isAddingCert || editingCert) && (
            <Card className="border-2 border-[#CE6A73]/30 bg-white">
              <div className="mb-4 flex items-center justify-between border-b border-[#F7EBEB] pb-3">
                <h3 className="font-serif text-lg font-medium text-[#292022]">
                  {editingCert ? "Edit Certificate" : "Add Certificate & Credential"}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingCert(false);
                    setEditingCert(null);
                  }}
                  className="rounded-lg px-2.5 py-1 text-xs font-semibold text-[#7A6B6E] hover:bg-[#FAF0F2] hover:text-[#292022]"
                >
                  Cancel
                </button>
              </div>

              <form
                action={async (formData) => {
                  startTransition(async () => {
                    await upsertCertificateAction(formData);
                    setIsAddingCert(false);
                    setEditingCert(null);
                  });
                }}
                className="grid gap-4"
              >
                {editingCert && (
                  <input type="hidden" name="id" value={editingCert.id} />
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Certificate Title"
                    name="title"
                    required
                    placeholder="e.g. AWS Certified Solutions Architect – Professional"
                    defaultValue={editingCert?.title}
                  />
                  <Field
                    label="Issuing Organization"
                    name="issuer"
                    required
                    placeholder="e.g. Amazon Web Services"
                    defaultValue={editingCert?.issuer}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <Field
                    label="Issue Date"
                    name="issue_date"
                    required
                    placeholder="e.g. Oct 2023"
                    defaultValue={editingCert?.issue_date}
                  />
                  <Field
                    label="Expiry Date (optional)"
                    name="expiry_date"
                    placeholder="e.g. Oct 2026 or Never"
                    defaultValue={editingCert?.expiry_date}
                  />
                  <Field
                    label="Credential ID"
                    name="credential_id"
                    placeholder="e.g. AWS-PSA-8492041"
                    defaultValue={editingCert?.credential_id}
                  />
                </div>

                <Field
                  label="Verification / Credential URL"
                  name="credential_url"
                  placeholder="https://aws.amazon.com/verification or https://credly.com/..."
                  defaultValue={editingCert?.credential_url}
                  helperText="URL where clients and recruiters can verify the authentic accreditation."
                />

                <ImageUpload
                  name="image"
                  label="Certificate Badge / Document"
                  currentPath={editingCert?.image_path}
                  removeFieldName="image_remove"
                  helperText="Upload official SVG badge, PNG logo, or certificate preview image."
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                />

                <Field
                  label="Description / Competencies"
                  name="description"
                  textarea
                  rows={3}
                  placeholder="Brief description of skills tested, domains evaluated, and technical rigor..."
                  defaultValue={editingCert?.description}
                />

                <Field
                  label="Skills / Domains Tested (comma-separated)"
                  name="skills"
                  placeholder="Cloud Architecture, Multi-Region Resilience, Security, High Availability"
                  defaultValue={editingCert?.skills?.join(", ")}
                />

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-6">
                    <Field
                      label="Sort Order"
                      name="sort_order"
                      type="number"
                      defaultValue={editingCert?.sort_order ?? 0}
                    />
                    <div className="pt-5">
                      <Check
                        name="published"
                        label="Published to live site"
                        defaultChecked={editingCert ? editingCert.published : true}
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <SaveButton
                      label={
                        isPending
                          ? "Saving..."
                          : editingCert
                          ? "Update Certificate"
                          : "Save Certificate"
                      }
                      disabled={isPending}
                    />
                  </div>
                </div>
              </form>
            </Card>
          )}

          {/* Certificate List */}
          {certificates.length === 0 ? (
            <Card className="text-center py-12">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF0F2] text-[#CE6A73]">
                <CertificateIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-medium text-[#292022]">
                No certificates recorded yet
              </h3>
              <p className="mt-1 text-sm text-[#7A6B6E]">
                Showcase your industry certifications, cloud architect credentials, and professional awards.
              </p>
              <button
                type="button"
                onClick={() => setIsAddingCert(true)}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#CE6A73] px-4 py-2 text-xs font-semibold text-white hover:bg-[#B85860]"
              >
                <PlusIcon className="h-3.5 w-3.5" />
                Add First Certificate
              </button>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {certificates.map((cert) => (
                <Card
                  key={cert.id}
                  className="flex flex-col justify-between transition-all hover:border-[#CE6A73]/30 hover:shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {cert.image_path ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={publicMediaUrl(cert.image_path)!}
                            alt={cert.title}
                            className="h-12 w-12 rounded-xl object-contain border border-[#F3E2E4] bg-[#FAF7F5] p-1.5"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAF0F2] text-[#CE6A73]">
                            <CertificateIcon className="h-6 w-6" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-[#CE6A73]">
                            {cert.issuer}
                          </p>
                          <h4 className="font-serif text-base font-medium text-[#292022] leading-snug">
                            {cert.title}
                          </h4>
                        </div>
                      </div>
                      <StatusBadge published={cert.published} />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#7A6B6E]">
                      <span>Issued: {cert.issue_date}</span>
                      {cert.expiry_date && <span>· Valid: {cert.expiry_date}</span>}
                      {cert.credential_id && (
                        <span className="font-mono text-[#9C8D90]">
                          · ID: {cert.credential_id}
                        </span>
                      )}
                    </div>

                    {cert.description && (
                      <p className="text-xs text-[#594B4E] leading-relaxed line-clamp-3">
                        {cert.description}
                      </p>
                    )}

                    {cert.skills?.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-[#EED7DA] bg-[#FDF8F9] px-2 py-0.5 text-[10px] text-[#7A6B6E]"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 4 && (
                          <span className="rounded-full px-1.5 py-0.5 text-[10px] text-[#9C8D90]">
                            +{cert.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#F7EBEB] pt-3">
                    {cert.credential_url ? (
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#CE6A73] hover:underline"
                      >
                        Verify Credential
                        <ExternalIcon className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-[11px] text-[#9C8D90]">No public link</span>
                    )}

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingCert(false);
                          setEditingCert(cert);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="rounded-lg p-1.5 text-[#7A6B6E] hover:bg-[#FAF0F2] hover:text-[#292022]"
                        title="Edit Certificate"
                      >
                        <EditIcon className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete certificate "${cert.title}"?`)) {
                            startTransition(async () => {
                              await deleteCertificateAction(cert.id);
                            });
                          }
                        }}
                        className="rounded-lg p-1.5 text-[#7A6B6E] hover:bg-red-50 hover:text-red-600"
                        title="Delete Certificate"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
