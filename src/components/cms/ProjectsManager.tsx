"use client";

import Link from "next/link";
import { useState } from "react";
import { publicMediaUrl } from "@/lib/media";
import { EditIcon, ExternalIcon, SearchIcon, StarIcon, TrashIcon } from "./CMSIcons";
import { StatusBadge } from "./ui";

interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  filters: string[];
  summary: string;
  tags: string[];
  live_url: string | null;
  repo_url: string | null;
  cover_path: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  updated_at: string;
}

interface ProjectsManagerProps {
  initialProjects: ProjectItem[];
  deleteAction: (id: string) => Promise<void>;
}

export default function ProjectsManager({
  initialProjects,
  deleteAction,
}: ProjectsManagerProps) {
  const [filter, setFilter] = useState<"all" | "published" | "drafts" | "featured">("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const publishedCount = initialProjects.filter((p) => p.published).length;
  const draftCount = initialProjects.filter((p) => !p.published).length;
  const featuredCount = initialProjects.filter((p) => p.featured).length;

  const filtered = initialProjects.filter((p) => {
    if (filter === "published" && !p.published) return false;
    if (filter === "drafts" && p.published) return false;
    if (filter === "featured" && !p.featured) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchCategory || matchTags;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getTimeAgo = (dateStr?: string) => {
    if (!dateStr) return "Recently";
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days <= 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 7) return `${days} days ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="space-y-6">
      {/* ── Toolbar: Filter tabs & Search ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-full border border-[#F3E2E4] bg-white p-1 shadow-xs">
          <button
            type="button"
            onClick={() => {
              setFilter("all");
              setPage(1);
            }}
            className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-colors ${
              filter === "all"
                ? "bg-[#CE6A73] text-white shadow-xs"
                : "text-[#7A6B6E] hover:text-[#292022]"
            }`}
          >
            All ({initialProjects.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setFilter("published");
              setPage(1);
            }}
            className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-colors ${
              filter === "published"
                ? "bg-[#CE6A73] text-white shadow-xs"
                : "text-[#7A6B6E] hover:text-[#292022]"
            }`}
          >
            Published ({publishedCount})
          </button>
          <button
            type="button"
            onClick={() => {
              setFilter("drafts");
              setPage(1);
            }}
            className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-colors ${
              filter === "drafts"
                ? "bg-[#CE6A73] text-white shadow-xs"
                : "text-[#7A6B6E] hover:text-[#292022]"
            }`}
          >
            Drafts ({draftCount})
          </button>
          <button
            type="button"
            onClick={() => {
              setFilter("featured");
              setPage(1);
            }}
            className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-colors ${
              filter === "featured"
                ? "bg-[#CE6A73] text-white shadow-xs"
                : "text-[#7A6B6E] hover:text-[#292022]"
            }`}
          >
            Featured ({featuredCount})
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <SearchIcon className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9C8D90]" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search projects by title, tech..."
            className="h-9 w-full rounded-full border border-[#EED7DA] bg-white pl-9 pr-3 text-[12px] text-[#292022] placeholder:text-[#A8989B] outline-none transition-all focus:border-[#CE6A73] focus:ring-1 focus:ring-[#CE6A73]/20"
          />
        </div>
      </div>

      {/* ── Project Cards List ── */}
      <div className="space-y-3.5">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-[#F3E2E4] bg-white p-12 text-center">
            <p className="font-serif text-lg text-[#292022]">No projects found</p>
            <p className="mt-1 text-xs text-[#9C8D90]">
              {search ? "Try adjusting your search criteria." : "Click '+ Add Project' to create one."}
            </p>
          </div>
        ) : (
          paginated.map((project) => {
            const coverSrc = publicMediaUrl(project.cover_path);
            const liveDomain = project.live_url
              ? project.live_url.replace(/^https?:\/\//, "").replace(/\/$/, "")
              : null;
            const repoDomain = project.repo_url
              ? project.repo_url.replace(/^https?:\/\//, "").replace(/\/$/, "")
              : null;

            return (
              <div
                key={project.id}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#F3E2E4] bg-white p-4 sm:p-5 shadow-[0_2px_12px_rgba(206,106,115,0.03)] transition-all hover:border-[#CE6A73]/40 hover:shadow-md"
              >
                {/* Left: Thumbnail + Info */}
                <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                  {/* Thumbnail */}
                  <div className="relative h-16 w-24 sm:h-20 sm:w-28 shrink-0 overflow-hidden rounded-xl border border-[#F5E6E8] bg-[#FAF0F2]">
                    {coverSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={coverSrc}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-serif text-lg text-[#CE6A73]/60">
                        ✦
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1 space-y-1.5">
                    {/* Title + Star + Status */}
                    <div className="flex flex-wrap items-center gap-2">
                      {project.featured && (
                        <StarIcon className="h-4 w-4 text-[#CE6A73] fill-[#CE6A73] shrink-0" />
                      )}
                      <Link
                        href={`/cms/projects/${project.id}`}
                        className="font-serif text-[1.05rem] sm:text-[1.15rem] font-medium text-[#292022] hover:text-[#CE6A73] transition-colors truncate"
                      >
                        {project.title}
                      </Link>
                      <StatusBadge published={project.published} />
                    </div>

                    {/* Tags row */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-[#F5E6E8] bg-[#FAF5F6] px-2 py-0.5 text-[10px] font-medium text-[#7A6B6E]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Metadata line */}
                    <p className="text-[11px] text-[#9C8D90] truncate">
                      Updated {getTimeAgo(project.updated_at)}
                      {liveDomain && (
                        <>
                          <span className="mx-1.5 text-[#EED7DA]">·</span>
                          <span className="text-[#CE6A73]">{liveDomain}</span>
                        </>
                      )}
                      {repoDomain && (
                        <>
                          <span className="mx-1.5 text-[#EED7DA]">·</span>
                          <span className="text-[#7A6B6E]">{repoDomain}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 sm:gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F7EBEB] self-end sm:self-center">
                  <Link
                    href={`/projects/${project.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 rounded-full border border-[#EED7DA] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#7A6B6E] hover:bg-[#FAF0F2] hover:text-[#292022] transition-colors"
                  >
                    <ExternalIcon className="h-3 w-3" />
                    Preview
                  </Link>
                  <Link
                    href={`/cms/projects/${project.id}`}
                    className="inline-flex items-center gap-1 rounded-full border border-[#EED7DA] bg-white px-3.5 py-1.5 text-[11px] font-semibold text-[#CE6A73] hover:bg-[#FAF0F2] hover:border-[#CE6A73] transition-colors"
                  >
                    <EditIcon className="h-3 w-3" />
                    Edit
                  </Link>
                  <form
                    action={async () => {
                      if (confirm("Are you sure you want to delete this project?")) {
                        await deleteAction(project.id);
                      }
                    }}
                  >
                    <button
                      type="submit"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-[#9C8D90] hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="Delete project"
                    >
                      <TrashIcon className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── Pagination Footer ── */}
      {filtered.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#F3E2E4]">
          <p className="text-[12px] text-[#9C8D90]">
            Showing {(currentPage - 1) * pageSize + 1} -{" "}
            {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} projects
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-full border border-[#EED7DA] bg-white px-3 py-1 text-[11px] font-medium text-[#7A6B6E] hover:bg-[#FAF0F2] disabled:opacity-40 transition-colors"
              >
                ‹ Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setPage(num)}
                  className={`h-7 w-7 rounded-full text-[11px] font-bold transition-colors ${
                    num === currentPage
                      ? "bg-[#CE6A73] text-white shadow-xs"
                      : "border border-[#EED7DA] bg-white text-[#7A6B6E] hover:bg-[#FAF0F2]"
                  }`}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-full border border-[#EED7DA] bg-white px-3 py-1 text-[11px] font-medium text-[#7A6B6E] hover:bg-[#FAF0F2] disabled:opacity-40 transition-colors"
              >
                Next ›
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
