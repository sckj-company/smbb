import { NextResponse } from "next/server";
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  createAdminSession
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (email !== ADMIN_EMAIL.toLowerCase() || password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Email ou palavra-passe inválidos." },
      { status: 401 }
    );
  }
  await createAdminSession();
  return NextResponse.json({ ok: true });
}
