"use client";

import { Message } from "@/interface/message";
import { useCallback, useMemo, useState } from "react";

export default function useMessageSelection(
  messages: Message[],
  onOpenUnread: (message: Message) => void
) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = useMemo(
    () => messages.find((message) => message.id === selectedId) ?? null,
    [messages, selectedId]
  );

  const select = useCallback(
    (message: Message) => {
      setSelectedId(message.id);
      if (!message.read) onOpenUnread(message);
    },
    [onOpenUnread]
  );

  const clear = useCallback(() => setSelectedId(null), []);

  const clearIfSelected = useCallback(
    (id: string) => setSelectedId((current) => (current === id ? null : current)),
    []
  );

  return { selected, select, clear, clearIfSelected };
}
