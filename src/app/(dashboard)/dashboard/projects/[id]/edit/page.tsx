import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/dashboard/project-form";
import { getProjectById } from "@/lib/supabase/queries";

export default async function EditProjectPage(props: PageProps<"/dashboard/projects/[id]/edit">) {
  const { id } = await props.params;
  const project = await getProjectById(id);

  if (!project) notFound();

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/projects"
          className="text-sm hover:opacity-80"
          style={{ color: "var(--muted-foreground)" }}
        >
          ← Proyectos
        </Link>
        <span style={{ color: "var(--border)" }}>/</span>
        <span className="text-sm" style={{ color: "var(--foreground)" }}>
          Editar proyecto
        </span>
      </div>

      <div>
        <h2 className="text-xl font-semibold" style={{ color: "var(--foreground)" }}>
          Editar proyecto
        </h2>
        <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
          Modifica los datos del proyecto
        </p>
      </div>

      <div
        className="rounded-2xl border p-6"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <ProjectForm project={project} />
      </div>
    </div>
  );
}
