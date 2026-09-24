"use client"

import { useCallback } from "react"
import { useTranslation } from "react-i18next"

import { CLIENT_TABLE_COLUMNS } from "@/constants/order"
import useDialogTarget from "@/hooks/orders/useDialogTarget"
import useOrderFilter from "@/hooks/orders/useOrderFilter"
import useOrders from "@/hooks/orders/useOrders"
import OrderDetailsDialog from "../orders/OrderDetailsDialog"
import { Order } from "@/interface/order"
import ConfirmDeleteDialog from "../orders/ConfirmDeleteDialog"
import useDeleteFlow from "@/hooks/orders/useDeleteFlow"
import { formatOrderCode } from "@/utils/orderFormat"
import ClientOrdersTableRow from "./ClientOrdersTableRow"
import ClientOrderFilterTabs from "./ClientOrderFilterTabs"

type Props = {
  searchPhone: string | null
}

export default function ClientOrdersTable({ searchPhone }: Props) {
  const { t } = useTranslation()

  const { orders, isLoading, error, updateStatus, removeOrder } = useOrders()

  const normalizedSearchPhone = searchPhone?.replace(/\D/g, "")

  const phoneFilteredOrders = normalizedSearchPhone
    ? orders.filter(
        (order) => order.phone.replace(/\D/g, "") === normalizedSearchPhone,
      )
    : []

  const { filter, setFilter, filteredOrders } =
    useOrderFilter(phoneFilteredOrders)

  const details = useDialogTarget<Order>()

  const removeSelected = useCallback(
    (order: Order) => removeOrder(order.id),
    [removeOrder],
  )

  const deletion = useDeleteFlow<Order>(removeSelected)

  const orderCode = deletion.item ? formatOrderCode(deletion.item.id) : ""

  const isEmpty = !isLoading && !error && filteredOrders.length === 0

  return (
    <section className="mt-10 overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="font-semibold text-slate-900">
            {t("orders.table.title")}
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            {t("orders.table.description")}
          </p>
        </div>

        <ClientOrderFilterTabs value={filter} onChange={setFilter} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-175 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              {CLIENT_TABLE_COLUMNS.map((column) => (
                <th key={column} className="px-5 py-3 font-medium">
                  {t(column)}
                </th>
              ))}

              <th className="px-5 py-3">
                <span className="sr-only">{t("orders.table.actions")}</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredOrders.map((order) => (
              <ClientOrdersTableRow
                key={order.id}
                order={order}
                onView={details.open}
                onDelete={deletion.request}
                onStatusChange={updateStatus}
              />
            ))}
          </tbody>
        </table>

        {error && (
          <p
            role="alert"
            className="px-5 py-10 text-center text-sm text-red-600"
          >
            {t("orders.table.error")}
          </p>
        )}

        {isLoading && (
          <p className="px-5 py-10 text-center text-sm text-slate-500">
            {t("orders.table.loading")}
          </p>
        )}

        {isEmpty && (
          <p className="px-5 py-10 text-center text-sm text-slate-500">
            {t("orders.table.empty")}
          </p>
        )}
      </div>

      <OrderDetailsDialog
        order={details.target}
        open={details.isOpen}
        onClose={details.close}
      />

      <ConfirmDeleteDialog
        open={deletion.isOpen}
        title={`Apagar o pedido ${orderCode}?`}
        description="Esta ação é permanente. O pedido deixa de existir na lista e na base de dados, e não pode ser recuperado."
        confirmLabel="Apagar pedido"
        isDeleting={deletion.isDeleting}
        error={deletion.error}
        onConfirm={deletion.confirm}
        onClose={deletion.close}
      />
    </section>
  )
}
