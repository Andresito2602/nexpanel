import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientForm } from "@/components/dashboard/client-form";
import { getClientById } from "@/lib/supabase/queries";

export default async function EditClientPage(props: PageProps<"/dashboard/clients/[id]/edit">) {
  const { id } = await props.params;
  const client = await getClientById(id);

  if (!client) notFound();

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/clients"
          className="text-sm hover:opacity-80"
          style={{ color: "var(--muted-foreground)" }}
        >
          ← Clientes
        </Link>
        <span style={{ color: "var(--border)" }}>/</span>
        <span className="text-sm" style={{ color: "var(--foreground)" }}>
          Editar cliente
        </span>
      </div>

      <div>
        <h2 className="text-xl font-semibold" style={{ color: "var(--foreground)" }}>
          Editar cliente
        </h2>
        <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
          Modifica los datos del cliente
        </p>
      </div>

      <div
        className="rounded-2xl border p-6"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <ClientForm client={client} />
      </div>
    </div>
  );
}
