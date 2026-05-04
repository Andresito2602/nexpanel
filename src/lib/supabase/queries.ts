import { createClient } from "@/lib/supabase/server";
import { Project, Client } from "@/lib/definitions";

/**
 * Returns the authenticated user or null.
 * Use this in Server Components / layouts to get the current user.
 */
export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id, name, description, status, budget, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id, name, description, status, budget, created_at")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function getClients(): Promise<Client[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clients")
    .select("id, name, email, company, status, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching clients:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getClientById(id: string): Promise<Client | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clients")
    .select("id, name, email, company, status, created_at")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export type ActivityItem = {
  id: string;
  type: "project" | "client";
  action: "created" | "updated";
  name: string;
  sub: string;
  created_at: string;
};

export async function getRecentActivity(): Promise<ActivityItem[]> {
  const supabase = await createClient();

  const [projectsRes, clientsRes] = await Promise.all([
    supabase
      .from("projects")
      .select("id, name, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("clients")
      .select("id, name, company, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const projects: ActivityItem[] = (projectsRes.data ?? []).map((p) => ({
    id: `project-${p.id}`,
    type: "project",
    action: "created",
    name: "Nuevo proyecto creado",
    sub: p.name,
    created_at: p.created_at,
  }));

  const clients: ActivityItem[] = (clientsRes.data ?? []).map((c) => ({
    id: `client-${c.id}`,
    type: "client",
    action: "created",
    name: "Nuevo cliente registrado",
    sub: c.company ? `${c.name} · ${c.company}` : c.name,
    created_at: c.created_at,
  }));

  // Merge and sort by date, take the 6 most recent
  return [...projects, ...clients]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 6);
}

export type DashboardStats = {
  totalProjects: number;
  activeProjects: number;
  totalClients: number;
  activeClients: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();

  const [projectsRes, clientsRes] = await Promise.all([
    supabase.from("projects").select("status"),
    supabase.from("clients").select("status"),
  ]);

  const projects = projectsRes.data ?? [];
  const clients = clientsRes.data ?? [];

  return {
    totalProjects: projects.length,
    activeProjects: projects.filter((p) => p.status === "active").length,
    totalClients: clients.length,
    activeClients: clients.filter((c) => c.status === "active").length,
  };
}
