"use client";

import { ArrowRight, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { RiWhatsappLine } from "@remixicon/react";

import useSubmitService from "@/hooks/useSubmitService";
import { formatKz } from "@/utils/formatKz";

export type ServiceProps = {
  service: {
    name: string;
    price: number;
  };
};

export default function ServiceBookingForm({ service }: ServiceProps) {
  const { t } = useTranslation();

  const {
    client,
    setClient,
    phone,
    setPhone,
    kilos,
    setKilos,
    totalKz,
    submitService
  } = useSubmitService({
    service
  });

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-blue-500";

  return (
    <form
      onSubmit={submitService}
      className="mt-5 space-y-7 border-t border-slate-200 pt-4"
    >
      <p className="text-sm font-semibold text-slate-800">
        {t("services.bookService")}
      </p>

      <label className="grid gap-1 text-xs font-medium text-slate-600">
        {t("services.client")}

        <span className="relative">
          <User className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400" />

          <input
            type="text"
            required
            minLength={3}
            pattern="^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)+$"
            title={t("services.clientValidation")}
            value={client}
            onChange={(event) => setClient(event.target.value)}
            placeholder={t("services.clientPlaceholder")}
            className={inputClass}
          />
        </span>
      </label>

      <label className="grid gap-1 text-xs font-medium text-slate-600">
        {t("services.phone")}

        <input
          type="tel"
          required
          inputMode="numeric"
          pattern="^9[0-9]{8}$"
          maxLength={9}
          title={t("services.phoneValidation")}
          value={phone}
          onChange={(event) => setPhone(event.target.value.replace(/\D/g, ""))}
          placeholder={t("services.phonePlaceholder")}
          className={inputClass}
        />
      </label>

      <div className="flex items-center justify-between border-t border-slate-200 pt-4">
        <div className="flex gap-1.5 text-sm font-medium text-slate-700">
          <span className="text-sm font-semibold text-slate-800">
            {t("services.startingAt")}
          </span>

          <span className="font-semibold text-green-700">
            {formatKz(service.price)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <label className="grid gap-1 text-xs font-medium text-slate-600">
          {t("services.kilos")}

          <input
            type="number"
            required
            min={1}
            step="any"
            value={kilos}
            onChange={(event) => setKilos(event.target.value)}
            placeholder={t("services.kilosPlaceholder")}
            className={inputClass}
          />
        </label>

        <ArrowRight className="mt-5 h-4 w-4 text-blue-700" />

        <label className="grid gap-1 text-xs font-medium text-slate-600">
          {t("services.totalValue")}

          <input
            type="text"
            disabled
            value={totalKz > 0 ? formatKz(totalKz) : ""}
            placeholder={t("services.totalValuePlaceholder")}
            className={`${inputClass} cursor-not-allowed bg-slate-100 text-slate-500`}
          />
        </label>
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
      >
        <RiWhatsappLine className="h-4 w-4" />
        {t("services.requestOnWhatsApp")}
      </button>
    </form>
  );
}
