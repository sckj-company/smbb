import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { services } from "@/data/services";
import CatalogDetail from "./CatalogDetail";

const catalogItems = [...products, ...services];

export function generateStaticParams() {
  return catalogItems.map((item) => ({ slug: item.id }));
}

export default async function CatalogDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = catalogItems.find((entry) => entry.id === slug);

  if (!item) {
    notFound();
  }

  return <CatalogDetail slug={slug} />;
}
