import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import requireAdmin from "@/lib/requireAdmin";

export async function POST() {
  const denied = await requireAdmin();
  if (denied) return denied;

  await prisma.message.updateMany({
    where: { read: false },
    data: { read: true }
  });
  return new NextResponse(null, { status: 204 });
}
