import Link from "next/link";
import { connection } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { deleteProject } from "@/lib/actions/projects";
import { saveProjectsPage } from "@/lib/actions/settings";
import { Card, Field, PageTitle, SaveButton } from "@/components/cms/ui";
import ImageUpload from "@/components/cms/ImageUpload";
import DocumentUpload from "@/components/cms/DocumentUpload";
import ProjectsManager from "@/components/cms/ProjectsManager";
import { PlusIcon } from "@/components/cms/CMSIcons";

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
    <div className="space-y-10">
      <PageTitle
        eyebrow="Portfolio & Engineering Showcase"
        title="Software Projects & Case Studies"
        subtitle="Manage featured engineering work, open source repositories, and client projects curated for display."
        action={
          <Link
            href="/cms/projects/new"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#CE6A73] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#B85860]"
          >
            <PlusIcon className="h-4 w-4" />
            Add Project
          </Link>
        }
      />

      {/* Interactive Project List with Filters & Search (Screen 2) */}
      <ProjectsManager
        initialProjects={projects ?? []}
        deleteAction={deleteProject}
      />

      {/* Projects Page Section & Philosophy Visual */}
      <Card>
        <div className="mb-6 pb-4 border-b border-[#F7EBEB]">
          <h2 className="font-serif text-xl font-medium text-[#292022]">
            Projects page visual & copy
          </h2>
          <p className="mt-1 text-xs text-[#7A6B6E]">
            Customize the header, introduction, and philosophy visual displayed on the public /projects page.
          </p>
        </div>

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
  );
}
