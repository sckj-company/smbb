import { notFound } from "next/navigation";
import CatalogForm from "@/components/admin/CatalogForm";
import { products } from "@/data/products";

export default async function EditProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((item) => item.id === slug);

  if (!product) notFound();

  return (
    <CatalogForm
      kind="Produto"
      backHref="/admin/products"
      item={{
        name: product.name,
        description: product.description,
        price: String(product.price),
        image: product.image
      }}
    />
  );
}
