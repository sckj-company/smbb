import { cookies } from "next/headers";
import { SignJWT } from "jose";
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  COOKIE_NAME,
  SESSION_SECRET,
  verifyAdminToken
} from "./admin-session";

export {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  COOKIE_NAME,
  SESSION_SECRET,
  verifyAdminToken
};

export async function createAdminSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(ADMIN_EMAIL)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SESSION_SECRET);
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: process.env.NODE_ENV === "development" ? "none" : "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function isAdminAuthenticated() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  return token ? verifyAdminToken(token) : false;
}
export async function clearAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}
