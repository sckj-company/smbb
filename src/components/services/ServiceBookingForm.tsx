"use client";

import { CalendarDays, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { createWhatsAppLink, formatKz } from "@/lib/whatsapp";

type Props = { service: { name: string; price: number } };

export default function ServiceBookingForm({ service }: Props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [observation, setObservation] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = [
      "Olá, SMBB! 🧯🔥",
      "",
      "> Quero contratar um serviço:",
      `Serviço: ${service.name}`,
      `Preço de referência: ${formatKz(service.price)}`,
      `Data: ${date}`,
      `Horário: ${time}`,
      `Local: ${location}`,
      observation ? `Observação: ${observation}` : ""
    ]
      .filter(Boolean)
      .join("\n");
    window.open(createWhatsAppLink(message), "_blank", "noopener,noreferrer");
  }

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500";

  return (
    <form
      onSubmit={submit}
      className="mt-5 space-y-3 border-t border-slate-200 pt-4"
    >
      <p className="text-sm font-semibold text-slate-800">Agendar serviço</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-xs font-medium text-slate-600">
          Data
          <span className="relative">
            <CalendarDays className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              required
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className={inputClass}
            />
          </span>
        </label>
        <label className="grid gap-1 text-xs font-medium text-slate-600">
          Horário
          <input
            required
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            className={inputClass}
          />
        </label>
      </div>
      <label className="grid gap-1 text-xs font-medium text-slate-600">
        Local de atendimento
        <span className="relative">
          <MapPin className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            required
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Morada ou referência"
            className={inputClass}
          />
        </span>
      </label>
      <label className="grid gap-1 text-xs font-medium text-slate-600">
        Observação{" "}
        <span className="font-normal text-slate-400">(opcional)</span>
        <textarea
          value={observation}
          onChange={(event) => setObservation(event.target.value)}
          placeholder="Alguma informação adicional"
          rows={2}
          className={inputClass}
        />
      </label>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
      >
        <MessageCircle className="h-4 w-4" />
        Solicitar pelo WhatsApp
      </button>
    </form>
  );
}
