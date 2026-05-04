import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--foreground)" }}>
          Bienvenido de vuelta
        </h1>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Ingresa tus credenciales para acceder al dashboard
        </p>
      </div>

      <LoginForm />

      <p className="mt-6 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
        ¿No tienes cuenta?{" "}
        <Link href="/register" className="font-medium hover:opacity-80" style={{ color: "var(--primary)" }}>
          Regístrate gratis
        </Link>
      </p>
    </>
  );
}
