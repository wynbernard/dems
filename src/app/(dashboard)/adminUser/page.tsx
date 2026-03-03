import { auth } from "@/lib/auth/auth.config";
import { redirect } from "next/navigation";
import { getAdminUsers } from "@/lib/adminUser/adminUserAction";
import { AdminUsersTable } from "@/components/admin-user/adminUserTable";
import { PaginationBar } from "@/components/layout/paginationBar";

export default async function AdminUsersPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const role = (session.user as any).role;
  if (!["superadmin", "admin"].includes(role)) redirect("/dashboard");

  const users = await getAdminUsers();

  const stats = {
    total: users.length,
    active: users.filter((u) => u.is_active === 1).length,
    inactive: users.filter((u) => u.is_active === 0).length,
    supers: users.filter((u) => u.role === "superadmin").length,
  };

  return (
    <div className="space-y-6 text-[#e2eaf8]">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-[10px] text-[#f05a1a] tracking-[0.15em] uppercase mb-1">
            // system administration
          </p>
          <h1 className="font-['Bebas_Neue'] text-[36px] leading-none tracking-[0.03em]">
            USER MANAGEMENT
          </h1>
          <p className="text-[13px] text-[#5a7494] mt-1">
            Manage admin accounts, roles, and access permissions.
          </p>
        </div>
        <a
          href="/adminUser/new"
          className="inline-flex items-center gap-2 px-4 h-[38px] rounded-[8px] bg-[#f05a1a] text-white text-[13px] font-medium hover:bg-[#ff7c3f] transition-all shadow-[0_0_20px_rgba(240,90,26,0.3)]"
        >
          <svg
            className="w-[14px] h-[14px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add User
        </a>
      </div>
      <div className="bg-white border border-gray-200 rounded-[12px] shadow-sm">
        <div className="overflow-x-auto">
          <AdminUsersTable users={users} stats={stats} />
        </div>
        <PaginationBar
          total={stats.total}
          showing={stats.total}
          currentPage={1}
          totalPages={1}
          basePath="/adminUser"
        />
      </div>
    </div>
  );
}
