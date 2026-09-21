import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import requireAdmin from "@/lib/requireAdmin";
import { messagePatchSchema } from "@/lib/messageSchema";

const MESSAGES_LIMIT = 200;

function getId(request: Request): string | null {
  return new URL(request.url).searchParams.get("id");
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
    take: MESSAGES_LIMIT
  });
  return NextResponse.json(messages);
}

export async function PATCH(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = getId(request);
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const parsed = messagePatchSchema.safeParse(
    await request.json().catch(() => null)
  );
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { count } = await prisma.message.updateMany({
    where: { id },
    data: parsed.data
  });
  if (count === 0) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}

export async function DELETE(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = getId(request);
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const { count } = await prisma.message.deleteMany({ where: { id } });
  if (count === 0) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
