import { connection } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { deleteSocial, upsertSocial } from "@/lib/actions/lists";
import { Card, Check, Field, PageTitle, SaveButton } from "@/components/cms/ui";

export const instant = false;

export default async function SocialPage() {
  await connection();
  const { supabase } = await requireAdmin();
  const { data: links } = await supabase
    .from("social_links")
    .select("*")
    .order("sort_order");

  return (
    <>
      <PageTitle eyebrow="Content" title="Social links" />
      <div className="space-y-6">
        {(links ?? []).map((link) => (
          <Card key={link.id}>
            <form action={upsertSocial} className="grid gap-4">
              <input type="hidden" name="id" value={link.id} />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Platform" name="platform" defaultValue={link.platform} required />
                <Field label="Label" name="label" defaultValue={link.label} required />
              </div>
              <Field label="URL" name="url" defaultValue={link.url} required />
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Icon key" name="icon_key" defaultValue={link.icon_key} />
                <div>
                  <label className="field">Placement</label>
                  <select name="placement" defaultValue={link.placement}>
                    <option value="all">All</option>
                    <option value="footer">Footer</option>
                    <option value="contact">Contact</option>
                    <option value="cta">Home CTA</option>
                  </select>
                </div>
                <Field label="Sort order" name="sort_order" type="number" defaultValue={link.sort_order} />
              </div>
              <Check name="published" label="Published" defaultChecked={link.published} />
              <SaveButton label="Update" />
            </form>
            <form
              className="mt-3"
              action={async () => {
                "use server";
                await deleteSocial(link.id);
              }}
            >
              <button type="submit" className="text-sm text-muted-light hover:text-red-600">
                Delete
              </button>
            </form>
          </Card>
        ))}

        <Card>
          <h2 className="mb-4 font-serif text-xl">Add link</h2>
          <form action={upsertSocial} className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Platform" name="platform" required />
              <Field label="Label" name="label" required />
            </div>
            <Field label="URL" name="url" required />
            <Field label="Icon key" name="icon_key" defaultValue="github" />
            <div>
              <label className="field">Placement</label>
              <select name="placement" defaultValue="all">
                <option value="all">All</option>
                <option value="footer">Footer</option>
                <option value="contact">Contact</option>
                <option value="cta">Home CTA</option>
              </select>
            </div>
            <Field label="Sort order" name="sort_order" type="number" defaultValue={0} />
            <Check name="published" label="Published" defaultChecked />
            <p className="text-xs text-muted">Icon keys: github, linkedin, email, twitter</p>
            <SaveButton label="Add link" />
          </form>
        </Card>
      </div>
    </>
  );
}
