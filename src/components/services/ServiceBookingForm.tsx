"use client";

import { CalendarDays, Clock3, MapPin, User } from "lucide-react";
import { format, parse } from "date-fns";
import { useTranslation } from "react-i18next";
import { RiWhatsappLine } from "@remixicon/react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import useSubmitService from "@/hooks/useSubmitService";

export type ServiceProps = { service: { name: string; price: number } };

export default function ServiceBookingForm({ service }: ServiceProps) {
  const { t } = useTranslation();
  const {
    client,
    setClient,
    date,
    setDate,
    time,
    setTime,
    setLocation,
    observation,
    setObservation,
    location,
    submitService
  } = useSubmitService({
    service
  });

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-blue-500";
  const selectedDate = date ? parse(date, "yyyy-MM-dd", new Date()) : undefined;

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
            required
            value={client}
            onChange={(event) => setClient(event.target.value)}
            placeholder={t("services.clientPlaceholder")}
            className={inputClass}
          />
        </span>
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-xs font-medium text-slate-600">
          {t("services.date")}
          <Popover>
            <PopoverTrigger
              type="button"
              className={`${inputClass} flex items-center justify-between text-left`}
            >
              <span className={date ? "text-slate-700" : "text-slate-400"}>
                {selectedDate
                  ? format(selectedDate, "dd/MM/yyyy")
                  : t("services.selectDate")}
              </span>
              <CalendarDays className="h-4 w-4 text-slate-400" />
            </PopoverTrigger>

            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(selected) => {
                  setDate(selected ? format(selected, "yyyy-MM-dd") : "");
                }}
                disabled={{ before: new Date() }}
              />
            </PopoverContent>
          </Popover>
        </label>

        <label className="grid gap-1 text-xs font-medium text-slate-600">
          {t("services.time")}
          <Popover>
            <PopoverTrigger
              type="button"
              className={`${inputClass} flex items-center justify-between text-left`}
            >
              <span className={time ? "text-slate-700" : "text-slate-400"}>
                {time || t("services.selectTime")}
              </span>
              <Clock3 className="h-4 w-4 text-slate-400" />
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto">
              <label className="grid gap-2 text-xs font-medium text-slate-600">
                {t("services.time")}
                <input
                  required
                  autoFocus
                  type="time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  className={inputClass}
                />
              </label>
            </PopoverContent>
          </Popover>
        </label>
      </div>

      <label className="grid gap-1 text-xs font-medium text-slate-600">
        {t("services.location")}
        <span className="relative">
          <MapPin className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            required
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder={t("services.locationPlaceholder")}
            className={inputClass}
          />
        </span>
      </label>

      <label className="grid gap-1 text-xs font-medium text-slate-600">
        <span>
          {t("services.observation")}{" "}
          <span className="font-normal text-slate-400">
            ({t("services.optional")})
          </span>
        </span>

        <textarea
          value={observation}
          onChange={(event) => setObservation(event.target.value)}
          placeholder={t("services.observationPlaceholder")}
          rows={2}
          className={inputClass}
        />
      </label>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
      >
        <RiWhatsappLine className="h-4 w-4" />
        {t("services.requestOnWhatsApp")}
      </button>
    </form>
  );
}
