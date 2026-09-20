import { STATUS_LABEL, STATUS_TONE } from "@/constants/order"
import { OrderStatus } from "@/interface/order"
import { cn } from "@/lib/utils"

type Props = {
  status: OrderStatus
}

export default function OrderStatusBadge({ status }: Props) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full border px-3 text-xs font-semibold",
        STATUS_TONE[status],
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  )
}
