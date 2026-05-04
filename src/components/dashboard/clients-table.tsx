"use client";

import Link from "next/link";
import { useTransition } from "react";
import { Client } from "@/lib/definitions";
import { deleteClientAction } from "@/lib/actions/clients";

function DeleteButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`¿Eliminar al cliente "${name}"? Esta acción no se puede deshacer.`)) return;
    startTransition(() => deleteClientAction(id));
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

export function ClientsTable({ clients }: { clients: Client[] }) {
  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b" style={{ borderColor: "var(--border)" }}>
              {["Cliente", "Email", "Empresa", "Estado", "Registro", "Acciones"].map((h) => (
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
            {clients.map((client, i) => (
              <tr
                key={client.id}
                className="border-b last:border-0"
                style={{
                  borderColor: "var(--border)",
                  background: i % 2 === 0 ? "transparent" : "var(--secondary)",
                }}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: "var(--primary)" }}
                    >
                      {client.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium" style={{ color: "var(--foreground)" }}>
                      {client.name}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4" style={{ color: "var(--muted-foreground)" }}>
                  {client.email}
                </td>
                <td className="px-5 py-4" style={{ color: "var(--foreground)" }}>
                  {client.company}
                </td>
                <td className="px-5 py-4">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: client.status === "active" ? "#dcfce7" : "#f1f5f9",
                      color: client.status === "active" ? "#16a34a" : "#64748b",
                    }}
                  >
                    {client.status === "active" ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-5 py-4" style={{ color: "var(--muted-foreground)" }}>
                  {new Date(client.created_at).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/clients/${client.id}/edit`}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:opacity-80"
                      style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                    >
                      Editar
                    </Link>
                    <DeleteButton id={client.id} name={client.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
