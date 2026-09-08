import { notFound } from "next/navigation";
import CatalogForm from "@/components/admin/CatalogForm";
import { services } from "@/interface/services";

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
        nameZh: service.titleZh,
        brand: "SMBB",
        description: service.description,
        descriptionZh: service.descriptionZh,
        price: service.price,
        oldPrice: "",
        image: service.image,
        highlights: [""],
        groupType: "Extintor"
      }}
    />
  );
}
