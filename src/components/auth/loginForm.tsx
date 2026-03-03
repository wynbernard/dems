"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/auth/auth.actions";
import { Button }          from "@/components/ui/button";
import { Input }           from "@/components/ui/input";
import { Label }           from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, TriangleAlert }  from "lucide-react";

const initialState = undefined;

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">

      {/* Global error */}
      {state?.error && (
        <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
          <TriangleAlert className="h-4 w-4" />
          <AlertDescription className="text-red-400">
            {state.error}
          </AlertDescription>
        </Alert>
      )}

      {/* Email field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-300 text-sm font-medium">
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="responder@agency.gov"
          required
          disabled={isPending}
          autoComplete="email"
          className={`bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 
                      focus:border-orange-500 focus:ring-orange-500/20 h-11
                      ${state?.fields?.email ? "border-red-500" : ""}`}
        />
        {/* Field-level error */}
        {state?.fields?.email && (
          <p className="text-xs text-red-400">{state.fields.email}</p>
        )}
      </div>

      {/* Password field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-slate-300 text-sm font-medium">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          disabled={isPending}
          autoComplete="current-password"
          className={`bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 
                      focus:border-orange-500 focus:ring-orange-500/20 h-11
                      ${state?.fields?.password ? "border-red-500" : ""}`}
        />
        {/* Field-level error */}
        {state?.fields?.password && (
          <p className="text-xs text-red-400">{state.fields.password}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-11 bg-orange-600 hover:bg-orange-500 text-white font-semibold 
                   transition-all duration-200 shadow-lg shadow-orange-900/30"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign In to System"
        )}
      </Button>
    </form>
  );
}