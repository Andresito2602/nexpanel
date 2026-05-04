"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/lib/actions/auth";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          autoComplete="email"
          required
          className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2"
          style={{
            background: "var(--background)",
            borderColor: state?.errors?.email ? "#ef4444" : "var(--border)",
            color: "var(--foreground)",
          }}
        />
        {state?.errors?.email && (
          <p className="text-xs text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Contraseña
          </label>
          <Link href="#" className="text-xs hover:opacity-80" style={{ color: "var(--primary)" }}>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
          className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2"
          style={{
            background: "var(--background)",
            borderColor: state?.errors?.password ? "#ef4444" : "var(--border)",
            color: "var(--foreground)",
          }}
        />
        {state?.errors?.password && (
          <p className="text-xs text-red-500">{state.errors.password[0]}</p>
        )}
      </div>

      {state?.message && (
        <div className="px-3 py-2.5 rounded-lg text-sm bg-red-50 text-red-600 border border-red-200">
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
      >
        {pending ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
