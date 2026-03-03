"use client";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export function Topbar({ initials }: { initials: string }) {
  return (
    <header className="h-[56px] flex-shrink-0 flex items-center px-6 gap-4 bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <span className="font-['Bebas_Neue'] text-[22px] text-gray-900 tracking-[0.04em]">
        DASHBOARD
      </span>
      <div className="w-px h-5 bg-gray-200" />
      <span className="font-mono text-[10px] text-gray-400 tracking-[0.08em]">
        COMMAND OVERVIEW
      </span>

      <div className="flex items-center gap-[6px] px-3 py-[5px] rounded-full ml-4 bg-red-50 border border-red-200 font-mono text-[10px] text-red-500 tracking-[0.08em] animate-pulse">
        <span className="w-[6px] h-[6px] rounded-full bg-red-400 inline-block" />
        2 CRITICAL INCIDENTS ACTIVE
      </div>

      <div className="ml-auto flex items-center gap-[10px]">
        <Button
          variant="outline"
          size="icon"
          className="w-[34px] h-[34px] rounded-[8px] border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all relative"
        >
          <Bell className="w-[15px] h-[15px]" />
          <span className="absolute top-[6px] right-[6px] w-[6px] h-[6px] rounded-full bg-[#f05a1a] border border-white" />
        </Button>
        <div className="w-[34px] h-[34px] rounded-[8px] bg-gradient-to-br from-[#f05a1a] to-[#c0392b] flex items-center justify-center font-mono text-[11px] font-semibold text-white cursor-pointer">
          {initials}
        </div>
      </div>
    </header>
  );
}
