import { connection } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { saveHome } from "@/lib/actions/settings";
import { Card, Check, Field, PageTitle, SaveButton } from "@/components/cms/ui";
import ImageUpload from "@/components/cms/ImageUpload";

export const instant = false;

export default async function HomeContentPage() {
  await connection();
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  const s = data ?? {};

  return (
    <>
      <PageTitle eyebrow="Content" title="Home" />
      <form action={saveHome} className="space-y-6">
        <Card>
          <h2 className="mb-4 font-serif text-xl">Hero visual & availability</h2>
          <div className="grid gap-6">
            <ImageUpload
              name="portrait"
              label="Hero portrait"
              currentPath={s.portrait_path}
              helperText="Main portrait displayed in the hero section. Recommended: 4:5 aspect ratio (e.g., 800×1000px)."
              aspectRatio="portrait"
              removeFieldName="portrait_remove"
            />
            <Check name="available" label="Show availability pill on portrait" defaultChecked={s.available ?? true} />
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 font-serif text-xl">Hero text</h2>
          <div className="grid gap-4">
            <Field label="Badge" name="hero_badge" defaultValue={s.hero_badge} />
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Heading before" name="hero_heading_before" defaultValue={s.hero_heading_before} />
              <Field label="Accent word" name="hero_heading_accent" defaultValue={s.hero_heading_accent} />
              <Field label="Heading after" name="hero_heading_after" defaultValue={s.hero_heading_after} />
            </div>
            <Field label="About / intro" name="hero_body" textarea defaultValue={s.hero_body} />
            <Field label="Availability label" name="available_label" defaultValue={s.available_label} />
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 font-serif text-xl">Section labels</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Expertise label" name="expertise_label" defaultValue={s.expertise_label} />
            <Field label="Expertise heading" name="expertise_heading" defaultValue={s.expertise_heading} />
            <Field label="Portfolio label" name="portfolio_label" defaultValue={s.portfolio_label} />
            <Field label="Portfolio heading" name="portfolio_heading" defaultValue={s.portfolio_heading} />
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 font-serif text-xl">Home CTA</h2>
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Before" name="home_cta_heading_before" defaultValue={s.home_cta_heading_before} />
              <Field label="Accent" name="home_cta_heading_accent" defaultValue={s.home_cta_heading_accent} />
              <Field label="After" name="home_cta_heading_after" defaultValue={s.home_cta_heading_after} />
            </div>
            <Field label="Body" name="home_cta_body" textarea defaultValue={s.home_cta_body} />
            <Field label="Button text" name="home_cta_button" defaultValue={s.home_cta_button} />
          </div>
        </Card>

        <SaveButton label="Save home page" />
      </form>
    </>
  );
}
