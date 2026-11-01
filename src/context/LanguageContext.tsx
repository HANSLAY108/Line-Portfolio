"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import enMessages from "../../messages/en.json";
import frMessages from "../../messages/fr.json";
import { translateContentString } from "@/lib/i18n/content-translations";

export type Locale = "en" | "fr";

type Messages = Record<string, any>;

const dictionaries: Record<Locale, Messages> = {
  en: enMessages,
  fr: frMessages,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string, fallback?: string) => string;
  tr: (text: string | null | undefined) => string;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  toggleLocale: () => {},
  t: (_key, fallback) => fallback ?? "",
  tr: (text) => text ?? "",
  mounted: false,
});

function getNestedValue(obj: any, path: string): string | undefined {
  if (!obj || !path) return undefined;
  const keys = path.split(".");
  let current = obj;
  for (const k of keys) {
    if (current && typeof current === "object" && k in current) {
      current = current[k];
    } else {
      return undefined;
    }
  }
  return typeof current === "string" ? current : undefined;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const match = document.cookie.match(/(?:^|; )locale=([^;]*)/);
      const cookieLocale = match ? decodeURIComponent(match[1]) : null;
      const stored = localStorage.getItem("preferred_locale") || cookieLocale;

      if (stored === "fr" || stored === "en") {
        setLocaleState(stored);
        document.documentElement.lang = stored;
        return;
      }

      if (
        typeof navigator !== "undefined" &&
        navigator.language &&
        navigator.language.toLowerCase().startsWith("fr")
      ) {
        setLocaleState("fr");
        document.documentElement.lang = "fr";
        document.cookie = "locale=fr; path=/; max-age=31536000; SameSite=Lax";
        localStorage.setItem("preferred_locale", "fr");
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      document.documentElement.lang = newLocale;
      localStorage.setItem("preferred_locale", newLocale);
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "fr" : "en");
  }, [locale, setLocale]);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const activeDict = dictionaries[locale];
      const val = getNestedValue(activeDict, key);
      if (val !== undefined) return val;

      if (fallback) {
        const mapped = translateContentString(fallback, locale);
        if (mapped !== fallback) return mapped;
      }

      const fallbackDict = dictionaries.en;
      const fallbackVal = getNestedValue(fallbackDict, key);
      if (fallbackVal !== undefined) {
        return locale === "fr"
          ? translateContentString(fallbackVal, "fr")
          : fallbackVal;
      }

      return fallback ? translateContentString(fallback, locale) : key;
    },
    [locale],
  );

  const tr = useCallback(
    (text: string | null | undefined): string => {
      return translateContentString(text, locale);
    },
    [locale],
  );

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, toggleLocale, t, tr, mounted }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/**
 * Lightweight helper to wrap static text or DB strings.
 * Translates every string to French when locale === "fr", and to English when locale === "en".
 * Uses suppressHydrationWarning to eliminate SSR/CSR hydration mismatch differences.
 */
export function T({
  k,
  children,
  fallback,
}: {
  k?: string;
  children?: React.ReactNode;
  fallback?: string;
}) {
  const { t, tr, locale, mounted } = useLanguage();

  const childString =
    typeof children === "string"
      ? children
      : typeof children === "number"
        ? String(children)
        : undefined;

  const hasValidChild =
    children !== undefined && children !== null && childString !== "";

  if (!mounted) {
    if (hasValidChild) {
      return (
        <span suppressHydrationWarning className="contents">
          {children}
        </span>
      );
    }
    const ssrFallback = k ? getNestedValue(dictionaries.en, k) : fallback;
    return (
      <span suppressHydrationWarning className="contents">
        {ssrFallback ?? fallback ?? ""}
      </span>
    );
  }

  // If no dictionary key k is provided, translate the dynamic child string directly
  if (!k) {
    if (childString !== undefined) {
      return (
        <span suppressHydrationWarning className="contents">
          {tr(childString)}
        </span>
      );
    }
    return (
      <span suppressHydrationWarning className="contents">
        {fallback ? tr(fallback) : children}
      </span>
    );
  }

  if (locale === "en") {
    // In English: if childString is present, translate any French DB text to English;
    // also if k === "hero.badge" and DB accidentally has "Building digital", use en dictionary
    if (hasValidChild && childString !== undefined) {
      if (k === "hero.badge" && childString.trim() === "Building digital") {
        return (
          <span suppressHydrationWarning className="contents">
            {t(k, childString)}
          </span>
        );
      }
      return (
        <span suppressHydrationWarning className="contents">
          {tr(childString)}
        </span>
      );
    }
    if (hasValidChild) {
      return (
        <span suppressHydrationWarning className="contents">
          {children}
        </span>
      );
    }
    return (
      <span suppressHydrationWarning className="contents">
        {t(k, fallback)}
      </span>
    );
  }

  // In French (locale === "fr"):
  // If childString has an exact custom translation in content-translations (e.g. custom hero_body),
  // prefer that if it differs from the raw English string and k is not in frMessages;
  // otherwise use the French dictionary key `k`, falling back to `tr(childString)`.
  const dictFr = getNestedValue(dictionaries.fr, k);
  if (dictFr !== undefined) {
    // Special case: if childString is a custom DB paragraph that has its own tailored FR translation
    if (
      childString &&
      k === "hero.body" &&
      tr(childString) !== childString
    ) {
      return (
        <span suppressHydrationWarning className="contents">
          {tr(childString)}
        </span>
      );
    }
    return (
      <span suppressHydrationWarning className="contents">
        {dictFr}
      </span>
    );
  }

  const translated = childString
    ? tr(childString)
    : t(k, fallback);

  return (
    <span suppressHydrationWarning className="contents">
      {translated}
    </span>
  );
}
