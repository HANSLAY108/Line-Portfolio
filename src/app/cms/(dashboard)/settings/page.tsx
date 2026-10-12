import { connection } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { saveSettings } from "@/lib/actions/settings";
import { Card, Field, PageTitle, SaveButton } from "@/components/cms/ui";
import ImageUpload from "@/components/cms/ImageUpload";
import DocumentUpload from "@/components/cms/DocumentUpload";

export const instant = false;

export default async function SettingsPage() {
  await connection();
  const { supabase } = await requireAdmin();
  const { data: s } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  const row = s ?? {};

  return (
    <>
      <PageTitle eyebrow="Studio" title="Settings" />
      <form action={saveSettings} className="space-y-6">
        <Card>
          <h2 className="mb-4 font-serif text-xl">Contact details</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Display name" name="display_name" defaultValue={row.display_name} required />
            <Field label="Email" name="email" type="email" defaultValue={row.email} />
            <Field label="Phone" name="phone" defaultValue={row.phone} />
            <Field label="Location" name="location" defaultValue={row.location} />
          </div>
          <div className="mt-6 border-t border-border pt-6">
            <DocumentUpload
              name="cv"
              label="Curriculum Vitae / Resume (PDF)"
              currentPath={row.cv_path}
              helperText="The PDF document downloaded when visitors click 'Download Resume (PDF)' on the Projects page."
              removeFieldName="cv_remove"
            />
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 font-serif text-xl">Projects page</h2>
          <div className="grid gap-4">
            <Field label="Badge" name="projects_badge" defaultValue={row.projects_badge} />
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Before" name="projects_heading_before" defaultValue={row.projects_heading_before} />
              <Field label="Accent" name="projects_heading_accent" defaultValue={row.projects_heading_accent} />
              <Field label="After" name="projects_heading_after" defaultValue={row.projects_heading_after} />
            </div>
            <Field label="Intro" name="projects_intro" textarea defaultValue={row.projects_intro} />
            <Field label="Archive label" name="archive_label" defaultValue={row.archive_label} />
            <Field label="Archive link label" name="archive_link_label" defaultValue={row.archive_link_label} />
            <Field label="GitHub archive URL" name="github_archive_url" defaultValue={row.github_archive_url} />
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 font-serif text-xl">Philosophy</h2>
          <div className="grid gap-4">
            <Field label="Label" name="philosophy_label" defaultValue={row.philosophy_label} />
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Before" name="philosophy_heading_before" defaultValue={row.philosophy_heading_before} />
              <Field label="Accent" name="philosophy_heading_accent" defaultValue={row.philosophy_heading_accent} />
              <Field label="After" name="philosophy_heading_after" defaultValue={row.philosophy_heading_after} />
            </div>
            <Field label="Body" name="philosophy_body" textarea defaultValue={row.philosophy_body} />
            <Field label="Image badge" name="philosophy_badge" defaultValue={row.philosophy_badge} />
            <ImageUpload
              name="philosophy_image"
              label="Philosophy image"
              currentPath={row.philosophy_image_path}
              helperText="Featured visual in the philosophy section on /projects. Recommended: 4:5 aspect ratio."
              aspectRatio="portrait"
              removeFieldName="philosophy_image_remove"
            />
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="CTA before" name="projects_cta_heading_before" defaultValue={row.projects_cta_heading_before} />
              <Field label="CTA accent" name="projects_cta_heading_accent" defaultValue={row.projects_cta_heading_accent} />
              <Field label="CTA after" name="projects_cta_heading_after" defaultValue={row.projects_cta_heading_after} />
            </div>
            <Field label="CTA body" name="projects_cta_body" textarea defaultValue={row.projects_cta_body} />
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 font-serif text-xl">Contact page</h2>
          <div className="grid gap-4">
            <Field label="Eyebrow" name="contact_eyebrow" defaultValue={row.contact_eyebrow} />
            <Field label="Heading" name="contact_heading_before" defaultValue={row.contact_heading_before} />
            <Field label="Accent line" name="contact_heading_accent" defaultValue={row.contact_heading_accent} />
            <Field label="Intro" name="contact_intro" textarea defaultValue={row.contact_intro} />
            <Field label="Form heading" name="form_heading" defaultValue={row.form_heading} />
            <Field label="Form intro" name="form_intro" textarea defaultValue={row.form_intro} />
            <Field label="Stack prompt" name="contact_stack_prompt" textarea defaultValue={row.contact_stack_prompt} />
          </div>
        </Card>

        <SaveButton />
      </form>
    </>
  );
}
