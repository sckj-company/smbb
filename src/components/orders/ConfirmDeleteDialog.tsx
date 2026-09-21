"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

type Props = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  isDeleting: boolean;
  error: string | null;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmDeleteDialog({
  open,
  title,
  description,
  confirmLabel = "Apagar",
  isDeleting,
  error,
  onConfirm,
  onClose
}: Props) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (!next && !isDeleting) onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={(event) => {
              event.preventDefault();
              onConfirm();
            }}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isDeleting ? "A apagar..." : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
