"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FormState, FormErrors } from "@/lib/definitions";

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string): string[] {
  const errors: string[] = [];
  if (password.length < 8) errors.push("Mínimo 8 caracteres");
  if (!/[a-zA-Z]/.test(password)) errors.push("Al menos una letra");
  if (!/[0-9]/.test(password)) errors.push("Al menos un número");
  return errors;
}

export async function loginAction(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: FormErrors = {};

  if (!email || !validateEmail(email)) {
    errors.email = ["Ingresa un email válido"];
  }
  if (!password) {
    errors.password = ["La contraseña es requerida"];
  }
  if (Object.keys(errors).length > 0) return { errors };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { message: "Email o contraseña incorrectos" };
  }

  redirect("/dashboard");
}

export async function registerAction(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: FormErrors = {};

  if (!name || name.trim().length < 2) {
    errors.name = ["El nombre debe tener al menos 2 caracteres"];
  }
  if (!email || !validateEmail(email)) {
    errors.email = ["Ingresa un email válido"];
  }
  const passwordErrors = validatePassword(password);
  if (passwordErrors.length > 0) {
    errors.password = passwordErrors;
  }
  if (Object.keys(errors).length > 0) return { errors };

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name.trim() },
    },
  });

  if (error) {
    return { message: error.message };
  }

  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
