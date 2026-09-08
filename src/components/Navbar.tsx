"use client";

import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import useTranslate from "@/hooks/useTranslate";
import LanguageSelect from "./LanguageSelect";
import NavLinks from "./nav/NavLinks";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import useCart from "@/hooks/useCart";
import CartSheet from "./cart/CartSheet";

export default function Navbar() {
  const { t } = useTranslation();
  const { handleLanguageChange, selectedLanguage } = useTranslate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <nav className="fixed left-1/2 px-4 md:px-0 top-0 z-30 w-full max-w-7xl -translate-x-1/2 bg-white/95 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-5.5">
            <Logo />
            <div className="hidden h-6 w-px border-l border-blue-100 sm:block" />
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
              className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menu"
              className="rounded-full p-2 text-slate-600 hover:bg-slate-100 sm:hidden"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-slate-100 px-1 pb-1 pt-3 sm:hidden">
            <NavLinks onNavigate={() => setMenuOpen(false)} />
          </div>
        )}
      </nav>

      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
