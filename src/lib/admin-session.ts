import { jwtVerify } from "jose";

export const COOKIE_NAME = "smbb_admin_session";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "sckjAdminSmbb@gmail.com";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "smbb@20191820";
export const SESSION_SECRET = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET ?? "smbb-admin-session-secret-2026"
);

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SESSION_SECRET);
    return payload.role === "admin" && payload.sub === ADMIN_EMAIL;
  } catch {
    return false;
  }
}
