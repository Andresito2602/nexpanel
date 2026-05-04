"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/actions/auth";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "▦" },
  { href: "/dashboard/projects", label: "Proyectos", icon: "◈" },
  { href: "/dashboard/clients", label: "Clientes", icon: "◉" },
  { href: "/dashboard/invoices", label: "Facturas", icon: "◎" },
  { href: "/dashboard/settings", label: "Ajustes", icon: "◌" },
];

type SidebarProps = {
  userName?: string;
  userEmail?: string;
};

export function Sidebar({ userName = "Usuario", userEmail = "" }: SidebarProps) {
  const pathname = usePathname();
  const initials = userName.charAt(0).toUpperCase();

  return (
    <aside
      className="w-56 flex flex-col h-full shrink-0"
      style={{ background: "var(--sidebar)", color: "var(--sidebar-foreground)" }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
            style={{ background: "var(--sidebar-accent)" }}
          >
            N
          </div>
          <span className="font-semibold text-sm">NexPanel</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all"
              style={{
                background: isActive ? "var(--sidebar-accent)" : "transparent",
                color: "var(--sidebar-foreground)",
                opacity: isActive ? 1 : 0.75,
              }}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User / Logout */}
      <div className="px-3 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ background: "var(--sidebar-accent)", color: "#fff" }}
          >
            {initials}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium truncate">{userName}</span>
            <span className="text-xs opacity-60 truncate">{userEmail}</span>
          </div>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all hover:opacity-80"
            style={{ color: "var(--sidebar-foreground)", opacity: 0.7 }}
          >
            <span className="text-base leading-none">⎋</span>
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  );
}
