import { Message } from "@/interface/message";
import MessageListItem from "./MessageListItem";

type Props = {
  messages: Message[];
  selectedId: string | null;
  emptyLabel: string;
  onSelect: (message: Message) => void;
};

export default function MessageList({
  messages,
  selectedId,
  emptyLabel,
  onSelect
}: Props) {
  if (messages.length === 0) {
    return (
      <p className="px-4 py-10 text-center text-sm text-slate-500">
        {emptyLabel}
      </p>
    );
  }

  return (
    <ul className="space-y-0.5 p-2">
      {messages.map((message) => (
        <MessageListItem
          key={message.id}
          message={message}
          isSelected={message.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}
