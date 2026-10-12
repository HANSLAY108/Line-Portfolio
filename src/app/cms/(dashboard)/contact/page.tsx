import { connection } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { saveContact } from "@/lib/actions/settings";
import { Card, Field, PageTitle, SaveButton } from "@/components/cms/ui";
import ImageUpload from "@/components/cms/ImageUpload";

export const instant = false;

export default async function ContactContentPage() {
  await connection();
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  const s = data ?? {};

  return (
    <>
      <PageTitle eyebrow="Content" title="Contact" />
      <form action={saveContact} className="space-y-6">
        <Card>
          <h2 className="mb-4 font-serif text-xl">Contact portrait & visual</h2>
          <ImageUpload
            name="contact_portrait"
            label="Contact page portrait"
            currentPath={s.contact_portrait_path || s.portrait_path}
            helperText="Featured alongside your contact info and brief form on /contact. If no specific image is set, your hero portrait is used."
            aspectRatio="square"
            removeFieldName="contact_portrait_remove"
          />
        </Card>

        <Card>
          <h2 className="mb-4 font-serif text-xl">Header & introduction</h2>
          <div className="grid gap-4">
            <Field label="Eyebrow" name="contact_eyebrow" defaultValue={s.contact_eyebrow} />
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Heading line 1"
                name="contact_heading_before"
                defaultValue={s.contact_heading_before}
              />
              <Field
                label="Accent text (italic)"
                name="contact_heading_accent"
                defaultValue={s.contact_heading_accent}
              />
            </div>
            <Field
              label="Introductory paragraph"
              name="contact_intro"
              textarea
              defaultValue={s.contact_intro}
            />
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 font-serif text-xl">Direct contact details</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Email" name="email" type="email" defaultValue={s.email} />
            <Field label="Phone" name="phone" defaultValue={s.phone} />
            <Field label="Location" name="location" defaultValue={s.location} />
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 font-serif text-xl">Brief form & callout</h2>
          <div className="grid gap-4">
            <Field label="Form heading" name="form_heading" defaultValue={s.form_heading} />
            <Field label="Form intro" name="form_intro" textarea defaultValue={s.form_intro} />
            <Field
              label="Technical stack callout prompt"
              name="contact_stack_prompt"
              textarea
              defaultValue={s.contact_stack_prompt}
            />
          </div>
        </Card>

        <SaveButton label="Save contact page" />
      </form>
    </>
  );
}
