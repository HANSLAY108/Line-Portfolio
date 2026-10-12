import PostForm from "@/components/cms/PostForm";
import { createPost } from "@/lib/actions/posts";
import { PageTitle } from "@/components/cms/ui";

export const instant = false;

export default function NewPostPage() {
  return (
    <>
      <PageTitle eyebrow="Blog" title="New post" />
      <PostForm action={createPost} />
    </>
  );
}
