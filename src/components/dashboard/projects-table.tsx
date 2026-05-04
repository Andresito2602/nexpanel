"use client";

import Link from "next/link";
import { useTransition } from "react";
import { Project } from "@/lib/definitions";
import { deleteProjectAction } from "@/lib/actions/projects";

const statusConfig = {
  active: { label: "Activo", bg: "#dcfce7", color: "#16a34a" },
  paused: { label: "Pausado", bg: "#fef9c3", color: "#ca8a04" },
  completed: { label: "Completado", bg: "#dbeafe", color: "#2563eb" },
};

function DeleteButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`¿Eliminar el proyecto "${name}"? Esta acción no se puede deshacer.`)) return;
    startTransition(() => deleteProjectAction(id));
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80 disabled:opacity-50"
      style={{ background: "#fee2e2", color: "#dc2626" }}
      aria-label={`Eliminar ${name}`}
    >
      {isPending ? "..." : "Eliminar"}
    </button>
  );
}

export function ProjectsTable({ projects }: { projects: Project[] }) {
  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b" style={{ borderColor: "var(--border)" }}>
              {["Nombre", "Estado", "Presupuesto", "Fecha", "Acciones"].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-3.5 font-medium text-xs uppercase tracking-wide"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((project, i) => {
              const status = statusConfig[project.status];
              return (
                <tr
                  key={project.id}
                  className="border-b last:border-0"
                  style={{
                    borderColor: "var(--border)",
                    background: i % 2 === 0 ? "transparent" : "var(--secondary)",
                  }}
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium" style={{ color: "var(--foreground)" }}>
                        {project.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                        {project.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ background: status.bg, color: status.color }}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium" style={{ color: "var(--foreground)" }}>
                    ${project.budget.toLocaleString()}
                  </td>
                  <td className="px-5 py-4" style={{ color: "var(--muted-foreground)" }}>
                    {new Date(project.created_at).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/projects/${project.id}/edit`}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:opacity-80"
                        style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                      >
                        Editar
                      </Link>
                      <DeleteButton id={project.id} name={project.name} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
