"use client";

import { useTranslation } from "react-i18next";

import { CLIENT_TABLE_COLUMNS } from "@/constants/order";
import useDialogTarget from "@/hooks/orders/useDialogTarget";
import useOrderFilter from "@/hooks/orders/useOrderFilter";
import useClientOrders from "@/hooks/orders/useClientOrders";
import OrderDetailsDialog from "../orders/OrderDetailsDialog";
import { Order } from "@/interface/order";
import ClientOrdersTableRow from "./ClientOrdersTableRow";
import ClientOrderFilterTabs from "./ClientOrderFilterTabs";

type Props = {
  searchPhone: string | null;
};

export default function ClientOrdersTable({ searchPhone }: Props) {
  const { t } = useTranslation();

  const { orders, isLoading, error } = useClientOrders(searchPhone);
  const { filter, setFilter, filteredOrders } = useOrderFilter(orders);

  const details = useDialogTarget<Order>();
  const isEmpty =
    searchPhone !== null && !isLoading && !error && filteredOrders.length === 0;

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

        {searchPhone !== null && (
          <ClientOrderFilterTabs value={filter} onChange={setFilter} />
        )}
      </div>

      {searchPhone === null && (
        <p className="px-5 py-10 text-center text-sm text-slate-500">
          {t("orders.table.searchPrompt")}
        </p>
      )}

      <div className={searchPhone === null ? "hidden" : "overflow-x-auto"}>
        <table className="w-max min-w-full whitespace-nowrap text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              {CLIENT_TABLE_COLUMNS.map((column) => (
                <th key={column} className="px-5 py-3 font-medium">
                  {t(column)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredOrders.map((order) => (
              <ClientOrdersTableRow
                key={order.id}
                order={order}
                onView={details.open}
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
    </section>
  );
}
