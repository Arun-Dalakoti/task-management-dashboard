import { Modal } from "../common/Modal";
import { TaskCreateForm } from "./TaskCreateForm";
import type { NewTaskFields } from "../../types/task";

export type TaskCreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Bump when opening the modal to remount a fresh, empty form. */
  formKey: number;
  onCreateTask: (fields: NewTaskFields) => void;
};

export function TaskCreateModal({
  isOpen,
  onClose,
  formKey,
  onCreateTask,
}: TaskCreateModalProps) {
  return (
    <Modal isOpen={isOpen} title="New task" onClose={onClose}>
      <TaskCreateForm
        key={formKey}
        embedded
        onCreateTask={(fields) => {
          onCreateTask(fields);
          onClose();
        }}
      />
    </Modal>
  );
}
