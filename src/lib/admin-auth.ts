import { redirect } from "next/navigation";
import { auth } from "./auth";

export function isAdminConfigured() {
  return Boolean(process.env.NEON_AUTH_BASE_URL && process.env.NEON_AUTH_COOKIE_SECRET);
}

export async function hasAdminSession() {
  try {
    const { data: session } = await auth.getSession();
    return Boolean(session);
  } catch {
    return false;
  }
}

export async function requireAdmin() {
  if (!(await hasAdminSession())) {
    redirect("/admin/login");
  }
}

