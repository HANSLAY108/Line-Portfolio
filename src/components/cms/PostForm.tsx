import { Card, Check, Field, SaveButton } from "./ui";
import ImageUpload from "./ImageUpload";

type PostFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  post?: {
    title?: string;
    slug?: string;
    excerpt?: string;
    body?: string;
    cover_path?: string | null;
    tags?: string[];
    published?: boolean;
  };
};

export default function PostForm({ action, post }: PostFormProps) {
  return (
    <form action={action} className="space-y-6">
      <Card>
        <div className="grid gap-6">
          <ImageUpload
            name="cover"
            label="Cover image"
            currentPath={post?.cover_path}
            helperText="Banner displayed at the top of the post. Recommended: 16:9 (e.g. 1600×900px)."
            aspectRatio="video"
            removeFieldName="cover_remove"
          />

          <div className="grid gap-4 pt-2">
            <Field label="Title" name="title" required defaultValue={post?.title} />
            <Field label="Slug (auto-generated from title if left blank)" name="slug" defaultValue={post?.slug} />
            <Field
              label="Excerpt (short summary shown in the blog listing)"
              name="excerpt"
              textarea
              rows={3}
              defaultValue={post?.excerpt}
            />
            <Field
              label="Body (supports Markdown)"
              name="body"
              textarea
              rows={18}
              defaultValue={post?.body}
            />
            <Field
              label="Tags (comma separated)"
              name="tags"
              defaultValue={post?.tags?.join(", ")}
            />
            <div className="flex items-center gap-6">
              <Check
                name="published"
                label="Published (visible on site)"
                defaultChecked={post?.published ?? false}
              />
            </div>
          </div>
        </div>
      </Card>
      <SaveButton label={post ? "Update post" : "Publish post"} />
    </form>
  );
}
