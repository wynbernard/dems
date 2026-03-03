"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/table/data-table";
import { adminUserColumns, AdminUser } from "./adminUserColumns";
import { Users, Search } from "lucide-react";

type Stats = {
  total: number;
  active: number;
  inactive: number;
  supers: number;
};

export function AdminUsersTable({
  users,
  stats,
}: {
  users: AdminUser[];
  stats: Stats;
}) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        u.f_name.toLowerCase().includes(q) ||
        u.l_name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q);
      const matchRole = roleFilter === "all" || u.role === roleFilter;
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "1" ? u.is_active === 1 : u.is_active === 0);
      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  return (
    <>
      {/* Table panel */}
      <div className="">
        {/* Toolbar */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <div className="relative flex-1 max-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-gray-400 pointer-events-none" />
            <Input
              suppressHydrationWarning
              placeholder="Search name, email, username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-[36px] pl-9 bg-gray-50 border-gray-200 text-gray-900 text-[13px] placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-[#f05a1a] rounded-[8px]"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[130px] h-[36px] bg-gray-50 border-gray-200 text-gray-600 font-mono text-[11px] focus:ring-0 focus:border-[#f05a1a]">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 text-gray-900">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="superadmin">Super Admin</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] h-[36px] bg-gray-50 border-gray-200 text-gray-600 font-mono text-[11px] rounded-[8px] focus:ring-0 focus:border-[#f05a1a]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 text-gray-900">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="1">Active</SelectItem>
              <SelectItem value="0">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <span className="ml-auto font-mono text-[10px] text-black-400">
            {filtered.length} users
          </span>
        </div>

        {/* DataTable */}
        <DataTable columns={adminUserColumns} data={filtered} />
      </div>
    </>
  );
}
