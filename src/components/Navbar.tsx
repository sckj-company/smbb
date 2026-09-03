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
    <nav className="px-4 lg:py-2.5 xl:py-4 md:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
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
