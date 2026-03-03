import { auth } from "@/lib/auth/auth.config";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/layout/logoutButton";
import { Topbar } from "@/components/layout/topBar";
import {
  ShieldAlert,
  LayoutDashboard,
  Zap,
  Users,
  Home,
  Package,
  Globe,
  BarChart2,
} from "lucide-react";

const navSections = [
  {
    label: "Operations",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      {
        label: "Incidents",
        href: "/incidents",
        icon: Zap,
        badge: "3",
        badgeColor: "red",
      },
      { label: "Admin Users", href: "/adminUser", icon: Home },
      { label: "Evacuees", href: "/evacuees", icon: Users, badge: "1.2K" },
      { label: "Shelters", href: "/shelters", icon: Home },
    ],
  },
  {
    label: "Logistics",
    items: [
      { label: "Resources", href: "/resources", icon: Package },
      { label: "Routes", href: "/routes", icon: Globe },
      { label: "Reports", href: "/reports", icon: BarChart2 },
    ],
  },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  const user = session.user;
  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("") ?? "??";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ── SIDEBAR ── */}
      <aside className="w-[220px] flex-shrink-0 fixed h-full bg-white border-r border-gray-200 flex flex-col z-10 shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-200">
          <div className="w-[34px] h-[34px] rounded-[9px] flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#f05a1a] to-[#c0392b] shadow-[0_4px_16px_rgba(240,90,26,0.3)]">
            <ShieldAlert className="w-[18px] h-[18px] text-white" />
          </div>
          <div>
            <p className="font-mono text-[13px] font-semibold text-gray-900 tracking-[0.1em]">
              DEMS
            </p>
            <p className="font-mono text-[9px] text-gray-400 tracking-[0.12em] uppercase">
              Response System
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 overflow-y-auto">
          {navSections.map((section) => (
            <div key={section.label}>
              <p className="px-3 py-2 font-mono text-[9px] text-gray-400 tracking-[0.14em] uppercase">
                {section.label}
              </p>
              {section.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-[10px] px-3 py-[9px] mx-1 rounded-[8px] text-[13px] text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all"
                >
                  <item.icon className="w-[15px] h-[15px] flex-shrink-0" />
                  {item.label}
                  {item.badge && (
                    <span
                      className={`ml-auto font-mono text-[9px] px-[6px] py-[2px] rounded-full ${item.badgeColor === "red" ? "bg-red-100 text-red-500" : "bg-orange-100 text-orange-500"}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-2 py-3 border-t border-gray-200">
          <div className="flex items-center gap-[10px] px-3 py-[10px] mb-1 rounded-[8px] bg-gray-50 border border-gray-200">
            <div className="w-[30px] h-[30px] rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#f05a1a] to-[#c0392b] font-mono text-[11px] font-semibold text-white">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-gray-900 truncate">
                {user.name}
              </p>
              <p className="font-mono text-[9px] text-[#f05a1a] uppercase tracking-[0.1em]">
                {(user as any).role}
              </p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 ml-[220px] flex flex-col min-h-screen">
        <Topbar initials={initials} />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
