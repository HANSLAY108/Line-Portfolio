import Link from "next/link";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { deletePost } from "@/lib/actions/posts";
import { PageTitle } from "@/components/cms/ui";
import { publicMediaUrl } from "@/lib/media";

export const instant = false;

export default async function PostsAdminPage() {
  await connection();
  const { supabase } = await requireAdmin();
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <PageTitle
        eyebrow="Content"
        title="Blog Posts"
        action={
          <Link
            href="/cms/posts/new"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
          >
            New post
          </Link>
        }
      />

      <div className="space-y-3">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-light">
          All posts ({posts?.length ?? 0})
        </h2>

        {(posts ?? []).length === 0 && (
          <p className="rounded-2xl bg-white p-6 text-sm text-muted ring-1 ring-border">
            No posts yet. Click &ldquo;New post&rdquo; to write your first one.
          </p>
        )}

        {(posts ?? []).map((post) => (
          <div
            key={post.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-4 ring-1 ring-border"
          >
            <div className="flex items-center gap-4">
              {publicMediaUrl(post.cover_path) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={publicMediaUrl(post.cover_path)!}
                  alt=""
                  className="h-14 w-20 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-accent-soft text-xs font-medium text-accent-text">
                  No cover
                </div>
              )}
              <div>
                <p className="font-medium">{post.title}</p>
                <p className="text-xs text-muted">
                  {post.published ? (
                    <span className="text-emerald-600">Published</span>
                  ) : (
                    <span className="text-amber-500">Draft</span>
                  )}
                  {post.published_at
                    ? ` · ${new Date(post.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
                    : ""}
                  {post.tags?.length ? ` · ${post.tags.slice(0, 3).join(", ")}` : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {post.published && (
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="text-xs text-muted-light hover:text-foreground"
                >
                  View ↗
                </Link>
              )}
              <Link
                href={`/cms/posts/${post.id}`}
                className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-accent-text hover:bg-accent-soft"
              >
                Edit
              </Link>
              <form
                action={async () => {
                  "use server";
                  await deletePost(post.id);
                }}
              >
                <button
                  type="submit"
                  className="text-xs text-muted-light hover:text-red-600"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
