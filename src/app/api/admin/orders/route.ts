import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const statusSchema = z.object({
  status: z.enum(["pending", "processing", "completed", "cancelled"])
});

export async function GET() {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(orders);
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  const parsed = statusSchema.safeParse(await request.json());
  if (!id || !parsed.success)
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  const order = await prisma.order.update({ where: { id }, data: parsed.data });
  return NextResponse.json(order);
}
