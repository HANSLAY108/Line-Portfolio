"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BellIcon, ExternalIcon, SearchIcon } from "./CMSIcons";
import { useLanguage } from "@/context/LanguageContext";

interface TopBarProps {
  onOpenMobile: () => void;
}

export default function TopBar({ onOpenMobile }: TopBarProps) {
  const pathname = usePathname();
  const { locale, toggleLocale } = useLanguage();

  const getBreadcrumb = () => {
    if (pathname === "/cms") {
      return { title: "Dashboard Overview", subtitle: "" };
    }
    if (pathname.startsWith("/cms/projects")) {
      return { title: "Projects", subtitle: "Indexed & Curated Repositories" };
    }
    if (pathname.startsWith("/cms/posts")) {
      return { title: "Blog Posts", subtitle: "Writings & Technical Essays" };
    }
    if (pathname.startsWith("/cms/home")) {
      return { title: "Home Page", subtitle: "Hero & Portrait Configuration" };
    }
    if (pathname.startsWith("/cms/contact")) {
      return { title: "Contact", subtitle: "Inquiries & Studio Details" };
    }
    if (pathname.startsWith("/cms/skills")) {
      return { title: "Skills", subtitle: "Expertise & Engineering Domains" };
    }
    if (pathname.startsWith("/cms/testimonials")) {
      return { title: "Testimonials", subtitle: "Client Endorsements & Quotes" };
    }
    if (pathname.startsWith("/cms/messages")) {
      return { title: "Inbox", subtitle: "Client Inquiries & Contact Forms" };
    }
    if (pathname.startsWith("/cms/settings")) {
      return { title: "Settings", subtitle: "Studio Preferences & Metadata" };
    }
    return { title: "CMS Studio", subtitle: "Portfolio Admin" };
  };

  const { title, subtitle } = getBreadcrumb();

  return (
    <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-[#F3E2E4] bg-white/80 px-4 sm:px-8 backdrop-blur-md">
      {/* Left: Mobile hamburger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobile}
          className="rounded-lg p-2 text-[#7A6B6E] hover:bg-[#FAF0F2] hover:text-[#292022] lg:hidden"
          aria-label="Open navigation menu"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="flex items-baseline gap-2">
          <h1 className="font-serif text-[1.1rem] sm:text-[1.25rem] font-medium text-[#292022]">
            {title}
          </h1>
          {subtitle && (
            <span className="hidden text-[12px] text-[#9C8D90] md:inline">
              / {subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Input */}
        <div className="relative hidden md:block">
          <SearchIcon className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9C8D90]" />
          <input
            type="text"
            placeholder="Quick search..."
            className="h-8 w-44 rounded-full border border-[#EED7DA] bg-[#FDF8F9] pl-8 pr-3 text-[12px] text-[#292022] placeholder:text-[#A8989B] outline-none transition-all focus:w-60 focus:border-[#CE6A73] focus:bg-white focus:ring-1 focus:ring-[#CE6A73]/20"
          />
        </div>

        {/* EN / FR Toggle pill */}
        <button
          type="button"
          onClick={toggleLocale}
          className="flex h-8 items-center gap-1 rounded-full border border-[#EED7DA] bg-[#FDF8F9] px-2.5 text-[11px] font-semibold text-[#7A6B6E] hover:border-[#CE6A73] transition-colors"
          title="Toggle CMS preview language"
        >
          <span className={locale === "en" ? "font-bold text-[#CE6A73]" : "text-[#9C8D90]"}>
            EN
          </span>
          <span className="text-[#EED7DA]">/</span>
          <span className={locale === "fr" ? "font-bold text-[#CE6A73]" : "text-[#9C8D90]"}>
            FR
          </span>
        </button>

        {/* View Site link */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex h-8 items-center gap-1.5 rounded-full border border-[#EED7DA] bg-white px-3 text-[12px] font-medium text-[#7A6B6E] hover:bg-[#FAF0F2] hover:text-[#292022] transition-colors"
        >
          <span>View Site</span>
          <ExternalIcon className="h-3 w-3 text-[#9C8D90]" />
        </Link>

        {/* Notification Bell */}
        <button
          type="button"
          className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#EED7DA] bg-white text-[#7A6B6E] hover:bg-[#FAF0F2] hover:text-[#292022] transition-colors"
          aria-label="Notifications"
        >
          <BellIcon className="h-3.5 w-3.5 text-[#7A6B6E]" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#CE6A73]" />
        </button>

        {/* User Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#E8A5A5] to-[#CE6A73] text-[11px] font-semibold text-white shadow-xs">
          LM
        </div>
      </div>
    </header>
  );
}
