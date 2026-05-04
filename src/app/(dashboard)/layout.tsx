import { Sidebar } from "@/components/dashboard/sidebar";
import { TopBar } from "@/components/dashboard/topbar";
import { getUser } from "@/lib/supabase/queries";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  const userName =
    (user?.user_metadata?.full_name as string | undefined) ??
    user?.email?.split("@")[0] ??
    "Usuario";

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar userName={userName} userEmail={user?.email ?? ""} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main
          className="flex-1 overflow-y-auto p-6"
          style={{ background: "var(--background)" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
