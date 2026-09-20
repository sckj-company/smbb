export const ORDER_STATUSES = [
  "pending",
  "processing",
  "completed",
  "cancelled",
] as const

export type OrderStatus = (typeof ORDER_STATUSES)[number]

export const ORDER_STATUS_FILTERS = ["all", ...ORDER_STATUSES] as const

export type OrderStatusFilter = (typeof ORDER_STATUS_FILTERS)[number]

export type OrderItem = {
  name: string
  quantity: number
}

export type Order = {
  id: string
  type: string
  channel: string
  status: OrderStatus
  total: number
  customer: string
  phone: string
  createdAt: string
  items: OrderItem[]
}

export function isOrderStatus(value: string): value is OrderStatus {
  return (ORDER_STATUSES as readonly string[]).includes(value)
}
