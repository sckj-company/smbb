import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifyAdminToken } from "@/lib/admin-session";

export async function middleware(request: NextRequest) {
  if (
    !request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname === "/admin/login"
  )
    return NextResponse.next();
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (token && (await verifyAdminToken(token))) return NextResponse.next();
  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = { matcher: ["/admin/:path*"] };
