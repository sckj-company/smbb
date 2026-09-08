"use client";

import Link from "next/link";
import { ArrowUpRight, Search, ShoppingCart } from "lucide-react";
import { useState } from "react";

import SelectGroup from "@/components/products/SelectGroup";
import useSelectGroup from "@/hooks/useSelectGroup";
import Image from "next/image";
import Loader from "@/components/ui/loader";
import useCart from "@/hooks/useCart";
import ProductQuickView from "@/components/products/ProductQuickView";
import useCatalogLanguage from "@/hooks/useCatalogLanguage";
import { useTranslation } from "react-i18next";
import { groupTranslationKeys } from "@/data/productGroups";

function formatKz(value: number) {
  return `${value.toLocaleString("pt-AO")} Kz`;
}

export default function Home() {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const { localize } = useCatalogLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedGroup, setSelectedGroup, visibleProducts, isLoading, error } =
    useSelectGroup({
      searchQuery
    });

  return (
    <main className="min-h-screen mt-25 sm:mt-45 pb-12 px-4 sm:px-0 md:w-5xl 2xl:w-7xl mx-auto">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-500">
            SMBB
          </p>
          <h1 className="mt-2 mb-4 text-xl sm:text-2xl font-semibold text-slate-900">
            {t("pageTitle.products")}
          </h1>

          <SelectGroup
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />
        </div>

        <label className="mt-4 sm:mt-0 flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 ring-1 ring-slate-200">
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

      <section className="space-y-10">
        {isLoading && <Loader />}
        {error && (
          <p className="text-sm text-red-600">
            Não foi possível carregar os produtos.
          </p>
        )}
        {!isLoading && !error && visibleProducts.length === 0 && (
          <p className="text-sm text-slate-500">Nenhum produto encontrado.</p>
        )}

        <div className="mt-10 grid gap-3 sm:gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {visibleProducts.map((product) => {
            const productName = localize(product.name, product.nameZh);

            return (
              <article
                key={product.id}
                className="group relative rounded-lg border border-slate-200 bg-white p-2 transition hover:-translate-y-1 hover:shadow-[0_20px_30px_rgba(15,23,42,0.08)]"
              >
                <div className="hidden md:block">
                  <ProductQuickView product={product} />
                </div>
                <Link href={`/${product.id}`} className="group md:hidden">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                    <Image
                      src={product.image}
                      alt={productName}
                      width={200}
                      height={200}
                      className="mx-auto h-37.5 w-37.5 object-contain xl:my-5 2xl:my-8"
                    />
                  </div>

                  <div className="space-y-3 px-2 pt-4 pb-2.5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                        {product.brand}
                      </span>

                      <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[8px] uppercase text-slate-500">
                        {t(groupTranslationKeys[product.groupType])}
                      </span>
                    </div>

                    <div>
                      <h2 className="2xl:text-lg font-bold text-slate-800 line-clamp-1">
                        {productName}
                      </h2>
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <p className="text-sm text-green-700 font-semibold tracking-tighter">
                            {formatKz(product.price)}
                          </p>

                          {product.oldPrice > 0 && (
                            <p className="text-xs text-slate-400 line-through">
                              {formatKz(product.oldPrice)}
                            </p>
                          )}
                        </div>

                        <div className="hidden sm:block rounded-full p-2 bg-blue-100 text-blue-700 ring-1 ring-blue-200 transition opacity-0 group-hover:opacity-100">
                          <ArrowUpRight className="h-4 w-4 md:h-3 md:w-3 2xl:h-4 2xl:w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => addItem(product)}
                  className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  {t("detail.addToCart")}
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
