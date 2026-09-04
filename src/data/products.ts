export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice: number;
  accent: string;
  accentColor: string;
  image: string;
  description: string;
  highlights: string[];
  groupType: "Extintor" | "Suporte" | "Placa de Sinalização";
  type: "product";
};

export const products: Product[] = [
  {
    id: "extintor-abc",
    name: "Extintor ABC 6kg",
    brand: "SMEG",
    price: 985000,
    oldPrice: 1100000,
    accent: "from-slate-700 via-stone-700 to-neutral-900",
    accentColor: "#facc15",
    image: "/product.png",
    description:
      "Extintor multifuncional para uso em áreas comerciais, industriais e residenciais com alta confiabilidade.",
    highlights: [
      "Pressão certificada",
      "Acessório de suporte",
      "Válvula de segurança"
    ],
    groupType: "Extintor",
    type: "product"
  },
  {
    id: "detector-fumaca",
    name: "Detector de fumaça",
    brand: "APPLE",
    price: 1130000,
    oldPrice: 1290000,
    accent: "from-zinc-700 via-slate-800 to-black",
    accentColor: "#e5e7eb",
    image: "/product.png",
    description:
      "Detector inteligente com alarme sonoro, indicação visual e resposta rápida para proteção imediata.",
    highlights: [
      "Alarme sonoro 85 dB",
      "Bateria de longa duração",
      "Teste automatizado"
    ],
    groupType: "Extintor",
    type: "product"
  },
  {
    id: "sprinklers",
    name: "Sistema de sprinklers",
    brand: "SMEG",
    price: 1290000,
    oldPrice: 1430000,
    accent: "from-stone-500 via-zinc-700 to-black",
    accentColor: "#d4d4d8",
    image: "/product.png",
    description:
      "Sistema automatizado de combate a incêndio para proteção contínua de áreas amplas e comerciais.",
    highlights: [
      "Cobertura ampla",
      "Resposta automática",
      "Instalação sob medida"
    ],
    groupType: "Suporte",
    type: "product"
  },
  {
    id: "extintore-abc",
    name: "Extintor ABC 6kg",
    brand: "SMEG",
    price: 985000,
    oldPrice: 1100000,
    accent: "from-slate-700 via-stone-700 to-neutral-900",
    accentColor: "#facc15",
    image: "/product.png",
    description:
      "Extintor multifuncional para uso em áreas comerciais, industriais e residenciais com alta confiabilidade.",
    highlights: [
      "Pressão certificada",
      "Acessório de suporte",
      "Válvula de segurança"
    ],
    groupType: "Suporte",
    type: "product"
  },
  {
    id: "deteector-fumaca",
    name: "Detector de fumaça",
    brand: "APPLE",
    price: 1130000,
    oldPrice: 1290000,
    accent: "from-zinc-700 via-slate-800 to-black",
    accentColor: "#e5e7eb",
    image: "/product.png",
    description:
      "Detector inteligente com alarme sonoro, indicação visual e resposta rápida para proteção imediata.",
    highlights: [
      "Alarme sonoro 85 dB",
      "Bateria de longa duração",
      "Teste automatizado"
    ],
    groupType: "Placa de Sinalização",
    type: "product"
  },
  {
    id: "sprinkleres",
    name: "Sistema de sprinklers",
    brand: "SMEG",
    price: 1290000,
    oldPrice: 1430000,
    accent: "from-stone-500 via-zinc-700 to-black",
    accentColor: "#d4d4d8",
    image: "/product.png",
    description:
      "Sistema automatizado de combate a incêndio para proteção contínua de áreas amplas e comerciais.",
    highlights: [
      "Cobertura ampla",
      "Resposta automática",
      "Instalação sob medida"
    ],
    groupType: "Placa de Sinalização",
    type: "product"
  }
];
