import { OrderItem } from "@/interface/order"

export const NOT_INFORMED = "Não informado"

const TYPE_LABEL: Record<string, string> = {
  product: "Produto",
  service: "Serviço",
}

export function formatOrderCode(id: string): string {
  return `#${id.slice(-8).toUpperCase()}`
}

export function formatOrderDate(isoDate: string): string {
  return new Date(isoDate).toLocaleString("pt-AO")
}

export function formatOrderItems(items: OrderItem[]): string {
  if (items.length === 0) return NOT_INFORMED
  return items.map(({ name, quantity }) => `${name} (${quantity}x)`).join(", ")
}

export function countOrderUnits(items: OrderItem[]): number {
  return items.reduce((total, { quantity }) => total + quantity, 0)
}

export function getTypeLabel(type: string): string {
  return TYPE_LABEL[type] ?? type
}

export function getChannelLabel(channel: string): string {
  return channel === "whatsapp" ? "WhatsApp" : "Dashboard"
}
