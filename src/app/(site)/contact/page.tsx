import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import MediaFrame from "@/components/MediaFrame";
import FadeIn from "@/components/FadeIn";
import { EmailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { getPublishedContent, pickSocials } from "@/lib/content";
import { socialIcon } from "@/lib/icons-map";
import { publicMediaUrl } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Contact — Line Morelle",
  description:
    "Get in touch with Line Morelle for software architecture consulting, enterprise engineering, and new project inquiries.",
};

export default async function ContactPage() {
  const { settings, socials } = await getPublishedContent();
  const s = settings!;
  const contactSocials = pickSocials(socials, "contact").filter(
    (item) => item.icon_key !== "email",
  );

  const details = [
    {
      label: "General Inquiries",
      value: s.email ?? "hello@linemorelle.com",
      href: `mailto:${s.email ?? "hello@linemorelle.com"}`,
      icon: EmailIcon,
    },
    {
      label: "Office Hours",
      value: s.phone ?? "+41 44 211 55 66",
      href: `tel:${(s.phone ?? "+41442115566").replace(/\s/g, "")}`,
      icon: PhoneIcon,
    },
    {
      label: "Studio Location",
      value: s.location ?? "Zürich, Switzerland",
      href: `https://maps.google.com/?q=${encodeURIComponent(s.location ?? "Zurich,Switzerland")}`,
      icon: MapPinIcon,
    },
  ];

  return (
    <>
      {/* ── Hero Header ── */}
      <section className="mx-auto max-w-[1120px] px-6 pb-10 pt-14 lg:px-8 lg:pb-14 lg:pt-20">
        <FadeIn direction="up">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-text">
              {s.contact_eyebrow}
            </p>
          </div>

          <h1 className="mt-5 max-w-2xl font-serif text-[2.5rem] font-medium leading-[1.15] tracking-tight text-foreground sm:text-[3.25rem] lg:text-[3.75rem]">
            {s.contact_heading_before}
            <br />
            <span className="font-serif italic font-medium text-accent-text">
              {s.contact_heading_accent}
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-[16px] leading-[1.7] text-muted">
            {s.contact_intro}
          </p>
        </FadeIn>
      </section>

      {/* ── Two-column body ── */}
      <section className="mx-auto max-w-[1120px] px-6 pb-28 lg:px-8 lg:pb-36">
        <FadeIn direction="up">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16 lg:items-start">

            {/* ── LEFT COLUMN: portrait + contact details + socials ── */}
            <div className="space-y-10">
              {/* Portrait */}
              <div className="relative overflow-hidden rounded-2xl shadow-sm">
                <MediaFrame
                  src={publicMediaUrl(s.contact_portrait_path ?? s.portrait_path)}
                  alt="Line Morelle"
                  placeholderLabel="Portrait"
                  className="aspect-[4/5] w-full"
                />
              </div>

              {/* Contact detail rows */}
              <div className="space-y-7">
                {details.map(({ label, value, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-3"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-light">
                        {label}
                      </p>
                      <p className="mt-0.5 font-serif text-[1.05rem] font-medium text-foreground transition-colors group-hover:text-accent-text">
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social links */}
              {contactSocials.length > 0 && (
                <div className="flex items-center gap-4 border-t border-border pt-7">
                  {contactSocials.map((social) => {
                    const Icon = socialIcon(social.icon_key);
                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white shadow-sm transition-all hover:bg-accent-soft hover:border-accent-text/30 text-foreground hover:text-accent"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-light">
                    Follow my process
                  </span>
                </div>
              )}
            </div>

            {/* ── RIGHT COLUMN: form + stack prompt ── */}
            <div className="space-y-6">
              <ContactForm
                heading={s.form_heading}
                intro={s.form_intro}
              />

              {/* Stack prompt */}
              <div className="flex items-center justify-between rounded-2xl border border-border bg-white px-6 py-4 shadow-sm">
                <div>
                  <p className="text-[13px] font-medium text-foreground">
                    Looking for my technical stack?
                  </p>
                  <p className="text-[12px] text-muted leading-relaxed">
                    {s.contact_stack_prompt ?? "Explore my specific expertise and previous works."}
                  </p>
                </div>
                <Link
                  href="/projects"
                  className="ml-4 shrink-0 text-[13px] font-semibold text-accent-text transition-colors hover:text-foreground whitespace-nowrap"
                >
                  View Projects →
                </Link>
              </div>
            </div>

          </div>
        </FadeIn>
      </section>
    </>
  );
}
