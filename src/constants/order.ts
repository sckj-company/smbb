import { OrderStatus, OrderStatusFilter } from "@/interface/order"

export const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Pendente (待定)",
  processing: "Em análise (审核中)",
  completed: "Concluído (已完成)",
  cancelled: "Cancelado (已取消)",
}

export const STATUS_FILTER_LABEL: Record<OrderStatusFilter, string> = {
  all: "Todos (全部)",
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
  "Pedido (订单)",
  "Tipo (类型)",
  "Nome (姓名)",
  "Cliente (客户)",
  "Telefone (电话号码)",
  "Canal (渠道)",
  "Total (总计)",
  "Estado (状态)",
] as const

export const CLIENT_TABLE_COLUMNS = [
  "orders.table.columns.order",
  "orders.table.columns.type",
  "orders.table.columns.name",
  "orders.table.columns.phone",
  "orders.table.columns.total",
  "orders.table.columns.status",
] as const
