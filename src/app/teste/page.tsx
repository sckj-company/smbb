"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Menu,
  Plus,
  Search,
  ShoppingCart,
  X
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import useCart from "@/hooks/useCart";
import useCatalogLanguage from "@/hooks/useCatalogLanguage";
import useSelectGroup from "@/hooks/useSelectGroup";
import { groupTranslationKeys, productGroups } from "@/data/productGroups";
import type { ProductGroup } from "@/data/productGroups";
import { formatKz } from "@/utils/formatKz";
import CartSheet from "@/components/cart/CartSheet";
import Loader from "@/components/ui/loader";

const categoryInitials: Record<ProductGroup, string> = {
  Extintor: "E",
  Suporte: "S",
  "Placa de Sinalização": "P"
};

export default function TestStorePage() {
  const { t } = useTranslation();
  const { localize } = useCatalogLanguage();
  const { addItem, items, totalItems, totalPrice } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(true);
  const { selectedGroup, setSelectedGroup, visibleProducts, isLoading, error } =
    useSelectGroup({ searchQuery });

  const selectedLabel = selectedGroup
    ? t(groupTranslationKeys[selectedGroup as ProductGroup])
    : "Todos os produtos";

  return (
    <main className="test-store min-h-screen bg-[#f7f7f4] text-[#172033]">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col px-3 pb-24 pt-4 sm:px-6 sm:pt-7">
        <header className="mb-4 flex items-center gap-3 sm:mb-6">
          <Link
            href="/"
            aria-label="Voltar para o início"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-slate-500 shadow-[0_2px_8px_rgba(24,33,49,0.08)] transition hover:text-blue-500"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <label className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-2xl bg-white px-4 text-slate-400 shadow-[0_2px_8px_rgba(24,33,49,0.08)] ring-1 ring-slate-100">
            <Search className="h-5 w-5 shrink-0" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Pesquisar produto..."
              aria-label="Pesquisar produto"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400 sm:text-base"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Limpar pesquisa"
                className="rounded-full p-1 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
        </header>

        <div className="flex min-h-0 flex-1 items-start gap-3 sm:gap-5">
          <aside
            className={`w-[10.5rem] shrink-0 rounded-[1.6rem] bg-white p-3 shadow-[0_2px_8px_rgba(24,33,49,0.07)] sm:w-[15rem] sm:p-4 ${mobileCategoriesOpen ? "" : "hidden sm:block"}`}
          >
            <div className="mb-3 flex items-center justify-between px-2 sm:mb-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-400">
                Categorias
              </p>
              <button
                type="button"
                onClick={() => setMobileCategoriesOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-xl bg-slate-50 text-slate-500 sm:hidden"
                aria-label="Fechar categorias"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSelectedGroup(null)}
              className={`mb-1 flex w-full items-center gap-3 rounded-2xl p-2 text-left transition sm:p-3 ${!selectedGroup ? "bg-[#006eff] text-white shadow-[0_8px_18px_rgba(0, 119, 255, 0.22)]" : "text-slate-600 hover:bg-blue-50"}`}
            >
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-black ${!selectedGroup ? "bg-white/20" : "bg-blue-50 text-blue-500"}`}
              >
                ∑
              </span>
              <span className="text-xs font-bold leading-tight sm:text-sm">
                Todos os produtos
              </span>
            </button>

            {productGroups.map((groupType) => {
              const active = selectedGroup === groupType;
              return (
                <button
                  type="button"
                  key={groupType}
                  onClick={() => setSelectedGroup(groupType)}
                  className={`mb-1 flex w-full items-center gap-3 rounded-2xl p-2 text-left transition sm:p-3 ${active ? "bg-[#006eff] text-white shadow-[0_8px_18px_rgba(0, 81, 255, 0.22)]" : "text-slate-600 hover:bg-blue-50"}`}
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-black ${active ? "bg-white/20" : "bg-blue-50 text-blue-500"}`}
                  >
                    {categoryInitials[groupType]}
                  </span>
                  <span className="text-xs font-bold leading-tight sm:text-sm">
                    {t(groupTranslationKeys[groupType])}
                  </span>
                </button>
              );
            })}
          </aside>

          <section className="min-w-0 flex-1">
            <div className="mb-4 flex items-center gap-2 sm:mb-5">
              <button
                type="button"
                onClick={() => setMobileCategoriesOpen(true)}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-slate-600 shadow-[0_2px_8px_rgba(24,33,49,0.08)] sm:hidden"
                aria-label="Abrir categorias"
              >
                <Menu className="h-5 w-5" />
              </button>
              <span className="h-9 w-1.5 rounded-full bg-[#006eff]" />
              <h1 className="truncate text-xl font-black tracking-tight sm:text-2xl">
                {selectedLabel}
              </h1>
            </div>

            {isLoading && <Loader />}
            {error && (
              <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-600">
                Não foi possível carregar os produtos.
              </p>
            )}
            {!isLoading && !error && visibleProducts.length === 0 && (
              <p className="rounded-2xl bg-white p-6 text-sm text-slate-500 shadow-sm">
                Nenhum produto encontrado.
              </p>
            )}

            <div className="space-y-3 sm:space-y-4">
              {visibleProducts.map((product) => {
                const productName = localize(product.name, product.nameZh);
                const isInCart = items.some((item) => item.id === product.id);

                return (
                  <article
                    key={product.id}
                    className="flex min-h-[9rem] overflow-hidden rounded-[1.35rem] bg-white shadow-[0_2px_6px_rgba(24,33,49,0.09)] transition hover:shadow-[0_8px_20px_rgba(24,33,49,0.11)] sm:min-h-[10.5rem]"
                  >
                    <Link
                      href={`/${product.id}`}
                      className="relative w-[38%] min-w-[7.5rem] bg-[#fff4da] sm:w-[34%] sm:min-w-[10rem]"
                    >
                      <Image
                        src={product.image}
                        alt={productName}
                        fill
                        sizes="(max-width: 640px) 38vw, 260px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col justify-between p-3 sm:p-5">
                      <div>
                        <h2 className="line-clamp-2 text-sm font-extrabold leading-tight text-slate-800 sm:text-lg">
                          {productName}
                        </h2>
                        <p className="mt-1 line-clamp-1 text-[11px] text-slate-400 sm:text-xs">
                          {product.brand || "SMBB"}
                        </p>
                      </div>
                      <div className="mt-2 flex items-end justify-between gap-2 border-t border-dashed border-slate-200 pt-2 sm:pt-3">
                        <p className="text-base font-black text-[#0b5aed] sm:text-xl">
                          {formatKz(product.price)}
                        </p>
                        <button
                          type="button"
                          onClick={() => addItem(product)}
                          aria-label={`${isInCart ? "Adicionar novamente" : "Adicionar"} ${productName}`}
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-white shadow-[0_5px_10px_rgba(237,77,11,0.22)] transition hover:scale-105 ${isInCart ? "bg-emerald-500" : "bg-[#006eff]"}`}
                        >
                          {isInCart ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <Plus className="h-6 w-6" />
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setCartOpen(true)}
        className="fixed bottom-4 left-1/2 z-20 flex h-14 w-[calc(100%-1.5rem)] max-w-[700px] -translate-x-1/2 items-center justify-center gap-3 rounded-2xl bg-[#0066ff] px-5 text-sm font-black text-white shadow-[0_8px_22px_rgba(0, 110, 255, 0.3)] transition hover:bg-[#0b87ed] sm:bottom-6 sm:text-base"
      >
        <ShoppingCart className="h-5 w-5" />
        <span>
          {totalItems > 0
            ? `${totalItems} ${totalItems === 1 ? "item" : "itens"}`
            : "Carrinho"}
        </span>
        <span className="h-5 w-px bg-white/30" />
        <span>{formatKz(totalPrice)}</span>
      </button>
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
    </main>
  );
}
