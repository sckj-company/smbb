export type Service = {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  image: string;
  price: string;
  highlights: string[];
  type: "service";
};

export const services: Service[] = [
  {
    id: "inspecao-anual",
    title: "Inspeção anual",
    titleZh: "年度检查",
    description:
      "Laudo técnico completo de extintores, hidrantes, detectores e sinalização de emergência.",
    descriptionZh: "为灭火器、消防栓、探测器和应急标志提供完整的技术检查报告。",
    image: "/service.jpg",
    price: "A partir de Kz 420.000",
    highlights: ["Relatório digital", "Checklist completo", "Acompanha laudo"],
    type: "service"
  },
  {
    id: "treinamento-brigada",
    title: "Treinamento de brigada",
    titleZh: "消防队培训",
    description:
      "Treinamento prático de evacuação, uso de extintores e resposta rápida a emergências.",
    descriptionZh: "提供疏散、灭火器使用和紧急响应的实践培训。",
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
    titleZh: "预防性维护",
    description:
      "Verificação, recarga e substituição de componentes críticos para manter o sistema funcional.",
    descriptionZh: "检查、重新充装并更换关键部件，确保系统正常运行。",
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
