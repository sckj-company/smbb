import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactMessageSchema, toFieldErrors } from "@/lib/messageSchema";
import { normalizePhone } from "@/utils/phone";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_MESSAGES = 3;

function isHoneypotFilled(payload: unknown): boolean {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "website" in payload &&
    typeof payload.website === "string" &&
    payload.website.trim() !== ""
  );
}

export async function POST(request: Request) {
  const payload: unknown = await request.json().catch(() => null);
  if (payload === null) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (isHoneypotFilled(payload)) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const parsed = contactMessageSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", fields: toFieldErrors(parsed.error.issues) },
      { status: 400 }
    );
  }

  const { name, subject, message } = parsed.data;
  const phone = normalizePhone(parsed.data.phone);

  const recentMessages = await prisma.message.count({
    where: {
      phone,
      createdAt: { gte: new Date(Date.now() - RATE_LIMIT_WINDOW_MS) }
    }
  });
  if (recentMessages >= RATE_LIMIT_MAX_MESSAGES) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    await prisma.message.create({
      data: { name, phone, subject, body: message }
    });
  } catch (error) {
    console.error("Não foi possível guardar a mensagem de contacto:", error);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
