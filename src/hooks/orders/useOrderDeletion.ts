"use client"

import { useCallback, useState } from "react"
import useDialogTarget from "./useDialogTarget"
import { Order } from "@/interface/order"

const DELETE_ERROR_MESSAGE =
  "Não foi possível apagar o pedido. Tente novamente."

export default function useOrderDeletion(
  removeOrder: (id: string) => Promise<void>,
) {
  const { target, isOpen, open, close } = useDialogTarget<Order>()
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const request = useCallback(
    (order: Order) => {
      setError(null)
      open(order)
    },
    [open],
  )

  const confirm = useCallback(async () => {
    if (!target) return

    setIsDeleting(true)
    setError(null)
    try {
      await removeOrder(target.id)
      close()
    } catch {
      setError(DELETE_ERROR_MESSAGE)
    } finally {
      setIsDeleting(false)
    }
  }, [target, removeOrder, close])

  return { order: target, isOpen, isDeleting, error, request, confirm, close }
}
