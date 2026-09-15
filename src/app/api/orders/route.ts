import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const orderSchema = z.object({
  type: z.enum(["product", "service"]).default("product"),
  channel: z.enum(["whatsapp", "dashboard"]).default("whatsapp"),
  total: z.number().int().nonnegative().default(0),
  customer: z.string().trim().max(160).default(""),
  phone: z.string().trim().max(40).default(""),
  metadata: z.record(z.string(), z.unknown()).default({}),
  items: z
    .array(
      z.object({
        name: z.string().trim().min(1),
        category: z.string().trim().default(""),
        quantity: z.number().int().positive(),
        unitPrice: z.number().int().nonnegative()
      })
    )
    .min(1)
});

export async function POST(request: Request) {
  const parsed = orderSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const { items, metadata, ...order } = parsed.data;
  const created = await prisma.order.create({
    data: {
      ...order,
      metadata: JSON.stringify(metadata),
      items: { create: items }
    },
    select: { id: true }
  });

  return NextResponse.json(created, { status: 201 });
}
