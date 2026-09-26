"use client";

import { ArrowLeft, Flame } from "lucide-react";
import { useTranslation } from "react-i18next";

import QuantitySelector from "@/components/products/QuantitySelector";
import useCart from "@/hooks/useCart";
import { formatKz } from "@/utils/formatKz";
import type { Product } from "@/interface/products";

const CHARGE_PRICE_PER_KG = 2500;

export function getChargeItemId(productId: string) {
  return `carga-${productId}`;
}

export function isChargeItem(itemId: string) {
  return itemId.startsWith("carga-");
}

type Props = {
  product: Product;
};

export default function ExtinguisherChargeControl({ product }: Props) {
  const { t } = useTranslation();
  const { items, addItem, removeItem, updateQuantity } = useCart();

  const chargeId = getChargeItemId(product.id);
  const chargeItem = items.find((item) => item.id === chargeId);

  if (!chargeItem) {
    return (
      <button
        type="button"
        onClick={() =>
          addItem(
            {
              ...product,
              id: chargeId,
              name: `${t("extinguisher.chargeName", "Carga de pó")} · ${product.name}`,
              price: CHARGE_PRICE_PER_KG,
              oldPrice: 0
            },
            1
          )
        }
        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-blue-200 px-3 py-1.5 text-xs font-semibold text-blue-500 transition-colors hover:border-blue-300 hover:bg-blue-50 sm:py-2"
      >
        <Flame className="h-3.5 w-3.5" />
        {t("extinguisher.charge", "Carregar")}
      </button>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2 lg:-mt-4 lg:h-full lg:justify-between">
      <div className="grid lg:flex items-center justify-between gap-3 lg:gap-2">
        <span className="text-sm font-semibold tracking-tighter text-green-700">
          {formatKz(chargeItem.quantity * CHARGE_PRICE_PER_KG)}
        </span>
        <QuantitySelector
          value={chargeItem.quantity}
          onChange={(kg) => updateQuantity(chargeId, kg)}
          label={t("extinguisher.chargeLabel", "Quilos de carga")}
          variant="card"
          suffix="Kg"
        />
      </div>

      <button
        type="button"
        onClick={() => removeItem(chargeId)}
        className="hidden mt-3 lg:inline-flex items-center justify-center gap-1.5 rounded-full border border-blue-200 text-xs font-semibold text-blue-500 transition-colors hover:border-blue-300 hover:bg-blue-50 sm:py-2"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("detail.back")}
      </button>
    </div>
  );
}
