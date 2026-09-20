"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Order } from "@/interface/order"
import { formatOrderCode } from "@/utils/orderFormat"

type Props = {
  order: Order | null
  open: boolean
  isDeleting: boolean
  error: string | null
  onConfirm: () => void
  onClose: () => void
}

export default function DeleteOrderDialog({
  order,
  open,
  isDeleting,
  error,
  onConfirm,
  onClose,
}: Props) {
  if (!order) return null

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (!next && !isDeleting) onClose()
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apagar o pedido {formatOrderCode(order.id)}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação é permanente. O pedido deixa de existir na lista e na base
            de dados, e não pode ser recuperado.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={(event) => {
              event.preventDefault()
              onConfirm()
            }}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isDeleting ? "A apagar..." : "Apagar pedido"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
