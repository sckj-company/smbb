import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function requireAdmin(): Promise<NextResponse | null> {
  if (await isAdminAuthenticated()) return null;
  return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
}
