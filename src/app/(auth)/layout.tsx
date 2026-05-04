import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: "var(--background)" }}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold"
          style={{ background: "var(--primary)" }}
        >
          N
        </div>
        <span className="font-semibold text-xl" style={{ color: "var(--foreground)" }}>
          NexPanel
        </span>
      </Link>

      {/* Card */}
      <div
        className="w-full max-w-md rounded-2xl border p-8 shadow-sm"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        {children}
      </div>

      <p className="mt-6 text-xs" style={{ color: "var(--muted-foreground)" }}>
        Al continuar, aceptas nuestros{" "}
        <a href="#" className="underline hover:opacity-80">Términos de servicio</a>{" "}
        y{" "}
        <a href="#" className="underline hover:opacity-80">Política de privacidad</a>.
      </p>
    </div>
  );
}
