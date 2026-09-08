"use client";

import { BanknoteArrowUp, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/interface/products";
import useCart from "@/hooks/useCart";
import QuantitySelector from "@/components/products/QuantitySelector";
import { createProductOrderMessage, createWhatsAppLink } from "@/lib/whatsapp";
import Image from "next/image";
import useCatalogLanguage from "@/hooks/useCatalogLanguage";
import { useTranslation } from "react-i18next";

export function CatalogDetailContent({ item }: { item: Product }) {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { localize } = useCatalogLanguage();
  const productName = localize(item.name, item.nameZh);
  const productDescription = localize(item.description, item.descriptionZh);
  function buyNow() {
    addItem(item, quantity);
    window.open(
      createWhatsAppLink(
        createProductOrderMessage(
          [{ ...item, quantity }],
          item.price * quantity
        )
      ),
      "_blank",
      "noopener,noreferrer"
    );
  }
  return (
    <div className="grid gap-8 p-5 sm:p-8 md:grid-cols-2 md:gap-12">
      <section className="rounded-xl border border-slate-200 bg-slate-50 py-4 xl:p-6">
        <Image
          src={item.image}
          alt={productName}
          width={400}
          height={400}
          className="relative h-50 xl:h-95 w-full  object-contain"
        />
      </section>

      <aside className="py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          {item.brand}
        </p>
        <h1 className="mt-5 text-xl xl:text-2xl 2xl:text-3xl font-semibold text-slate-900">
          {productName}
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          {productDescription}
        </p>

        <div className="flex items-baseline gap-2 mb-5">
          <p className="mt-5 text-xl font-bold text-green-900">
            {(item.price * quantity).toLocaleString("pt-AO")} Kz
          </p>
          {quantity > 1 && (
            <p className="mt-1 text-xs text-slate-500">
              {item.price.toLocaleString("pt-AO")} Kz por unidade
            </p>
          )}
        </div>

        <QuantitySelector value={quantity} onChange={setQuantity} />

        <div className="mt-8 grid grid-cols-2 gap-4">
          <button
            onClick={buyNow}
            className="flex items-center justify-center gap-2 rounded-full transition-colors bg-blue-500 hover:bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
          >
            <BanknoteArrowUp className="h-4 w-4" />
            {t("detail.buyNow")}
          </button>
          <button
            onClick={() => addItem(item, quantity)}
            className="flex items-center justify-center gap-2 rounded-full hover:bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
          >
            <ShoppingCart className="h-4 w-4" />
            {t("detail.addToCart")}
          </button>
        </div>

        <div className="mt-6 flex items-center gap-3 text-sm bg-blue-100 border border-blue-200 py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-4xl sm:rounded-md">
          <div
            className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-blue-300"
          >
            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-blue-800" />
          </div>

          <span className="text-slate-500">{t("detail.suggestion")}</span>
        </div>
      </aside>
    </div>
  );
}

export default function CatalogDetail({ item }: { item: Product }) {
  return (
    <main className="mx-auto max-w-7xl bg-white px-4 pb-12 pt-28 sm:px-6 md:pt-35">
      <CatalogDetailContent item={item} />
    </main>
  );
}
