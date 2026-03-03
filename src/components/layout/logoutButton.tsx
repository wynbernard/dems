"use client";

import { useTransition } from "react";
import { logoutAction } from "@/lib/auth/auth.actions";
import { LogOut, Loader2 } from "lucide-react";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <div
      onClick={handleLogout}
      className={`w-full flex items-center gap-[8px] px-3 py-[8px] rounded-[8px]
               text-[12px] cursor-pointer transition-all select-none
               ${
                 isPending
                   ? "text-[#3d5470] pointer-events-none"
                   : "text-[#5a7494] hover:text-red-400 hover:bg-red-500/10"
               }`}
    >
      {isPending ? (
        <Loader2 className="w-[13px] h-[13px] animate-spin" />
      ) : (
        <LogOut className="w-[13px] h-[13px]" />
      )}
      {isPending ? "Signing out..." : "Sign Out"}
    </div>
  );
}
