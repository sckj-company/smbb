import { useTranslation } from "react-i18next";

import SelectGroup from "@/components/products/SelectGroup";
import ProductSearch from "@/components/products/ProductSearch";

import type { ProductGroup } from "@/data/productGroups";

interface ProductsHeaderProps {
  searchQuery: string;
  selectedGroup: ProductGroup | null;
  onSearchChange: (value: string) => void;
  onGroupChange: (group: ProductGroup | null) => void;
}

export default function ProductsHeader({
  searchQuery,
  selectedGroup,
  onSearchChange,
  onGroupChange
}: ProductsHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex h-16 flex-none items-center border-y border-slate-200/80 px-4 py-3 backdrop-blur-xl lg:mb-8 lg:h-auto lg:items-end lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none lg:backdrop-blur-none">
      <div className="hidden w-full min-w-0 items-center justify-between gap-4 lg:block">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-500">
            SMBB
          </p>

          <div className="mb-12 mt-2 space-y-2">
            <h1 className="text-2xl font-semibold text-slate-900">
              {t("pageTitle.products")}
            </h1>

            <p className="text-sm text-gray-500">{t("products.description")}</p>
          </div>
        </div>

        <div className="hidden lg:block">
          <SelectGroup
            selectedGroup={selectedGroup}
            setSelectedGroup={onGroupChange}
          />
        </div>
      </div>

      <ProductSearch value={searchQuery} onChange={onSearchChange} />
    </div>
  );
}
