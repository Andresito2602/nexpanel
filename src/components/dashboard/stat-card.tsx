type StatCardProps = {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
};

export function StatCard({ label, value, change, positive, icon }: StatCardProps) {
  return (
    <div
      className="rounded-2xl border p-5 flex flex-col gap-3"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          {label}
        </span>
        <span className="text-xl">{icon}</span>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          {value}
        </span>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{
            background: positive ? "#dcfce7" : "#fee2e2",
            color: positive ? "#16a34a" : "#dc2626",
          }}
        >
          {change}
        </span>
      </div>
    </div>
  );
}
