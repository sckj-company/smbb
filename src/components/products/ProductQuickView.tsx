"use client";

import Image from "next/image";
import type { Product } from "@/interface/products";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { CatalogDetailContent } from "@/app/[slug]/CatalogDetail";
import useCatalogLanguage from "@/hooks/useCatalogLanguage";
import { useTranslation } from "react-i18next";
import { groupTranslationKeys } from "@/data/productGroups";

export default function ProductQuickView({ product }: { product: Product }) {
  const { t } = useTranslation();
  const { localize } = useCatalogLanguage();
  const productName = localize(product.name, product.nameZh);
  return (
    <Dialog>
      <DialogTrigger className="group block w-full text-left">
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
          <h2 className="line-clamp-1 font-bold text-slate-800 2xl:text-lg">
            {productName}
          </h2>
          <p className="text-sm font-semibold tracking-tighter text-green-700">
            {product.price.toLocaleString("pt-AO")} Kz
          </p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="sr-only">{productName}</DialogTitle>
        <DialogDescription className="sr-only">
          Detalhes do produto {productName}
        </DialogDescription>
        <CatalogDetailContent item={product} />
      </DialogContent>
    </Dialog>
  );
}
