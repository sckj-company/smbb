import { notFound } from "next/navigation";
import CatalogForm from "@/components/admin/CatalogForm";
import { prisma } from "@/lib/prisma";

export default async function EditServicePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await prisma.product.findFirst({
    where: { OR: [{ id: slug }, { slug }], type: "service" }
  });

  if (!service) notFound();

  return (
    <CatalogForm
      kind="Serviço"
      backHref="/admin/services"
      item={{
        id: service.id,
        name: service.name,
        nameZh: service.nameZh || service.name,
        brand: service.brand,
        description: service.description,
        descriptionZh: service.descriptionZh || service.description,
        price: service.price,
        oldPrice: service.oldPrice,
        image: service.image,
        highlights: service.highlights,
        groupType: "Extintor"
      }}
    />
  );
}
