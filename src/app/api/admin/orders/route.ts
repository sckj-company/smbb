import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const statusSchema = z.object({
  status: z.enum(["pending", "processing", "completed", "cancelled"])
});

export const revalidate = 30;

export async function GET() {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Não foi possível carregar os pedidos:", error);
    return NextResponse.json(
      { error: "A base de dados não está disponível." },
      { status: 503 }
    );
  }
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

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const id = new URL(request.url).searchParams.get("id");
  if (!id)
    return NextResponse.json({ error: "Pedido inválido" }, { status: 400 });

  await prisma.order.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
