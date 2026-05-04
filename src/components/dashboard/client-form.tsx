"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Client } from "@/lib/definitions";
import { saveClientAction } from "@/lib/actions/clients";

export function ClientForm({ client }: { client?: Client }) {
  const router = useRouter();
  const [state, action, pending] = useActionState(saveClientAction, undefined);

  return (
    <form action={action} className="flex flex-col gap-5">
      {client && <input type="hidden" name="id" value={client.id} />}

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Nombre completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Juan García"
            defaultValue={client?.name}
            required
            className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
            style={{
              background: "var(--background)",
              borderColor: state?.errors?.name ? "#ef4444" : "var(--border)",
              color: "var(--foreground)",
            }}
          />
          {state?.errors?.name && <p className="text-xs text-red-500">{state.errors.name[0]}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="company" className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Empresa
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Empresa S.L."
            defaultValue={client?.company}
            className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
            style={{
              background: "var(--background)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="cliente@empresa.com"
            defaultValue={client?.email}
            required
            className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
            style={{
              background: "var(--background)",
              borderColor: state?.errors?.email ? "#ef4444" : "var(--border)",
              color: "var(--foreground)",
            }}
          />
          {state?.errors?.email && <p className="text-xs text-red-500">{state.errors.email[0]}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="status" className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Estado
          </label>
          <select
            id="status"
            name="status"
            defaultValue={client?.status ?? "active"}
            className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
            style={{
              background: "var(--background)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          >
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
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
          {pending ? "Guardando..." : client ? "Guardar cambios" : "Crear cliente"}
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
