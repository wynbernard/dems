"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Pencil,
  Power,
  Trash2,
  Eye,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ── Types ────────────────────────────────────────────────────────────────────

export type ActionItem<TData> = {
  label: string | ((row: TData) => string);
  icon?: LucideIcon;
  href?: (row: TData) => string;
  onClick?: (row: TData) => void;
  variant?: "default" | "danger";
  hidden?: (row: TData) => boolean;
};

export type ColumnConfig<TData> = {
  /** tanstack accessorKey or id */
  id?: string;
  accessorKey?: keyof TData & string;
  header: string;
  cell: (row: TData) => React.ReactNode;
  enableSorting?: boolean;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

export function statusBadge(active: boolean) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-[3px] rounded-full font-mono text-[9px] uppercase tracking-[0.1em] border ${active ? "bg-green-50 text-green-600 border-green-200" : "bg-red-50 text-red-500 border-red-200"}`}
    >
      ● {active ? "Active" : "Inactive"}
    </span>
  );
}

export function roleBadge(role: string) {
  const map: Record<string, string> = {
    superadmin: "bg-orange-50 text-orange-500 border-orange-200",
    admin: "bg-blue-50 text-blue-500 border-blue-200",
    staff: "bg-green-50 text-green-600 border-green-200",
  };
  const cls = map[role] ?? "bg-violet-50 text-violet-500 border-violet-200";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-[3px] rounded-full font-mono text-[9px] uppercase tracking-[0.1em] border ${cls}`}
    >
      ● {role}
    </span>
  );
}

export function avatarCell(initials: string, gradient: string, dim = false) {
  return (
    <div
      className={`w-[34px] h-[34px] rounded-full flex-shrink-0 flex items-center justify-center font-mono text-[11px] font-semibold text-white bg-gradient-to-br ${gradient} ${dim ? "opacity-40" : ""}`}
    >
      {initials}
    </div>
  );
}

export function dateCell(value: string) {
  return (
    <span className="font-mono text-[10px] text-gray-400">
      {new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}
    </span>
  );
}

export function monoCell(value: string, muted = false) {
  return (
    <span
      className={`font-mono text-[11px] ${muted ? "text-gray-300" : "text-gray-500"}`}
    >
      {value}
    </span>
  );
}

// ── Actions column factory ────────────────────────────────────────────────────

export function actionsColumn<TData>(
  actions: ActionItem<TData>[],
  label = "Actions",
): ColumnDef<TData> {
  return {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const u = row.original;
      const visible = actions.filter((a) => !a.hidden?.(u));

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-gray-400 hover:text-gray-700"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white border-gray-200 text-gray-700 min-w-[160px]"
          >
            <DropdownMenuLabel className="text-gray-500 font-mono text-[10px] uppercase tracking-wider">
              {label}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-100" />
            {visible.map((action, i) => {
              const actionLabel =
                typeof action.label === "function"
                  ? action.label(u)
                  : action.label;
              const Icon = action.icon;
              const isDanger = action.variant === "danger";

              const content = (
                <>
                  {Icon && <Icon className="w-[13px] h-[13px]" />}
                  {actionLabel}
                </>
              );

              // separator before danger actions
              const needsSep =
                isDanger && i > 0 && visible[i - 1]?.variant !== "danger";

              return (
                <div key={i}>
                  {needsSep && (
                    <DropdownMenuSeparator className="bg-gray-100" />
                  )}
                  {action.href ? (
                    <DropdownMenuItem
                      asChild
                      className={`cursor-pointer gap-2 ${isDanger ? "text-red-500 hover:bg-red-50 focus:bg-red-50 focus:text-red-600" : "hover:bg-gray-50"}`}
                    >
                      <a href={action.href(u)}>{content}</a>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      onClick={() => action.onClick?.(u)}
                      className={`cursor-pointer gap-2 ${isDanger ? "text-red-500 hover:bg-red-50 focus:bg-red-50 focus:text-red-600" : "hover:bg-gray-50"}`}
                    >
                      {content}
                    </DropdownMenuItem>
                  )}
                </div>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };
}

// ── Main column builder ───────────────────────────────────────────────────────

export function createColumns<TData>(
  configs: ColumnConfig<TData>[],
  actions?: ActionItem<TData>[],
  actionsLabel?: string,
): ColumnDef<TData>[] {
  const cols: ColumnDef<TData>[] = configs.map((config) => ({
    id: config.id ?? config.accessorKey,
    accessorKey: config.accessorKey,
    header: config.header,
    enableSorting: config.enableSorting ?? false,
    cell: ({ row }) => config.cell(row.original),
  }));

  if (actions?.length) {
    cols.push(actionsColumn(actions, actionsLabel));
  }

  return cols;
}

// ── Pre-built common actions ──────────────────────────────────────────────────

export const commonActions = {
  edit: <TData,>(basePath: string, idKey: keyof TData): ActionItem<TData> => ({
    label: "Edit",
    icon: Pencil,
    href: (row) => `${basePath}/${row[idKey]}/edit`,
  }),

  toggle: <TData,>(
    basePath: string,
    idKey: keyof TData,
    activeKey: keyof TData,
  ): ActionItem<TData> => ({
    label: (row) =>
      row[activeKey] === 1 || row[activeKey] === true
        ? "Deactivate"
        : "Activate",
    icon: Power,
    href: (row) => `${basePath}/${row[idKey]}/toggle`,
  }),

  view: <TData,>(basePath: string, idKey: keyof TData): ActionItem<TData> => ({
    label: "View",
    icon: Eye,
    href: (row) => `${basePath}/${row[idKey]}`,
  }),

  delete: <TData,>(
    basePath: string,
    idKey: keyof TData,
  ): ActionItem<TData> => ({
    label: "Delete",
    icon: Trash2,
    href: (row) => `${basePath}/${row[idKey]}/delete`,
    variant: "danger",
  }),
};
