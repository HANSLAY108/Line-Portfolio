import { notFound } from "next/navigation";
import { connection } from "next/server";
import ProjectForm from "@/components/cms/ProjectForm";
import { updateProject } from "@/lib/actions/projects";
import { requireAdmin } from "@/lib/require-admin";
import { PageTitle } from "@/components/cms/ui";

export const instant = false;

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!project) notFound();

  async function action(formData: FormData) {
    "use server";
    await updateProject(id, formData);
  }

  return (
    <>
      <PageTitle eyebrow="Portfolio" title={`Edit ${project.title}`} />
      <ProjectForm action={action} project={project} />
    </>
  );
}
