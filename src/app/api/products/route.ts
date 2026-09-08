import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const sharedSchema = z.object({
  name: z.string().trim().min(1),
  nameZh: z.string().trim().min(1),
  price: z.coerce.number().int().nonnegative(),
  oldPrice: z.coerce.number().int().nonnegative().default(0),
  accent: z.string().default("from-slate-700 via-stone-700 to-neutral-900"),
  accentColor: z.string().default("#facc15"),
  image: z.string().trim().min(1).max(8_000_000),
  description: z.string().trim().min(1),
  descriptionZh: z.string().trim().min(1),
  highlights: z.array(z.string().trim().min(1)).default([])
});

const productSchema = sharedSchema.extend({
  brand: z.string().trim().min(1),
  groupType: z.string().trim().min(1),
  type: z.literal("product")
});

const serviceSchema = sharedSchema.extend({
  brand: z.string().default(""),
  groupType: z.string().default(""),
  type: z.literal("service")
});

const catalogSchema = z.discriminatedUnion("type", [
  productSchema,
  serviceSchema
]);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export async function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type") ?? "product";
  const products = await prisma.product.findMany({
    where: { type },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const parsed = catalogSchema.safeParse(await request.json());
  if (!parsed.success)
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  const data = parsed.data;
  const baseSlug = slugify(data.name);
  const slug = `${baseSlug}-${Date.now().toString(36)}`;
  const product = await prisma.product.create({ data: { ...data, slug } });
  return NextResponse.json(product, { status: 201 });
}
