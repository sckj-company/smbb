"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  FireExtinguisher,
  Flame,
  Search,
  ShoppingCart,
  Signpost,
  Wrench
} from "lucide-react";
import { useState } from "react";

import SelectGroup from "@/components/products/SelectGroup";
import useSelectGroup from "@/hooks/useSelectGroup";
import Image from "next/image";
import Loader from "@/components/ui/loader";
import useCart from "@/hooks/useCart";
import ProductQuickView from "@/components/products/ProductQuickView";
import QrCodeDialog from "@/components/QrCodeDialog";
import useCatalogLanguage from "@/hooks/useCatalogLanguage";
import { useTranslation } from "react-i18next";
import { groupTranslationKeys, productGroups } from "@/data/productGroups";
import type { ProductGroup } from "@/data/productGroups";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { formatKz } from "@/utils/formatKz";

const groupIcons = {
  Extintor: FireExtinguisher,
  Suporte: Wrench,
  "Placa de Sinalização": Signpost
} satisfies Record<ProductGroup, typeof Flame>;

export default function Home() {
  const { t } = useTranslation();
  const { addItem, items } = useCart();
  const { localize } = useCatalogLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedGroup, setSelectedGroup, visibleProducts, isLoading, error } =
    useSelectGroup({
      searchQuery
    });
  const groupedProducts = productGroups
    .map((groupType) => ({
      groupType,
      products: visibleProducts.filter(
        (product) => product.groupType === groupType
      )
    }))
    .filter(({ products }) => products.length > 0);

  return (
    <main className="min-h-screen mt-30 sm:mt-35 xl:mt-40 2xl:mt-45 w-full pb-12 px-4 sm:px-8 2xl:px-0 md:w-5xl 2xl:w-7xl mx-auto">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0 max-w-full">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-500">
            SMBB
          </p>
          <h1 className="mt-2 mb-4 text-2xl font-semibold text-slate-900">
            {t("pageTitle.products")}
          </h1>

          <div className="hidden sm:block">
            <SelectGroup
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
            />
          </div>

          <div className="mt-4 flex w-full items-center justify-between gap-4 sm:hidden">
            <Select
              value={selectedGroup ?? "all"}
              onValueChange={(value) =>
                setSelectedGroup(
                  value === "all" ? null : (value as typeof selectedGroup)
                )
              }
            >
              <SelectTrigger className="min-w-0 max-w-[52%] flex-1">
                <SelectValue placeholder={t("filters.all")}>
                  {selectedGroup === "Placa de Sinalização"
                    ? t("filters.plates")
                    : selectedGroup
                      ? t(
                          groupTranslationKeys[
                            selectedGroup as keyof typeof groupTranslationKeys
                          ]
                        )
                      : t("filters.all")}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("filters.all")}</SelectItem>
                {productGroups.map((groupType) => (
                  <SelectItem key={groupType} value={groupType}>
                    {t(groupTranslationKeys[groupType])}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <label className="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={t("filters.placeholder")}
                aria-label={t("filters.placeholder")}
                className="min-w-0 w-full bg-transparent text-sm outline-none"
              />
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
            </label>
          </div>
        </div>

        <label className="mt-4 hidden items-center gap-2 rounded-full bg-slate-50 px-4 py-2 ring-1 ring-slate-200 sm:mt-0 sm:flex">
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={t("filters.placeholder")}
            aria-label={t("filters.placeholder")}
            className="w-40 bg-transparent text-sm outline-none"
          />

          <Search className="h-4 w-4 text-slate-400" />
        </label>
      </div>

      <section className="w-full space-y-10">
        {isLoading && <Loader />}
        {error && (
          <p className="text-sm text-red-600">
            Não foi possível carregar os produtos.
          </p>
        )}
        {!isLoading && !error && visibleProducts.length === 0 && (
          <p className="text-sm text-slate-500">Nenhum produto encontrado.</p>
        )}

        <div className="mt-10 space-y-15">
          {groupedProducts.map(({ groupType, products }) => (
            <section key={groupType} className="space-y-6">
              <h2 className="flex items-center gap-2 bg-white text-lg font-semibold text-blue-500">
                {(() => {
                  const GroupIcon = groupIcons[groupType];
                  return <GroupIcon aria-hidden="true" className="h-5 w-5" />;
                })()}
                {t(groupTranslationKeys[groupType as ProductGroup])}
              </h2>

              <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 md:grid-cols-4">
                {products.map((product) => {
                  const productName = localize(product.name, product.nameZh);
                  const isInCart = items.some((item) => item.id === product.id);

                  return (
                    <article
                      key={product.id}
                      className="group relative rounded-lg bg-white hover:bg-slate-50 p-2 transition border border-slate-200"
                    >
                      <div className="hidden md:block">
                        <ProductQuickView product={product} />
                      </div>
                      <Link href={`/${product.id}`} className="group md:hidden">
                        <div className="border border-slate-200 bg-slate-50 p-2">
                          <Image
                            src={product.image}
                            alt={productName}
                            width={200}
                            height={200}
                            className="mx-auto h-37.5 w-37.5 object-contain xl:my-5 2xl:my-8"
                          />
                        </div>

                        <div className="space-y-3 px-2 pt-4 pb-2.5">
                          <div>
                            <h3 className="2xl:text-lg font-bold text-slate-800 line-clamp-1">
                              {productName}
                            </h3>
                            <div className="flex items-end justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold tracking-tighter text-green-700">
                                  {formatKz(product.price)}
                                </p>

                                {product.oldPrice > 0 && (
                                  <p className="text-xs text-slate-400 line-through">
                                    {formatKz(product.oldPrice)}
                                  </p>
                                )}
                              </div>

                              <div className="hidden rounded-full bg-blue-100 p-2 text-blue-700 ring-1 ring-blue-200 transition group-hover:opacity-100 sm:block sm:opacity-0">
                                <ArrowUpRight className="h-4 w-4 md:h-3 md:w-3 2xl:h-4 2xl:w-4" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div className="mt-1 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => addItem(product)}
                          className={`inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${isInCart ? "border-slate-300 bg-slate-200 text-slate-700 hover:bg-slate-300" : "border-blue-200 text-blue-500 hover:bg-blue-500 hover:text-white"}`}
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          {t("detail.addToCart")}
                        </button>

                        <QrCodeDialog
                          href={`/${product.id}`}
                          label={`Mostrar QR Code de ${productName}`}
                          className="shrink-0 border border-slate-200"
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
