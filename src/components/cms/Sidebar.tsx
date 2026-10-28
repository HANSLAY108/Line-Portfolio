"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BlogIcon,
  DashboardIcon,
  DocIcon,
  FolderIcon,
  HomeIcon,
  JourneyIcon,
  LogOutIcon,
  MediaIcon,
  MessagesIcon,
  SettingsIcon,
  SkillsIcon,
  TestimonialsIcon,
} from "./CMSIcons";

interface SidebarProps {
  unreadCount?: number;
  signOutAction: () => Promise<void>;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({
  unreadCount = 0,
  signOutAction,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { href: "/cms", label: "Dashboard", icon: DashboardIcon, exact: true },
    { href: "/cms/home", label: "Home Page", icon: HomeIcon },
    { href: "/cms/projects", label: "Projects", icon: FolderIcon },
    { href: "/cms/posts", label: "Blog Posts", icon: BlogIcon },
    { href: "/cms/journey", label: "Journey & Education", icon: JourneyIcon },
    { href: "/cms/skills", label: "Skills", icon: SkillsIcon },
    { href: "/cms/testimonials", label: "Testimonials", icon: TestimonialsIcon },
    { href: "/cms/settings#media", label: "Media Library", icon: MediaIcon },
    {
      href: "/cms/messages",
      label: "Messages",
      icon: MessagesIcon,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { href: "/cms/settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between border-r border-[#F3E2E4] bg-white transition-all duration-300 ease-in-out lg:static ${
          collapsed ? "lg:w-[76px]" : "lg:w-[240px]"
        } ${mobileOpen ? "translate-x-0 w-[240px]" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col p-4 sm:p-5">
          {/* User Profile Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#F7EBEB]">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E8A5A5] to-[#CE6A73] text-sm font-semibold text-white shadow-xs">
              LM
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1 truncate">
                <p className="truncate text-[14px] font-semibold tracking-tight text-[#292022]">
                  Line Morelle
                </p>
                <p className="text-[11px] font-medium text-[#9C8D90]">
                  Portfolio Admin
                </p>
              </div>
            )}
          </div>

          {/* Nav Items */}
          <nav className="mt-5 space-y-1">
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname === item.href || (item.href !== "/cms" && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  title={collapsed ? item.label : undefined}
                  className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors ${
                    isActive
                      ? "bg-[#FCECEF] text-[#B85560]"
                      : "text-[#7A6B6E] hover:bg-[#FAF0F2] hover:text-[#292022]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`h-[18px] w-[18px] shrink-0 transition-colors ${
                        isActive ? "text-[#CE6A73]" : "text-[#9C8D90] group-hover:text-[#CE6A73]"
                      }`}
                    />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!collapsed && item.badge !== undefined && (
                    <span className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#D4737B] px-1.5 text-[10px] font-bold text-white shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area */}
        <div className="p-4 sm:p-5 border-t border-[#F7EBEB] space-y-1">
          <Link
            href="/SETUP.md"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-[12px] font-medium text-[#7A6B6E] hover:bg-[#FAF0F2] hover:text-[#292022] transition-colors"
            title={collapsed ? "Documentation" : undefined}
          >
            <DocIcon className="h-4 w-4 text-[#9C8D90]" />
            {!collapsed && <span>Documentation</span>}
          </Link>

          <form action={signOutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[12px] font-medium text-[#7A6B6E] hover:bg-[#FAF0F2] hover:text-red-600 transition-colors"
              title={collapsed ? "Log Out" : undefined}
            >
              <LogOutIcon className="h-4 w-4 text-[#9C8D90] group-hover:text-red-600" />
              {!collapsed && <span>Log Out</span>}
            </button>
          </form>

          {/* Collapse toggle (desktop only) */}
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="hidden lg:flex w-full items-center justify-center gap-2 rounded-xl border border-[#F2DFE2] bg-[#FDF8F9] px-3 py-2 text-[11px] font-semibold text-[#9C8D90] hover:text-[#292022] transition-colors mt-2"
          >
            {collapsed ? "→" : "‹ Collapse Sidebar"}
          </button>
        </div>
      </aside>
    </>
  );
}
