import { cn } from "@/lib/utils";
import { getInitials } from "@/utils/messageFormat";

type Props = {
  name: string;
  className?: string;
};

export default function MessageAvatar({ name, className }: Props) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600",
        className
      )}
    >
      {getInitials(name)}
    </span>
  );
}
