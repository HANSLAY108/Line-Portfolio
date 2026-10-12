import Link from "next/link";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { signOut } from "./actions";

export const instant = false;

const nav = [
  { href: "/cms", label: "Dashboard" },
  { href: "/cms/home", label: "Home" },
  { href: "/cms/projects", label: "Projects" },
  { href: "/cms/posts", label: "Blog Posts" },
  { href: "/cms/contact", label: "Contact" },
  { href: "/cms/skills", label: "Skills" },
  { href: "/cms/testimonials", label: "Testimonials" },
  { href: "/cms/social", label: "Social" },
  { href: "/cms/settings", label: "Settings" },
  { href: "/cms/messages", label: "Messages" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  await requireAdmin();

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-border bg-white px-5 py-6 lg:border-b-0 lg:border-r">
        <p className="font-serif text-xl">Line CMS</p>
        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-light">
          Studio
        </p>
        <nav className="mt-8 flex flex-wrap gap-2 lg:flex-col">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-accent-soft hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={signOut} className="mt-8">
          <button
            type="submit"
            className="text-sm text-muted-light hover:text-foreground"
          >
            Sign out
          </button>
        </form>
      </aside>
      <div className="px-6 py-10 lg:px-12">{children}</div>
    </div>
  );
}
