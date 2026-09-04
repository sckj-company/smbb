"use client";

import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import useTranslate from "@/hooks/useTranslate";
import LanguageSelect from "./LanguageSelect";
import NavLinks from "./nav/NavLinks";

export default function Navbar() {
  const { t } = useTranslation();
  const { handleLanguageChange, selectedLanguage } = useTranslate();

  return (
    <nav className="fixed top-0  left-1/2 -translate-x-1/2 z-10 w-full max-w-7xl bg-white py-5">
      <div className="flex md:w-5xl 2xl:w-7xl mx-auto items-center justify-between gap-4">
        <div className="flex items-center gap-5.5">
          <Logo />
          <div className="w-px h-6 border-l border-blue-100" />
          <NavLinks />
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelect
            value={selectedLanguage}
            onChange={handleLanguageChange}
            label={t("language.label")}
          />
        </div>
      </div>
    </nav>
  );
}
