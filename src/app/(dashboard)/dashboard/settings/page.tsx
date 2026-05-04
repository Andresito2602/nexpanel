export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-semibold" style={{ color: "var(--foreground)" }}>Ajustes</h2>
        <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
          Gestiona tu perfil y preferencias
        </p>
      </div>

      {/* Profile */}
      <div className="rounded-2xl border p-6 flex flex-col gap-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <h3 className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>Perfil</h3>

        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white"
            style={{ background: "var(--primary)" }}
          >
            U
          </div>
          <div>
            <p className="font-medium" style={{ color: "var(--foreground)" }}>Usuario Demo</p>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>demo@nexpanel.app</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Nombre", value: "Usuario Demo", name: "name" },
            { label: "Email", value: "demo@nexpanel.app", name: "email" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{field.label}</label>
              <input
                type="text"
                defaultValue={field.value}
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-90"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            Guardar cambios
          </button>
        </div>
      </div>

      {/* Password */}
      <div className="rounded-2xl border p-6 flex flex-col gap-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <h3 className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>Cambiar contraseña</h3>

        <div className="flex flex-col gap-4">
          {[
            { label: "Contraseña actual", name: "current" },
            { label: "Nueva contraseña", name: "new" },
            { label: "Confirmar contraseña", name: "confirm" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{field.label}</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-90"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            Actualizar contraseña
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="rounded-2xl border p-6 flex flex-col gap-4" style={{ background: "var(--card)", borderColor: "#fca5a5" }}>
        <h3 className="font-semibold text-sm text-red-500">Zona de peligro</h3>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Estas acciones son irreversibles. Procede con cuidado.
        </p>
        <button
          className="self-start px-5 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-90"
          style={{ background: "#fee2e2", color: "#dc2626" }}
        >
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
}
