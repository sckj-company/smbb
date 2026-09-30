"use client";

import { useMemo, useState } from "react";

import Loader from "@/components/ui/loader";

import MobileCategoryNav from "@/components/products/MobileCategoryNav";
import MobileStoreHeader from "@/components/products/MobileStoreHeader";
import ProductGroupSection from "@/components/products/ProductGroupSection";
import ProductsHeader from "@/components/products/ProductsHeader";

import { productGroups } from "@/data/productGroups";

import useProductSections from "@/hooks/useProductSections";
import useSelectGroup from "@/hooks/useSelectGroup";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const { selectedGroup, setSelectedGroup, visibleProducts, isLoading, error } =
    useSelectGroup({
      searchQuery
    });

  const groupedProducts = useMemo(
    () =>
      productGroups
        .map((groupType) => {
          if (groupType === "Troca de Pó") {
            if (selectedGroup && selectedGroup !== "Troca de Pó") {
              return { groupType, products: [] };
            }
            return {
              groupType,
              products: visibleProducts.filter(
                (product) => product.groupType === "Extintor"
              )
            };
          }

          if (selectedGroup && selectedGroup !== groupType) {
            return { groupType, products: [] };
          }

          return {
            groupType,
            products: visibleProducts.filter(
              (product) => product.groupType === groupType
            )
          };
        })
        .filter(({ products }) => products.length > 0),
    [visibleProducts, selectedGroup]
  );

  const { activeGroup, setActiveGroup, containerRef, registerSection } =
    useProductSections({
      groupTypes: groupedProducts.map(({ groupType }) => groupType),
      selectedGroup
    });

  const handleGroupSelect = (group: typeof selectedGroup) => {
    setActiveGroup(group);
    setSelectedGroup(group);
  };

  return (
    <div className="fixed inset-x-0 bottom-18 top-0 z-10 flex flex-col overflow-y-auto bg-white lg:relative lg:inset-auto lg:mx-auto lg:block lg:min-h-screen lg:w-5xl lg:pb-24 lg:pt-0 lg:mt-35 xl:mt-40 2xl:mt-45 2xl:w-7xl">
      <div className="shrink-0 lg:hidden">
        <MobileStoreHeader />
      </div>

      <main className="sticky top-0 flex h-full min-h-0 shrink-0 bg-white lg:static lg:h-auto lg:block">
        <MobileCategoryNav
          activeGroup={activeGroup}
          onSelect={handleGroupSelect}
        />

        <div className="flex min-w-0 flex-1 flex-col lg:block">
          <ProductsHeader
            searchQuery={searchQuery}
            selectedGroup={selectedGroup}
            onSearchChange={setSearchQuery}
            onGroupChange={setSelectedGroup}
          />

          <section
            ref={containerRef}
            className="min-h-0 flex-1 overflow-y-auto px-4 pb-15 pt-4 lg:block lg:min-h-0 lg:w-full lg:space-y-10 lg:overflow-visible lg:px-0 lg:pb-0 lg:pt-0"
          >
            {isLoading && <Loader className="-mt-10" />}

            {error && (
              <p className="text-sm text-red-600">
                Não foi possível carregar os produtos.
              </p>
            )}

            {!isLoading && !error && visibleProducts.length === 0 && (
              <p className="text-sm text-slate-500">
                Nenhum produto encontrado.
              </p>
            )}

            {!isLoading && !error && groupedProducts.length > 0 && (
              <div className="mt-2 space-y-10 lg:mt-10 lg:space-y-15">
                {groupedProducts.map(({ groupType, products }) => (
                  <ProductGroupSection
                    key={groupType}
                    groupType={groupType}
                    products={products}
                    registerSection={registerSection}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
