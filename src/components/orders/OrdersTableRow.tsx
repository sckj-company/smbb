"use client"

import type { KeyboardEvent, MouseEvent } from "react"
import { formatKz } from "@/utils/formatKz"
import { Order, OrderStatus } from "@/interface/order"
import { formatOrderCode, formatOrderDate, formatOrderItems, getChannelLabel, getTypeLabel, NOT_INFORMED } from "@/utils/orderFormat"
import OrderTypeIcon from "./OrderTypeIcon"
import OrderStatusSelect from "./OrderStatusSelect"
import DeleteOrderButton from "./DeleteOrderButton"


type Props = {
  order: Order
  onView: (order: Order) => void
  onDelete: (order: Order) => void
  onStatusChange: (id: string, status: OrderStatus) => void
}

function stopPropagation(event: MouseEvent) {
  event.stopPropagation()
}

export default function OrdersTableRow({
  order,
  onView,
  onDelete,
  onStatusChange,
}: Props) {
  const code = formatOrderCode(order.id)

  function handleKeyDown(event: KeyboardEvent<HTMLTableRowElement>) {
    if (event.target !== event.currentTarget) return
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onView(order)
    }
  }

  return (
    <tr
      tabIndex={0}
      onClick={() => onView(order)}
      onKeyDown={handleKeyDown}
      className="cursor-pointer hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none focus-visible:ring-inset"
    >
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <OrderTypeIcon type={order.type} />
          <div>
            <p className="font-medium text-slate-800">{code}</p>
            <p className="text-xs text-slate-400">
              {formatOrderDate(order.createdAt)}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-4 font-medium text-slate-700">
        {getTypeLabel(order.type)}
      </td>
      <td className="max-w-56 px-5 py-4 text-slate-700">
        <p className="line-clamp-1">{formatOrderItems(order.items)}</p>
      </td>
      <td className="max-w-40 px-5 py-4 text-slate-700">
        <p className="line-clamp-1">{order.customer || NOT_INFORMED}</p>
      </td>
      <td className="px-5 py-4 text-slate-500">
        {order.phone || NOT_INFORMED}
      </td>
      <td className="px-5 py-4 text-slate-500">
        {getChannelLabel(order.channel)}
      </td>
      <td className="px-5 py-4 font-medium text-slate-800">
        {formatKz(order.total)}
      </td>
      <td className="px-5 py-4" onClick={stopPropagation}>
        <OrderStatusSelect
          value={order.status}
          onChange={(status) => onStatusChange(order.id, status)}
        />
      </td>
      <td className="px-5 py-4 text-right" onClick={stopPropagation}>
        <DeleteOrderButton orderCode={code} onClick={() => onDelete(order)} />
      </td>
    </tr>
  )
}
