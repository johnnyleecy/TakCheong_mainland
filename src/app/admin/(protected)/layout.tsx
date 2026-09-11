import { redirect } from "next/navigation";
import AdminNav from "@/components/admin-nav";
import { isAdmin } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminNav />
      <main className="px-4 py-6 sm:px-6 lg:ml-64 lg:px-8 lg:py-8">
        {children}
      </main>
    </div>
  );
}
