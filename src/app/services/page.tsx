"use client";

import { ArrowUpRight } from "lucide-react";
import useSWR from "swr";
import Loader from "@/components/ui/loader";
import ServiceBookingForm from "@/components/services/ServiceBookingForm";
import { formatKz } from "@/lib/whatsapp";
import useCatalogLanguage from "@/hooks/useCatalogLanguage";
import { useTranslation } from "react-i18next";
import Image from "next/image";

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
    <main className="min-h-screen mt-45 pb-12 px-4 sm:px-0 md:w-5xl 2xl:w-7xl mx-auto">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-500">
            SMBB
          </p>
          <h1 className="mt-2 mb-4 text-xl sm:text-2xl font-semibold text-slate-900">
            {t("pageTitle.services")}
          </h1>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : services.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
          {t("detail.emptyService")}
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-3">
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
                  className="h-48 w-full rounded-sm object-cover object-bottom"
                />
                <div className="px-5 pb-4 pt-4">
                  <h3 className="mb-2 text-xl font-semibold text-blue-900">
                    {serviceName}
                  </h3>
                  <p className="mb-4 text-sm leading-6 text-slate-600">
                    {serviceDescription}
                  </p>
                  <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                    <span className="text-sm font-medium text-slate-700">
                      {formatKz(service.price)}
                    </span>
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
  );
}
