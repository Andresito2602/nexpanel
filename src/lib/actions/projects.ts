"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type ProjectFormState =
  | {
      errors?: {
        name?: string[];
        budget?: string[];
      };
      message?: string;
    }
  | undefined;

export async function saveProjectAction(
  _state: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const id = formData.get("id") as string | null;
  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string).trim();
  const status = formData.get("status") as string;
  const budget = Number(formData.get("budget"));

  const errors: ProjectFormState["errors"] = {};

  if (!name || name.length < 2) {
    errors.name = ["El nombre debe tener al menos 2 caracteres"];
  }
  if (isNaN(budget) || budget < 0) {
    errors.budget = ["Ingresa un presupuesto válido"];
  }
  if (Object.keys(errors).length > 0) return { errors };

  const supabase = await createClient();

  // Verify the user is authenticated before mutating data
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { message: "No autorizado" };

  if (id) {
    const { error } = await supabase
      .from("projects")
      .update({ name, description, status, budget })
      .eq("id", id)
      .eq("user_id", user.id); // RLS: only update own rows

    if (error) return { message: error.message };
  } else {
    const { error } = await supabase
      .from("projects")
      .insert({ name, description, status, budget, user_id: user.id });

    if (error) return { message: error.message };
  }

  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

export async function deleteProjectAction(id: string): Promise<void> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id); // RLS: only delete own rows

  revalidatePath("/dashboard/projects");
}
