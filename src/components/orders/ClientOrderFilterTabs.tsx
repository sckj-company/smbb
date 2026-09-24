import { useTranslation } from "react-i18next"

import { ORDER_STATUS_FILTERS, OrderStatusFilter } from "@/interface/order"

type Props = {
  value: OrderStatusFilter
  onChange: (filter: OrderStatusFilter) => void
}

export default function ClientOrderFilterTabs({ value, onChange }: Props) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">
      {ORDER_STATUS_FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          aria-pressed={value === filter}
          onClick={() => onChange(filter)}
          className={`rounded-md px-2.5 py-1.5 text-xs font-medium ${
            value === filter
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500"
          }`}
        >
          {t(`orders.table.status.${filter}`)}
        </button>
      ))}
    </div>
  )
}
