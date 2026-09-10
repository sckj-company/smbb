"use client";
import { useTranslation } from "react-i18next";

import AccordionList from "./FAQ/AccordionList";

export function Faq() {
  const { t } = useTranslation();

  return (
    <section className="border-y border-slate-200 bg-sky-50 py-20">
      <div className="md:w-5xl 2xl:w-7xl mx-auto flex justify-between">
        <section className="w-xl space-y-3">
          <h1 className="font-bold text-4xl text-blue-950">{t("faq.title")}</h1>
          <p className="text-gray-500 text-lg">{t("faq.description")}</p>
        </section>

        <AccordionList />
      </div>
    </section>
  );
}
