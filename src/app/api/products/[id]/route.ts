import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const productSchema = z.object({
  name: z.string().trim().min(1),
  nameZh: z.string().trim().min(1),
  brand: z.string().trim().min(1),
  price: z.coerce.number().int().nonnegative(),
  oldPrice: z.coerce.number().int().nonnegative(),
  accent: z.string(),
  accentColor: z.string(),
  image: z.string().trim().min(1),
  description: z.string().trim().min(1),
  descriptionZh: z.string().trim().min(1),
  highlights: z.array(z.string().trim().min(1)),
  groupType: z.enum(["Extintor", "Suporte", "Placa de Sinalização"]),
  type: z.literal("product")
});

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: { OR: [{ id }, { slug: id }] }
  });
  if (!product)
    return NextResponse.json(
      { error: "Produto não encontrado" },
      { status: 404 }
    );
  return NextResponse.json(product);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const { id } = await params;
  const existing = await prisma.product.findFirst({
    where: { OR: [{ id }, { slug: id }] }
  });
  if (!existing)
    return NextResponse.json(
      { error: "Produto não encontrado" },
      { status: 404 }
    );
  const body = await request.json();
  const legacySafeBody = {
    ...body,
    nameZh:
      body.nameZh?.trim() ||
      existing.nameZh?.trim() ||
      body.name ||
      existing.name,
    descriptionZh:
      body.descriptionZh?.trim() ||
      existing.descriptionZh?.trim() ||
      body.description ||
      existing.description
  };
  const parsed = productSchema.partial().safeParse(legacySafeBody);
  if (!parsed.success)
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  const product = await prisma.product.update({
    where: { id: existing.id },
    data: parsed.data
  });
  return NextResponse.json(product);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const { id } = await params;
  const existing = await prisma.product.findFirst({
    where: { OR: [{ id }, { slug: id }] }
  });
  if (!existing)
    return NextResponse.json(
      { error: "Produto não encontrado" },
      { status: 404 }
    );
  await prisma.product.delete({ where: { id: existing.id } });
  return new NextResponse(null, { status: 204 });
}
