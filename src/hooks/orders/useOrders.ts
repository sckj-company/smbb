"use client"

import { Order, OrderStatus } from "@/interface/order"
import { useCallback } from "react"
import useSWR from "swr"

const ORDERS_ENDPOINT = "/api/admin/orders"
const EMPTY_ORDERS: Order[] = []

async function ordersFetcher(url: string): Promise<Order[]> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Falha ao carregar pedidos (${response.status})`)
  }

  const data: unknown = await response.json()
  if (!Array.isArray(data)) {
    throw new Error("Resposta inválida da API de pedidos")
  }
  return data as Order[]
}

async function sendOrderRequest(id: string, init: RequestInit): Promise<void> {
  const response = await fetch(
    `${ORDERS_ENDPOINT}?id=${encodeURIComponent(id)}`,
    init,
  )
  if (!response.ok) {
    throw new Error(`Falha na operação sobre o pedido (${response.status})`)
  }
}

function withStatus(orders: Order[], id: string, status: OrderStatus): Order[] {
  return orders.map((order) => (order.id === id ? { ...order, status } : order))
}

export default function useOrders() {
  const { data, error, isLoading, mutate } = useSWR<Order[]>(
    ORDERS_ENDPOINT,
    ordersFetcher,
  )

  const updateStatus = useCallback(
    async (id: string, status: OrderStatus) => {
      try {
        await mutate(
          async (current = EMPTY_ORDERS) => {
            await sendOrderRequest(id, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status }),
            })
            return withStatus(current, id, status)
          },
          {
            optimisticData: (current = EMPTY_ORDERS) =>
              withStatus(current, id, status),
            rollbackOnError: true,
            revalidate: false,
          },
        )
      } catch (updateError) {
        console.error(
          "Não foi possível atualizar o estado do pedido:",
          updateError,
        )
      }
    },
    [mutate],
  )

  const removeOrder = useCallback(
    async (id: string) => {
      await mutate(
        async (current = EMPTY_ORDERS) => {
          await sendOrderRequest(id, { method: "DELETE" })
          return current.filter((order) => order.id !== id)
        },
        { revalidate: false },
      )
    },
    [mutate],
  )

  return {
    orders: data ?? EMPTY_ORDERS,
    isLoading,
    error,
    updateStatus,
    removeOrder,
  }
}
