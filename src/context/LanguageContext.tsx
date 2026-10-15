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
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  toggleLocale: () => {},
  t: (_key, fallback) => fallback ?? "",
  mounted: false,
});

function getNestedValue(obj: any, path: string): string | undefined {
  if (!obj) return undefined;
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
    // 1. Check cookie or localStorage
    try {
      const match = document.cookie.match(/(?:^|; )locale=([^;]*)/);
      const cookieLocale = match ? decodeURIComponent(match[1]) : null;
      const stored = localStorage.getItem("preferred_locale") || cookieLocale;

      if (stored === "fr" || stored === "en") {
        setLocaleState(stored);
        return;
      }

      // 2. Auto-detect French browser
      if (
        typeof navigator !== "undefined" &&
        navigator.language &&
        navigator.language.toLowerCase().startsWith("fr")
      ) {
        setLocaleState("fr");
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

      const fallbackDict = dictionaries.en;
      const fallbackVal = getNestedValue(fallbackDict, key);
      if (fallbackVal !== undefined) return fallbackVal;

      return fallback ?? key;
    },
    [locale],
  );

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, toggleLocale, t, mounted }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/**
 * Lightweight helper to wrap static text or DB fallback strings.
 * Renders translated string when locale is French, or original children when English.
 * Uses suppressHydrationWarning to eliminate SSR/CSR hydration mismatch differences.
 */
export function T({
  k,
  children,
  fallback,
}: {
  k: string;
  children?: React.ReactNode;
  fallback?: string;
}) {
  const { t, locale, mounted } = useLanguage();

  if (!mounted && children !== undefined) {
    return (
      <span suppressHydrationWarning className="contents">
        {children}
      </span>
    );
  }

  if (locale === "en" && children !== undefined) {
    return (
      <span suppressHydrationWarning className="contents">
        {children}
      </span>
    );
  }

  const translated = t(
    k,
    fallback ?? (typeof children === "string" ? children : undefined),
  );

  return (
    <span suppressHydrationWarning className="contents">
      {translated}
    </span>
  );
}
