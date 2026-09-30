"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

import QuantitySelector from "@/components/products/QuantitySelector";
import useCart, { getChargeItemId } from "@/hooks/useCart";
import useCatalogLanguage from "@/hooks/useCatalogLanguage";
import type { Product } from "@/interface/products";
import { formatKz } from "@/utils/formatKz";

const CHARGE_PRICE_PER_KG = 2500;

interface ExtinguisherRefillCardProps {
  product: Product;
}

export default function ExtinguisherRefillCard({
  product
}: ExtinguisherRefillCardProps) {
  const { t } = useTranslation();
  const { localize } = useCatalogLanguage();
  const { items, addItem, updateQuantity, removeItem } = useCart();

  const productName = localize(product.name, product.nameZh);
  const chargeId = getChargeItemId(product.id);
  const chargeItem = items.find((item) => item.id === chargeId);
  const currentKg = chargeItem?.quantity ?? 0;

  const handleKgChange = (kg: number) => {
    if (kg <= 0) {
      removeItem(chargeId);
      return;
    }

    if (!chargeItem) {
      addItem(
        {
          ...product,
          id: chargeId,
          name: `${t("extinguisher.chargeName", "Troca de pó")} · ${product.name}`,
          price: CHARGE_PRICE_PER_KG,
          oldPrice: 0
        },
        kg
      );
      return;
    }

    updateQuantity(chargeId, kg);
  };

  return (
    <article className="group relative flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-2 transition hover:bg-slate-50 lg:block">
      {/* Desktop view */}
      <div className="hidden lg:block">
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
            <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[8px] uppercase font-semibold text-blue-600">
              {t("filters.refill", "Troca de Pó")}
            </span>
          </div>

          <div className="space-y-1 mb-3">
            <h2
              className="line-clamp-1 font-bold text-slate-800 2xl:text-lg"
              title={productName}
            >
              {productName}
            </h2>
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-semibold tracking-tighter text-green-700">
                {currentKg > 0
                  ? formatKz(currentKg * CHARGE_PRICE_PER_KG)
                  : `${formatKz(CHARGE_PRICE_PER_KG)} / Kg`}
              </p>
              {currentKg > 0 && (
                <span className="text-xs font-medium text-slate-500">
                  ({currentKg} Kg)
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-2 pt-3 pb-1">
          <span className="text-xs font-medium text-slate-600">
            {t("extinguisher.chargeLabel", "Quilos de pó")}
          </span>
          <QuantitySelector
            value={currentKg}
            onChange={handleKgChange}
            label={t("extinguisher.chargeLabel", "Quilos de pó")}
            variant="card"
            suffix="Kg"
          />
        </div>
      </div>

      {/* Mobile view */}
      <div className="flex min-w-0 flex-1 items-center gap-3 lg:hidden">
        <div className="size-20 shrink-0 rounded-sm border border-slate-100 bg-slate-50 p-2">
          <Image
            src={product.image}
            alt={productName}
            width={200}
            height={200}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              {product.brand}
            </span>
            <span className="rounded-full border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-[8px] font-semibold text-blue-600">
              {t("filters.refill", "Troca")}
            </span>
          </div>

          <h3 className="line-clamp-1 text-sm font-bold text-slate-800 sm:text-lg">
            {productName}
          </h3>

          <div className="flex items-baseline gap-2">
            <p className="text-sm font-semibold tracking-tighter text-green-700">
              {currentKg > 0
                ? formatKz(currentKg * CHARGE_PRICE_PER_KG)
                : `${formatKz(CHARGE_PRICE_PER_KG)} / Kg`}
            </p>
            {currentKg > 0 && (
              <span className="text-xs text-slate-400">
                ({currentKg} Kg)
              </span>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium text-slate-500">
              {t("extinguisher.chargeLabel", "Quilos de pó")}
            </span>
            <QuantitySelector
              value={currentKg}
              onChange={handleKgChange}
              variant="card"
              suffix="Kg"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

