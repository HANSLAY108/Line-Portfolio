import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { getPublishedPosts } from "@/lib/blog";
import { publicMediaUrl } from "@/lib/media";
import { T } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Blog — Line Morelle",
  description:
    "Thoughts on software architecture, engineering craft, and building for the web — by Line Morelle.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 pb-10 pt-14 lg:px-8 lg:pb-14 lg:pt-20">
        <FadeIn direction="up">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-text">
              <T k="blog.badge">Writing</T>
            </p>
          </div>
          <h1 className="mt-5 font-serif text-[2.5rem] font-medium leading-[1.15] tracking-tight text-foreground sm:text-[3.25rem] lg:text-[3.75rem]">
            <T k="nav.blog">Blog</T>
          </h1>
          <p className="mt-4 max-w-lg text-[16px] leading-[1.7] text-muted">
            <T k="blog.intro">
              Thoughts on software architecture, engineering craft, and building meaningful things for the web.
            </T>
          </p>
        </FadeIn>
      </section>

      {/* Post grid */}
      <section className="mx-auto max-w-[1120px] px-6 pb-28 lg:px-8 lg:pb-36">
        {posts.length === 0 ? (
          <FadeIn direction="up">
            <p className="text-[15px] text-muted">
              <T k="blog.noPosts">No posts published yet — check back soon.</T>
            </p>
          </FadeIn>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <FadeIn key={post.id} direction="up">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-border shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Cover */}
                  {publicMediaUrl(post.cover_path) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={publicMediaUrl(post.cover_path)!}
                      alt={post.title}
                      className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex aspect-[16/9] w-full items-center justify-center bg-accent-soft">
                      <span className="font-serif text-4xl text-accent/40">✦</span>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    {/* Tags */}
                    {post.tags?.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="font-serif text-[1.2rem] font-medium leading-snug text-foreground transition-colors group-hover:text-accent-text">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="mt-2 line-clamp-3 text-[13px] leading-[1.65] text-muted">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="mt-auto pt-5">
                      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-light">
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : ""}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
