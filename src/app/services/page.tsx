"use client";

import { ArrowUpRight } from "lucide-react";
import useSWR from "swr";
import Loader from "@/components/ui/loader";
import ServiceBookingForm from "@/components/services/ServiceBookingForm";
import useCatalogLanguage from "@/hooks/useCatalogLanguage";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { formatKz } from "@/utils/formatKz";
import MobileStoreHeader from "@/components/products/MobileStoreHeader";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

type Service = {
  id: string;
  slug: string;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  price: number;
  image: string;
};

export default function ServicesPage() {
  const { t } = useTranslation();
  const { data: services = [], isLoading } = useSWR<Service[]>(
    "/api/products?type=service",
    fetcher
  );

  const { localize } = useCatalogLanguage();

  return (
    <>
      <MobileStoreHeader />
      <main className="min-h-screen mt-8 sm:mt-35 xl:mt-40 2xl:mt-45 w-full pb-12 px-4 sm:px-8 lg:px-0 md:w-5xl 2xl:w-7xl mx-auto">
        <div className="mb-15 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-500">
              SMBB
            </p>

            <div className="space-y-2">
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">
                {t("pageTitle.services")}
              </h1>
              <p className="text-gray-500 text-sm">{t("services.description")}</p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Loader className="mt-40" />
        ) : services.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
            {t("detail.emptyService")}
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {services.map((service) => {
              const serviceName = localize(service.name, service.nameZh);
              const serviceDescription = localize(
                service.description,
                service.descriptionZh
              );
              return (
                <article
                  key={service.id}
                  className="group rounded-lg border border-slate-200 bg-white p-2"
                >
                  <Image
                    src={service.image}
                    alt={serviceName}
                    width={200}
                    height={200}
                    className="h-48 md:h-60 w-full rounded-sm object-cover object-top"
                  />
                  <div className="px-5 pb-4 pt-4">
                    <h3 className="mb-2 text-xl font-semibold text-blue-900">
                      {serviceName}
                    </h3>
                    <p className="mb-4 text-sm leading-6 text-slate-600">
                      {serviceDescription}
                    </p>
                    <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                      <div className="flex gap-1.5 text-sm text-slate-700">
                        <span className="font-semibold">
                          {t("services.startingAt")}
                        </span>
                        <span className="text-green-700 font-semibold">
                          {formatKz(service.price)}
                        </span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-blue-700" />
                    </div>
                    <ServiceBookingForm
                      service={{ ...service, name: serviceName }}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
