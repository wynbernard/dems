"use server";

import { db } from "@/server/db/connection";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { z } from "zod";

// ── Types ──────────────────────────────────────────────
export type AdminUser = {
  admin_id:    number;
  f_name:      string;
  l_name:      string;
  username:    string;
  email:       string;
  role:        "superadmin" | "admin" | "staff";
  evac_loc_id: number | null;
  is_active:   number;
  created_at:  string;
};

export type FormState = {
  error?:   string;
  success?: string;
  fields?:  Record<string, string>;
} | undefined;

// ── Schema ─────────────────────────────────────────────
const createUserSchema = z.object({
  f_name:      z.string().min(1, "First name is required."),
  l_name:      z.string().min(1, "Last name is required."),
  username:    z.string().min(3, "Username must be at least 3 characters."),
  email:       z.string().email("Invalid email address."),
  password:    z.string().min(6, "Password must be at least 6 characters."),
  role:        z.enum(["superadmin", "admin", "staff"], { message: "Invalid role." }),
  evac_loc_id: z.string().optional(),
});

const updateUserSchema = createUserSchema
  .omit({ password: true })
  .extend({ password: z.string().optional() });

// ── Get All ────────────────────────────────────────────  ← NEW
export async function getAdminUsers(): Promise<AdminUser[]> {
  return await db("admin_table")
    .select(
      "admin_id",
      "f_name",
      "l_name",
      "username",
      "email",
      "role",
      "evac_loc_id",
      "is_active",
      "created_at"
    )
    .whereNull("deleted_at")
    .orderBy("admin_id", "asc");
}

// ── Get By ID ──────────────────────────────────────────  ← NEW
export async function getAdminUserById(adminId: number): Promise<AdminUser | null> {
  const user = await db("admin_table")
    .where({ admin_id: adminId })
    .whereNull("deleted_at")
    .first();

  return user ?? null;
}

// ── Create ─────────────────────────────────────────────
export async function createAdminAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const raw    = Object.fromEntries(formData.entries());
  const parsed = createUserSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      fields: Object.fromEntries(
        parsed.error.issues.map((e) => [e.path[0], e.message])
      ),
    };
  }

  const { f_name, l_name, username, email, password, role, evac_loc_id } = parsed.data;

  const existing = await db("admin_table")
    .where({ email })
    .orWhere({ username })
    .first();

  if (existing) return { error: "Email or username already exists." };

  const password_hash = await bcrypt.hash(password, 10);

  await db("admin_table").insert({
    f_name,
    l_name,
    username,
    email,
    password:    password_hash,
    role,
    evac_loc_id: evac_loc_id ? Number(evac_loc_id) : null,
    is_active:   1,
    created_at:  db.fn.now(),
    updated_at:  db.fn.now(),
  });

  revalidatePath("/admin/users");
  return { success: "Admin user created successfully." };
}

// ── Update ─────────────────────────────────────────────
export async function updateAdminAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const id     = formData.get("admin_id") as string;
  const raw    = Object.fromEntries(formData.entries());
  const parsed = updateUserSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      fields: Object.fromEntries(
        parsed.error.issues.map((e) => [e.path[0], e.message])
      ),
    };
  }

  const { f_name, l_name, username, email, password, role, evac_loc_id } = parsed.data;

  const updateData: Record<string, unknown> = {
    f_name, l_name, username, email, role,
    evac_loc_id: evac_loc_id ? Number(evac_loc_id) : null,
    updated_at:  db.fn.now(),
  };

  if (password && password.length > 0) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  await db("admin_table").where({ admin_id: id }).update(updateData);

  revalidatePath("/admin/users");
  return { success: "Admin user updated successfully." };
}

// ── Toggle Active ──────────────────────────────────────
export async function toggleActiveAction(adminId: number, currentStatus: number) {
  await db("admin_table")
    .where({ admin_id: adminId })
    .update({ is_active: currentStatus === 1 ? 0 : 1, updated_at: db.fn.now() });

  revalidatePath("/admin/users");
}

// ── Delete ─────────────────────────────────────────────
export async function deleteAdminAction(adminId: number) {
  await db("admin_table")
    .where({ admin_id: adminId })
    .update({ deleted_at: db.fn.now(), is_active: 0 });

  revalidatePath("/admin/users");
}