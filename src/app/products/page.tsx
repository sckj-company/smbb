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
import { useEffect, useRef, useState } from "react";

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
import { formatKz } from "@/utils/formatKz";
import QuantitySelector from "@/components/products/QuantitySelector";

const groupIcons = {
  Extintor: FireExtinguisher,
  Suporte: Wrench,
  "Placa de Sinalização": Signpost
} satisfies Record<ProductGroup, typeof Flame>;

export default function Home() {
  const { t } = useTranslation();
  const { addItem, items, updateQuantity } = useCart();
  const { localize } = useCatalogLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMobileGroup, setActiveMobileGroup] =
    useState<ProductGroup | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const productsScrollRef = useRef<HTMLElement | null>(null);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];
        if (visible) setActiveMobileGroup(visible.target.id as ProductGroup);
      },
      {
        root: productsScrollRef.current,
        rootMargin: "-18% 0px -65% 0px",
        threshold: 0
      }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [groupedProducts.length, selectedGroup]);

  return (
    <main className="fixed inset-x-0 top-0 bottom-18 z-10 flex flex-col overflow-hidden bg-white pl-28 lg:relative lg:inset-auto lg:z-auto lg:mx-auto lg:block lg:min-h-screen lg:w-full lg:overflow-visible lg:px-0 lg:pb-24 lg:pt-0 lg:mt-35 xl:mt-40 2xl:w-7xl 2xl:mt-45">
      <aside className="fixed left-0 top-0 bottom-18 z-30 flex h-auto w-30 flex-col border-r border-white/70 bg-white/70 backdrop-blur-xl lg:hidden">
        <div className="flex h-16 shrink-0 items-center border-b border-r border-slate-200/70 bg-white/55 px-3">
          <p className="truncate text-sm font-semibold text-slate-900">
            Categorias
          </p>
        </div>

        <div className="border-r">
          {[null, ...productGroups].map((groupType) => {
            const isActive =
              activeMobileGroup === groupType ||
              (!activeMobileGroup && groupType === null);
            const GroupIcon = groupType ? groupIcons[groupType] : Flame;
            return (
              <button
                key={groupType ?? "all"}
                type="button"
                onClick={() => {
                  setActiveMobileGroup(groupType);
                  setSelectedGroup(groupType);
                }}
                className={`flex min-h-20 items-center gap-2 border-l-2 px-3 text-left text-xs font-medium transition-colors ${isActive ? "border-blue-500 bg-white/85 text-slate-900" : "border-transparent text-slate-500 hover:bg-white/45"}`}
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
        </div>
      </aside>

      <div className="flex h-16 flex-none items-center border-b border-slate-200/80 px-4 py-3 backdrop-blur-xl lg:mb-8 lg:h-auto lg:items-end lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none lg:backdrop-blur-none">
        <div className="hidden w-full min-w-0 items-center justify-between gap-4 lg:block">
          <h1 className="mt-2 mb-4 hidden text-2xl font-semibold text-slate-900 lg:block">
            {t("pageTitle.products")}
          </h1>

          <div className="hidden lg:block">
            <SelectGroup
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
            />
          </div>
        </div>

        <label className="flex w-full items-center gap-3 rounded-full border-b border-slate-200/80 bg-white/75 px-3 py-2 shadow-sm backdrop-blur-md lg:mt-4 lg:w-auto lg:bg-slate-50 lg:px-4 lg:shadow-none lg:backdrop-blur-none">
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={t("filters.placeholder")}
            aria-label={t("filters.placeholder")}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none lg:w-40 lg:flex-none"
          />
          <Search className="h-4 w-4 text-slate-400" />
        </label>
      </div>

      <section
        ref={productsScrollRef}
        className="min-h-0 flex-1 overflow-y-auto px-4 pb-6 pt-4 lg:block lg:min-h-0 lg:w-full lg:space-y-10 lg:overflow-visible lg:px-0 lg:pb-0 lg:pt-0"
      >
        {isLoading && <Loader />}
        {error && (
          <p className="text-sm text-red-600">
            Não foi possível carregar os produtos.
          </p>
        )}
        {!isLoading && !error && visibleProducts.length === 0 && (
          <p className="text-sm text-slate-500">Nenhum produto encontrado.</p>
        )}

        <div className="mt-2 lg:mt-10 space-y-10 lg:space-y-15">
          {groupedProducts.map(({ groupType, products }) => (
            <section
              key={groupType}
              id={groupType}
              ref={(section) => {
                sectionRefs.current[groupType] = section;
              }}
              className="scroll-mt-4 space-y-6"
            >
              <h2 className="flex items-center gap-2 bg-white font-semibold">
                {(() => {
                  const GroupIcon = groupIcons[groupType];
                  return <GroupIcon aria-hidden="true" className="h-5 w-5" />;
                })()}
                {t(groupTranslationKeys[groupType as ProductGroup])}
              </h2>

              <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-4 lg:gap-5">
                {products.map((product) => {
                  const productName = localize(product.name, product.nameZh);
                  const isInCart = items.some((item) => item.id === product.id);

                  return (
                    <article
                      key={product.id}
                      className="group relative flex gap-3 rounded-lg border border-slate-200 bg-white p-2 transition hover:bg-slate-50 lg:block"
                    >
                      <div className="hidden lg:block">
                        <ProductQuickView product={product} />
                      </div>

                      <div className="group flex min-w-0 flex-1 items-start gap-3 lg:hidden">
                        <div className="h-[90%] sm:h-20 w-20 shrink-0 rounded-sm border border-slate-100 bg-slate-50 p-2 lg:h-auto lg:w-auto lg:border-slate-200">
                          <Image
                            src={product.image}
                            alt={productName}
                            width={200}
                            height={200}
                            className="mx-auto h-full w-full object-contain lg:h-37.5 lg:w-37.5 xl:my-5 2xl:my-8"
                          />
                        </div>

                        <div className="min-w-0 flex-1 flex flex-col justify-between space-y-3 pr-2 pb-1 sm:px-1 pt-1 sm:pb-2.5 lg:px-2 lg:pt-4">
                          <Link href={`/${product.id}`}>
                            <h3 className="text-sm sm:text-lg font-bold text-slate-800 line-clamp-1">
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

                              <div className="hidden rounded-full bg-blue-100 p-2 text-blue-700 ring-1 ring-blue-200 transition group-hover:opacity-100 lg:block lg:opacity-0">
                                <ArrowUpRight className="h-4 w-4 md:h-3 md:w-3 2xl:h-4 2xl:w-4" />
                              </div>
                            </div>
                          </Link>

                          <div className="flex  items-end justify-between gap-2 lg:mt-1 lg:w-auto lg:flex-row lg:items-center">
                            {isInCart && (
                              <div className="lg:hidden">
                                <QuantitySelector
                                  value={
                                    items.find((item) => item.id === product.id)
                                      ?.quantity ?? 1
                                  }
                                  onChange={(quantity) =>
                                    updateQuantity(product.id, quantity)
                                  }
                                  variant="card"
                                />
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => addItem(product)}
                              className={`${isInCart ? "hidden lg:inline-flex" : "inline-flex"} min-w-0 flex-1 items-center justify-center gap-2 rounded-full border px-3 py-1.5 sm:py-2 text-xs font-semibold transition-colors ${isInCart ? "border-blue-600 bg-blue-500 text-white hover:bg-blue-600" : "border-slate-200 text-blue-500 hover:border-slate-300 hover:bg-slate-200 hover:text-blue-600"}`}
                            >
                              <ShoppingCart className="h-3.5 w-3.5" />
                              {isInCart
                                ? t("detail.addedToCart")
                                : t("detail.addToCart")}
                            </button>

                            <QrCodeDialog
                              href={`/${product.id}`}
                              label={`Mostrar QR Code de ${productName}`}
                              className="shrink-0 border border-slate-200"
                            />
                          </div>
                        </div>
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
