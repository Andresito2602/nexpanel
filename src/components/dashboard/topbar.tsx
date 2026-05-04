"use client";

import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/projects": "Proyectos",
  "/dashboard/clients": "Clientes",
  "/dashboard/invoices": "Facturas",
  "/dashboard/settings": "Ajustes",
};

export function TopBar() {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Dashboard";

  return (
    <header
      className="h-16 flex items-center justify-between px-6 border-b shrink-0"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <h1 className="font-semibold text-base" style={{ color: "var(--foreground)" }}>
        {title}
      </h1>
      <div className="flex items-center gap-3">
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm border transition-all hover:opacity-80"
          style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          aria-label="Notificaciones"
        >
          🔔
        </button>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: "var(--primary)" }}
        >
          U
        </div>
      </div>
    </header>
  );
}
