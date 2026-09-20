import type { SVGProps } from "react"
import { cn } from "@/lib/utils"

/**
 * Ícone de lixeira cuja tampa abre quando o elemento pai com a classe
 * `group` recebe hover ou foco por teclado.
 */
export default function AnimatedTrashIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-4 w-4 overflow-visible", className)}
      {...props}
    >
      <g className="origin-bottom-left [transform-box:fill-box] transition-transform duration-200 ease-out group-hover:-translate-y-px group-hover:-rotate-12 group-focus-visible:-translate-y-px group-focus-visible:-rotate-12 motion-reduce:transition-none">
        <path d="M3 6h18" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </g>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  )
}
