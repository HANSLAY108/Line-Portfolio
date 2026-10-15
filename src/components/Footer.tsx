import Link from "next/link";
import { getPublishedContent, pickSocials } from "@/lib/content";
import { socialIcon } from "@/lib/icons-map";
import { T } from "@/context/LanguageContext";

export default async function Footer() {
  const { socials, settings } = await getPublishedContent();
  const links = pickSocials(socials, "footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1120px] flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center lg:px-8">
        <p className="text-[13px] leading-relaxed text-muted-light" suppressHydrationWarning>
          © 2024 {settings?.display_name ?? "Line Morelle"}.{" "}
          <T k="footer.allRightsReserved">
            All rights reserved. Built with precision and care.
          </T>
        </p>
        <ul className="flex items-center gap-6">
          {links.map((social) => {
            const { id, url, label, icon_key } = social;
            const Icon = socialIcon(icon_key);
            return (
              <li key={id}>
                <Link
                  href={url}
                  target={url.startsWith("http") ? "_blank" : undefined}
                  rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 text-[13px] text-muted-light transition-colors hover:text-foreground"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}

