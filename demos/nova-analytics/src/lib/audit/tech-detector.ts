export interface DetectedTech {
  name: string;
  category: "Framework" | "CMS" | "Hosting" | "Analytics" | "Security" | "Server";
  version?: string;
  icon?: string;
}

export function detectTechnologies(html: string, headers: Headers): DetectedTech[] {
  const techs: DetectedTech[] = [];
  const lowerHtml = html.toLowerCase();

  // 1. Headers inspection
  const server = headers.get("server")?.toLowerCase() || "";
  const poweredBy = headers.get("x-powered-by")?.toLowerCase() || "";
  const via = headers.get("via")?.toLowerCase() || "";

  if (server.includes("cloudflare") || headers.get("cf-ray")) {
    techs.push({ name: "Cloudflare", category: "Hosting" });
  }
  if (headers.get("x-vercel-id") || server.includes("vercel")) {
    techs.push({ name: "Vercel", category: "Hosting" });
  }
  if (headers.get("x-nf-request-id") || server.includes("netlify")) {
    techs.push({ name: "Netlify", category: "Hosting" });
  }
  if (server.includes("nginx")) {
    techs.push({ name: "Nginx", category: "Server" });
  }
  if (server.includes("apache")) {
    techs.push({ name: "Apache", category: "Server" });
  }
  if (poweredBy.includes("next.js") || headers.get("x-nextjs-cache") || lowerHtml.includes("/_next/")) {
    techs.push({ name: "Next.js", category: "Framework" });
  }

  // 2. HTML DOM inspection
  if (lowerHtml.includes("wp-content") || lowerHtml.includes("wp-includes")) {
    techs.push({ name: "WordPress", category: "CMS" });
  }
  if (lowerHtml.includes("shopify.com") || lowerHtml.includes("cdn.shopify.com")) {
    techs.push({ name: "Shopify", category: "CMS" });
  }
  if (lowerHtml.includes("webflow.com") || lowerHtml.includes("data-wf-page")) {
    techs.push({ name: "Webflow", category: "CMS" });
  }
  if (lowerHtml.includes("framer.com") || lowerHtml.includes("__framer")) {
    techs.push({ name: "Framer", category: "CMS" });
  }
  if (lowerHtml.includes("ghost.org") || lowerHtml.includes("ghost-portal")) {
    techs.push({ name: "Ghost", category: "CMS" });
  }
  if (lowerHtml.includes("tailwindcss") || lowerHtml.includes("tailwind")) {
    techs.push({ name: "Tailwind CSS", category: "Framework" });
  }
  if (lowerHtml.includes("react") || lowerHtml.includes("__react")) {
    if (!techs.some((t) => t.name === "Next.js")) {
      techs.push({ name: "React", category: "Framework" });
    }
  }
  if (lowerHtml.includes("vue") || lowerHtml.includes("__vue")) {
    techs.push({ name: "Vue.js", category: "Framework" });
  }
  if (lowerHtml.includes("nuxt") || lowerHtml.includes("/_nuxt/")) {
    techs.push({ name: "Nuxt.js", category: "Framework" });
  }
  if (lowerHtml.includes("googletagmanager.com") || lowerHtml.includes("google-analytics.com")) {
    techs.push({ name: "Google Analytics / GTM", category: "Analytics" });
  }
  if (lowerHtml.includes("nova-analytics") || lowerHtml.includes("cdn.nova-analytics.io")) {
    techs.push({ name: "Nova Analytics", category: "Analytics" });
  }
  if (lowerHtml.includes("plausible.io")) {
    techs.push({ name: "Plausible", category: "Analytics" });
  }

  // Deduplicate
  const seen = new Set<string>();
  return techs.filter((t) => {
    if (seen.has(t.name)) return false;
    seen.add(t.name);
    return true;
  });
}
