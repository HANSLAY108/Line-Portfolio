import Link from "next/link";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { markMessageRead } from "@/lib/actions/lists";
import {
  BlogIcon,
  CertificateIcon,
  ExternalIcon,
  FolderIcon,
  JourneyIcon,
  MediaIcon,
  MessagesIcon,
  PlusIcon,
  StarIcon,
} from "@/components/cms/CMSIcons";
import type { Certificate, Education, Message, PostRow, ProjectRow } from "@/lib/types";

export const instant = false;

function getTimeAgo(dateString?: string | null) {
  if (!dateString) return "Recently";
  const diff = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function getInitials(name?: string) {
  if (!name) return "LM";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default async function DashboardPage() {
  await connection();
  const { supabase, user } = await requireAdmin();

  const [
    { data: messagesData },
    { data: projectsData },
    { data: postsData },
    { data: settings },
    { data: educationsData },
    { data: certsData },
  ] = await Promise.all([
    supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("projects")
      .select("*")
      .order("updated_at", { ascending: false }),
    supabase
      .from("posts")
      .select("*")
      .order("updated_at", { ascending: false }),
    supabase
      .from("site_settings")
      .select("display_name")
      .eq("id", 1)
      .maybeSingle(),
    supabase
      .from("educations")
      .select("*")
      .order("sort_order"),
    supabase
      .from("certificates")
      .select("*")
      .order("sort_order"),
  ]);

  const messages = (messagesData ?? []) as Message[];
  const projects = (projectsData ?? []) as ProjectRow[];
  const posts = (postsData ?? []) as PostRow[];
  const educations = (educationsData ?? []) as Education[];
  const certificates = (certsData ?? []) as Certificate[];

  const unreadMessages = messages.filter((m) => !m.read);
  const featuredProjects = projects.filter((p) => p.featured);
  const draftProjects = projects.filter((p) => !p.published);
  const draftPosts = posts.filter((p) => !p.published);

  // Combine recent drafts for the "Recent Drafts" widget
  const recentDrafts = [
    ...draftProjects.map((p) => ({
      id: p.id,
      title: p.title,
      type: "Project",
      href: `/cms/projects/${p.id}`,
      updated: p.updated_at,
    })),
    ...draftPosts.map((p) => ({
      id: p.id,
      title: p.title,
      type: "Post",
      href: `/cms/posts/${p.id}`,
      updated: p.updated_at,
    })),
  ].slice(0, 3);

  const displayName = settings?.display_name || "Line";
  const firstName = displayName.split(" ")[0];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ── Top Hero Greeting Banner ── */}
      <div className="relative overflow-hidden rounded-3xl border border-[#F3E2E4] bg-white p-6 sm:p-8 lg:p-9 shadow-[0_2px_16px_rgba(206,106,115,0.04)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 max-w-2xl">
            <h1 className="font-serif text-[2.1rem] sm:text-[2.5rem] font-medium tracking-tight text-[#292022] leading-tight">
              Welcome back, <br className="hidden sm:inline" />
              {firstName}
            </h1>
            <p className="text-[13px] sm:text-[14px] text-[#7A6B6E] leading-relaxed">
              Here is what happened across your portfolio and engineering blog this week.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C8E6C9]/60 bg-[#EAF7EE] px-3 py-1 text-[11px] font-semibold text-[#2E7D32]">
                <span className="h-2 w-2 rounded-full bg-[#2E7D32] animate-pulse" />
                Live Site: Healthy · Signed in as {user.email}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/cms/journey"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#EED7DA] bg-white px-4 py-2.5 text-[12px] font-semibold text-[#292022] hover:bg-[#FAF0F2] hover:border-[#CE6A73] transition-colors shadow-xs"
            >
              <JourneyIcon className="h-3.5 w-3.5 text-[#CE6A73]" />
              Journey &amp; Education
            </Link>
            <Link
              href="/cms/projects/new"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#EED7DA] bg-white px-4 py-2.5 text-[12px] font-semibold text-[#292022] hover:bg-[#FAF0F2] hover:border-[#CE6A73] transition-colors shadow-xs"
            >
              <PlusIcon className="h-3.5 w-3.5 text-[#CE6A73]" />
              New Project
            </Link>
            <Link
              href="/cms/posts/new"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#EED7DA] bg-white px-4 py-2.5 text-[12px] font-semibold text-[#292022] hover:bg-[#FAF0F2] hover:border-[#CE6A73] transition-colors shadow-xs"
            >
              <PlusIcon className="h-3.5 w-3.5 text-[#CE6A73]" />
              New Blog Post
            </Link>
            <Link
              href="/cms/settings#media"
              className="inline-flex items-center gap-2 rounded-full bg-[#CE6A73] px-5 py-2.5 text-[12px] font-semibold text-white shadow-xs transition-colors hover:bg-[#B85860]"
            >
              <MediaIcon className="h-3.5 w-3.5" />
              Upload Media
            </Link>
          </div>
        </div>
      </div>

      {/* ── 4 Metric / Stat Cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Featured Projects */}
        <Link
          href="/cms/projects"
          className="group rounded-2xl border border-[#F3E2E4] bg-white p-5 shadow-[0_2px_12px_rgba(206,106,115,0.03)] transition-all hover:shadow-md hover:border-[#CE6A73]/40"
        >
          <div className="flex items-center justify-between text-[#9C8D90]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">
              Featured Projects
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FAF0F2] text-[#CE6A73] group-hover:bg-[#CE6A73] group-hover:text-white transition-colors">
              <FolderIcon className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-[2.2rem] font-medium tracking-tight text-[#292022]">
              {projects.length}
            </span>
            <span className="rounded-full bg-[#EAF7EE] px-2 py-0.5 text-[10px] font-semibold text-[#2E7D32]">
              +{featuredProjects.length} featured
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[#9C8D90]">
            {projects.length - draftProjects.length} live / {draftProjects.length} drafts
          </p>
        </Link>

        {/* Card 2: Blog Articles */}
        <Link
          href="/cms/posts"
          className="group rounded-2xl border border-[#F3E2E4] bg-white p-5 shadow-[0_2px_12px_rgba(206,106,115,0.03)] transition-all hover:shadow-md hover:border-[#CE6A73]/40"
        >
          <div className="flex items-center justify-between text-[#9C8D90]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">
              Blog Articles
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FAF0F2] text-[#CE6A73] group-hover:bg-[#CE6A73] group-hover:text-white transition-colors">
              <BlogIcon className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-[2.2rem] font-medium tracking-tight text-[#292022]">
              {posts.length}
            </span>
            <span className="rounded-full bg-[#FFF3E0] px-2 py-0.5 text-[10px] font-semibold text-[#D84315]">
              {draftPosts.length} drafts
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[#9C8D90]">
            {posts.length - draftPosts.length} live articles published
          </p>
        </Link>

        {/* Card 3: Unread Inquiries */}
        <Link
          href="/cms/messages"
          className="group rounded-2xl border border-[#F3E2E4] bg-white p-5 shadow-[0_2px_12px_rgba(206,106,115,0.03)] transition-all hover:shadow-md hover:border-[#CE6A73]/40"
        >
          <div className="flex items-center justify-between text-[#9C8D90]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">
              Unread Inquiries
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FAF0F2] text-[#CE6A73] group-hover:bg-[#CE6A73] group-hover:text-white transition-colors">
              <MessagesIcon className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-[2.2rem] font-medium tracking-tight text-[#292022]">
              {unreadMessages.length}
            </span>
            {unreadMessages.length > 0 && (
              <span className="rounded-full bg-[#FCECEF] px-2 py-0.5 text-[10px] font-semibold text-[#B85560]">
                {unreadMessages.length} new
              </span>
            )}
          </div>
          <p className="mt-1 text-[11px] text-[#9C8D90]">
            Latest {getTimeAgo(messages[0]?.created_at)}
          </p>
        </Link>

        {/* Card 4: Journey & Certifications */}
        <Link
          href="/cms/journey"
          className="group rounded-2xl border border-[#F3E2E4] bg-white p-5 shadow-[0_2px_12px_rgba(206,106,115,0.03)] transition-all hover:shadow-md hover:border-[#CE6A73]/40"
        >
          <div className="flex items-center justify-between text-[#9C8D90]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">
              Journey &amp; Certs
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FAF0F2] text-[#CE6A73] group-hover:bg-[#CE6A73] group-hover:text-white transition-colors">
              <JourneyIcon className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-[2.2rem] font-medium tracking-tight text-[#292022]">
              {educations.length + certificates.length}
            </span>
            <span className="rounded-full bg-[#EAF7EE] px-2 py-0.5 text-[10px] font-semibold text-[#2E7D32]">
              {certificates.length} certs
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[#9C8D90]">
            {educations.length} degrees &amp; {certificates.length} credentials
          </p>
        </Link>
      </div>

      {/* ── Lower Split Grid: Inquiries (Left) vs Widgets (Right) ── */}
      <div className="grid gap-6 lg:grid-cols-[1.65fr_1fr] items-start">
        {/* LEFT COLUMN: Recent Inquiries & Contact Messages */}
        <div className="rounded-3xl border border-[#F3E2E4] bg-white p-6 sm:p-7 shadow-[0_2px_14px_rgba(206,106,115,0.03)]">
          <div className="flex items-center justify-between pb-5 border-b border-[#F7EBEB]">
            <div>
              <h2 className="font-serif text-[1.25rem] font-medium text-[#292022]">
                Recent Inquiries & Contact Messages
              </h2>
              <p className="text-[12px] text-[#9C8D90]">
                Direct conversations through the contact form
              </p>
            </div>
            <Link
              href="/cms/messages"
              className="text-[12px] font-semibold text-[#CE6A73] hover:text-[#B85860] transition-colors"
            >
              View all ({messages.length}) →
            </Link>
          </div>

          <div className="mt-5 space-y-4">
            {messages.length === 0 ? (
              <p className="py-8 text-center text-sm text-[#9C8D90]">
                No messages received yet.
              </p>
            ) : (
              messages.slice(0, 4).map((msg) => (
                <div
                  key={msg.id}
                  className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                    msg.read
                      ? "border-[#F3E2E4] bg-white"
                      : "border-[#F2D7DB] bg-[#FFFBFB] shadow-xs"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F5D4D7] to-[#CE6A73] text-xs font-semibold text-white">
                        {getInitials(msg.full_name)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-[13px] font-semibold text-[#292022]">
                            {msg.full_name}
                          </p>
                          {!msg.read && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#CE6A73]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#9C8D90]">{msg.email}</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#9C8D90] whitespace-nowrap">
                      {getTimeAgo(msg.created_at)}
                    </span>
                  </div>

                  <p className="mt-3 text-[13px] font-medium text-[#292022]">
                    {msg.subject}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[12px] text-[#7A6B6E] leading-relaxed">
                    &ldquo;{msg.body}&rdquo;
                  </p>

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#F8EFEF]">
                    <span className="rounded-full bg-[#FAF0F2] px-2.5 py-0.5 text-[10px] font-semibold text-[#CE6A73]">
                      Contact Form
                    </span>

                    <div className="flex items-center gap-2">
                      <form
                        action={async () => {
                          "use server";
                          await markMessageRead(msg.id, !msg.read);
                        }}
                      >
                        <button
                          type="submit"
                          className="rounded-full border border-[#EED7DA] px-3 py-1 text-[11px] font-medium text-[#7A6B6E] hover:bg-[#FAF0F2] hover:text-[#292022] transition-colors"
                        >
                          {msg.read ? "Mark unread" : "Mark read"}
                        </button>
                      </form>
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject ?? "")}`}
                        className="rounded-full bg-[#CE6A73] px-3.5 py-1 text-[11px] font-medium text-white hover:bg-[#B85860] transition-colors shadow-xs"
                      >
                        Reply
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Quick Entries, Drafts, Storage */}
        <div className="space-y-6">
          {/* Quick Entries */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Link
              href="/cms/projects/new"
              className="group flex items-start gap-3.5 rounded-2xl border border-[#F3E2E4] bg-white p-4 shadow-xs hover:border-[#CE6A73] transition-colors"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FAF0F2] text-[#CE6A73] group-hover:bg-[#CE6A73] group-hover:text-white transition-colors">
                <FolderIcon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#292022] group-hover:text-[#CE6A73] transition-colors">
                  New Project Entry
                </p>
                <p className="text-[11px] text-[#9C8D90] leading-relaxed">
                  Add a new visual and repository showcase
                </p>
              </div>
            </Link>

            <Link
              href="/cms/posts/new"
              className="group flex items-start gap-3.5 rounded-2xl border border-[#F3E2E4] bg-white p-4 shadow-xs hover:border-[#CE6A73] transition-colors"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FAF0F2] text-[#CE6A73] group-hover:bg-[#CE6A73] group-hover:text-white transition-colors">
                <BlogIcon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#292022] group-hover:text-[#CE6A73] transition-colors">
                  Write Tech Article
                </p>
                <p className="text-[11px] text-[#9C8D90] leading-relaxed">
                  Draft technical engineering essay
                </p>
              </div>
            </Link>
          </div>

          {/* Recent Drafts Widget */}
          <div className="rounded-3xl border border-[#F3E2E4] bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#F7EBEB]">
              <h3 className="font-serif text-[1.05rem] font-medium text-[#292022]">
                Recent Drafts
              </h3>
              <span className="text-[11px] text-[#9C8D90]">
                {draftProjects.length + draftPosts.length} active
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {recentDrafts.length === 0 ? (
                <p className="py-4 text-center text-xs text-[#9C8D90]">
                  No drafts right now. All items published!
                </p>
              ) : (
                recentDrafts.map((d) => (
                  <div
                    key={`${d.type}-${d.id}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[#F7EBEB] bg-[#FDF9F9] p-3 transition-colors hover:border-[#EED7DA]"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-semibold text-[#292022]">
                        {d.title}
                      </p>
                      <p className="text-[10px] text-[#9C8D90]">
                        {d.type} · Edited {getTimeAgo(d.updated)}
                      </p>
                    </div>
                    <Link
                      href={d.href}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#CE6A73] hover:underline shrink-0"
                    >
                      Resume
                      <ExternalIcon className="h-3 w-3" />
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* System Storage Widget */}
          <div className="rounded-3xl border border-[#F3E2E4] bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#292022]">
                <MediaIcon className="h-4 w-4 text-[#CE6A73]" />
                <span className="text-[12px] font-semibold">System Storage</span>
              </div>
              <span className="text-[11px] text-[#9C8D90]">2.4 GB / 10 GB</span>
            </div>

            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#FCECEF]">
              <div className="h-full w-[24%] rounded-full bg-[#CE6A73]" />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px]">
              <span className="text-[#9C8D90]">Media storage at 24%</span>
              <Link
                href="/cms/settings#media"
                className="font-semibold text-[#CE6A73] hover:underline"
              >
                Manage Assets
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
