import { notFound } from "next/navigation";
import CatalogForm from "@/components/admin/CatalogForm";
import { services } from "@/data/services";

export default async function EditServicePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.id === slug);

  if (!service) notFound();

  return (
    <CatalogForm
      kind="Serviço"
      backHref="/admin/services"
      item={{
        name: service.title,
        description: service.description,
        price: service.price,
        image: service.image
      }}
    />
  );
}
