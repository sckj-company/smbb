import { Button } from "@/components/ui/button"
import AnimatedTrashIcon from "./AnimatedTrashIcon"

type Props = {
  orderCode: string
  onClick: () => void
}

export default function DeleteOrderButton({ orderCode, onClick }: Props) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={`Apagar pedido ${orderCode}`}
      onClick={onClick}
      className="group h-8 w-8 text-slate-400 hover:bg-red-50 hover:text-red-600 focus-visible:text-red-600"
    >
      <AnimatedTrashIcon />
    </Button>
  )
}
