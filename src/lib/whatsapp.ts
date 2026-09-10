import type { CartItem } from "@/hooks/useCart";
import { formatKz } from "@/utils/formatKz";

export const whatsappNumber = 244951116116;

export function createWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function createProductOrderMessage(items: CartItem[], total: number) {
  const lines = items.map(
    (item) =>
      `- ${item.name} (${item.quantity}x): ${formatKz(item.price * item.quantity)}`
  );
  return [
    "*Olá, SMBB!* 🧯🔥",
    "",
    "> Quero comprar:",
    ...lines,
    "",
    `Total: *${formatKz(total)}*`
  ].join("\n");
}
