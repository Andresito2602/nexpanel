import Link from "next/link";
import { ClientForm } from "@/components/dashboard/client-form";

export default function NewClientPage() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/clients" className="text-sm hover:opacity-80" style={{ color: "var(--muted-foreground)" }}>
          ← Clientes
        </Link>
        <span style={{ color: "var(--border)" }}>/</span>
        <span className="text-sm" style={{ color: "var(--foreground)" }}>Nuevo cliente</span>
      </div>

      <div>
        <h2 className="text-xl font-semibold" style={{ color: "var(--foreground)" }}>Nuevo cliente</h2>
        <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>Registra un nuevo cliente</p>
      </div>

      <div className="rounded-2xl border p-6" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <ClientForm />
      </div>
    </div>
  );
}
