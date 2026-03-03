"use client";

import { useActionState, useState, useMemo } from "react";
import {
  createAdminAction,
  updateAdminAction,
  toggleActiveAction,
  deleteAdminAction,
  type AdminUser,
} from "@/lib/adminUser/adminUserAction";
import {
  Loader2,
  Plus,
  Search,
  RefreshCw,
  Pencil,
  Power,
  Trash2,
  X,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────
type Stats = {
  total: number;
  superadmin: number;
  admin: number;
  staff: number;
};
type Props = { users: AdminUser[]; stats: Stats };

// ── Helpers ────────────────────────────────────────────
function initials(f: string, l: string) {
  return `${f[0] ?? ""}${l[0] ?? ""}`.toUpperCase();
}

function avatarColor(role: string) {
  return role === "superadmin"
    ? "bg-gradient-to-br from-violet-600 to-indigo-600"
    : role === "admin"
      ? "bg-gradient-to-br from-orange-500 to-red-600"
      : "bg-gradient-to-br from-cyan-600 to-sky-700";
}

function roleBadge(role: string) {
  return role === "superadmin"
    ? "bg-violet-500/15 text-violet-400 border border-violet-500/25"
    : role === "admin"
      ? "bg-orange-500/15 text-orange-400 border border-orange-500/25"
      : "bg-cyan-500/15 text-cyan-400 border border-cyan-500/25";
}

// ── Modal ──────────────────────────────────────────────
function UserModal({
  open,
  onClose,
  editUser,
}: {
  open: boolean;
  onClose: () => void;
  editUser: AdminUser | null;
}) {
  const action = editUser ? updateAdminAction : createAdminAction;
  const [state, formAction, isPending] = useActionState(action, undefined);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#04070f]/85 backdrop-blur-[8px]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-[480px] bg-[#0b1220] border border-[#1a2a42] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        {/* Accent bar */}
        <div className="h-[3px] bg-gradient-to-r from-[#f05a1a] to-[#c0392b]" />

        {/* Head */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#111d30]">
          <h2 className="font-['Bebas_Neue'] text-[22px] text-[#e2eaf8] tracking-[0.03em]">
            {editUser ? "EDIT ADMIN USER" : "ADD ADMIN USER"}
          </h2>
          <button
            onClick={onClose}
            className="w-[30px] h-[30px] rounded-[7px] border border-[#1a2a42] flex items-center justify-center text-[#5a7494] hover:text-[#e2eaf8] transition-colors"
          >
            <X className="w-[14px] h-[14px]" />
          </button>
        </div>

        {/* Body */}
        <form action={formAction} className="p-6 space-y-4">
          {editUser && (
            <input type="hidden" name="admin_id" value={editUser.admin_id} />
          )}

          {/* Global error/success */}
          {state?.error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 text-[12px] text-red-400">
              {state.error}
            </div>
          )}
          {state?.success && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2 text-[12px] text-green-400">
              {state.success}
            </div>
          )}

          {/* Name row */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                name: "f_name",
                label: "First Name",
                placeholder: "Juan",
                default: editUser?.f_name,
              },
              {
                name: "l_name",
                label: "Last Name",
                placeholder: "Dela Cruz",
                default: editUser?.l_name,
              },
            ].map((f) => (
              <div key={f.name}>
                <label className="block font-mono text-[10px] text-[#5a7494] tracking-[0.1em] uppercase mb-[6px]">
                  {f.label}
                </label>
                <input
                  name={f.name}
                  defaultValue={f.default}
                  placeholder={f.placeholder}
                  className="w-full bg-[#080e1a]/80 border border-[#1a2a42] rounded-[8px] px-3 py-[10px]
                             text-[13px] text-[#e2eaf8] placeholder:text-[#3d5470] outline-none
                             focus:border-[#f05a1a]/50 focus:shadow-[0_0_0_3px_rgba(240,90,26,0.08)] transition-all"
                />
                {state?.fields?.[f.name] && (
                  <p className="text-[11px] text-red-400 mt-1">
                    {state.fields[f.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Username */}
          <div>
            <label className="block font-mono text-[10px] text-[#5a7494] tracking-[0.1em] uppercase mb-[6px]">
              Username
            </label>
            <input
              name="username"
              defaultValue={editUser?.username}
              placeholder="juandc"
              className="w-full bg-[#080e1a]/80 border border-[#1a2a42] rounded-[8px] px-3 py-[10px]
                         text-[13px] text-[#e2eaf8] placeholder:text-[#3d5470] outline-none
                         focus:border-[#f05a1a]/50 transition-all"
            />
            {state?.fields?.username && (
              <p className="text-[11px] text-red-400 mt-1">
                {state.fields.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-mono text-[10px] text-[#5a7494] tracking-[0.1em] uppercase mb-[6px]">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              defaultValue={editUser?.email}
              placeholder="juan@dems.gov"
              className="w-full bg-[#080e1a]/80 border border-[#1a2a42] rounded-[8px] px-3 py-[10px]
                         text-[13px] text-[#e2eaf8] placeholder:text-[#3d5470] outline-none
                         focus:border-[#f05a1a]/50 transition-all"
            />
            {state?.fields?.email && (
              <p className="text-[11px] text-red-400 mt-1">
                {state.fields.email}
              </p>
            )}
          </div>

          {/* Password + Role */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-[10px] text-[#5a7494] tracking-[0.1em] uppercase mb-[6px]">
                {editUser ? "New Password" : "Password"}
              </label>
              <input
                name="password"
                type="password"
                placeholder={editUser ? "Leave blank to keep" : "••••••••"}
                className="w-full bg-[#080e1a]/80 border border-[#1a2a42] rounded-[8px] px-3 py-[10px]
                           text-[13px] text-[#e2eaf8] placeholder:text-[#3d5470] outline-none
                           focus:border-[#f05a1a]/50 transition-all"
              />
              {state?.fields?.password && (
                <p className="text-[11px] text-red-400 mt-1">
                  {state.fields.password}
                </p>
              )}
            </div>
            <div>
              <label className="block font-mono text-[10px] text-[#5a7494] tracking-[0.1em] uppercase mb-[6px]">
                Role
              </label>
              <select
                name="role"
                defaultValue={editUser?.role ?? ""}
                className="w-full bg-[#080e1a]/80 border border-[#1a2a42] rounded-[8px] px-3 py-[10px]
                           text-[13px] text-[#e2eaf8] font-mono outline-none cursor-pointer
                           focus:border-[#f05a1a]/50 transition-all"
              >
                <option value="">Select role</option>
                <option value="superadmin">Superadmin</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>
              {state?.fields?.role && (
                <p className="text-[11px] text-red-400 mt-1">
                  {state.fields.role}
                </p>
              )}
            </div>
          </div>

          {/* Evac Location */}
          <div>
            <label className="block font-mono text-[10px] text-[#5a7494] tracking-[0.1em] uppercase mb-[6px]">
              Evacuation Location ID{" "}
              <span className="text-[#3d5470]">(optional)</span>
            </label>
            <input
              name="evac_loc_id"
              type="number"
              defaultValue={editUser?.evac_loc_id ?? ""}
              placeholder="e.g. 1"
              className="w-full bg-[#080e1a]/80 border border-[#1a2a42] rounded-[8px] px-3 py-[10px]
                         text-[13px] text-[#e2eaf8] placeholder:text-[#3d5470] outline-none
                         focus:border-[#f05a1a]/50 transition-all"
            />
          </div>

          {/* Footer */}
          <div className="flex gap-3 justify-end pt-2 border-t border-[#111d30] mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-[9px] rounded-[9px] border border-[#1a2a42] text-[13px] text-[#5a7494]
                         hover:text-[#e2eaf8] hover:border-[#2a3a55] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-[9px] rounded-[9px] bg-[#f05a1a] text-white
                         text-[13px] font-medium shadow-[0_4px_20px_rgba(240,90,26,0.3)]
                         hover:bg-[#ff7c3f] transition-all disabled:opacity-60"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {editUser ? "Save Changes" : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────
export function AdminUsersClient({ users, stats }: Props) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRole] = useState("");
  const [statusFilter, setStatus] = useState("");
  const [modalOpen, setModal] = useState(false);
  const [editUser, setEditUser] = useState<AdminUser | null>(null);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        `${u.f_name} ${u.l_name}`.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q);
      const matchRole = !roleFilter || u.role === roleFilter;
      const matchStatus = !statusFilter || String(u.is_active) === statusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  function openAdd() {
    setEditUser(null);
    setModal(true);
  }
  function openEdit(u: AdminUser) {
    setEditUser(u);
    setModal(true);
  }

  return (
    <div className="space-y-5 text-[#e2eaf8]">
      {/* ── Header ── */}
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-[9px] text-[#3d5470] tracking-[0.14em] uppercase mb-1">
            // system administration
          </p>
          <h1 className="font-['Bebas_Neue'] text-[34px] leading-none tracking-[0.03em]">
            ADMIN USERS
          </h1>
          <p className="text-[12px] text-[#5a7494] mt-1">
            Manage system administrators, roles, and access levels.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-[7px] px-4 py-[9px] rounded-[9px] bg-[#f05a1a] text-white
                     text-[13px] font-medium shadow-[0_4px_20px_rgba(240,90,26,0.3)]
                     hover:bg-[#ff7c3f] hover:-translate-y-px transition-all"
        >
          <Plus className="w-[14px] h-[14px]" />
          Add Admin User
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-4 gap-3">
        {[
          {
            label: "Total Admins",
            val: stats.total,
            color: "text-[#e2eaf8]",
            sub: "All roles",
          },
          {
            label: "Super Admins",
            val: stats.superadmin,
            color: "text-violet-400",
            sub: "Full access",
          },
          {
            label: "Admins",
            val: stats.admin,
            color: "text-orange-400",
            sub: "Operational",
          },
          {
            label: "Staff",
            val: stats.staff,
            color: "text-cyan-400",
            sub: "Limited access",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-[#0b1220] border border-[#111d30] rounded-[10px] px-4 py-3"
          >
            <p className="font-mono text-[9px] text-[#5a7494] tracking-[0.1em] uppercase mb-[6px]">
              {s.label}
            </p>
            <p
              className={`font-['Bebas_Neue'] text-[28px] leading-none ${s.color}`}
            >
              {s.val}
            </p>
            <p className="text-[11px] text-[#5a7494] mt-[3px]">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-[320px]">
          <Search className="absolute left-[11px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#5a7494]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, username..."
            className="w-full bg-[#0b1220] border border-[#111d30] rounded-[8px] pl-[34px] pr-3 py-[9px]
                       text-[13px] text-[#e2eaf8] placeholder:text-[#3d5470] outline-none
                       focus:border-[#f05a1a]/40 transition-all"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRole(e.target.value)}
          className="bg-[#0b1220] border border-[#111d30] rounded-[8px] px-3 py-[9px]
                     text-[12px] text-[#5a7494] font-mono outline-none cursor-pointer
                     focus:border-[#f05a1a]/40 transition-all"
        >
          <option value="">All Roles</option>
          <option value="superadmin">Superadmin</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-[#0b1220] border border-[#111d30] rounded-[8px] px-3 py-[9px]
                     text-[12px] text-[#5a7494] font-mono outline-none cursor-pointer
                     focus:border-[#f05a1a]/40 transition-all"
        >
          <option value="">All Status</option>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
        <button
          onClick={() => window.location.reload()}
          className="ml-auto flex items-center gap-2 px-3 py-[9px] rounded-[8px] border border-[#1a2a42]
                     text-[13px] text-[#5a7494] hover:text-[#e2eaf8] hover:border-[#2a3a55] transition-all"
        >
          <RefreshCw className="w-[13px] h-[13px]" />
          Refresh
        </button>
      </div>

      {/* ── Table ── */}
      <div className="bg-[#0b1220] border border-[#111d30] rounded-xl overflow-hidden">
        {/* Head */}
        <div
          className="grid gap-0 border-b border-[#111d30] px-4"
          style={{
            gridTemplateColumns: "48px 1fr 1fr 130px 120px 110px 120px",
          }}
        >
          {["#", "User", "Email", "Role", "Location", "Status", "Actions"].map(
            (h) => (
              <div
                key={h}
                className="py-[11px] px-2 font-mono text-[9px] text-[#3d5470] tracking-[0.12em] uppercase"
              >
                {h}
              </div>
            ),
          )}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-mono text-[11px] text-[#3d5470] tracking-[0.1em] uppercase">
              No users found
            </p>
          </div>
        ) : (
          filtered.map((u, i) => (
            <div
              key={u.admin_id}
              className="grid px-4 border-b border-[#111d30]/70 last:border-0 hover:bg-white/[0.02] transition-colors items-center"
              style={{
                gridTemplateColumns: "48px 1fr 1fr 130px 120px 110px 120px",
                animationDelay: `${i * 0.05}s`,
              }}
            >
              <div className="py-3 px-2 font-mono text-[10px] text-[#3d5470]">
                {String(u.admin_id).padStart(3, "0")}
              </div>
              <div className="py-3 px-2 flex items-center gap-[10px]">
                <div
                  className={`w-[32px] h-[32px] rounded-full flex-shrink-0 flex items-center justify-center
                                 font-mono text-[11px] font-semibold text-white ${avatarColor(u.role)}`}
                >
                  {initials(u.f_name, u.l_name)}
                </div>
                <div>
                  <p className="text-[13px] text-[#e2eaf8] font-medium">
                    {u.f_name} {u.l_name}
                  </p>
                  <p className="font-mono text-[10px] text-[#5a7494]">
                    @{u.username}
                  </p>
                </div>
              </div>
              <div className="py-3 px-2 font-mono text-[11px] text-[#5a7494]">
                {u.email}
              </div>
              <div className="py-3 px-2">
                <span
                  className={`inline-flex items-center gap-1 px-[10px] py-[3px] rounded-full
                                  font-mono text-[9px] uppercase tracking-[0.08em] ${roleBadge(u.role)}`}
                >
                  ● {u.role}
                </span>
              </div>
              <div className="py-3 px-2 text-[11px] text-[#5a7494]">
                {u.evac_loc_id ? `Evac Zone ${u.evac_loc_id}` : "— Global"}
              </div>
              <div className="py-3 px-2">
                <div className="flex items-center gap-[5px] font-mono text-[10px]">
                  <span
                    className={`w-[6px] h-[6px] rounded-full ${
                      u.is_active
                        ? "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]"
                        : "bg-[#3d5470]"
                    }`}
                  />
                  <span
                    className={
                      u.is_active ? "text-green-400" : "text-[#5a7494]"
                    }
                  >
                    {u.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <div className="py-3 px-2">
                <div className="flex items-center gap-[6px]">
                  <button
                    onClick={() => openEdit(u)}
                    className="w-[28px] h-[28px] rounded-[7px] border border-[#1a2a42] flex items-center justify-center
                               text-[#5a7494] hover:bg-[#f05a1a]/10 hover:text-[#ff7c3f] hover:border-[#f05a1a]/30 transition-all"
                  >
                    <Pencil className="w-[11px] h-[11px]" />
                  </button>
                  <button
                    onClick={() => toggleActiveAction(u.admin_id, u.is_active)}
                    className="w-[28px] h-[28px] rounded-[7px] border border-[#1a2a42] flex items-center justify-center
                               text-[#5a7494] hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/30 transition-all"
                  >
                    <Power className="w-[11px] h-[11px]" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Delete this user?"))
                        deleteAdminAction(u.admin_id);
                    }}
                    className="w-[28px] h-[28px] rounded-[7px] border border-[#1a2a42] flex items-center justify-center
                               text-[#5a7494] hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all"
                  >
                    <Trash2 className="w-[11px] h-[11px]" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Pagination info */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#111d30]">
          <span className="font-mono text-[10px] text-[#000000]">
            Showing {filtered.length} of {users.length} users
          </span>
        </div>
      </div>

      {/* ── Modal ── */}
      <UserModal
        open={modalOpen}
        onClose={() => setModal(false)}
        editUser={editUser}
      />
    </div>
  );
}
