"use client";

import { useCallback, useState } from "react";
import useDialogTarget from "./useDialogTarget";

const DELETE_ERROR_MESSAGE =
  "Não foi possível apagar. Tente novamente em instantes.";

export default function useDeleteFlow<T>(remove: (item: T) => Promise<void>) {
  const { target, isOpen, open, close } = useDialogTarget<T>();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    (item: T) => {
      setError(null);
      open(item);
    },
    [open]
  );

  const confirm = useCallback(async () => {
    if (!target) return;

    setIsDeleting(true);
    setError(null);
    try {
      await remove(target);
      close();
    } catch (deleteError) {
      console.error("Falha ao apagar:", deleteError);
      setError(DELETE_ERROR_MESSAGE);
    } finally {
      setIsDeleting(false);
    }
  }, [target, remove, close]);

  return { item: target, isOpen, isDeleting, error, request, confirm, close };
}
