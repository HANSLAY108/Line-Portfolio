import Link from "next/link";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { deleteProject } from "@/lib/actions/projects";
import { saveProjectsPage } from "@/lib/actions/settings";
import { Card, Field, PageTitle, SaveButton } from "@/components/cms/ui";
import ImageUpload from "@/components/cms/ImageUpload";
import DocumentUpload from "@/components/cms/DocumentUpload";
import { publicMediaUrl } from "@/lib/media";

export const instant = false;

export default async function ProjectsAdminPage() {
  await connection();
  const { supabase } = await requireAdmin();
  const [{ data: projects }, { data: settings }] = await Promise.all([
    supabase.from("projects").select("*").order("sort_order"),
    supabase.from("site_settings").select("*").eq("id", 1).single(),
  ]);

  const s = settings ?? {};

  return (
    <>
      <PageTitle
        eyebrow="Portfolio"
        title="Projects"
        action={
          <Link
            href="/cms/projects/new"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
          >
            Add project
          </Link>
        }
      />

      <div className="space-y-8">
        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-light">
            Project List ({projects?.length ?? 0})
          </h2>
          <div className="space-y-3">
            {(projects ?? []).map((project) => (
              <div
                key={project.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-4 ring-1 ring-border"
              >
                <div className="flex items-center gap-4">
                  {publicMediaUrl(project.cover_path) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={publicMediaUrl(project.cover_path)!}
                      alt=""
                      className="h-14 w-20 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-accent-soft text-xs text-accent-text font-medium">
                      No cover
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-xs text-muted">
                      order {project.sort_order}
                      {project.featured ? " · featured" : ""}
                      {project.published ? "" : " · hidden"}
                      {project.category ? ` · ${project.category}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={`/cms/projects/${project.id}`}
                    className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-accent-text hover:bg-accent-soft"
                  >
                    Edit
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await deleteProject(project.id);
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
        </div>

        {/* Projects Page Section & Philosophy Visual */}
        <Card>
          <h2 className="mb-2 font-serif text-xl">Projects page visual & copy</h2>
          <p className="mb-6 text-xs text-muted">
            Customize the header, introduction, and philosophy visual displayed on the public /projects page.
          </p>

          <form action={saveProjectsPage} className="space-y-6">
            <ImageUpload
              name="philosophy_image"
              label="Philosophy section visual"
              currentPath={s.philosophy_image_path}
              helperText="Featured visual in the philosophy section on the /projects page. Recommended: 4:5 or 5:6 aspect ratio (e.g. 1000×1200px)."
              aspectRatio="portrait"
              removeFieldName="philosophy_image_remove"
            />

            <DocumentUpload
              name="cv"
              label="Curriculum Vitae / Resume (PDF)"
              currentPath={s.cv_path}
              helperText="The PDF document downloaded when visitors click 'Download Resume (PDF)' on the public Projects page."
              removeFieldName="cv_remove"
            />

            <div className="space-y-6">
              <div className="grid gap-4">
                <Field label="Page badge" name="projects_badge" defaultValue={s.projects_badge} />
                <div className="grid gap-4 md:grid-cols-3">
                  <Field
                    label="Heading before"
                    name="projects_heading_before"
                    defaultValue={s.projects_heading_before}
                  />
                  <Field
                    label="Accent word"
                    name="projects_heading_accent"
                    defaultValue={s.projects_heading_accent}
                  />
                  <Field
                    label="Heading after"
                    name="projects_heading_after"
                    defaultValue={s.projects_heading_after}
                  />
                </div>
                <Field label="Intro text" name="projects_intro" textarea defaultValue={s.projects_intro} />
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Archive label" name="archive_label" defaultValue={s.archive_label} />
                  <Field label="Archive link text" name="archive_link_label" defaultValue={s.archive_link_label} />
                </div>
              </div>

              <div className="border-t border-border pt-4 grid gap-4">
                <h3 className="font-serif text-base font-medium">Philosophy section</h3>
                <Field label="Philosophy label" name="philosophy_label" defaultValue={s.philosophy_label} />
                <div className="grid gap-4 md:grid-cols-3">
                  <Field
                    label="Heading before"
                    name="philosophy_heading_before"
                    defaultValue={s.philosophy_heading_before}
                  />
                  <Field
                    label="Accent word"
                    name="philosophy_heading_accent"
                    defaultValue={s.philosophy_heading_accent}
                  />
                  <Field
                    label="Heading after"
                    name="philosophy_heading_after"
                    defaultValue={s.philosophy_heading_after}
                  />
                </div>
                <Field
                  label="Philosophy body"
                  name="philosophy_body"
                  textarea
                  defaultValue={s.philosophy_body}
                />
                <Field
                  label="Floating badge text"
                  name="philosophy_badge"
                  defaultValue={s.philosophy_badge}
                />
              </div>

              <div className="border-t border-border pt-4 grid gap-4">
                <h3 className="font-serif text-base font-medium">Projects CTA</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <Field
                    label="Heading before"
                    name="projects_cta_heading_before"
                    defaultValue={s.projects_cta_heading_before}
                  />
                  <Field
                    label="Accent word"
                    name="projects_cta_heading_accent"
                    defaultValue={s.projects_cta_heading_accent}
                  />
                  <Field
                    label="Heading after"
                    name="projects_cta_heading_after"
                    defaultValue={s.projects_cta_heading_after}
                  />
                </div>
                <Field
                  label="Body"
                  name="projects_cta_body"
                  textarea
                  defaultValue={s.projects_cta_body}
                />
              </div>
            </div>

            <SaveButton label="Save projects page settings" />
          </form>
        </Card>
      </div>
    </>
  );
}
