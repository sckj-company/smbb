"use client"

import { useTranslation } from "react-i18next"
import Logo from "./Logo"
import useTranslate from "@/hooks/useTranslate"
import LanguageSelect from "./LanguageSelect"
import NavLinks from "./nav/NavLinks"

export default function Navbar() {
  const { t } = useTranslation()
  const { handleLanguageChange, selectedLanguage } = useTranslate()

  return (
    <nav className="border-b border-white/10 px-4 lg:py-2.5 xl:py-4 md:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo />
          <NavLinks />
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelect
            value={selectedLanguage}
            onChange={handleLanguageChange}
            label={t("language.label")}
            placeholder={t("language.select")}
          />
        </div>
      </div>
    </nav>
  )
}
