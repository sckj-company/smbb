"use client"

import { products } from "@/data/products"
import { useState } from "react"

export default function useSelectGroup({
  searchQuery,
}: {
  searchQuery: string
}) {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase()

  const visibleProducts = products.filter((product) => {
    const matchesGroup = !selectedGroup || product.groupType === selectedGroup
    const searchableText =
      `${product.name} ${product.brand} ${product.groupType}`.toLocaleLowerCase()
    const matchesSearch = searchableText.includes(normalizedSearchQuery)

    return matchesGroup && matchesSearch
  })

  return { selectedGroup, setSelectedGroup, visibleProducts }
}
