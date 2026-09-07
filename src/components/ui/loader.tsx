import { Ring2 } from "ldrs/react"
import "ldrs/react/Ring2.css"

export default function Loader() {
  return (
    <div className="mt-40 flex items-center justify-center w-full h-full">
      <Ring2
        size="40"
        stroke="5"
        strokeLength="0.25"
        bgOpacity="0.1"
        speed="0.8"
        color="oklch(62.3% 0.214 259.815)"
      />
    </div>
  )
}
