"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import ServiceBookingForm from "./services/ServiceBookingForm";
import useCatalogLanguage from "@/hooks/useCatalogLanguage";
import { serviceDataSection } from "@/data/service";
import { useTranslation } from "react-i18next";
import { formatKz } from "@/utils/formatKz";

export default function Service() {
  const { t } = useTranslation();
  const { localize } = useCatalogLanguage();
  const service = serviceDataSection;

  const serviceName = localize(service.name, service.nameZh);
  const serviceDescription = localize(
    service.description,
    service.descriptionZh
  );

  return (
    <section className="border-y border-blue-200 bg-sky-50 py-24">
      <div className="md:w-5xl 2xl:w-7xl mx-auto grid grid-cols-[56%_auto] gap-10">
        <Image
          src="/service.jpg"
          alt="Service"
          width={2000}
          height={5000}
          className="w-full h-full rounded-md object-cover"
        />

        <div className="px-5 pb-4 pt-4">
          <h3 className="text-sky-900 mb-2 text-xl font-semibold">
            {serviceName}
          </h3>
          <p className="mb-4 text-sm leading-6 text-slate-600">
            {serviceDescription}
          </p>
          <div className="flex items-center justify-between border-t border-slate-200 pt-4">
            <div className="flex gap-1.5 text-sm font-medium text-slate-700">
              <span className="text-sm font-semibold text-slate-800">
                {t("services.startingAt")}
              </span>
              <span className="text-green-700 font-semibold">
                {formatKz(service.price)}
              </span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-blue-700" />
          </div>
          <ServiceBookingForm service={{ ...service, name: serviceName }} />
        </div>
      </div>
    </section>
  );
}
