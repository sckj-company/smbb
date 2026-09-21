"use client";

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

  async function submitService(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const message = [
      "Olá, SMBB! 🧯🔥",
      `Meu nome é *${client}*.`,
      `Telefone: *${phone}*`,
      "",
      "> Quero contratar um serviço:",
      `Serviço: *${service.name}*`,
      `Quilos do Extintor: *${kilos} KG*`,
      `Total da Manut.: *${formatKz(totalKz)}*`
    ].join("\n");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: "service",
          total: service.price,
          customer: client,
          phone,
          items: [
            {
              name: service.name,
              quantity: 1,
              unitPrice: service.price
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error("Não foi possível registrar o pedido");
      }

      window.open(createWhatsAppLink(message), "_blank", "noopener,noreferrer");

      setClient("");
      setPhone("");
      setKilos("");
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
    }
  }

  return {
    client,
    setClient,
    phone,
    setPhone,
    kilos,
    setKilos,
    totalKz,
    submitService
  };
}
