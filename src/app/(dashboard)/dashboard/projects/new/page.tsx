import Link from "next/link";
import { ProjectForm } from "@/components/dashboard/project-form";

export default function NewProjectPage() {
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
        <span className="text-sm" style={{ color: "var(--foreground)" }}>Nuevo proyecto</span>
      </div>

      <div>
        <h2 className="text-xl font-semibold" style={{ color: "var(--foreground)" }}>Nuevo proyecto</h2>
        <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
          Completa los datos para crear un nuevo proyecto
        </p>
      </div>

      <div
        className="rounded-2xl border p-6"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <ProjectForm />
      </div>
    </div>
  );
}
