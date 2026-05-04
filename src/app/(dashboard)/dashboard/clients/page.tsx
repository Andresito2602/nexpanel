import Link from "next/link";
import { ClientsTable } from "@/components/dashboard/clients-table";
import { getClients } from "@/lib/supabase/queries";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold" style={{ color: "var(--foreground)" }}>
            Clientes
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            {clients.length} {clients.length === 1 ? "cliente" : "clientes"} registrados
          </p>
        </div>
        <Link
          href="/dashboard/clients/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          + Nuevo cliente
        </Link>
      </div>

      {clients.length === 0 ? (
        <EmptyState />
      ) : (
        <ClientsTable clients={clients} />
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
      <span className="text-4xl">◉</span>
      <div>
        <p className="font-medium mb-1" style={{ color: "var(--foreground)" }}>
          Sin clientes todavía
        </p>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Registra tu primer cliente para empezar
        </p>
      </div>
      <Link
        href="/dashboard/clients/new"
        className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
      >
        + Nuevo cliente
      </Link>
    </div>
  );
}
