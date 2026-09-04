"use client";

import { useTranslation } from "react-i18next";
import Logo from "./Logo";

export default function CTA() {
  const { t } = useTranslation();

  return (
    <section className="mt-55 md:w-5xl 2xl:w-7xl mx-auto bg-blue-500 rounded-3xl py-12 2xl:py-20 shadow-[0_20px_30px_rgba(15,23,42,0.08)] grid justify-center">
      <Logo className="mx-auto mb-8" variant="light" />
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-white font-semibold xl:text-2xl 2xl:text-[1.8rem] mb-5">
          {t("cta.title")}
        </h1>
        <p className="text-white/80 xl:text-sm">{t("cta.description")}</p>
        <button className="mt-8 bg-white transition-colors hover:shadow-[0_20px_30px_rgba(15,23,42,0.08)] hover:bg-white/90 w-fit mx-auto rounded-4xl text-sm px-4 py-2">
          {t("cta.button")}
        </button>
      </div>
    </section>
  );
}
