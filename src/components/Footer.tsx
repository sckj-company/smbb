"use client";

import Logo from "./Logo";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const now = new Date();
  const currentYear = now.getFullYear();

  return (
    <footer className="md:w-5xl 2xl:w-7xl mx-auto mt-30 sm:mt-50 grid xl:flex xl:justify-between gap-15 pb-4 xl:pb-8 px-4 sm:px-0">
      <div className="grid gap-5 xl:w-120">
        <Logo />
        <p className="text-sm 2xl:text-base text-gray-600">
          {t("footer.description")}
        </p>
      </div>

      <p className="text-sm 2xl:text-base self-end">
        © {currentYear} {t("footer.copyright")}
      </p>
    </footer>
  );
}
