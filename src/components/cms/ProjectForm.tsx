import { Card, Check, Field, SaveButton } from "./ui";
import ImageUpload from "./ImageUpload";

type ProjectFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  project?: {
    title?: string;
    slug?: string;
    category?: string;
    filters?: string[];
    summary?: string;
    description?: string;
    tags?: string[];
    live_url?: string | null;
    repo_url?: string | null;
    cover_path?: string | null;
    featured?: boolean;
    sort_order?: number;
    published?: boolean;
  };
};

export default function ProjectForm({ action, project }: ProjectFormProps) {
  return (
    <form action={action} className="space-y-6">
      <Card>
        <div className="grid gap-6">
          <ImageUpload
            name="cover"
            label="Cover image"
            currentPath={project?.cover_path}
            helperText="Project cover displayed on Home and in the portfolio gallery. Recommended: 16:10 aspect ratio (e.g., 1600×1000px)."
            aspectRatio="video"
            removeFieldName="cover_remove"
          />

          <div className="grid gap-4 pt-2">
            <Field label="Title" name="title" required defaultValue={project?.title} />
            <Field label="Slug" name="slug" defaultValue={project?.slug} />
            <Field label="Category overlay" name="category" defaultValue={project?.category} />
            <Field
              label="Filters (comma separated)"
              name="filters"
              defaultValue={project?.filters?.join(", ")}
            />
            <Field label="Home summary" name="summary" textarea defaultValue={project?.summary} />
            <Field
              label="Projects-page description"
              name="description"
              textarea
              rows={6}
              defaultValue={project?.description}
            />
            <Field label="Tech tags (comma separated)" name="tags" defaultValue={project?.tags?.join(", ")} />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Live URL" name="live_url" defaultValue={project?.live_url} />
              <Field label="Repo URL" name="repo_url" defaultValue={project?.repo_url} />
            </div>
            <Field
              label="Sort order"
              name="sort_order"
              type="number"
              defaultValue={project?.sort_order ?? 0}
            />
            <div className="flex flex-wrap items-center gap-6">
              <Check name="featured" label="Featured on Home" defaultChecked={project?.featured} />
              <Check name="published" label="Published" defaultChecked={project?.published ?? true} />
            </div>
          </div>
        </div>
      </Card>
      <SaveButton label={project ? "Update project" : "Create project"} />
    </form>
  );
}
