import { auth } from "@/lib/auth/auth.config";
import { Zap, Users, Home, Package } from "lucide-react";

// ── Types ──────────────────────────────────────────────
type StatColor = "orange" | "red" | "blue" | "green";

const STATS = [
  { label: "Active Incidents",    value: "3",     sub: "↑ 2 critical severity",  subColor: "text-red-400",    icon: Zap,     color: "orange" as StatColor },
  { label: "Total Evacuees",      value: "1,284",  sub: "↑ 48 registered today",  subColor: "text-green-400",  icon: Users,   color: "red"    as StatColor },
  { label: "Shelters Open",       value: "12",    sub: "⚠ 4 near capacity",       subColor: "text-yellow-400", icon: Home,    color: "blue"   as StatColor },
  { label: "Resources Deployed",  value: "89",    sub: "6 pending dispatch",      subColor: "text-[#5a7494]",  icon: Package, color: "green"  as StatColor },
];

const INCIDENTS = [
  { id: "#INC-001", name: "Typhoon Carina Landfall", location: "Eastern Visayas", severity: "critical", status: "active",     evacuees: 487,  updated: "2m ago" },
  { id: "#INC-002", name: "Flash Flood Zone C",      location: "Cagayan Valley",  severity: "critical", status: "active",     evacuees: 312,  updated: "8m ago" },
  { id: "#INC-003", name: "Earthquake M6.2",         location: "Davao Region",    severity: "high",     status: "containing", evacuees: 485,  updated: "1h ago" },
];

const SHELTERS = [
  { name: "Shelter Alpha — Tacloban", current: 234, max: 250 },
  { name: "Shelter Bravo — Ormoc",   current: 187, max: 300 },
  { name: "Shelter Charlie — Palo",  current: 98,  max: 400 },
  { name: "Shelter Delta — Baybay",  current: 271, max: 280 },
  { name: "Shelter Echo — Maasin",   current: 45,  max: 200 },
];

const ACTIVITY = [
  { msg: "487 evacuees registered at Shelter Alpha — Tacloban", time: "2m",  color: "bg-red-400" },
  { msg: "Shelter Delta capacity warning — 97% full, requesting transfer",  time: "6m",  color: "bg-yellow-400" },
  { msg: "Incident #INC-002 declared in Cagayan Valley — Flash Flood",      time: "15m", color: "bg-[#ff7c3f]" },
  { msg: "Resource convoy dispatched — 500 food packs to Route B2",         time: "28m", color: "bg-blue-400" },
  { msg: "Evacuee Maria Santos reunited with family at Shelter Bravo",      time: "41m", color: "bg-green-400" },
  { msg: "New volunteer team — Red Cross Leyte Chapter registered",          time: "1h",  color: "bg-violet-400" },
  { msg: "Incident #INC-003 upgraded to High severity — Aftershocks",       time: "2h",  color: "bg-red-400" },
];

const EVACUEES = [
  { initials: "MS", name: "Maria Santos",    detail: "Shelter Alpha · Age 34", status: "Sheltered",    statusColor: "green" },
  { initials: "JR", name: "Jose Reyes",      detail: "Shelter Bravo · Age 67", status: "Special Needs", statusColor: "yellow" },
  { initials: "AC", name: "Ana Cruz",        detail: "In Transit · Age 28",    status: "In Transit",   statusColor: "orange" },
  { initials: "PD", name: "Pedro Dela Cruz", detail: "Missing · Age 52",       status: "Missing",      statusColor: "red" },
];

const RESOURCES = [
  { name: "Food Packs",       qty: "1,240 left",  pct: 30, color: "bg-blue-400",   warn: false },
  { name: "Water (liters)",   qty: "8,500 L",     pct: 55, color: "bg-green-400",  warn: false },
  { name: "Medical Kits",     qty: "82 left",     pct: 15, color: "bg-red-400",    warn: true  },
  { name: "Rescue Vehicles",  qty: "14 active",   pct: 70, color: "bg-yellow-400", warn: false },
];

// ── Helpers ────────────────────────────────────────────
const statColors: Record<StatColor, { icon: string; bar: string; border: string }> = {
  orange: { icon: "bg-[#f05a1a]/10 text-[#f05a1a]",  bar: "bg-[#f05a1a]",  border: "border-b-[#f05a1a]/40" },
  red:    { icon: "bg-red-500/10 text-red-400",       bar: "bg-red-400",     border: "border-b-red-500/40"   },
  blue:   { icon: "bg-blue-500/10 text-blue-400",     bar: "bg-blue-400",    border: "border-b-blue-500/40"  },
  green:  { icon: "bg-green-500/10 text-green-400",   bar: "bg-green-400",   border: "border-b-green-500/40" },
};

function severityBadge(sev: string) {
  const map: Record<string, string> = {
    critical: "bg-red-500/15 text-red-400 border border-red-500/20",
    high:     "bg-[#f05a1a]/15 text-[#ff7c3f] border border-[#f05a1a]/20",
    medium:   "bg-yellow-500/12 text-yellow-400 border border-yellow-500/20",
    low:      "bg-green-500/12 text-green-400 border border-green-500/20",
  };
  return map[sev] ?? map.low;
}

function statusColor(st: string) {
  return st === "active" ? "bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.8)] animate-pulse"
       : st === "containing" ? "bg-yellow-400" : "bg-green-400";
}

function shelterColor(pct: number) {
  if (pct >= 90) return { bar: "from-red-700 to-red-400",    label: "text-red-400",    tag: "CRITICAL" };
  if (pct >= 60) return { bar: "from-yellow-700 to-yellow-400", label: "text-yellow-400", tag: "MODERATE" };
  return               { bar: "from-green-700 to-green-400", label: "text-green-400",  tag: "AVAILABLE" };
}

function evacueeStatusColor(c: string) {
  const map: Record<string, string> = {
    green:  "bg-green-500/12 text-green-400 border-green-500/20",
    yellow: "bg-yellow-500/12 text-yellow-400 border-yellow-500/20",
    orange: "bg-[#f05a1a]/12 text-[#ff7c3f] border-[#f05a1a]/20",
    red:    "bg-red-500/12 text-red-400 border-red-500/20",
  };
  return map[c] ?? map.green;
}

// ── Component ──────────────────────────────────────────
export default async function DashboardPage() {
  const session = await auth();
  const firstName = session?.user.name?.split(" ")[0] ?? "Officer";

  return (
    <div className="space-y-4 text-[#e2eaf8]">

      {/* ── Header ── */}
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-[10px] text-[#3d5470] tracking-[0.14em] uppercase mb-1">
            // command overview
          </p>
          <h1 className="font-['Bebas_Neue'] text-[32px] leading-none tracking-[0.03em]">
            WELCOME BACK, {firstName.toUpperCase()}
          </h1>
          <p className="text-[13px] text-[#5a7494] mt-1">
            Here&apos;s the current status across all active operations.
          </p>
        </div>
        <div className="text-right font-mono text-[10px] text-[#3d5470]">
          <p>SAT 28 FEB 2026</p>
          <p>14:32 PHT</p>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-4 gap-3">
        {STATS.map((s) => {
          const c = statColors[s.color];
          return (
            <div key={s.label}
              className={`bg-[#0b1220] border border-[#111d30] rounded-xl p-4 relative
                          overflow-hidden hover:border-[#1a2a42] hover:-translate-y-px transition-all`}>
              {/* bottom accent */}
              <div className={`absolute bottom-0 left-8 right-8 h-px ${c.bar} opacity-60`} />
              <div className="flex items-start justify-between mb-3">
                <p className="font-mono text-[9px] text-[#5a7494] tracking-[0.12em] uppercase">{s.label}</p>
                <div className={`w-[30px] h-[30px] rounded-[8px] flex items-center justify-center ${c.icon}`}>
                  <s.icon className="w-[14px] h-[14px]" />
                </div>
              </div>
              <p className="font-['Bebas_Neue'] text-[38px] leading-none text-[#e2eaf8] mb-1">{s.value}</p>
              <p className={`text-[11px] ${s.subColor}`}>{s.sub}</p>
              <div className="h-[3px] bg-[#111d30] rounded-full mt-3 overflow-hidden">
                <div className={`h-full rounded-full ${c.bar} opacity-70`}
                     style={{ width: s.color === "orange" ? "75%" : s.color === "red" ? "62%" : s.color === "blue" ? "85%" : "45%" }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── INCIDENTS + SHELTERS ── */}
      <div className="grid grid-cols-3 gap-3">

        {/* Incidents Table */}
        <div className="col-span-2 bg-[#0b1220] border border-[#111d30] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#111d30]">
            <span className="font-mono text-[10px] text-[#e2eaf8] tracking-[0.1em] uppercase font-semibold">Active Incidents</span>
            <span className="font-mono text-[9px] text-[#f05a1a] tracking-[0.08em] uppercase cursor-pointer">View All →</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#111d30]">
                  {["ID","Incident","Location","Severity","Status","Evacuees","Updated"].map((h) => (
                    <th key={h} className="px-4 py-2 text-left font-mono text-[9px] text-[#3d5470] tracking-[0.12em] uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INCIDENTS.map((inc) => (
                  <tr key={inc.id} className="border-b border-[#111d30]/60 hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 font-mono text-[10px] text-[#3d5470]">{inc.id}</td>
                    <td className="px-4 py-3 text-[12px] text-[#e2eaf8] font-medium">{inc.name}</td>
                    <td className="px-4 py-3 text-[12px] text-[#5a7494]">{inc.location}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-[2px] rounded-full font-mono text-[9px] uppercase tracking-[0.08em] ${severityBadge(inc.severity)}`}>
                        ● {inc.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-[5px] text-[12px] text-[#5a7494]">
                        <span className={`w-[6px] h-[6px] rounded-full ${statusColor(inc.status)}`} />
                        {inc.status.charAt(0).toUpperCase() + inc.status.slice(1)}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-[12px] text-[#5a7494]">{inc.evacuees.toLocaleString()}</td>
                    <td className="px-4 py-3 font-mono text-[10px] text-[#3d5470]">{inc.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shelter Capacity */}
        <div className="bg-[#0b1220] border border-[#111d30] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#111d30]">
            <span className="font-mono text-[10px] text-[#e2eaf8] tracking-[0.1em] uppercase font-semibold">Shelter Capacity</span>
            <span className="font-mono text-[9px] text-[#f05a1a] uppercase cursor-pointer">Manage</span>
          </div>
          <div className="p-4 space-y-4">
            {SHELTERS.map((s) => {
              const pct = Math.round((s.current / s.max) * 100);
              const c   = shelterColor(pct);
              return (
                <div key={s.name}>
                  <div className="flex items-center justify-between mb-[5px]">
                    <span className="text-[12px] text-[#e2eaf8] font-medium">{s.name}</span>
                    <span className="font-mono text-[10px] text-[#5a7494]">{s.current}/{s.max}</span>
                  </div>
                  <div className="h-[5px] bg-[#111d30] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r ${c.bar}`} style={{ width: `${pct}%` }} />
                  </div>
                  <p className={`font-mono text-[9px] mt-1 ${c.label}`}>{pct}% — {c.tag}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── ACTIVITY + EVACUEES + RESOURCES ── */}
      <div className="grid grid-cols-2 gap-3">

        {/* Activity Feed */}
        <div className="bg-[#0b1220] border border-[#111d30] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#111d30]">
            <span className="font-mono text-[10px] text-[#e2eaf8] tracking-[0.1em] uppercase font-semibold">Live Activity</span>
            <span className="font-mono text-[9px] text-[#f05a1a] uppercase cursor-pointer">View Log</span>
          </div>
          <div className="p-4 space-y-0">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-start gap-[10px] py-[9px] border-b border-[#111d30]/70 last:border-0">
                <span className={`w-[7px] h-[7px] rounded-full flex-shrink-0 mt-1 ${a.color}`} />
                <span className="text-[12px] text-[#5a7494] leading-[1.5] flex-1">{a.msg}</span>
                <span className="font-mono text-[9px] text-[#3d5470] flex-shrink-0 mt-[3px]">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Evacuees + Resources stacked */}
        <div className="flex flex-col gap-3">

          {/* Recent Evacuees */}
          <div className="bg-[#0b1220] border border-[#111d30] rounded-xl overflow-hidden flex-1">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#111d30]">
              <span className="font-mono text-[10px] text-[#e2eaf8] tracking-[0.1em] uppercase font-semibold">Recent Evacuees</span>
              <span className="font-mono text-[9px] text-[#f05a1a] uppercase cursor-pointer">View All →</span>
            </div>
            <div className="p-4 space-y-0">
              {EVACUEES.map((e) => (
                <div key={e.name} className="flex items-center gap-[10px] py-[8px] border-b border-[#111d30]/60 last:border-0">
                  <div className="w-[28px] h-[28px] rounded-full flex-shrink-0 flex items-center justify-center
                                  bg-[#1a2a42] font-mono text-[10px] text-[#5a7494]">
                    {e.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-[#e2eaf8] font-medium">{e.name}</p>
                    <p className="text-[11px] text-[#5a7494]">{e.detail}</p>
                  </div>
                  <span className={`font-mono text-[9px] px-2 py-[2px] rounded-full border uppercase tracking-[0.08em] ${evacueeStatusColor(e.statusColor)}`}>
                    {e.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="bg-[#0b1220] border border-[#111d30] rounded-xl overflow-hidden flex-1">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#111d30]">
              <span className="font-mono text-[10px] text-[#e2eaf8] tracking-[0.1em] uppercase font-semibold">Resource Status</span>
              <span className="font-mono text-[9px] text-[#f05a1a] uppercase cursor-pointer">Deploy →</span>
            </div>
            <div className="p-4 space-y-0">
              {RESOURCES.map((r) => (
                <div key={r.name} className="flex items-center gap-[10px] py-[8px] border-b border-[#111d30]/60 last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-[#e2eaf8] font-medium">{r.name}</p>
                    <div className="h-[3px] bg-[#111d30] rounded-full overflow-hidden mt-[5px]">
                      <div className={`h-full rounded-full ${r.color}`} style={{ width: `${r.pct}%` }} />
                    </div>
                  </div>
                  <span className={`font-mono text-[10px] flex-shrink-0 ${r.warn ? "text-red-400" : "text-[#5a7494]"}`}>
                    {r.warn ? "⚠ " : ""}{r.qty}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}