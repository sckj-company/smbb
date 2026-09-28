import { CatalogDetailContent } from "@/app/[slug]/CatalogDetail";
import { Product } from "@/interface/products";

export default function CatalogDetail({ item }: { item: Product }) {
  return (
    <main className="mx-auto max-w-7xl bg-white px-4 pb-12 pt-28 sm:px-6 md:pt-35">
      <CatalogDetailContent item={item} />
    </main>
  );
}
