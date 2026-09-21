import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
};

export default function MessageToolbarButton({
  label,
  onClick,
  children,
  className
}: Props) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "group h-8 w-8 shrink-0 text-slate-500 hover:bg-slate-100 hover:text-slate-900",
        className
      )}
    >
      {children}
    </Button>
  );
}
