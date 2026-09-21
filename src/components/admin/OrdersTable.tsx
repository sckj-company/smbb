"use client";

import { TABLE_COLUMNS } from "@/constants/order";
import useDialogTarget from "@/hooks/orders/useDialogTarget";
import useOrderFilter from "@/hooks/orders/useOrderFilter";
import useOrders from "@/hooks/orders/useOrders";
import OrdersTableRow from "../orders/OrdersTableRow";
import OrderDetailsDialog from "../orders/OrderDetailsDialog";
import { Order } from "@/interface/order";
import OrderFilterTabs from "../orders/OrderFilterTabs";
import ConfirmDeleteDialog from "../orders/ConfirmDeleteDialog";
import { useCallback } from "react";
import useDeleteFlow from "@/hooks/orders/useDeleteFlow";
import { formatOrderCode } from "@/utils/orderFormat";

export default function OrdersTable() {
  const { orders, isLoading, error, updateStatus, removeOrder } = useOrders();
  const { filter, setFilter, filteredOrders } = useOrderFilter(orders);
  const details = useDialogTarget<Order>();
  const removeSelected = useCallback(
    (order: Order) => removeOrder(order.id),
    [removeOrder]
  );
  const deletion = useDeleteFlow<Order>(removeSelected);
  const orderCode = deletion.item ? formatOrderCode(deletion.item.id) : "";

  const isEmpty = !isLoading && !error && filteredOrders.length === 0;

  return (
    <section className="mt-10 overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="font-semibold text-slate-900">Pedidos</h2>
          <p className="mt-1 text-xs text-slate-500">
            Solicitações recebidas pelos canais da loja.
          </p>
        </div>
        <OrderFilterTabs value={filter} onChange={setFilter} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-175 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              {TABLE_COLUMNS.map((column) => (
                <th key={column} className="px-5 py-3 font-medium">
                  {column}
                </th>
              ))}
              <th className="px-5 py-3">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredOrders.map((order) => (
              <OrdersTableRow
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
            Não foi possível carregar os pedidos. Recarregue a página ou
            verifique a ligação à base de dados.
          </p>
        )}
        {isLoading && (
          <p className="px-5 py-10 text-center text-sm text-slate-500">
            A carregar pedidos...
          </p>
        )}
        {isEmpty && (
          <p className="px-5 py-10 text-center text-sm text-slate-500">
            Nenhum pedido neste estado.
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
  );
}
