"use client"

import { Order, OrderStatusFilter } from "@/interface/order"
import { useMemo, useState } from "react"

export default function useOrderFilter(orders: Order[]) {
  const [filter, setFilter] = useState<OrderStatusFilter>("all")

  const filteredOrders = useMemo(
    () =>
      filter === "all"
        ? orders
        : orders.filter((order) => order.status === filter),
    [orders, filter],
  )

  return { filter, setFilter, filteredOrders }
}
