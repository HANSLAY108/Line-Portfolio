import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const EXACT_TRANSLATIONS: Record<string, string> = {
  "Custom Website Development": "Développement de Sites Web sur Mesure",
  "Web Application Development": "Développement d'Applications Web",
  "UI to Code (design implementation)":
    "Intégration UI vers Code (implémentation design)",
  "Backend and API Development": "Développement Backend et API",
  "CMS and Admin Dashboards": "CMS et Tableaux de Bord Admin",
  "Performance and Security Audit": "Audit de Performance et de Sécurité",
  "Multilingual Websites (English and French)":
    "Sites Web Multilingues (Anglais et Français)",
  "Technical Consulting and Code Review":
    "Conseil Technique et Revue de Code",
  "Bespoke, high-converting websites engineered for speed, elegance, and strong brand authority.":
    "Sites web sur mesure à forte conversion, conçus pour la rapidité, l'élégance et l'impact de votre marque.",
  "Full-stack SaaS platforms and interactive web apps built with React, Next.js, and TypeScript.":
    "Plateformes SaaS full-stack et applications web interactives développées avec React, Next.js et TypeScript.",
  "Pixel-accurate translation of Figma designs into clean, reusable, and accessible React & Tailwind components.":
    "Traduction au pixel près de vos maquettes Figma en composants React & Tailwind propres, réutilisables et accessibles.",
  "Scalable REST and GraphQL APIs, database modeling, and third-party integrations built for reliability.":
    "APIs REST et GraphQL évolutives, modélisation de bases de données et intégrations tierces taillées pour la fiabilité.",
  "Custom content management systems and internal tools that give your team full autonomy without complexity.":
    "Systèmes de gestion de contenu sur mesure et outils internes offrant une autonomie totale à votre équipe.",
  "Deep diagnostic of Core Web Vitals, bundle bottlenecks, and application security posture with actionable fixes.":
    "Diagnostic approfondi des Core Web Vitals, des goulets d'étranglement et de la sécurité avec correctifs concrets.",
  "Seamless bilingual digital experiences with localized routing, native-grade copy, and CMS translation workflows.":
    "Expériences numériques bilingues fluides avec détection de langue, contenu localisé et gestion CMS EN / FR.",
  "Strategic architectural guidance, stack selection, and rigorous code reviews for founders and engineering teams.":
    "Accompagnement architectural stratégique, choix technologiques et revues de code rigoureuses pour vos équipes.",
  "Discovery": "Découverte",
  "Design": "Conception & Design",
  "Development": "Développement",
  "Delivery": "Livraison",
  "How I Work": "Ma Méthode de Travail",
  "Frequently Asked Questions": "Foire Aux Questions",
  "Request a Service": "Demander un devis",
};

const WORD_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bCustom Website Development\b/gi, "Développement de site web sur mesure"],
  [/\bWeb Application Development\b/gi, "Développement d'application web"],
  [/\bBackend and API Development\b/gi, "Développement Backend et API"],
  [/\bPerformance and Security Audit\b/gi, "Audit de performance et de sécurité"],
  [/\bTechnical Consulting\b/gi, "Conseil technique"],
  [/\bCode Review\b/gi, "Revue de code"],
  [/\bResponsive\b/gi, "Réactif"],
  [/\bhigh-performance\b/gi, "haute performance"],
  [/\bfull-stack\b/gi, "full-stack"],
  [/\bwebsites?\b/gi, "sites web"],
  [/\bapplications?\b/gi, "applications"],
  [/\bdatabase\b/gi, "base de données"],
  [/\bsecurity\b/gi, "sécurité"],
  [/\bperformance\b/gi, "performance"],
  [/\bauthentication\b/gi, "authentification"],
  [/\bdeployment\b/gi, "déploiement"],
  [/\baccessibility\b/gi, "accessibilité"],
  [/\bcomponents?\b/gi, "composants"],
  [/\bdashboards?\b/gi, "tableaux de bord"],
  [/\band\b/gi, "et"],
  [/\bwith\b/gi, "avec"],
  [/\bfor\b/gi, "pour"],
];

async function translateSingleText(text: string): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return "";

  if (EXACT_TRANSLATIONS[trimmed]) {
    return EXACT_TRANSLATIONS[trimmed];
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      trimmed,
    )}&langpair=en|fr`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const data = (await res.json()) as {
        responseData?: { translatedText?: string };
      };
      const translated = data?.responseData?.translatedText?.trim();
      if (
        translated &&
        !translated.includes("MYMEMORY WARNING") &&
        translated.toLowerCase() !== trimmed.toLowerCase()
      ) {
        return translated;
      }
    }
  } catch {
    // Fall back to local dictionary transformation if offline
  }

  let fallback = trimmed;
  for (const [pattern, replacement] of WORD_REPLACEMENTS) {
    fallback = fallback.replace(pattern, replacement);
  }
  return fallback;
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as { texts?: string[] };
    const texts = Array.isArray(body.texts) ? body.texts : [];

    const translations = await Promise.all(
      texts.map((item) => translateSingleText(String(item ?? ""))),
    );

    return NextResponse.json({ ok: true, translations });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Translation failed" },
      { status: 500 },
    );
  }
}

