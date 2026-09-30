export const productGroups = [
  "Extintor",
  "Troca de Extintores",
  "Suporte",
  "Acessório",
  "Placa de Sinalização"
] as const;

export type ProductGroup = (typeof productGroups)[number];

export const groupTranslationKeys: Record<ProductGroup, string> = {
  Extintor: "filters.extinguishers",
  "Troca de Extintores": "filters.refill",
  Suporte: "filters.supports",
  Acessório: "filters.accessories",
  "Placa de Sinalização": "filters.plates"
};
