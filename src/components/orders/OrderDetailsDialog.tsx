"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatKz } from "@/utils/formatKz"
import {
  getTypeLabel,
  NOT_INFORMED,
  countOrderUnits,
  formatOrderCode,
  getChannelLabel,
} from "@/utils/orderFormat"
import OrderTypeIcon from "./OrderTypeIcon"
import { Order } from "@/interface/order"
import OrderStatusBadge from "./OrderStatusBadge"
import OrderItemsList from "./OrderItemsList"
import DetailField from "./DetailField"
import { formatTimestampDate } from "@/utils/formatDate"

type Props = {
  order: Order | null
  open: boolean
  onClose: () => void
}

export default function OrderDetailsDialog({ order, open, onClose }: Props) {
  if (!order) return null

  const units = countOrderUnits(order.items)

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="w-full max-w-[calc(100%-2rem)]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <OrderTypeIcon type={order.type} className="h-10 w-10" />
            <div className="min-w-0 text-left">
              <DialogTitle>Pedido {formatOrderCode(order.id)}</DialogTitle>
              <DialogDescription className="text-xs mt-1">
                {formatTimestampDate(order.createdAt)}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <dl className="my-5 grid grid-cols-2 gap-x-6 gap-y-4">
          <DetailField label="Estado">
            <OrderStatusBadge status={order.status} />
          </DetailField>
          <DetailField label="Tipo">{getTypeLabel(order.type)}</DetailField>
          <DetailField label="Telefone">
            {order.phone ? (
              <a
                href={`tel:${order.phone}`}
                className="text-blue-600 hover:underline"
              >
                {order.phone}
              </a>
            ) : (
              NOT_INFORMED
            )}
          </DetailField>
          <DetailField label="Canal">
            {getChannelLabel(order.channel)}
          </DetailField>
        </dl>

        <section className="space-y-2">
          <div className="flex items-baseline justify-between">
            <h3 className="text-sm font-semibold text-slate-900">
              Itens do pedido
            </h3>
            {order.items.length > 0 && (
              <p className="text-xs text-slate-500">
                {order.items.length}{" "}
                {order.items.length === 1 ? "item" : "itens"}, {units}{" "}
                {units === 1 ? "unidade" : "unidades"}
              </p>
            )}
          </div>
          <OrderItemsList items={order.items} />
        </section>

        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
          <span className="text-sm text-slate-500">Total</span>
          <span className="text-lg font-semibold text-slate-900">
            {formatKz(order.total)}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
