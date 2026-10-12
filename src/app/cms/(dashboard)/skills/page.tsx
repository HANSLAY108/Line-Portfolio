import { connection } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { deleteSkill, upsertSkill } from "@/lib/actions/lists";
import { Card, Check, Field, PageTitle, SaveButton } from "@/components/cms/ui";

export const instant = false;

export default async function SkillsPage() {
  await connection();
  const { supabase } = await requireAdmin();
  const { data: skills } = await supabase.from("skills").select("*").order("sort_order");

  return (
    <>
      <PageTitle eyebrow="Content" title="Skills & services" />
      <div className="space-y-6">
        {(skills ?? []).map((skill) => (
          <Card key={skill.id}>
            <form action={upsertSkill} className="grid gap-4">
              <input type="hidden" name="id" value={skill.id} />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Title" name="title" defaultValue={skill.title} required />
                <Field label="Icon key" name="icon_key" defaultValue={skill.icon_key} />
              </div>
              <Field label="Description" name="description" textarea defaultValue={skill.description} />
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="field" htmlFor={`section-${skill.id}`}>
                    Section
                  </label>
                  <select id={`section-${skill.id}`} name="section" defaultValue={skill.section}>
                    <option value="expertise">Expertise (Home)</option>
                    <option value="philosophy">Philosophy (Projects)</option>
                  </select>
                </div>
                <Field label="Sort order" name="sort_order" type="number" defaultValue={skill.sort_order} />
                <Check name="published" label="Published" defaultChecked={skill.published} />
              </div>
              <div className="flex items-center gap-4">
                <SaveButton label="Update" />
              </div>
            </form>
            <form
              className="mt-3"
              action={async () => {
                "use server";
                await deleteSkill(skill.id);
              }}
            >
              <button type="submit" className="text-sm text-muted-light hover:text-red-600">
                Delete
              </button>
            </form>
          </Card>
        ))}

        <Card>
          <h2 className="mb-4 font-serif text-xl">Add skill</h2>
          <form action={upsertSkill} className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Title" name="title" required />
              <Field label="Icon key" name="icon_key" defaultValue="monitor" />
            </div>
            <Field label="Description" name="description" textarea />
            <div>
              <label className="field" htmlFor="section-new">
                Section
              </label>
              <select id="section-new" name="section" defaultValue="expertise">
                <option value="expertise">Expertise (Home)</option>
                <option value="philosophy">Philosophy (Projects)</option>
              </select>
            </div>
            <Field label="Sort order" name="sort_order" type="number" defaultValue={0} />
            <Check name="published" label="Published" defaultChecked />
            <p className="text-xs text-muted">
              Icon keys: monitor, server, cloud, chip, bolt, layers
            </p>
            <SaveButton label="Add skill" />
          </form>
        </Card>
      </div>
    </>
  );
}
