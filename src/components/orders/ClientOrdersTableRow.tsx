"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { formatKz } from "@/utils/formatKz";
import { Order, OrderStatus } from "@/interface/order";
import {
  formatOrderCode,
  formatOrderItems,
  getTypeLabel,
  NOT_INFORMED
} from "@/utils/orderFormat";
import OrderTypeIcon from "./OrderTypeIcon";
import DeleteOrderButton from "./DeleteOrderButton";
import { formatTimestampDate } from "@/utils/formatDate";
import { STATUS_LABEL, STATUS_TONE } from "@/constants/order";
import { cn } from "@/lib/utils";

type Props = {
  order: Order;
  onView: (order: Order) => void;
  onDelete: (order: Order) => void;
  onStatusChange: (id: string, status: OrderStatus) => void;
};

function stopPropagation(event: MouseEvent) {
  event.stopPropagation();
}

export default function ClientOrdersTableRow({
  order,
  onView,
  onDelete
}: Props) {
  const code = formatOrderCode(order.id);

  function handleKeyDown(event: KeyboardEvent<HTMLTableRowElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onView(order);
    }
  }

  console.log(order.status);

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
              {formatTimestampDate(order.createdAt)}
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
      <td className="px-5 py-4 text-slate-500">
        {order.phone || NOT_INFORMED}
      </td>
      <td className="px-5 py-4 font-medium text-slate-800">
        {formatKz(order.total)}
      </td>
      <td className="px-5 py-4">
        <span
          className={cn(
            "w-32 rounded-lg border px-3 py-1.5 text-xs font-semibold capitalize",
            STATUS_TONE[order.status]
          )}
        >
          {STATUS_LABEL[order.status]}
        </span>
      </td>
      <td className="px-5 py-4 text-right" onClick={stopPropagation}>
        <DeleteOrderButton
          orderCode={code}
          onClick={() => onDelete(order)}
          status={order.status}
        />
      </td>
    </tr>
  );
}
