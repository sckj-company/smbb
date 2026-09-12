"use client";
import { useTranslation } from "react-i18next";

import AccordionList from "./FAQ/AccordionList";

export function Faq() {
  const { t } = useTranslation();

  return (
    <section className="border-y border-blue-200 bg-sky-50 py-16 sm:py-24 px-6 sm:px-0">
      <div className="mx-auto grid w-full max-w-7xl gap-8 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:items-start md:gap-10 lg:gap-20 xl:px-0">
        <section className="w-full space-y-3 md:max-w-sm">
          <h1 className="text-3xl font-bold text-sky-900 sm:text-4xl">
            {t("faq.title")}
          </h1>
          <p className="text-base text-gray-500 sm:text-lg">
            {t("faq.description")}
          </p>
        </section>

        <div className="w-full">
          <AccordionList />
        </div>
      </div>
    </section>
  );
}
