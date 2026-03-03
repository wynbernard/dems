"use server";

import { signIn, signOut } from "@/lib/auth/auth.config";
import { AuthError } from "next-auth";
import { z } from "zod";

// ── Types ──────────────────────────────────────────────
export type ActionState = {
  error?:   string;
  success?: string;
  fields?:  Record<string, string>;
} | undefined;

// ── Schemas ────────────────────────────────────────────
const loginSchema = z.object({
  email:    z.string().min(1, "Email is required.").email("Invalid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

// ── Error Map ──────────────────────────────────────────
const AUTH_ERRORS: Record<string, string> = {
  CredentialsSignin: "Invalid email or password.",
  AccessDenied:      "You don't have permission to access this.",
  Configuration:     "Server error. Please contact support.",
};

// ── Helpers ────────────────────────────────────────────
const parseFields = (formData: FormData, keys: string[]) =>
  Object.fromEntries(keys.map((k) => [k, formData.get(k) ?? ""]));

const zodErrors = (err: z.ZodError) =>
  Object.fromEntries(err.issues.map((e) => [e.path[0], e.message]));

// ── Actions ────────────────────────────────────────────
export async function loginAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = loginSchema.safeParse(parseFields(formData, ["email", "password"]));

  if (!parsed.success) return { fields: zodErrors(parsed.error) };

  try {
    await signIn("credentials", { ...parsed.data, redirectTo: "/dashboard" });
  } catch (e) {
    if (e instanceof AuthError)
      return { error: AUTH_ERRORS[e.type] ?? "Something went wrong." };
    throw e; 
  }

  return undefined; // ← add this
}

export async function logoutAction(): Promise<void> {
  await signOut({ redirectTo: "/login" });
}