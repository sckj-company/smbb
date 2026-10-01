"use client";

import type { KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { formatKz } from "@/utils/formatKz";
import { Order } from "@/interface/order";
import {
  formatOrderCode,
  formatOrderItems,
  getTypeLabel,
  NOT_INFORMED
} from "@/utils/orderFormat";
import OrderTypeIcon from "./OrderTypeIcon";
import { formatTimestampDate } from "@/utils/formatDate";
import { STATUS_TONE } from "@/constants/order";
import { cn } from "@/lib/utils";

type Props = {
  order: Order;
  onView: (order: Order) => void;
};

export default function ClientOrdersTableRow({ order, onView }: Props) {
  const { t } = useTranslation();
  const code = formatOrderCode(order.id);

  function handleKeyDown(event: KeyboardEvent<HTMLTableRowElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onView(order);
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
            "inline-flex min-w-16 items-center justify-center whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-semibold capitalize",
            STATUS_TONE[order.status]
          )}
        >
          {t(`orders.status.${order.status}`)}
        </span>
      </td>
    </tr>
  );
}
