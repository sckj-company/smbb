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
        brand: "SMBB",
        description: service.description,
        price: service.price,
        oldPrice: "",
        accent: "from-slate-700 via-stone-700 to-neutral-900",
        accentColor: "#facc15",
        image: service.image,
        highlights: [""],
        groupType: "Extintor"
      }}
    />
  );
}
