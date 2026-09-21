"use client";

import { Message, MessagePatch } from "@/interface/message";
import { fetchList, sendRequest } from "@/utils/apiClient";
import { useCallback } from "react";
import useSWR from "swr";

const MESSAGES_ENDPOINT = "/api/admin/messages";
const REFRESH_INTERVAL_MS = 60_000;
const EMPTY_MESSAGES: Message[] = [];

function messageUrl(id: string): string {
  return `${MESSAGES_ENDPOINT}?id=${encodeURIComponent(id)}`;
}

function applyPatch(
  messages: Message[],
  id: string,
  patch: MessagePatch
): Message[] {
  return messages.map((message) =>
    message.id === id ? { ...message, ...patch } : message
  );
}

function markEveryMessageRead(messages: Message[]): Message[] {
  return messages.map((message) =>
    message.read ? message : { ...message, read: true }
  );
}

export default function useMessages() {
  const { data, error, isLoading, mutate } = useSWR<Message[]>(
    MESSAGES_ENDPOINT,
    fetchList<Message>,
    { refreshInterval: REFRESH_INTERVAL_MS }
  );

  const update = useCallback(
    async (id: string, patch: MessagePatch) => {
      try {
        await mutate(
          async (current = EMPTY_MESSAGES) => {
            await sendRequest(messageUrl(id), "PATCH", patch);
            return applyPatch(current, id, patch);
          },
          {
            optimisticData: (current = EMPTY_MESSAGES) =>
              applyPatch(current, id, patch),
            rollbackOnError: true,
            revalidate: false
          }
        );
      } catch (updateError) {
        console.error("Não foi possível atualizar a mensagem:", updateError);
      }
    },
    [mutate]
  );

  const markAllRead = useCallback(async () => {
    try {
      await mutate(
        async (current = EMPTY_MESSAGES) => {
          await sendRequest(`${MESSAGES_ENDPOINT}/read-all`, "POST");
          return markEveryMessageRead(current);
        },
        {
          optimisticData: (current = EMPTY_MESSAGES) =>
            markEveryMessageRead(current),
          rollbackOnError: true,
          revalidate: false
        }
      );
    } catch (markError) {
      console.error("Não foi possível marcar como lidas:", markError);
    }
  }, [mutate]);

  const remove = useCallback(
    async (id: string) => {
      await mutate(
        async (current = EMPTY_MESSAGES) => {
          await sendRequest(messageUrl(id), "DELETE");
          return current.filter((message) => message.id !== id);
        },
        { revalidate: false }
      );
    },
    [mutate]
  );

  return {
    messages: data ?? EMPTY_MESSAGES,
    isLoading,
    error,
    update,
    markAllRead,
    remove
  };
}
