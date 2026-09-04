"use client";

import Link from "next/link";
import Image from "next/image";
import { services } from "@/data/services";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ServicesPage() {
  const { t } = useTranslation();

  return (
    <main className="mt-38 2xl:px-0 md:w-5xl 2xl:w-7xl mx-auto bg-white">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-500">
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
              className="group relative rounded-lg border border-slate-200 bg-white p-2 transition hover:-translate-y-1 hover:shadow-[0_20px_30px_rgba(15,23,42,0.08)]"
            >
              <div className="w-full lg:aspect-4/2 2xl:aspect-3/2">
                <Image
                  src={service.image}
                  alt="Service Cover"
                  width={400}
                  height={200}
                  className="w-full h-auto object-cover object-bottom rounded-sm"
                />
              </div>

              <div className="px-5 pt-4.5 pb-3">
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

                  <div className="rounded-full p-2 bg-blue-100 text-blue-700 ring-1 ring-blue-200 transition opacity-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
