export const productGroups = [
  "Extintor",
  "Suporte",
  "Placa de Sinalização"
] as const;

export type ProductGroup = (typeof productGroups)[number];

export const groupTranslationKeys: Record<ProductGroup, string> = {
  Extintor: "filters.extinguishers",
  Suporte: "filters.supports",
  "Placa de Sinalização": "filters.plates"
};
