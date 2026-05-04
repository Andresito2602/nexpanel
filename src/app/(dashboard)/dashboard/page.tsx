import { StatCard } from "@/components/dashboard/stat-card";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { getDashboardStats, getUser } from "@/lib/supabase/queries";

export default async function DashboardPage() {
  const [stats, user] = await Promise.all([getDashboardStats(), getUser()]);

  const userName =
    (user?.user_metadata?.full_name as string | undefined)?.split(" ")[0] ??
    user?.email?.split("@")[0] ??
    "Usuario";

  const statCards = [
    {
      label: "Proyectos activos",
      value: String(stats.activeProjects),
      change: `${stats.totalProjects} total`,
      positive: true,
      icon: "◈",
    },
    {
      label: "Clientes totales",
      value: String(stats.totalClients),
      change: `${stats.activeClients} activos`,
      positive: true,
      icon: "◉",
    },
    {
      label: "Proyectos completados",
      value: String(stats.totalProjects - stats.activeProjects),
      change: "histórico",
      positive: true,
      icon: "✓",
    },
    {
      label: "Clientes inactivos",
      value: String(stats.totalClients - stats.activeClients),
      change: "requieren atención",
      positive: stats.totalClients - stats.activeClients === 0,
      icon: "◌",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-1" style={{ color: "var(--foreground)" }}>
          Buen día, {userName} 👋
        </h2>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Aquí tienes un resumen de tu actividad reciente.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart placeholder */}
        <div
          className="lg:col-span-2 rounded-2xl border p-6"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <h3 className="font-semibold mb-4 text-sm" style={{ color: "var(--foreground)" }}>
            Proyectos por estado
          </h3>
          <div className="flex items-end gap-3 h-40">
            {[
              { label: "Activos", value: stats.activeProjects, color: "var(--primary)" },
              { label: "Completados", value: stats.totalProjects - stats.activeProjects, color: "#22c55e" },
              { label: "Clientes", value: stats.totalClients, color: "#f59e0b" },
              { label: "C. Activos", value: stats.activeClients, color: "#6366f1" },
            ].map((bar) => {
              const max = Math.max(stats.totalProjects, stats.totalClients, 1);
              const height = Math.max((bar.value / max) * 100, 4);
              return (
                <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
                    {bar.value}
                  </span>
                  <div
                    className="w-full rounded-t-md"
                    style={{ height: `${height}%`, background: bar.color }}
                  />
                  <span className="text-xs text-center" style={{ color: "var(--muted-foreground)" }}>
                    {bar.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <RecentActivity />
      </div>
    </div>
  );
}
