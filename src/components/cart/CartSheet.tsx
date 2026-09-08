"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import useCart from "@/hooks/useCart";
import QuantitySelector from "@/components/products/QuantitySelector";
import {
  createProductOrderMessage,
  createWhatsAppLink,
  formatKz
} from "@/lib/whatsapp";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import useCatalogLanguage from "@/hooks/useCatalogLanguage";

type Props = { open: boolean; onClose: () => void };

export default function CartSheet({ open, onClose }: Props) {
  const { t } = useTranslation();
  const { localize } = useCatalogLanguage();
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clear } =
    useCart();

  function checkout() {
    if (!items.length) return;
    window.open(
      createWhatsAppLink(createProductOrderMessage(items, totalPrice)),
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <Sheet open={open} onOpenChange={(value) => !value && onClose()}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full max-w-md gap-0 p-0"
      >
        <SheetHeader className="px-5 pb-4">
          <SheetTitle className="pt-2 flex items-center gap-2 text-sm xl:text-lg 2xl:text-2xl font-semibold text-slate-900">
            <ShoppingCart className="h-5 w-5 text-blue-500" />
            {t("cart.title")}

            {totalItems > 1 && (
              <span className="text-sm font-normal text-slate-400">
                ({totalItems})
              </span>
            )}
          </SheetTitle>

          <SheetClose
            className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Fechar carrinho"
          >
            <span className="text-xl leading-none">&times;</span>
          </SheetClose>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          {!items.length ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-slate-500">
              <ShoppingCart className="h-6 w-6 sm:w-10 sm:h-10 text-slate-300" />
              <p>{t("cart.emptyTrash")}</p>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item, index) => {
                const productName = localize(item.name, item.nameZh);

                return (
                  <div
                    key={item.id}
                    className={`flex gap-5 pb-8 ${
                      index < items.length - 1
                        ? "border-b border-slate-100"
                        : ""
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={productName}
                      width={50}
                      height={50}
                      className="h-16 w-16 rounded-lg bg-slate-50 object-contain"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {productName}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remover ${productName}`}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-sm font-medium text-green-700">
                        {formatKz(item.price * item.quantity)}
                      </p>
                      <div className="mt-2">
                        <QuantitySelector
                          value={item.quantity}
                          onChange={(quantity) =>
                            updateQuantity(item.id, quantity)
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <SheetFooter className="border-t border-slate-200 p-5">
          <div className="flex items-center justify-between text-base font-semibold text-slate-900">
            <span>{t("cart.totalText")}</span>
            <span>{formatKz(totalPrice)}</span>
          </div>

          <button
            type="button"
            onClick={checkout}
            disabled={!items.length}
            className="mt-3 w-full rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t("cart.buyViaWhatsApp")}
          </button>

          {items.length > 0 && (
            <button
              type="button"
              onClick={clear}
              className="w-full text-sm text-slate-500 hover:text-red-500"
            >
              {t("cart.moveToTrash")}
            </button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
