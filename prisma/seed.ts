import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    slug: "extintor-abc",
    name: "Extintor ABC 6kg",
    nameZh: "ABC 6公斤灭火器",
    brand: "SMEG",
    price: 985000,
    oldPrice: 1100000,
    accent: "from-slate-700 via-stone-700 to-neutral-900",
    accentColor: "#facc15",
    image: "/product.png",
    description:
      "Extintor multifuncional para uso em áreas comerciais, industriais e residenciais com alta confiabilidade.",
    descriptionZh: "适用于商业、工业和住宅区域的多功能灭火器，可靠性高。",
    highlights: [
      "Pressão certificada",
      "Acessório de suporte",
      "Válvula de segurança"
    ],
    groupType: "Extintor",
    type: "product"
  },
  {
    slug: "detector-fumaca",
    name: "Detector de fumaça",
    nameZh: "烟雾探测器",
    brand: "APPLE",
    price: 1130000,
    oldPrice: 1290000,
    accent: "from-zinc-700 via-slate-800 to-black",
    accentColor: "#e5e7eb",
    image: "/product.png",
    description:
      "Detector inteligente com alarme sonoro, indicação visual e resposta rápida para proteção imediata.",
    descriptionZh:
      "智能探测器配备声音警报和视觉指示，可快速响应并提供即时保护。",
    highlights: [
      "Alarme sonoro 85 dB",
      "Bateria de longa duração",
      "Teste automatizado"
    ],
    groupType: "Extintor",
    type: "product"
  },
  {
    slug: "sprinklers",
    name: "Sistema de sprinklers",
    nameZh: "自动喷水灭火系统",
    brand: "SMEG",
    price: 1290000,
    oldPrice: 1430000,
    accent: "from-stone-500 via-zinc-700 to-black",
    accentColor: "#d4d4d8",
    image: "/product.png",
    description:
      "Sistema automatizado de combate a incêndio para proteção contínua de áreas amplas e comerciais.",
    descriptionZh: "用于大型和商业区域持续防护的自动化灭火系统。",
    highlights: [
      "Cobertura ampla",
      "Resposta automática",
      "Instalação sob medida"
    ],
    groupType: "Suporte",
    type: "product"
  },
  {
    slug: "extintor-abc-suporte",
    name: "Extintor ABC 6kg",
    nameZh: "ABC 6公斤灭火器",
    brand: "SMEG",
    price: 985000,
    oldPrice: 1100000,
    accent: "from-slate-700 via-stone-700 to-neutral-900",
    accentColor: "#facc15",
    image: "/product.png",
    description:
      "Extintor multifuncional para uso em áreas comerciais, industriais e residenciais com alta confiabilidade.",
    descriptionZh: "适用于商业、工业和住宅区域的多功能灭火器，可靠性高。",
    highlights: [
      "Pressão certificada",
      "Acessório de suporte",
      "Válvula de segurança"
    ],
    groupType: "Suporte",
    type: "product"
  },
  {
    slug: "detector-fumaca-placa",
    name: "Detector de fumaça",
    nameZh: "烟雾探测器",
    brand: "APPLE",
    price: 1130000,
    oldPrice: 1290000,
    accent: "from-zinc-700 via-slate-800 to-black",
    accentColor: "#e5e7eb",
    image: "/product.png",
    description:
      "Detector inteligente com alarme sonoro, indicação visual e resposta rápida para proteção imediata.",
    descriptionZh:
      "智能探测器配备声音警报和视觉指示，可快速响应并提供即时保护。",
    highlights: [
      "Alarme sonoro 85 dB",
      "Bateria de longa duração",
      "Teste automatizado"
    ],
    groupType: "Placa de Sinalização",
    type: "product"
  },
  {
    slug: "sprinklers-placa",
    name: "Sistema de sprinklers",
    nameZh: "自动喷水灭火系统",
    brand: "SMEG",
    price: 1290000,
    oldPrice: 1430000,
    accent: "from-stone-500 via-zinc-700 to-black",
    accentColor: "#d4d4d8",
    image: "/product.png",
    description:
      "Sistema automatizado de combate a incêndio para proteção contínua de áreas amplas e comerciais.",
    descriptionZh: "用于大型和商业区域持续防护的自动化灭火系统。",
    highlights: [
      "Cobertura ampla",
      "Resposta automática",
      "Instalação sob medida"
    ],
    groupType: "Placa de Sinalização",
    type: "product"
  }
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product
    });
  }
}

main().finally(() => prisma.$disconnect());
