"use client";

import Logo from "./Logo";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const now = new Date();
  const currentYear = now.getFullYear();

  return (
    <footer className="lg:w-5xl 2xl:w-7xl mx-auto mt-30 sm:mt-50 grid lg:flex lg:justify-between gap-15 pb-35 sm:pb-8 xl:pb-8 px-4 sm:px-8 lg:px-0">
      <div className="grid gap-5 lg:w-120">
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
