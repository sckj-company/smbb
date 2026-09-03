"use client";

import Link from "next/link";
import Image from "next/image";
import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ServicesPage() {
  const { t } = useTranslation();

  return (
    <main className="mx-auto mt-12 px-6 2xl:px-0 max-w-7xl bg-white">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-700">
            {t("servicesPage.eyebrow")}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tighter text-slate-900">
            {t("servicesPage.title")}
          </h2>
        </div>
        <button className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium transition-all text-blue-700 hover:bg-blue-100">
          {t("servicesPage.quote")}
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {services.map((service) => {
          const translationKey = `servicesPage.items.${service.id}`;
          const title = t(`${translationKey}.title`);
          return (
            <Link
              href={`/${service.id}`}
              key={service.id}
              className="overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50 transition hover:bg-slate-100 shadow-[0_12px_30px_rgba(15,23,42,0.04)] hover:shadow-none"
            >
              <div className="w-full aspect-3/2">
                <Image
                  src={service.image}
                  alt="Service Cover"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover object-bottom"
                />
              </div>

              <div className="p-5">
                <h3 className="mb-2 text-xl font-semibold text-blue-900">
                  {title}
                </h3>
                <p className="mb-4 text-sm leading-6 text-slate-600">
                  {t(`${translationKey}.description`)}
                </p>

                <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
                  <span className="text-sm font-medium text-slate-700">
                    {t(`${translationKey}.price`)}
                  </span>
                  <Link
                    href={`/${service.id}`}
                    className="rounded-full bg-white p-2 text-blue-700 ring-1 ring-blue-200 transition hover:bg-blue-100"
                    aria-label={t("servicesPage.openDetails", { title })}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
