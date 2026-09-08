"use client";

import { useTranslation } from "react-i18next";
import { groupTranslationKeys, productGroups } from "@/data/productGroups";

interface SelectGroupProps {
  selectedGroup: string | null;
  language?: string;
  setSelectedGroup: (
    groupType: "Extintor" | "Suporte" | "Placa de Sinalização" | null
  ) => void;
}

export default function SelectGroup({
  selectedGroup,
  language,
  setSelectedGroup
}: SelectGroupProps) {
  const { t } = useTranslation();

  return (
    <ul className="flex flex-nowrap gap-1 sm:gap-2.5 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-none [&::-webkit-scrollbar]:hidden">
      {[null, ...productGroups].map((groupType) => {
        const isSelected = selectedGroup === groupType;
        const label = groupType
          ? t(
              groupTranslationKeys[
                groupType as keyof typeof groupTranslationKeys
              ],
              language ? { lng: language } : undefined
            )
          : t("filters.all", language ? { lng: language } : undefined);

        return (
          <button
            key={groupType ?? "all"}
            type="button"
            aria-pressed={isSelected}
            onClick={() => setSelectedGroup(groupType)}
            className={`text-sm py-1 px-3 ${isSelected ? "bg-blue-50 rounded-4xl text-blue-500 font-medium" : "text-gray-500 hover:text-blue-500"}`}
          >
            {label}
          </button>
        );
      })}
    </ul>
  );
}
