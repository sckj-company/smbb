"use cliente";

import { useState } from "react";

import { ServiceProps } from "@/components/services/ServiceBookingForm";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { formatDate } from "@/utils/formatDate";

export default function useSubmitService({ service }: ServiceProps) {
  const [client, setClient] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [observation, setObservation] = useState("");

  function submitService(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      "Olá, SMBB! 🧯🔥",
      `Meu nome é *${client}*.`,
      "",
      "> Quero contratar um serviço:",
      `Serviço: *${service.name}*`,
      `Data: *${formatDate(date)}*`,
      `Horário: *${time}*`,
      `Local: *${location}*`,
      observation && "",
      observation ? `Observação: ${observation}` : ""
    ].join("\n");
    window.open(createWhatsAppLink(message), "_blank", "noopener,noreferrer");
  }

  return {
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
  };
}
