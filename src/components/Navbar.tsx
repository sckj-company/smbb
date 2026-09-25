"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, Wrench, Package, Store } from "lucide-react";
import { RiWhatsappLine } from "@remixicon/react";

import Logo from "./Logo";
import useTranslate from "@/hooks/useTranslate";
import LanguageSelect from "./LanguageSelect";
import NavLinks from "./nav/NavLinks";
import useCart from "@/hooks/useCart";
import CartSheet from "./cart/CartSheet";
import QrCodeDialog from "./QrCodeDialog";
import { whatsappNumber } from "@/lib/whatsapp";

export default function Navbar() {
  const { t } = useTranslation();
  const { handleLanguageChange, selectedLanguage } = useTranslate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const { totalItems } = useCart();
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav className="fixed left-1/2 top-0 z-30 w-full -translate-x-1/2 border-b border-slate-200/90 bg-white/95 px-4 py-4 backdrop-blur sm:px-8 2xl:px-0">
        <div className="mx-auto flex w-full items-center justify-between gap-4 md:max-w-5xl 2xl:max-w-7xl">
          <div className="flex items-center gap-4 sm:gap-5.5">
            <Logo />
            <div className="hidden h-4 w-px border-l border-blue-100 sm:block" />
            <div className="hidden sm:block">
              <NavLinks />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSelect
              value={selectedLanguage}
              onChange={handleLanguageChange}
              label={t("language.label")}
            />

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Abrir carrinho (${totalItems} itens)`}
              className="hidden lg:block relative rounded-full p-2 text-slate-600 transition hover:bg-blue-50"
            >
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            <div className="hidden h-4 w-px border-l border-blue-100 lg:block" />

            <QrCodeDialog className="hidden lg:inline-flex" />
          </div>
        </div>

        {menuOpen && (
          <div className="pb-3 pt-6 sm:hidden">
            <NavLinks onNavigate={() => setMenuOpen(false)} />
          </div>
        )}
      </nav>

      {!isHomePage && (
        <>
          <div className="fixed inset-x-3 bottom-17 z-40 flex h-8 items-center justify-between overflow-hidden rounded-2xl bg-slate-950 shadow-[0_8px_30px_rgba(15,23,42,0.25)] sm:hidden">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Abrir carrinho (${totalItems} itens)`}
              className="h-10 w-full items-center justify-center border-r border-gray-700 text-white transition hover:bg-white/10 active:scale-95"
            >
              <div className="relative mx-auto flex w-fit justify-center gap-2">
                <ShoppingCart className="h-3.5 w-3.5" />
                <p className="text-xs">{t("cart.label")}</p>

                {totalItems > 0 && (
                  <span className="absolute -right-3 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </div>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar com a empresa pelo WhatsApp"
              className="flex h-10 w-full items-center justify-center gap-2 text-white transition hover:bg-white/10 active:scale-95"
            >
              <RiWhatsappLine className="h-3.5 w-3.5" />
              <p className="text-xs">WhatsApp</p>
            </a>
          </div>

          <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-slate-200 bg-white/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur sm:hidden lg:hidden">
            <Link
              href="/"
              className={`flex flex-col items-center gap-1 text-[0.65rem] ${isActive("/") ? "text-blue-600" : "text-slate-500"}`}
            >
              <Home className="h-5 w-5" />
              {t("nav.home")}
            </Link>

            <Link
              href="/products"
              className={`flex flex-col items-center gap-1 text-[0.65rem] ${isActive("/products") ? "text-blue-600" : "text-slate-500"}`}
            >
              <Store className="h-5 w-5" />
              {t("nav.store")}
            </Link>

            <Link
              href="/services"
              className={`flex flex-col items-center gap-1 text-[0.65rem] ${isActive("/services") ? "text-blue-600" : "text-slate-500"}`}
            >
              <Wrench className="h-5 w-5" />
              {t("nav.services")}
            </Link>

            <Link
              href="/orders"
              className={`flex flex-col items-center gap-1 text-[0.65rem] ${isActive("/orders") ? "text-blue-600" : "text-slate-500"}`}
            >
              <Package className="h-5 w-5" />
              {t("nav.orders")}
            </Link>
          </nav>
        </>
      )}

      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
