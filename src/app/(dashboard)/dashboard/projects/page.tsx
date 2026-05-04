import Link from "next/link";
import { ProjectsTable } from "@/components/dashboard/projects-table";
import { getProjects } from "@/lib/supabase/queries";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold" style={{ color: "var(--foreground)" }}>
            Proyectos
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            {projects.length} {projects.length === 1 ? "proyecto" : "proyectos"} en total
          </p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          + Nuevo proyecto
        </Link>
      </div>

      {projects.length === 0 ? (
        <EmptyState />
      ) : (
        <ProjectsTable projects={projects} />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="rounded-2xl border p-16 flex flex-col items-center justify-center gap-4 text-center"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <span className="text-4xl">◈</span>
      <div>
        <p className="font-medium mb-1" style={{ color: "var(--foreground)" }}>
          Sin proyectos todavía
        </p>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Crea tu primer proyecto para empezar
        </p>
      </div>
      <Link
        href="/dashboard/projects/new"
        className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
      >
        + Nuevo proyecto
      </Link>
    </div>
  );
}
