"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  createColumns,
  commonActions,
  statusBadge,
  roleBadge,
  avatarCell,
  dateCell,
  monoCell,
} from "@/components/table/column-table";

export type AdminUser = {
  admin_id: number | string;
  f_name: string;
  l_name: string;
  username: string;
  email: string;
  role: string;
  evac_loc_id?: string | number | null;
  is_active: number;
  created_at: string;
};

function avatarGradient(role: string) {
  const map: Record<string, string> = {
    superadmin: "from-[#f05a1a] to-[#c0392b]",
    admin: "from-[#2563eb] to-[#1d4ed8]",
    staff: "from-[#16a34a] to-[#15803d]",
  };
  return map[role] ?? "from-[#7c3aed] to-[#6d28d9]";
}

export const adminUserColumns: ColumnDef<AdminUser>[] =
  createColumns<AdminUser>(
    [
      {
        id: "user",
        header: "User",
        cell: (u) => (
          <div className="flex items-center gap-[10px]">
            {avatarCell(
              `${u.f_name[0]}${u.l_name[0]}`.toUpperCase(),
              avatarGradient(u.role),
              u.is_active === 0,
            )}
            <div>
              <p
                className={`text-[13px] font-medium ${u.is_active === 0 ? "text-gray-400" : "text-gray-900"}`}
              >
                {u.f_name} {u.l_name}
              </p>
              <p className="font-mono text-[10px] text-gray-400">
                @{u.username}
              </p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (u) => monoCell(u.email, u.is_active === 0),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: (u) => roleBadge(u.role),
      },
      {
        accessorKey: "evac_loc_id",
        header: "Evac Location",
        cell: (u) => (
          <span
            className={`text-[12px] ${u.evac_loc_id ? "text-gray-500" : "text-gray-300"}`}
          >
            {u.evac_loc_id ? `Evacuation Site ${u.evac_loc_id}` : "—"}
          </span>
        ),
      },
      {
        accessorKey: "is_active",
        header: "Status",
        cell: (u) => statusBadge(u.is_active === 1),
      },
      {
        accessorKey: "created_at",
        header: "Created",
        cell: (u) => dateCell(u.created_at),
      },
    ],
    [
      commonActions.edit<AdminUser>("/adminUser", "admin_id"),
      commonActions.toggle<AdminUser>("/adminUser", "admin_id", "is_active"),
      commonActions.delete<AdminUser>("/adminUser", "admin_id"),
    ],
    "Actions",
  );
