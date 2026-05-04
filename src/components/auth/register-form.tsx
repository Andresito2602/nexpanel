"use client";

import { useActionState } from "react";
import { registerAction } from "@/lib/actions/auth";

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          Nombre completo
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Juan García"
          autoComplete="name"
          required
          className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2"
          style={{
            background: "var(--background)",
            borderColor: state?.errors?.name ? "#ef4444" : "var(--border)",
            color: "var(--foreground)",
          }}
        />
        {state?.errors?.name && (
          <p className="text-xs text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

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
        <label htmlFor="password" className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Mínimo 8 caracteres"
          autoComplete="new-password"
          required
          className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2"
          style={{
            background: "var(--background)",
            borderColor: state?.errors?.password ? "#ef4444" : "var(--border)",
            color: "var(--foreground)",
          }}
        />
        {state?.errors?.password && (
          <ul className="flex flex-col gap-0.5">
            {state.errors.password.map((err: string) => (
              <li key={err} className="text-xs text-red-500">• {err}</li>
            ))}
          </ul>
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
        {pending ? "Creando cuenta..." : "Crear cuenta gratis"}
      </button>
    </form>
  );
}
