import { useTranslation } from "react-i18next";
import { STATUS_TONE } from "@/constants/order";
import { OrderStatus } from "@/interface/order";
import { cn } from "@/lib/utils";

type Props = {
  status: OrderStatus;
};

export default function OrderStatusBadge({ status }: Props) {
  const { t } = useTranslation();

  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full border px-3 text-xs font-semibold",
        STATUS_TONE[status]
      )}
    >
      {t(`orders.status.${status}`)}
    </span>
  );
}
