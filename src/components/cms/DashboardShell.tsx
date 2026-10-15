"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface DashboardShellProps {
  children: React.ReactNode;
  unreadCount?: number;
  signOutAction: () => Promise<void>;
}

export default function DashboardShell({
  children,
  unreadCount = 0,
  signOutAction,
}: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FAF4F3] text-[#292022] font-sans antialiased">
      <Sidebar
        unreadCount={unreadCount}
        signOutAction={signOutAction}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="flex flex-1 flex-col min-w-0">
        <TopBar onOpenMobile={() => setMobileOpen(true)} />
        <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
