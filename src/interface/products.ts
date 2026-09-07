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
