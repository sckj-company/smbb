import { Package, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  type: string;
  className?: string;
};

export default function OrderTypeIcon({ type, className }: Props) {
  const Icon = type === "service" ? Wrench : Package;

  return (
    <span
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600",
        className
      )}
    >
      <Icon aria-hidden="true" className="h-4 w-4" />
    </span>
  );
}
