import { auth } from "@/lib/auth/auth.config";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/loginForm";
import { ShieldAlert, Radio } from "lucide-react";

export const metadata = {
  title: "Sign In | DEMS",
};

export default async function LoginPage() {
  const session = await auth();

  // ✅ already logged in → go to dashboard
  if (session) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px]
                        bg-orange-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px]
                        bg-red-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Status bar */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <Radio className="h-3 w-3 text-green-500 animate-pulse" />
            SYSTEM ONLINE
          </div>
          <span className="text-xs text-slate-600 font-mono">DEMS v1.0</span>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-orange-600 via-red-600 to-orange-600" />

          <div className="p-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl
                              bg-orange-600/15 border border-orange-600/30">
                <ShieldAlert className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white leading-tight tracking-tight">
                  Evacuation Management
                </h1>
                <p className="text-xs text-slate-500 mt-0.5 font-mono uppercase tracking-wider">
                  Authorized Personnel Only
                </p>
              </div>
            </div>

            {/* Form */}
            <LoginForm />

            {/* Footer note */}
            <p className="mt-6 text-center text-xs text-slate-600">
              Access is monitored and logged. Unauthorized use is prohibited.
            </p>
          </div>
        </div>

        {/* Bottom badge */}
        <div className="mt-4 text-center">
          <span className="text-xs text-slate-700 font-mono">
            NATIONAL DISASTER RESPONSE AUTHORITY
          </span>
        </div>
      </div>
    </main>
  );
}