"use client";

import { useMemo, useState, useTransition } from "react";
import { Card } from "./ui";
import { SearchIcon, TrashIcon } from "./CMSIcons";
import FormattedDate from "./FormattedDate";
import type { ServiceRequest } from "@/lib/types";

interface ServiceRequestsManagerProps {
  requests: ServiceRequest[];
  serviceOptions: string[];
  markReadAction: (id: string, read: boolean) => Promise<void>;
  deleteAction: (id: string) => Promise<void>;
}

export default function ServiceRequestsManager({
  requests,
  serviceOptions,
  markReadAction,
  deleteAction,
}: ServiceRequestsManagerProps) {
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "read">(
    "all",
  );
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(
    requests[0]?.id ?? null,
  );
  const [isPending, startTransition] = useTransition();

  const allServices = useMemo(() => {
    const set = new Set<string>(serviceOptions);
    requests.forEach((r) => {
      if (r.service_needed) set.add(r.service_needed);
    });
    set.add("Other");
    return Array.from(set);
  }, [requests, serviceOptions]);

  const unreadCount = requests.filter((r) => !r.read).length;
  const readCount = requests.filter((r) => r.read).length;

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      if (statusFilter === "unread" && r.read) return false;
      if (statusFilter === "read" && !r.read) return false;
      if (serviceFilter !== "all" && r.service_needed !== serviceFilter) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        const hay = `${r.full_name} ${r.email} ${r.service_needed} ${
          r.company_website ?? ""
        } ${r.project_details}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [requests, statusFilter, serviceFilter, search]);

  const selectedRequest = useMemo(() => {
    return (
      filtered.find((r) => r.id === selectedId) ??
      filtered[0] ??
      null
    );
  }, [filtered, selectedId]);

  function handleSelectRequest(req: ServiceRequest) {
    setSelectedId(req.id);
    if (!req.read) {
      startTransition(async () => {
        await markReadAction(req.id, true);
      });
    }
  }

  return (
    <div className="space-y-6">
      {/* ── Toolbar: Status Pills, Service Filter Dropdown, Search ── */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {/* Read/Unread Filter Tabs */}
          <div className="inline-flex rounded-full border border-[#F3E2E4] bg-white p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-colors ${
                statusFilter === "all"
                  ? "bg-[#CE6A73] text-white shadow-xs"
                  : "text-[#7A6B6E] hover:text-[#292022]"
              }`}
            >
              All ({requests.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("unread")}
              className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-colors ${
                statusFilter === "unread"
                  ? "bg-[#CE6A73] text-white shadow-xs"
                  : "text-[#7A6B6E] hover:text-[#292022]"
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("read")}
              className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-colors ${
                statusFilter === "read"
                  ? "bg-[#CE6A73] text-white shadow-xs"
                  : "text-[#7A6B6E] hover:text-[#292022]"
              }`}
            >
              Read ({readCount})
            </button>
          </div>

          {/* Filter by Service */}
          <select
            aria-label="Filter by service"
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="h-9 rounded-full border border-[#EED7DA] bg-white px-4 text-[12px] font-medium text-[#292022] outline-none focus:border-[#CE6A73]"
          >
            <option value="all">All Services</option>
            {allServices.map((svc) => (
              <option key={svc} value={svc}>
                {svc}
              </option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-64">
          <SearchIcon className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9C8D90]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, details..."
            className="h-9 w-full rounded-full border border-[#EED7DA] bg-white pl-9 pr-3 text-[12px] text-[#292022] placeholder:text-[#A8989B] outline-none focus:border-[#CE6A73]"
          />
        </div>
      </div>

      {/* ── List + Detail Split View ── */}
      {filtered.length === 0 ? (
        <Card className="py-12 text-center">
          <p className="font-serif text-lg text-[#292022]">
            No service requests found
          </p>
          <p className="mt-1 text-xs text-[#9C8D90]">
            {requests.length === 0
              ? "New inquiries submitted from the /services form will appear here."
              : "Try clearing your service or status filter."}
          </p>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_1.35fr] lg:items-start">
          {/* Left Column: Inbox List */}
          <div className="space-y-3">
            {filtered.map((req) => {
              const isSelected = selectedRequest?.id === req.id;
              return (
                <div
                  key={req.id}
                  onClick={() => handleSelectRequest(req)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                    isSelected
                      ? "border-[#CE6A73] bg-[#FFF9FA] shadow-sm ring-1 ring-[#CE6A73]/25"
                      : req.read
                        ? "border-[#F3E2E4] bg-white hover:border-[#EED7DA]"
                        : "border-[#F2D7DB] bg-[#FFFDFD] shadow-xs hover:border-[#CE6A73]/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {!req.read && (
                          <span
                            className="h-2 w-2 shrink-0 rounded-full bg-[#CE6A73]"
                            title="Unread"
                          />
                        )}
                        <p
                          className={`truncate text-[14px] ${
                            req.read
                              ? "font-medium text-[#292022]"
                              : "font-bold text-[#292022]"
                          }`}
                        >
                          {req.full_name}
                        </p>
                      </div>
                      <p className="truncate text-[12px] text-[#7A6B6E]">
                        {req.email}
                      </p>
                    </div>
                    <span className="shrink-0 text-[11px] text-[#9C8D90]">
                      <FormattedDate dateString={req.created_at} />
                    </span>
                  </div>

                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    <span className="rounded-full bg-[#FAF0F2] px-2.5 py-0.5 text-[10px] font-semibold text-[#B85560]">
                      {req.service_needed}
                    </span>
                    {req.budget_range && (
                      <span className="rounded-full border border-[#EED7DA] bg-white px-2 py-0.5 text-[10px] font-medium text-[#7A6B6E]">
                        {req.budget_range}
                      </span>
                    )}
                    {req.timeline && (
                      <span className="rounded-full border border-[#EED7DA] bg-white px-2 py-0.5 text-[10px] font-medium text-[#7A6B6E]">
                        {req.timeline}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-[#594B4E]">
                    {req.project_details}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detail View */}
          {selectedRequest && (
            <Card className="sticky top-6 space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#F7EBEB] pb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-serif text-2xl font-medium text-[#292022]">
                      {selectedRequest.full_name}
                    </h2>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        selectedRequest.read
                          ? "bg-[#F4EFF0] text-[#7A6B6E]"
                          : "bg-[#FCECEF] text-[#B85560]"
                      }`}
                    >
                      {selectedRequest.read ? "Read" : "Unread"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[#7A6B6E]">
                    <a
                      href={`mailto:${selectedRequest.email}`}
                      className="text-[#CE6A73] hover:underline"
                    >
                      {selectedRequest.email}
                    </a>
                    {" · "}
                    <span className="text-xs text-[#9C8D90]">
                      <FormattedDate dateString={selectedRequest.created_at} />
                    </span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => {
                      startTransition(async () => {
                        await markReadAction(
                          selectedRequest.id,
                          !selectedRequest.read,
                        );
                      });
                    }}
                    className="rounded-full border border-[#EED7DA] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#7A6B6E] hover:bg-[#FAF0F2] hover:text-[#292022] transition-colors"
                  >
                    Mark as {selectedRequest.read ? "Unread" : "Read"}
                  </button>

                  <a
                    href={`mailto:${selectedRequest.email}?subject=${encodeURIComponent(
                      `Re: ${selectedRequest.service_needed} Inquiry`,
                    )}`}
                    className="rounded-full bg-[#CE6A73] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#B85860] transition-colors shadow-xs"
                  >
                    Reply via Email
                  </a>

                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => {
                      if (
                        confirm(
                          `Delete service request from "${selectedRequest.full_name}"?`,
                        )
                      ) {
                        startTransition(async () => {
                          await deleteAction(selectedRequest.id);
                        });
                      }
                    }}
                    className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50/60 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100/70 transition-colors"
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>

              {/* Metadata Grid */}
              <div className="grid gap-4 rounded-2xl border border-[#F3E2E4] bg-[#FDFBFB] p-4 sm:grid-cols-2">
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9C8D90]">
                    Service Requested
                  </span>
                  <span className="mt-1 inline-block font-serif text-[15px] font-medium text-[#292022]">
                    {selectedRequest.service_needed}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9C8D90]">
                    Company / Website
                  </span>
                  <span className="mt-1 inline-block text-sm font-medium text-[#292022]">
                    {selectedRequest.company_website || "Not specified"}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9C8D90]">
                    Estimated Budget
                  </span>
                  <span className="mt-1 inline-block text-sm font-medium text-[#292022]">
                    {selectedRequest.budget_range || "Not specified"}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9C8D90]">
                    Preferred Timeline
                  </span>
                  <span className="mt-1 inline-block text-sm font-medium text-[#292022]">
                    {selectedRequest.timeline || "Not specified"}
                  </span>
                </div>
              </div>

              {/* Project Details Body */}
              <div>
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A6B6E]">
                  Project Details &amp; Scope
                </h3>
                <div className="rounded-2xl border border-[#F3E2E4] bg-white p-5 text-sm leading-[1.75] whitespace-pre-wrap text-[#292022]">
                  {selectedRequest.project_details}
                </div>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

