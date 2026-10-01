"use client";

import useSWR from "swr";
import { Order } from "@/interface/order";

async function ordersFetcher(url: string): Promise<Order[]> {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Falha ao carregar pedidos (${response.status})`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Resposta inválida da API de pedidos");
  }
  return data as Order[];
}

export default function useClientOrders(phone: string | null) {
  const key = phone ? `/api/orders?phone=${encodeURIComponent(phone)}` : null;
  const { data, error, isLoading } = useSWR<Order[]>(key, ordersFetcher);

  return { orders: data ?? [], error, isLoading };
}
