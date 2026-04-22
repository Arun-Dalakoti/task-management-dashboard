import type { ReactNode } from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";

export type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  /** Main message; can include a task name or other context. */
  description: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onCancel}>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          className="w-full sm:w-auto"
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>
        <Button
          type="button"
          variant="danger"
          className="w-full sm:w-auto"
          onClick={() => {
            onConfirm();
            onCancel();
          }}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
