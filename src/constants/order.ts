import { OrderStatus, OrderStatusFilter } from "@/interface/order"

export const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Pendente",
  processing: "Em análise",
  completed: "Concluído",
  cancelled: "Cancelado",
}

export const STATUS_FILTER_LABEL: Record<OrderStatusFilter, string> = {
  all: "Todos",
  ...STATUS_LABEL,
}

export const STATUS_TONE: Record<OrderStatus, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-800",
  processing: "border-orange-200 bg-orange-50 text-orange-800",
  completed: "border-emerald-200 bg-emerald-50 text-emerald-800",
  cancelled: "border-red-200 bg-red-50 text-red-800",
}

export const STATUS_TONE_HOVER: Record<OrderStatus, string> = {
  pending: "hover:bg-amber-100",
  processing: "hover:bg-orange-100",
  completed: "hover:bg-emerald-100",
  cancelled: "hover:bg-red-100",
}

export const TABLE_COLUMNS = [
  "Pedido",
  "Tipo",
  "Nome",
  "Cliente",
  "Telefone",
  "Canal",
  "Total",
  "Estado",
] as const

export const CLIENT_TABLE_COLUMNS = [
  "orders.table.columns.order",
  "orders.table.columns.type",
  "orders.table.columns.name",
  "orders.table.columns.phone",
  "orders.table.columns.total",
  "orders.table.columns.status",
] as const
