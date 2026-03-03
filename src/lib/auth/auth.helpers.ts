import { auth } from "@/lib/auth/auth.config";
import { redirect } from "next/navigation";
import type { UserRole } from "@/types/auth.types";

/** Get session or redirect to login (use in Server Components) */
export async function requireAuth() {
  const session = await auth();
  if (!session) redirect("/login");
  return session;
}

/** Get session and enforce a minimum role */
export async function requireRole(allowed: UserRole[]) {
  const session = await requireAuth();
  if (!allowed.includes(session.user.role as UserRole)) {
    redirect("/unauthorized");
  }
  return session;
}

/** Role hierarchy check (higher roles include lower permissions) */
export function hasPermission(userRole: UserRole, required: UserRole): boolean {
  const hierarchy: Record<UserRole, number> = {
    admin: 4,
    responder: 3,
    volunteer: 2,
    viewer: 1,
  };
  return hierarchy[userRole] >= hierarchy[required];
}