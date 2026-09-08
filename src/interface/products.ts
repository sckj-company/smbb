export type Product = {
  id: string;
  name: string;
  nameZh: string;
  brand: string;
  price: number;
  oldPrice: number;
  image: string;
  description: string;
  descriptionZh: string;
  groupType: "Extintor" | "Suporte" | "Placa de Sinalização";
  type: "product";
};
