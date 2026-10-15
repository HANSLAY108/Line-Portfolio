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

  // Fetch unread messages count for sidebar badge
  const { count: unreadCount } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("read", false);

  return (
    <DashboardShell
      unreadCount={unreadCount ?? 0}
      signOutAction={signOut}
    >
      {children}
    </DashboardShell>
  );
}

