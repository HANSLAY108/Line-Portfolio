import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import { getPublishedPosts } from "@/lib/blog";
import { publicMediaUrl } from "@/lib/media";
import { T } from "@/context/LanguageContext";

export const instant = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getPublishedPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Line Morelle`,
    description: post.excerpt || undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const posts = await getPublishedPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  // Prev / Next navigation
  const idx = posts.indexOf(post);
  const prev = posts[idx + 1] ?? null;
  const next = posts[idx - 1] ?? null;

  return (
    <>
      {/* Cover */}
      {publicMediaUrl(post.cover_path) && (
        <div className="mx-auto max-w-[1120px] px-6 pt-10 lg:px-8 lg:pt-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={publicMediaUrl(post.cover_path)!}
            alt={post.title}
            className="aspect-[16/7] w-full rounded-3xl object-cover shadow-sm"
          />
        </div>
      )}

      {/* Article header */}
      <article className="mx-auto max-w-[760px] px-6 pb-28 pt-12 lg:px-8 lg:pb-36">
        <FadeIn direction="up">
          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-serif text-[2rem] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[2.75rem]">
            {post.title}
          </h1>

          {post.published_at && (
            <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.14em] text-muted-light">
              {new Date(post.published_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}

          {post.excerpt && (
            <p className="mt-6 text-[17px] font-light leading-[1.75] text-muted">
              {post.excerpt}
            </p>
          )}
        </FadeIn>

        {/* Body */}
        <FadeIn direction="up" delay={100}>
          <div
            className="prose-blog mt-10"
            dangerouslySetInnerHTML={{ __html: renderBody(post.body) }}
          />
        </FadeIn>

        {/* Prev / Next */}
        {(prev || next) && (
          <FadeIn direction="up" delay={200}>
            <div className="mt-16 flex items-center justify-between gap-8 border-t border-border pt-10">
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="group flex flex-col gap-1"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-light">
                    <T k="blog.previous">← Previous</T>
                  </span>
                  <span className="font-serif text-[1rem] font-medium text-foreground transition-colors group-hover:text-accent-text">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group flex flex-col items-end gap-1"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-light">
                    <T k="blog.next">Next →</T>
                  </span>
                  <span className="font-serif text-[1rem] font-medium text-foreground transition-colors group-hover:text-accent-text">
                    {next.title}
                  </span>
                </Link>
              )}
            </div>
          </FadeIn>
        )}

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="text-[13px] font-medium text-accent-text hover:text-foreground transition-colors"
          >
            <T k="blog.backToBlog">← Back to all posts</T>
          </Link>
        </div>
      </article>
    </>
  );
}

/**
 * Very lightweight Markdown-to-HTML renderer for blog bodies.
 * Handles headings, bold, italic, links, code blocks, inline code,
 * blockquotes, horizontal rules, unordered & ordered lists, and paragraphs.
 */
function renderBody(raw: string): string {
  if (!raw) return "";

  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Code blocks (``` ... ```)
  let html = raw.replace(
    /```(?:\w+)?\n([\s\S]*?)```/g,
    (_: string, code: string) =>
      `<pre><code>${escape(code.trim())}</code></pre>`,
  );

  // Process line by line for block-level elements
  const lines = html.split("\n");
  const out: string[] = [];
  let inList = false;
  let listType = "";

  const flushList = () => {
    if (inList) {
      out.push(`</${listType}>`);
      inList = false;
      listType = "";
    }
  };

  for (const line of lines) {
    // Already inside a pre block — pass through
    if (line.startsWith("<pre>") || line.startsWith("</pre>")) {
      flushList();
      out.push(line);
      continue;
    }

    // Headings
    const h = line.match(/^(#{1,6})\s+(.*)/);
    if (h) {
      flushList();
      const level = h[1].length;
      out.push(`<h${level}>${inlineMarkdown(h[2])}</h${level}>`);
      continue;
    }

    // HR
    if (/^---+$/.test(line.trim())) {
      flushList();
      out.push("<hr />");
      continue;
    }

    // Blockquote
    const bq = line.match(/^>\s?(.*)/);
    if (bq) {
      flushList();
      out.push(`<blockquote>${inlineMarkdown(bq[1])}</blockquote>`);
      continue;
    }

    // Unordered list
    const ul = line.match(/^[-*+]\s+(.*)/);
    if (ul) {
      if (!inList || listType !== "ul") {
        flushList();
        out.push("<ul>");
        inList = true;
        listType = "ul";
      }
      out.push(`<li>${inlineMarkdown(ul[1])}</li>`);
      continue;
    }

    // Ordered list
    const ol = line.match(/^\d+\.\s+(.*)/);
    if (ol) {
      if (!inList || listType !== "ol") {
        flushList();
        out.push("<ol>");
        inList = true;
        listType = "ol";
      }
      out.push(`<li>${inlineMarkdown(ol[1])}</li>`);
      continue;
    }

    // Blank line
    if (line.trim() === "") {
      flushList();
      out.push("");
      continue;
    }

    // Paragraph
    flushList();
    out.push(`<p>${inlineMarkdown(line)}</p>`);
  }

  flushList();
  return out.join("\n");
}

function inlineMarkdown(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}
