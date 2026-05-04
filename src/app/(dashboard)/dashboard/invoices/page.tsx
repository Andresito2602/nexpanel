const invoices = [
  { id: "INV-0042", client: "Empresa ABC", amount: 3200, status: "pending" as const, due: "2026-05-15" },
  { id: "INV-0041", client: "TechCorp", amount: 8500, status: "paid" as const, due: "2026-04-30" },
  { id: "INV-0040", client: "Startup Co", amount: 1500, status: "overdue" as const, due: "2026-04-01" },
  { id: "INV-0039", client: "GlobalTech", amount: 5000, status: "paid" as const, due: "2026-04-10" },
  { id: "INV-0038", client: "Consulting ES", amount: 2200, status: "pending" as const, due: "2026-05-20" },
];

const statusConfig = {
  paid: { label: "Pagada", bg: "#dcfce7", color: "#16a34a" },
  pending: { label: "Pendiente", bg: "#fef9c3", color: "#ca8a04" },
  overdue: { label: "Vencida", bg: "#fee2e2", color: "#dc2626" },
};

export default function InvoicesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold" style={{ color: "var(--foreground)" }}>Facturas</h2>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            {invoices.length} facturas en total
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          + Nueva factura
        </button>
      </div>

      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                {["Número", "Cliente", "Importe", "Estado", "Vencimiento", "Acciones"].map((h) => (
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
              {invoices.map((inv, i) => {
                const status = statusConfig[inv.status];
                return (
                  <tr
                    key={inv.id}
                    className="border-b last:border-0"
                    style={{
                      borderColor: "var(--border)",
                      background: i % 2 === 0 ? "transparent" : "var(--secondary)",
                    }}
                  >
                    <td className="px-5 py-4 font-mono font-medium" style={{ color: "var(--foreground)" }}>
                      {inv.id}
                    </td>
                    <td className="px-5 py-4" style={{ color: "var(--foreground)" }}>{inv.client}</td>
                    <td className="px-5 py-4 font-medium" style={{ color: "var(--foreground)" }}>
                      ${inv.amount.toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ background: status.bg, color: status.color }}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-4" style={{ color: "var(--muted-foreground)" }}>
                      {new Date(inv.due).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:opacity-80"
                          style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                        >
                          Ver
                        </button>
                        {inv.status === "pending" && (
                          <button
                            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                            style={{ background: "#dcfce7", color: "#16a34a" }}
                          >
                            Marcar pagada
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
