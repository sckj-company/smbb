import { OrderItem } from "@/interface/order"

type Props = {
  items: OrderItem[]
}

export default function OrderItemsList({ items }: Props) {
  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
        Nenhum item informado.
      </p>
    )
  }

  return (
    <ul className="max-h-56 divide-y divide-slate-100 overflow-y-auto rounded-lg border border-slate-200">
      {items.map((item, index) => (
        <li
          key={`${item.name}-${index}`}
          className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
        >
          <span className="min-w-0 text-slate-800">{item.name}</span>
          <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            {item.quantity}x
          </span>
        </li>
      ))}
    </ul>
  )
}
