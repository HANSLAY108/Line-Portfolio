"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CloseIcon, LogoIcon, MenuIcon } from "./icons";

const navItems = [
  { href: "/", key: "nav.home", fallback: "Home" },
  { href: "/projects", key: "nav.projects", fallback: "Projects" },
  { href: "/blog", key: "nav.blog", fallback: "Blog" },
  { href: "/contact", key: "nav.contact", fallback: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-[72px] max-w-[1120px] items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-foreground"
          onClick={() => setOpen(false)}
        >
          <LogoIcon className="h-5 w-5 text-foreground" />
          <span className="text-[15px] font-semibold tracking-tight">
            Line Morelle
          </span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-[14px] font-medium transition-colors ${
                    active
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {t(item.key, item.fallback)}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={toggleLocale}
            aria-label="Toggle language between English and French"
            className="flex items-center gap-1 rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted transition-colors hover:border-foreground/30 hover:text-foreground shadow-xs"
          >
            <span className={locale === "en" ? "font-bold text-foreground" : "text-muted-light"}>
              EN
            </span>
            <span className="text-muted-light">/</span>
            <span className={locale === "fr" ? "font-bold text-foreground" : "text-muted-light"}>
              FR
            </span>
          </button>

          <Link
            href="/contact"
            className="rounded-lg bg-accent px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-accent-hover"
          >
            {t("nav.letsTalk", "Let's Talk")}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleLocale}
            aria-label="Toggle language between English and French"
            className="flex items-center gap-1 rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted transition-colors hover:text-foreground shadow-xs"
          >
            <span className={locale === "en" ? "font-bold text-foreground" : "text-muted-light"}>
              EN
            </span>
            <span className="text-muted-light">/</span>
            <span className={locale === "fr" ? "font-bold text-foreground" : "text-muted-light"}>
              FR
            </span>
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground"
            aria-label={open ? t("nav.closeMenu", "Close menu") : t("nav.openMenu", "Open menu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div className="animate-fade-in border-t border-border bg-background px-6 py-5 md:hidden">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block text-[15px] font-medium ${
                      active ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {t(item.key, item.fallback)}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-accent px-5 py-3 text-[14px] font-medium text-white"
          >
            {t("nav.letsTalk", "Let's Talk")}
          </Link>
        </div>
      )}
    </header>
  );
}

