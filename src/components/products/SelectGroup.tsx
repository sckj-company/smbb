"use client"

import { products } from "@/data/products"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const productGroups = Array.from(
  new Set(products.map((product) => product.groupType)),
)

const groupTranslationKeys = {
  Extintor: "filters.extinguishers",
  Suporte: "filters.supports",
  "Placa de Sinalização": "filters.plates",
} as const

interface SelectGroupProps {
  selectedGroup: string | null
  setSelectedGroup: (
    groupType: "Extintor" | "Suporte" | "Placa de Sinalização" | null,
  ) => void
}

export default function SelectGroup({
  selectedGroup,
  setSelectedGroup,
}: SelectGroupProps) {
  const { t } = useTranslation()

  return (
    <ul className="flex gap-2.5">
      {[null, ...productGroups].map((groupType) => {
        const isSelected = selectedGroup === groupType
        const label = groupType
          ? t(
              groupTranslationKeys[
                groupType as keyof typeof groupTranslationKeys
              ],
            )
          : t("filters.all")

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
        )
      })}
    </ul>
  )
}
