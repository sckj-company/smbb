import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";

import ProductQuickView from "@/components/products/ProductQuickView";
import QuantitySelector from "@/components/products/QuantitySelector";

import type { Product } from "@/interface/products";

import useCart from "@/hooks/useCart";
import useCatalogLanguage from "@/hooks/useCatalogLanguage";

import { formatKz } from "@/utils/formatKz";

interface ProductCardProps {
  product: Product;
  isExtinguisher?: boolean;
}

export default function ProductCard({
  product
}: ProductCardProps) {
  const { t } = useTranslation();
  const { localize } = useCatalogLanguage();

  const { addItem, items, updateQuantity } = useCart();

  const productName = localize(product.name, product.nameZh);

  const cartItem = items.find((item) => item.id === product.id);

  const isInCart = Boolean(cartItem);

  const handleQuantityChange = (quantity: number) => {
    if (quantity === 0) {
      updateQuantity(product.id, 0);
      return;
    }

    if (!cartItem) {
      addItem(product);
      return;
    }

    updateQuantity(product.id, quantity);
  };

  return (
    <article className="group relative flex gap-3 rounded-lg border border-slate-200 bg-white p-2 transition hover:bg-slate-50 lg:block">
      <div className="hidden lg:block">
        <ProductQuickView product={product} />
      </div>

      <div className="hidden gap-2 px-2 pb-2 lg:flex">
        <button
          type="button"
          onClick={() => addItem(product)}
          className={`inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors sm:py-2 ${
            isInCart
              ? "border-blue-600 bg-blue-500 text-white hover:bg-blue-600"
              : "border-slate-200 text-blue-500 hover:border-slate-300 hover:bg-slate-200 hover:text-blue-600"
          }`}
        >
          <ShoppingCart className="h-3.5 w-3.5" />

          {isInCart ? t("detail.addedToCart") : t("detail.addToCart")}
        </button>
      </div>

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
          <Link href={`/${product.id}`} className="block">
            <h3 className="line-clamp-1 text-sm font-bold text-slate-800 sm:text-lg">
              {productName}
            </h3>

            <div className="flex items-baseline gap-2">
              <p className="text-sm font-semibold tracking-tighter text-green-700">
                {formatKz(product.price)}
              </p>

              {product.oldPrice > 0 && (
                <p className="text-xs text-slate-400 line-through">
                  {formatKz(product.oldPrice)}
                </p>
              )}
            </div>
          </Link>

          <div className="mt-3 flex items-center justify-between gap-2">
            <QuantitySelector
              value={cartItem?.quantity ?? 0}
              onChange={handleQuantityChange}
              variant="card"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
