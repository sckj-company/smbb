import type { CartItem } from "@/hooks/useCart";
import { formatKz } from "@/utils/formatKz";

export const whatsappNumber = 244951116116;

export function createWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function createSupportMessage() {
  return [
    "Olá, SMBB! 👋",
    "",
    "Gostaria de entrar em contacto com a equipa de suporte da SMBB."
  ].join("\n");
}

export function createProductOrderMessage(
  items: CartItem[],
  total: number,
  phone = ""
) {
  const lines = items.map(
    (item) =>
      `- ${item.name} (${item.quantity}x): ${formatKz(item.price * item.quantity)}`
  );
  return [
    "*Olá, SMBB!* 🧯🔥",
    phone ? `Telefone: *${phone}*` : "",
    "",
    "> Quero comprar:",
    ...lines,
    "",
    `Total: *${formatKz(total)}*`
  ].join("\n");
}
