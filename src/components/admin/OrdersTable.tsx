"use client";

import useSWR from "swr";
import { useState } from "react";
import { MoreHorizontal, Package, Wrench } from "lucide-react";
import { formatKz } from "@/utils/formatKz";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const fetcher = (url: string) => fetch(url).then((response) => response.json());
const statuses = [
  "all",
  "pending",
  "processing",
  "completed",
  "cancelled"
] as const;
type Status = (typeof statuses)[number];
const orderStatuses = [
  "pending",
  "processing",
  "completed",
  "cancelled"
] as const;

type Order = {
  id: string;
  type: string;
  channel: string;
  status: Exclude<Status, "all">;
  total: number;
  customer: string;
  phone: string;
  createdAt: string;
  items: { name: string; quantity: number }[];
};

const statusLabel: Record<Exclude<Status, "all">, string> = {
  pending: "Pendente",
  processing: "Em análise",
  completed: "Concluído",
  cancelled: "Cancelado"
};

const statusClasses: Record<Exclude<Status, "all">, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100",
  processing:
    "border-orange-200 bg-orange-50 text-orange-800 hover:bg-orange-100",
  completed:
    "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100",
  cancelled: "border-red-200 bg-red-50 text-red-800 hover:bg-red-100"
};

const typeLabel = {
  product: "Produto",
  service: "Serviço"
} as const;

export default function OrdersTable() {
  const { data: orders = [], mutate } = useSWR<Order[]>(
    "/api/admin/orders",
    fetcher
  );
  const [filter, setFilter] = useState<Status>("all");
  const filtered =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  async function updateStatus(id: string, status: Exclude<Status, "all">) {
    await fetch(`/api/admin/orders?id=${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    await mutate();
  }

  return (
    <section className="mt-10 overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="font-semibold text-slate-900">Pedidos</h2>
          <p className="mt-1 text-xs text-slate-500">
            Solicitações recebidas pelos canais da loja.
          </p>
        </div>
        <div className="flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">
          {statuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`rounded-md px-2.5 py-1.5 text-xs font-medium ${filter === status ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
            >
              {status === "all" ? "Todos" : statusLabel[status]}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-175 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-3 font-medium">Pedido</th>
              <th className="px-5 py-3 font-medium">Tipo</th>
              <th className="px-5 py-3 font-medium">Nome</th>
              <th className="px-5 py-3 font-medium">Cliente</th>
              <th className="px-5 py-3 font-medium">Telefone</th>
              <th className="px-5 py-3 font-medium">Canal</th>
              <th className="px-5 py-3 font-medium">Total</th>
              <th className="px-5 py-3 font-medium">Estado</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      {order.type === "service" ? (
                        <Wrench className="h-4 w-4" />
                      ) : (
                        <Package className="h-4 w-4" />
                      )}
                    </span>
                    <div>
                      <p className="font-medium text-slate-800">
                        #{order.id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-xs text-slate-400">
                        {new Date(order.createdAt).toLocaleString("pt-AO")}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-2 font-medium text-slate-700">
                    {typeLabel[order.type as keyof typeof typeLabel] ??
                      order.type}
                  </span>
                </td>
                <td className="max-w-56 px-5 py-4 text-slate-700">
                  <p className="line-clamp-1">
                    {order.items.length
                      ? order.items
                          .map((item) => `${item.name} (${item.quantity}x)`)
                          .join(", ")
                      : "Não informado"}
                  </p>
                </td>
                <td className="px-5 py-4 text-slate-700 line-clamp-1">
                  {order.customer || "Não informado"}
                </td>
                <td className="px-5 py-4 text-slate-500">
                  {order.phone || "Não informado"}
                </td>
                <td className="px-5 py-4 text-slate-500">
                  {order.channel === "whatsapp" ? "WhatsApp" : "Dashboard"}
                </td>
                <td className="px-5 py-4 font-medium text-slate-800">
                  {formatKz(order.total)}
                </td>
                <td className="px-5 py-4">
                  <Select
                    value={order.status}
                    onValueChange={(value) =>
                      updateStatus(order.id, value as Exclude<Status, "all">)
                    }
                  >
                    <SelectTrigger
                      size="sm"
                      className={`h-7 w-32 rounded-full border px-3 text-xs font-semibold ${statusClasses[order.status]}`}
                    >
                      <SelectValue>{statusLabel[order.status]}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {orderStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {statusLabel[status]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-5 py-4 text-right text-slate-400">
                  <MoreHorizontal className="ml-auto h-4 w-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && (
          <p className="px-5 py-10 text-center text-sm text-slate-500">
            Nenhum pedido neste estado.
          </p>
        )}
      </div>
    </section>
  );
}
