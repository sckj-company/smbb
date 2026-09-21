"use client";

import Image from "next/image";
import { CheckCircle2, CircleX, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import useAvailability from "@/hooks/useAvailability";

const STORE_NAME = "SMBB";
const PHONE = "+244 946 205 888";
const COVER_SRC = "/extinguisher-cover.webp";

export default function MobileStoreHeader() {
  const { t } = useTranslation();
  const availability = useAvailability();
  const availabilityLabel = t(availability).split(" ")[1];

  return (
    <header className="lg:hidden">
      <div className="relative h-44 overflow-hidden bg-linear-to-br from-sky-900 via-blue-700 to-blue-500">
        {COVER_SRC && (
          <Image
            src={COVER_SRC}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        )}
      </div>

      <div className="relative -mt-20 px-3 pb-4">
        <div className="rounded-[2rem] bg-slate-900 p-5 text-white">
          <div className="flex items-center gap-4">
            <div
              aria-hidden="true"
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-blue-600 text-md font-bold"
            >
              <Image
                src="/smbb-logo-light.webp"
                alt=""
                width={80}
                height={100}
                className="w-12 h-auto"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-xl font-bold">{STORE_NAME}</h1>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full  px-2 py-1 text-xs font-semibold ${availabilityLabel === "Aberto" ? "bg-emerald-500/15 text-emerald-300" : "bg-red-500/15 text-red-300"}`}
                >
                  {availabilityLabel == "Aberto" ? (
                    <CheckCircle2 aria-hidden="true" className="h-3 w-3" />
                  ) : (
                    <CircleX aria-hidden="true" className="h-3 w-3" />
                  )}

                  {availabilityLabel}
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300">
                  <Phone aria-hidden="true" className="h-3 w-3 shrink-0" />
                  {PHONE}
                </span>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 h-3 w-3 shrink-0 text-slate-400"
                  />
                  <span className="text-xs">
                    {t("contact.locationDescription1")}
                  </span>
                </li>

                <li className="flex items-start gap-2">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 h-3 w-3 shrink-0 text-slate-400"
                  />
                  <span className="text-xs">
                    {t("contact.locationDescription2")}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
