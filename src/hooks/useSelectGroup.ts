"use client";

import useSWR from "swr";
import { useMemo, useState } from "react";

import type { Product } from "@/interface/products";
import type { ProductGroup } from "@/data/productGroups";

const fetcher = (url: string) =>
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Não foi possível carregar os produtos");
    }

    return response.json() as Promise<Product[]>;
  });

interface UseSelectGroupProps {
  searchQuery: string;
}

export default function useSelectGroup({ searchQuery }: UseSelectGroupProps) {
  const [selectedGroup, setSelectedGroup] = useState<ProductGroup | null>(null);

  const {
    data: products = [],
    error,
    isLoading,
    mutate
  } = useSWR<Product[]>("/api/products", fetcher);

  const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase();

  const visibleProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesGroup =
          !selectedGroup ||
          product.groupType === selectedGroup ||
          (selectedGroup === "Troca de Extintores" &&
            product.groupType === "Extintor");

        const searchableText =
          `${product.name} ${product.brand} ${product.groupType} ${product.groupType === "Extintor" ? "troca de extintores recarga po carga" : ""}`.toLocaleLowerCase();

        return matchesGroup && searchableText.includes(normalizedSearchQuery);
      }),
    [products, selectedGroup, normalizedSearchQuery]
  );

  return {
    selectedGroup,
    setSelectedGroup,
    visibleProducts,
    isLoading,
    error,
    mutate
  };
}
