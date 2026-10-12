import ProjectForm from "@/components/cms/ProjectForm";
import { createProject } from "@/lib/actions/projects";
import { PageTitle } from "@/components/cms/ui";

export const instant = false;

export default function NewProjectPage() {
  return (
    <>
      <PageTitle eyebrow="Portfolio" title="New project" />
      <ProjectForm action={createProject} />
    </>
  );
}
