"use client";

import { useCallback } from "react";
import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message, MessageFilter } from "@/interface/message";
import useMessages from "@/hooks/messages/useMessages";
import useMessageFilter from "@/hooks/messages/useMessageFilter";
import useMessageSelection from "@/hooks/messages/useMessageSelection";
import useDeleteFlow from "@/hooks/orders/useDeleteFlow";
import MessageFilterTabs from "./MessageFilterTabs";
import MessageToolbarButton from "./MessageToolbarButton";
import MessageList from "./MessageList";
import MessageDetail from "./MessageDetail";
import MessageEmptyState from "./MessageEmptyState";
import ConfirmDeleteDialog from "../orders/ConfirmDeleteDialog";

const EMPTY_LABEL: Record<MessageFilter, string> = {
  all: "Ainda não há mensagens.",
  unread: "Não há mensagens por ler.",
  archived: "Não há mensagens arquivadas."
};

export default function MessagesInbox() {
  const { messages, isLoading, error, update, markAllRead, remove } =
    useMessages();
  const { filter, setFilter, filteredMessages, unreadCount } =
    useMessageFilter(messages);

  const markRead = useCallback(
    (message: Message) => update(message.id, { read: true }),
    [update]
  );
  const { selected, select, clear, clearIfSelected } = useMessageSelection(
    messages,
    markRead
  );

  const removeMessage = useCallback(
    async (message: Message) => {
      await remove(message.id);
      clearIfSelected(message.id);
    },
    [remove, clearIfSelected]
  );
  const deletion = useDeleteFlow<Message>(removeMessage);

  function handleToggleRead(message: Message) {
    void update(message.id, { read: !message.read });
  }

  function handleToggleArchive(message: Message) {
    void update(message.id, { archived: !message.archived });
    clear();
  }

  return (
    <section className="grid h-[70dvh] min-h-112 grid-rows-[minmax(0,1fr)] overflow-hidden rounded-xl border border-slate-200 bg-white lg:grid-cols-[22rem_1fr]">
      <div
        className={cn(
          "flex min-h-0 flex-col border-slate-200 lg:border-r",
          selected && "hidden lg:flex"
        )}
      >
        <div className="flex items-center justify-between gap-2 p-4">
          <MessageFilterTabs
            value={filter}
            unreadCount={unreadCount}
            onChange={setFilter}
          />
          <MessageToolbarButton
            label="Marcar todas como lidas"
            onClick={() => void markAllRead()}
          >
            <CheckCheck className="h-4 w-4" />
          </MessageToolbarButton>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {error ? (
            <p role="alert" className="px-4 py-10 text-center text-sm text-red-600">
              Não foi possível carregar as mensagens.
            </p>
          ) : isLoading ? (
            <p className="px-4 py-10 text-center text-sm text-slate-500">
              A carregar mensagens...
            </p>
          ) : (
            <MessageList
              messages={filteredMessages}
              selectedId={selected?.id ?? null}
              emptyLabel={EMPTY_LABEL[filter]}
              onSelect={select}
            />
          )}
        </div>
      </div>

      <div className={cn("min-h-0", !selected && "hidden lg:block")}>
        {selected ? (
          <MessageDetail
            message={selected}
            onBack={clear}
            onToggleRead={() => handleToggleRead(selected)}
            onToggleArchive={() => handleToggleArchive(selected)}
            onDelete={() => deletion.request(selected)}
          />
        ) : (
          <MessageEmptyState />
        )}
      </div>

      <ConfirmDeleteDialog
        open={deletion.isOpen}
        title={`Apagar a mensagem de ${deletion.item?.name ?? ""}?`}
        description="Esta ação é permanente. A mensagem deixa de existir na base de dados e não pode ser recuperada."
        confirmLabel="Apagar mensagem"
        isDeleting={deletion.isDeleting}
        error={deletion.error}
        onConfirm={deletion.confirm}
        onClose={deletion.close}
      />
    </section>
  );
}
