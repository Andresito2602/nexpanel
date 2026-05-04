"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type ClientFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
      };
      message?: string;
    }
  | undefined;

export async function saveClientAction(
  _state: ClientFormState,
  formData: FormData
): Promise<ClientFormState> {
  const id = formData.get("id") as string | null;
  const name = (formData.get("name") as string).trim();
  const email = (formData.get("email") as string).trim();
  const company = (formData.get("company") as string).trim();
  const status = formData.get("status") as string;

  const errors: ClientFormState["errors"] = {};

  if (!name || name.length < 2) {
    errors.name = ["El nombre debe tener al menos 2 caracteres"];
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = ["Ingresa un email válido"];
  }
  if (Object.keys(errors).length > 0) return { errors };

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { message: "No autorizado" };

  if (id) {
    const { error } = await supabase
      .from("clients")
      .update({ name, email, company, status })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) return { message: error.message };
  } else {
    const { error } = await supabase
      .from("clients")
      .insert({ name, email, company, status, user_id: user.id });

    if (error) return { message: error.message };
  }

  revalidatePath("/dashboard/clients");
  redirect("/dashboard/clients");
}

export async function deleteClientAction(id: string): Promise<void> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase
    .from("clients")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  revalidatePath("/dashboard/clients");
}
