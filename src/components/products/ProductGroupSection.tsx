import { Cog, FireExtinguisher, Flame, RefreshCw, Signpost, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";

import ProductCard from "@/components/products/ProductCard";
import ExtinguisherRefillCard from "@/components/products/ExtinguisherRefillCard";

import { groupTranslationKeys } from "@/data/productGroups";
import type { ProductGroup } from "@/data/productGroups";

import type { Product } from "@/interface/products";

const groupIcons = {
  Extintor: FireExtinguisher,
  Manutenção: RefreshCw,
  Suporte: Wrench,
  Acessório: Cog,
  "Placa de Sinalização": Signpost
} satisfies Record<ProductGroup, typeof Flame>;

interface ProductGroupSectionProps {
  groupType: ProductGroup;
  products: Product[];
  registerSection: (
    groupType: ProductGroup,
    element: HTMLElement | null
  ) => void;
}

export default function ProductGroupSection({
  groupType,
  products,
  registerSection
}: ProductGroupSectionProps) {
  const { t } = useTranslation();

  const GroupIcon = groupIcons[groupType];

  return (
    <section
      id={groupType}
      ref={(element) => registerSection(groupType, element)}
      className="scroll-mt-4 space-y-6"
    >
      <h2 className="flex items-center gap-2 bg-white font-semibold">
        <GroupIcon aria-hidden="true" className="h-5 w-5" />

        {t(groupTranslationKeys[groupType])}
      </h2>

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 2xl:grid-cols-4">
        {products.map((product) =>
          groupType === "Manutenção" ? (
            <ExtinguisherRefillCard key={product.id} product={product} />
          ) : (
            <ProductCard key={product.id} product={product} />
          )
        )}
      </div>
    </section>
  );
}
