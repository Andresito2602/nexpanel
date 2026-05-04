import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--foreground)" }}>
          Crea tu cuenta
        </h1>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Empieza gratis, sin tarjeta de crédito
        </p>
      </div>

      <RegisterForm />

      <p className="mt-6 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="font-medium hover:opacity-80" style={{ color: "var(--primary)" }}>
          Iniciar sesión
        </Link>
      </p>
    </>
  );
}
