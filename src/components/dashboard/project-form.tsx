"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/definitions";
import { saveProjectAction } from "@/lib/actions/projects";

type ProjectFormProps = {
  project?: Project;
};

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [state, action, pending] = useActionState(saveProjectAction, undefined);

  return (
    <form action={action} className="flex flex-col gap-5">
      {project && <input type="hidden" name="id" value={project.id} />}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          Nombre del proyecto
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Ej: Rediseño web corporativo"
          defaultValue={project?.name}
          required
          className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
          style={{
            background: "var(--background)",
            borderColor: state?.errors?.name ? "#ef4444" : "var(--border)",
            color: "var(--foreground)",
          }}
        />
        {state?.errors?.name && (
          <p className="text-xs text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Describe brevemente el proyecto..."
          defaultValue={project?.description}
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none"
          style={{
            background: "var(--background)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="status" className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Estado
          </label>
          <select
            id="status"
            name="status"
            defaultValue={project?.status ?? "active"}
            className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
            style={{
              background: "var(--background)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          >
            <option value="active">Activo</option>
            <option value="paused">Pausado</option>
            <option value="completed">Completado</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="budget" className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Presupuesto ($)
          </label>
          <input
            id="budget"
            name="budget"
            type="number"
            min="0"
            placeholder="0"
            defaultValue={project?.budget}
            className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
            style={{
              background: "var(--background)",
              borderColor: state?.errors?.budget ? "#ef4444" : "var(--border)",
              color: "var(--foreground)",
            }}
          />
          {state?.errors?.budget && (
            <p className="text-xs text-red-500">{state.errors.budget[0]}</p>
          )}
        </div>
      </div>

      {state?.message && (
        <div className="px-3 py-2.5 rounded-lg text-sm bg-red-50 text-red-600 border border-red-200">
          {state.message}
        </div>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-90 disabled:opacity-60"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          {pending ? "Guardando..." : project ? "Guardar cambios" : "Crear proyecto"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 rounded-lg text-sm font-medium border transition-all hover:opacity-80"
          style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
