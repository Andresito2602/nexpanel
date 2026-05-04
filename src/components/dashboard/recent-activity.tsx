import { getRecentActivity, type ActivityItem } from "@/lib/supabase/queries";

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (mins < 1) return "ahora mismo";
  if (mins < 60) return `hace ${mins} min`;
  if (hours < 24) return `hace ${hours}h`;
  if (days === 1) return "ayer";
  return `hace ${days} días`;
}

const typeConfig: Record<ActivityItem["type"], { color: string; icon: string }> = {
  project: { color: "#6366f1", icon: "◈" },
  client: { color: "#22c55e", icon: "◉" },
};

function EmptyActivity() {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-2 text-center">
      <span className="text-2xl opacity-30">◌</span>
      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
        Sin actividad todavía.
        <br />
        Crea un proyecto o cliente para empezar.
      </p>
    </div>
  );
}

export async function RecentActivity() {
  const activities = await getRecentActivity();

  return (
    <div
      className="rounded-2xl border p-6"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <h3 className="font-semibold mb-4 text-sm" style={{ color: "var(--foreground)" }}>
        Actividad reciente
      </h3>

      {activities.length === 0 ? (
        <EmptyActivity />
      ) : (
        <div className="flex flex-col gap-4">
          {activities.map((a) => {
            const cfg = typeConfig[a.type];
            return (
              <div key={a.id} className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ background: cfg.color }}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium truncate"
                    style={{ color: "var(--foreground)" }}
                  >
                    {a.name}
                  </p>
                  <p className="text-xs truncate" style={{ color: "var(--muted-foreground)" }}>
                    {a.sub}
                  </p>
                </div>
                <span
                  className="text-xs shrink-0"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {relativeTime(a.created_at)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
