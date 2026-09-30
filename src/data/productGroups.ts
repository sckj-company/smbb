export const productGroups = [
  "Extintor",
  "Manutenção",
  "Suporte",
  "Acessório",
  "Placa de Sinalização"
] as const;

export type ProductGroup = (typeof productGroups)[number];

export const groupTranslationKeys: Record<ProductGroup, string> = {
  Extintor: "filters.extinguishers",
  Manutenção: "filters.refill",
  Suporte: "filters.supports",
  Acessório: "filters.accessories",
  "Placa de Sinalização": "filters.plates"
};
