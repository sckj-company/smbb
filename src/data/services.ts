import { Check, ShieldCheck, Sparkles, Wrench } from "lucide-react";

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: typeof ShieldCheck;
  price: string;
  highlights: string[];
  type: "service";
};

export const services: Service[] = [
  {
    id: "inspecao-anual",
    title: "Inspeção anual",
    description:
      "Laudo técnico completo com checagem de extintores, hidrantes, detectores e sinalização de emergência.",
    icon: Check,
    price: "A partir de Kz 420.000",
    highlights: ["Relatório digital", "Checklist completo", "Acompanha laudo"],
    type: "service"
  },
  {
    id: "treinamento-brigada",
    title: "Treinamento de brigada",
    description:
      "Treinamento prático para evacuação, uso de extintores e resposta rápida em situações de emergência.",
    icon: Sparkles,
    price: "A partir de Kz 680.000",
    highlights: [
      "Treinamento prático",
      "Simulação realista",
      "Certificação de brigada"
    ],
    type: "service"
  },
  {
    id: "manutencao-preventiva",
    title: "Manutenção preventiva",
    description:
      "Verificação, recarga e substituição de componentes críticos para manter o sistema sempre funcional.",
    icon: Wrench,
    price: "A partir de Kz 560.000",
    highlights: [
      "Recarga de extintores",
      "Troca de peças",
      "Monitoramento técnico"
    ],
    type: "service"
  }
];
