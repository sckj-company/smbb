import { Cog, FireExtinguisher, Flame, RefreshCw, Signpost, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";

import { groupTranslationKeys, productGroups } from "@/data/productGroups";
import type { ProductGroup } from "@/data/productGroups";

const groupIcons = {
  Extintor: FireExtinguisher,
  "Troca de Pó": RefreshCw,
  Suporte: Wrench,
  Acessório: Cog,
  "Placa de Sinalização": Signpost
} satisfies Record<ProductGroup, typeof Flame>;

interface MobileCategoryNavProps {
  activeGroup: ProductGroup | null;
  onSelect: (group: ProductGroup | null) => void;
}

export default function MobileCategoryNav({
  activeGroup,
  onSelect
}: MobileCategoryNavProps) {
  const { t } = useTranslation();

  const groups: (ProductGroup | null)[] = [null, ...productGroups];

  return (
    <aside className="flex w-30 shrink-0 flex-col border-r border-slate-200/80 bg-white/70 backdrop-blur-xl lg:hidden">
      <div className="flex h-16 shrink-0 items-center border-b border-slate-200/70 bg-white/55 px-3">
        <p className="truncate text-sm font-semibold text-slate-900">
          {t("pageTitle.categories")}
        </p>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto">
        {groups.map((groupType) => {
          const isActive =
            activeGroup === groupType || (!activeGroup && groupType === null);

          const GroupIcon = groupType ? groupIcons[groupType] : Flame;

          return (
            <button
              key={groupType ?? "all"}
              type="button"
              onClick={() => onSelect(groupType)}
              className={`flex min-h-20 w-full items-center gap-2 border-l-2 px-3 text-left text-xs font-medium transition-colors ${
                isActive
                  ? "border-blue-500 bg-white/85 text-slate-900"
                  : "border-transparent text-slate-500 hover:bg-white/45"
              }`}
            >
              <GroupIcon aria-hidden="true" className="h-4 w-4 shrink-0" />

              <span className="whitespace-nowrap">
                {groupType
                  ? t(groupTranslationKeys[groupType])
                  : t("filters.all")}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
