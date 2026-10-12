import { connection } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { deleteTestimonial, upsertTestimonial } from "@/lib/actions/lists";
import { Card, Check, Field, PageTitle, SaveButton } from "@/components/cms/ui";
import ImageUpload from "@/components/cms/ImageUpload";

export const instant = false;

export default async function TestimonialsPage() {
  await connection();
  const { supabase } = await requireAdmin();
  const { data: items } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order");

  return (
    <>
      <PageTitle eyebrow="Content" title="Testimonials" />
      <div className="space-y-6">
        {(items ?? []).map((item) => (
          <Card key={item.id}>
            <form action={upsertTestimonial} className="grid gap-4">
              <input type="hidden" name="id" value={item.id} />
              <Field label="Quote" name="quote" textarea defaultValue={item.quote} required />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Name" name="author_name" defaultValue={item.author_name} required />
                <Field label="Role" name="author_role" defaultValue={item.author_role} />
              </div>
              <Field label="Sort order" name="sort_order" type="number" defaultValue={item.sort_order} />
              <Check name="published" label="Published" defaultChecked={item.published} />
              <ImageUpload
                name="avatar"
                label="Author avatar photo"
                currentPath={item.avatar_path}
                helperText="Square headshot. Recommended: 200×200px."
                aspectRatio="square"
                removeFieldName="avatar_remove"
              />
              <SaveButton label="Update testimonial" />
            </form>
            <form
              className="mt-3"
              action={async () => {
                "use server";
                await deleteTestimonial(item.id);
              }}
            >
              <button type="submit" className="text-sm text-muted-light hover:text-red-600">
                Delete
              </button>
            </form>
          </Card>
        ))}

        <Card>
          <h2 className="mb-4 font-serif text-xl">Add testimonial</h2>
          <form action={upsertTestimonial} className="grid gap-4">
            <Field label="Quote" name="quote" textarea required />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name" name="author_name" required />
              <Field label="Role" name="author_role" />
            </div>
            <Field label="Sort order" name="sort_order" type="number" defaultValue={0} />
            <Check name="published" label="Published" defaultChecked />
            <ImageUpload
              name="avatar"
              label="Author avatar photo"
              helperText="Square headshot. Recommended: 200×200px."
              aspectRatio="square"
            />
            <SaveButton label="Add testimonial" />
          </form>
        </Card>
      </div>
    </>
  );
}
