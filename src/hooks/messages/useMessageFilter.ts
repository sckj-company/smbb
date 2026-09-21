"use client";

import { Message, MessageFilter } from "@/interface/message";
import { useMemo, useState } from "react";

const FILTER_PREDICATES: Record<MessageFilter, (message: Message) => boolean> = {
  all: (message) => !message.archived,
  unread: (message) => !message.read && !message.archived,
  archived: (message) => message.archived
};

export default function useMessageFilter(messages: Message[]) {
  const [filter, setFilter] = useState<MessageFilter>("all");

  const filteredMessages = useMemo(
    () => messages.filter(FILTER_PREDICATES[filter]),
    [messages, filter]
  );

  const unreadCount = useMemo(
    () => messages.filter(FILTER_PREDICATES.unread).length,
    [messages]
  );

  return { filter, setFilter, filteredMessages, unreadCount };
}
