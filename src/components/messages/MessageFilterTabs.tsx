import { MESSAGE_FILTERS, MessageFilter } from "@/interface/message";
import { cn } from "@/lib/utils";

const FILTER_LABEL: Record<MessageFilter, string> = {
  all: "Todas",
  unread: "Não lidas",
  archived: "Arquivadas"
};

type Props = {
  value: MessageFilter;
  unreadCount: number;
  onChange: (filter: MessageFilter) => void;
};

export default function MessageFilterTabs({
  value,
  unreadCount,
  onChange
}: Props) {
  return (
    <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
      {MESSAGE_FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          aria-pressed={value === filter}
          onClick={() => onChange(filter)}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap",
            value === filter
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          {FILTER_LABEL[filter]}
          {filter === "unread" && unreadCount > 0 && (
            <span className="rounded-full bg-blue-500 px-1.5 text-[10px] leading-4 font-semibold text-white">
              {unreadCount}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
