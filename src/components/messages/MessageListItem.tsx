import { Message } from "@/interface/message";
import { cn } from "@/lib/utils";
import MessageAvatar from "./MessageAvatar";
import {
  formatMessageListTime,
  formatMessagePreview
} from "@/utils/messageFormat";

type Props = {
  message: Message;
  isSelected: boolean;
  onSelect: (message: Message) => void;
};

export default function MessageListItem({
  message,
  isSelected,
  onSelect
}: Props) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(message)}
        aria-current={isSelected ? "true" : undefined}
        className={cn(
          "flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none",
          isSelected && "bg-slate-100 hover:bg-slate-100"
        )}
      >
        <MessageAvatar name={message.name} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p
              className={cn(
                "truncate text-sm",
                message.read
                  ? "font-medium text-slate-700"
                  : "font-semibold text-slate-900"
              )}
            >
              {message.name}
            </p>
            <time
              dateTime={message.createdAt}
              className="shrink-0 text-xs text-slate-400"
            >
              {formatMessageListTime(message.createdAt)}
            </time>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <p
              className={cn(
                "truncate text-sm",
                message.read ? "text-slate-600" : "font-semibold text-slate-900"
              )}
            >
              {message.subject}
            </p>
            {!message.read && (
              <span
                role="img"
                aria-label="Não lida"
                className="h-2 w-2 shrink-0 rounded-full bg-blue-500"
              />
            )}
          </div>
          <p className="mt-0.5 truncate text-xs text-slate-400">
            {formatMessagePreview(message.body)}
          </p>
        </div>
      </button>
    </li>
  );
}
