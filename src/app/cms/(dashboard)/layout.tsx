import { connection } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { signOut } from "./actions";
import DashboardShell from "@/components/cms/DashboardShell";

export const instant = false;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const { supabase } = await requireAdmin();

  // Fetch unread messages count and unread service requests count for sidebar badges
  const [{ count: unreadCount }, { count: unreadServiceRequestsCount }] =
    await Promise.all([
      supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("read", false),
      supabase
        .from("service_requests")
        .select("*", { count: "exact", head: true })
        .eq("read", false),
    ]);

  return (
    <DashboardShell
      unreadCount={unreadCount ?? 0}
      unreadServiceRequestsCount={unreadServiceRequestsCount ?? 0}
      signOutAction={signOut}
    >
      {children}
    </DashboardShell>
  );
}
