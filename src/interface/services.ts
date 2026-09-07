export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  highlights: string[];
  type: "service";
};

export const services: Service[] = [
  {
    id: "inspecao-anual",
    title: "Inspeção anual",
    description:
      "Laudo técnico completo de extintores, hidrantes, detectores e sinalização de emergência.",
    image: "/service.jpg",
    price: "A partir de Kz 420.000",
    highlights: ["Relatório digital", "Checklist completo", "Acompanha laudo"],
    type: "service"
  },
  {
    id: "treinamento-brigada",
    title: "Treinamento de brigada",
    description:
      "Treinamento prático de evacuação, uso de extintores e resposta rápida a emergências.",
    image: "/service.jpg",
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
      "Verificação, recarga e substituição de componentes críticos para manter o sistema funcional.",
    image: "/service.jpg",
    price: "A partir de Kz 560.000",
    highlights: [
      "Recarga de extintores",
      "Troca de peças",
      "Monitoramento técnico"
    ],
    type: "service"
  }
];
