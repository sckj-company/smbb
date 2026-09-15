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
  const [activeMobileGroup, setActiveMobileGroup] =
    useState<ProductGroup | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
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
      { rootMargin: "-18% 0px -65% 0px", threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [groupedProducts.length]);

  const mobileTitle = activeMobileGroup
    ? t(groupTranslationKeys[activeMobileGroup])
    : t("filters.all");

  return (
    <main className="relative mx-auto min-h-screen w-full px-28 pb-24 pt-20 sm:mt-35 sm:px-8 sm:pt-0 md:w-5xl lg:px-0 xl:mt-40 2xl:w-7xl 2xl:mt-45">
      <aside
        className="fixed left-0 top-16 z-20 flex w-24 flex-col border-r border-slate-100 bg-slate-50 sm:hidden"
        style={{ bottom: "4.5rem" }}
      >
        {[null, ...productGroups].map((groupType) => {
          const isActive =
            activeMobileGroup === groupType ||
            (!activeMobileGroup && groupType === null);
          return (
            <button
              key={groupType ?? "all"}
              type="button"
              onClick={() => {
                setActiveMobileGroup(groupType);
                if (groupType)
                  sectionRefs.current[groupType]?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                  });
              }}
              className={`min-h-20 border-l-2 px-2 text-left text-xs font-medium transition-colors ${isActive ? "border-blue-500 bg-white text-slate-900" : "border-transparent text-slate-500"}`}
            >
              {groupType
                ? t(groupTranslationKeys[groupType])
                : t("filters.all")}
            </button>
          );
        })}
      </aside>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0 max-w-full">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-500">
            {mobileTitle}
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

              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5 md:grid-cols-4">
                {products.map((product) => {
                  const productName = localize(product.name, product.nameZh);
                  const isInCart = items.some((item) => item.id === product.id);

                  return (
                    <article
                      key={product.id}
                      className="group relative flex gap-3 rounded-lg border border-slate-200 bg-white p-2 transition hover:bg-slate-50 sm:block"
                    >
                      <div className="hidden md:block">
                        <ProductQuickView product={product} />
                      </div>
                      <Link href={`/${product.id}`} className="group md:hidden">
                        <div className="shrink-0 rounded-sm border border-slate-200 bg-slate-50 p-2 sm:shrink">
                          <Image
                            src={product.image}
                            alt={productName}
                            width={200}
                            height={200}
                            className="mx-auto h-24 w-24 object-contain sm:h-37.5 sm:w-37.5 xl:my-5 2xl:my-8"
                          />
                        </div>

                        <div className="min-w-0 flex-1 space-y-3 px-1 pt-1 pb-2.5 sm:px-2 sm:pt-4">
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
                          className={`inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${isInCart ? "border-blue-600 bg-blue-500 text-white hover:bg-blue-600" : "border-slate-200 text-blue-500 hover:border-slate-300 hover:bg-slate-200 hover:text-blue-600"}`}
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
