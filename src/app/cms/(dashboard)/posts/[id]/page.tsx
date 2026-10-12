import { notFound } from "next/navigation";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { updatePost } from "@/lib/actions/posts";
import PostForm from "@/components/cms/PostForm";
import { PageTitle } from "@/components/cms/ui";

export const instant = false;

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  await connection();
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data: post } = await supabase.from("posts").select("*").eq("id", id).single();
  if (!post) notFound();

  const action = updatePost.bind(null, id);

  return (
    <>
      <PageTitle eyebrow="Blog" title="Edit post" />
      <PostForm action={action} post={post} />
    </>
  );
}
