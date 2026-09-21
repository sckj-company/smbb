"use client";

import useSWR from "swr";

export const UNREAD_COUNT_ENDPOINT = "/api/admin/messages/unread-count";

const REFRESH_INTERVAL_MS = 60_000;

async function unreadCountFetcher(url: string): Promise<number> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Falha ao carregar contagem (${response.status})`);
  }

  const data: unknown = await response.json();
  if (
    typeof data === "object" &&
    data !== null &&
    "count" in data &&
    typeof data.count === "number"
  ) {
    return data.count;
  }
  throw new Error("Resposta inválida da API de mensagens");
}

/**
 * Número de mensagens por ler. Com `enabled = false` (ex.: página de login)
 * não faz pedido nenhum. Em caso de erro devolve 0, ou seja, sem badge.
 */
export default function useUnreadMessagesCount(enabled = true): number {
  const { data } = useSWR<number>(
    enabled ? UNREAD_COUNT_ENDPOINT : null,
    unreadCountFetcher,
    { refreshInterval: REFRESH_INTERVAL_MS }
  );

  return data ?? 0;
}
