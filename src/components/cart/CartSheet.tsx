"use client";

import { Download, ShoppingCart, Trash2 } from "lucide-react";
import useCart from "@/hooks/useCart";
import QuantitySelector from "@/components/products/QuantitySelector";
import { createProductOrderMessage, createWhatsAppLink } from "@/lib/whatsapp";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import useCatalogLanguage from "@/hooks/useCatalogLanguage";
import { formatKz } from "@/utils/formatKz";
import { downloadCartInvoice } from "@/lib/invoice";

type Props = { open: boolean; onClose: () => void };

export default function CartSheet({ open, onClose }: Props) {
  const { t } = useTranslation();
  const { localize } = useCatalogLanguage();
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clear } =
    useCart();
  const [channel, setChannel] = useState<"whatsapp" | "dashboard">("whatsapp");
  const [phone, setPhone] = useState("");

  async function checkout() {
    if (!items.length) return;
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "product",
        channel,
        total: totalPrice,
        phone,
        items: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.price
        }))
      })
    });
    if (channel === "whatsapp") {
      window.open(
        createWhatsAppLink(createProductOrderMessage(items, totalPrice, phone)),
        "_blank",
        "noopener,noreferrer"
      );
    }
    clear();
    onClose();
  }

  function downloadInvoice() {
    downloadCartInvoice(items, totalPrice);
  }

  return (
    <Sheet open={open} onOpenChange={(value) => !value && onClose()}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full max-w-md gap-0 p-0"
      >
        <SheetHeader className="px-5 pb-4">
          <div className="pt-2 flex items-center justify-between gap-3 pr-10">
            <SheetTitle className="flex items-center gap-3 text-sm xl:text-base 2xl:text-xl font-semibold text-slate-900">
              <ShoppingCart className="h-5 w-5 text-blue-500" />
              {t("cart.title")}

              {totalItems > 1 && (
                <span className="hidden sm:block text-xs font-normal text-slate-400">
                  ({totalItems})
                </span>
              )}
            </SheetTitle>

            {items.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="w-fit text-xs text-slate-500 hover:text-red-500"
              >
                {t("cart.moveToTrash")}
              </button>
            )}
          </div>

          <SheetClose
            className="absolute right-4 top-3.5 rounded-full p-2 text-slate-500 hover:bg-slate-100"
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
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {productName}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remover ${productName}`}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="h-3 w-3 2xl:h-4 2xl:w-4" />
                        </button>
                      </div>

                      <p className="mt-1 text-sm font-medium text-green-700">
                        {formatKz(item.price * item.quantity)}
                      </p>

                      <div className="mt-2 sm:mt-5">
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

          <label className="mt-3 grid gap-1 text-xs font-medium text-slate-600">
            {t("cart.phone")}
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder={t("cart.phonePlaceholder")}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-blue-500"
            />
          </label>

          <label className="mt-3 grid gap-1 text-xs font-medium text-slate-600">
            {t("cart.requestChannel")}
            <select
              value={channel}
              onChange={(event) =>
                setChannel(event.target.value as typeof channel)
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-700"
            >
              <option value="whatsapp">{t("cart.channelWhatsApp")}</option>
              <option value="dashboard">{t("cart.channelDashboard")}</option>
            </select>
          </label>

          <button
            type="button"
            onClick={checkout}
            disabled={!items.length}
            className="mt-3 w-full rounded-full bg-blue-500 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {channel === "whatsapp"
              ? t("cart.buyViaWhatsApp")
              : t("cart.submitRequest")}
          </button>

          {items.length > 0 && (
            <button
              type="button"
              onClick={downloadInvoice}
              title="Baixar fatura em PDF"
              aria-label="Baixar fatura em PDF"
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-[0.7rem] font-semibold text-blue-700 hover:bg-blue-100"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{t("cart.downloadPdf")}</span>
            </button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
