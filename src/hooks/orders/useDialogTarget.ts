"use client"

import { useCallback, useState } from "react"

export default function useDialogTarget<T>() {
  const [target, setTarget] = useState<T | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback((value: T) => {
    setTarget(value)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => setIsOpen(false), [])

  return { target, isOpen, open, close }
}
