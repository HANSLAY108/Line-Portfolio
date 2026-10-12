import Link from "next/link";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { PageTitle } from "@/components/cms/ui";

export const instant = false;

export default async function DashboardPage() {
  await connection();
  const { supabase, user } = await requireAdmin();
  const [{ count: unread }, { count: projects }] = await Promise.all([
    supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .eq("read", false),
    supabase.from("projects").select("*", { count: "exact", head: true }),
  ]);

  return (
    <>
      <PageTitle eyebrow="Overview" title="Dashboard" />
      <p className="mb-8 text-sm text-muted">
        Signed in as <span className="font-medium text-foreground">{user.email}</span>. Content and image updates appear on the public site immediately.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/cms/messages"
          className="rounded-2xl bg-white p-6 ring-1 ring-border transition hover:shadow-md hover:ring-foreground/20"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-text">
            Inbox
          </p>
          <p className="mt-2 font-serif text-3xl">{unread ?? 0}</p>
          <p className="mt-1 text-sm text-muted">unread messages</p>
        </Link>

        <Link
          href="/cms/projects"
          className="rounded-2xl bg-white p-6 ring-1 ring-border transition hover:shadow-md hover:ring-foreground/20"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-text">
            Portfolio
          </p>
          <p className="mt-2 font-serif text-3xl">{projects ?? 0}</p>
          <p className="mt-1 text-sm text-muted">projects in catalogue</p>
        </Link>

        <Link
          href="/cms/home"
          className="rounded-2xl bg-white p-6 ring-1 ring-border transition hover:shadow-md hover:ring-foreground/20"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-text">
            Home Page
          </p>
          <p className="mt-2 font-serif text-2xl">Hero & Portrait</p>
          <p className="mt-1 text-sm text-muted">Upload portrait & copy</p>
        </Link>

        <Link
          href="/cms/contact"
          className="rounded-2xl bg-white p-6 ring-1 ring-border transition hover:shadow-md hover:ring-foreground/20"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-text">
            Contact Page
          </p>
          <p className="mt-2 font-serif text-2xl">Contact Visual</p>
          <p className="mt-1 text-sm text-muted">Upload photo & details</p>
        </Link>

        <Link
          href="/cms/projects"
          className="rounded-2xl bg-white p-6 ring-1 ring-border transition hover:shadow-md hover:ring-foreground/20"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-text">
            Project Pages
          </p>
          <p className="mt-2 font-serif text-2xl">Covers & Visuals</p>
          <p className="mt-1 text-sm text-muted">Upload covers & philosophy image</p>
        </Link>

        <Link
          href="/cms/settings"
          className="rounded-2xl bg-white p-6 ring-1 ring-border transition hover:shadow-md hover:ring-foreground/20"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-text">
            Studio
          </p>
          <p className="mt-2 font-serif text-2xl">Settings & CV</p>
          <p className="mt-1 text-sm text-muted">Resume PDF & general settings</p>
        </Link>
      </div>
    </>
  );
}
