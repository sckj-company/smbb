import { notFound } from "next/navigation";
import CatalogForm from "@/components/admin/CatalogForm";
import { prisma } from "@/lib/prisma";

export default async function EditProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: { OR: [{ id: slug }, { slug }] }
  });
  if (!product) notFound();
  return (
    <CatalogForm
      kind="Produto"
      backHref="/admin/products"
      item={{
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        oldPrice: product.oldPrice,
        accent: product.accent,
        accentColor: product.accentColor,
        image: product.image,
        description: product.description,
        highlights: product.highlights,
        groupType: product.groupType as
          | "Extintor"
          | "Suporte"
          | "Placa de Sinalização"
      }}
    />
  );
}
