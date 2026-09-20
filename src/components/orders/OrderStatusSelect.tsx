"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { STATUS_LABEL, STATUS_TONE, STATUS_TONE_HOVER } from "@/constants/order"
import { isOrderStatus, ORDER_STATUSES, OrderStatus } from "@/interface/order"
import { cn } from "@/lib/utils"

type Props = {
  value: OrderStatus
  onChange: (status: OrderStatus) => void
}

export default function OrderStatusSelect({ value, onChange }: Props) {
  return (
    <Select
      value={value}
      onValueChange={(next) => {
        if (next && isOrderStatus(next)) onChange(next)
      }}
    >
      <SelectTrigger
        size="sm"
        className={cn(
          "h-7 w-32 rounded-full border px-3 text-xs font-semibold",
          STATUS_TONE[value],
          STATUS_TONE_HOVER[value],
        )}
      >
        <SelectValue>{STATUS_LABEL[value]}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {ORDER_STATUSES.map((status) => (
          <SelectItem key={status} value={status}>
            {STATUS_LABEL[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
