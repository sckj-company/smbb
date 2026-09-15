"use cliente";

import { useState } from "react";

import { createWhatsAppLink } from "@/lib/whatsapp";
import { ServiceProps } from "@/components/services/ServiceBookingForm";
import { formatKz } from "@/utils/formatKz";

export const KZ_POR_KILO = 2500;

export default function useSubmitService({ service }: ServiceProps) {
  const [client, setClient] = useState("");
  const [phone, setPhone] = useState("");
  const [kilos, setKilos] = useState<string>("");

  const totalKz =
    !isNaN(Number(kilos)) && Number(kilos) > 0
      ? Number(kilos) * KZ_POR_KILO
      : 0;

  function submitService(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      "Olá, SMBB! 🧯🔥",
      `Meu nome é *${client}*.`,
      phone ? `Telefone: *${phone}*` : "",
      "",
      "> Quero contratar um serviço:",
      `Serviço: *${service.name}*`,
      `Quilos do Extintor: *${kilos} KG*`,
      `Total da Manut.: *${formatKz(totalKz)}*`
    ].join("\n");
    void fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "service",
        total: service.price,
        customer: client,
        phone,
        metadata: { location },
        items: [{ name: service.name, quantity: 1, unitPrice: service.price }]
      })
    });
    window.open(createWhatsAppLink(message), "_blank", "noopener,noreferrer");
  }

  return {
    client,
    setClient,
    phone,
    setPhone,
    location,
    kilos,
    setKilos,
    totalKz,
    submitService
  };
}
