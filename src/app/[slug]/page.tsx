import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/data/products";
import CatalogDetail from "./CatalogDetail";

export default async function CatalogDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return (
    <CatalogDetail
      item={{
        ...product,
        groupType: product.groupType as
          | "Extintor"
          | "Suporte"
          | "Placa de Sinalização",
        type: "product"
      }}
    />
  );
}
