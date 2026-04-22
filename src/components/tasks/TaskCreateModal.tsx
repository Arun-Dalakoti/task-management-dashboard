import { Modal } from "../common/Modal";
import { TaskCreateForm } from "./TaskCreateForm";
import type { NewTaskFields } from "../../types/task";

export type TaskCreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (fields: NewTaskFields) => void;
};

export function TaskCreateModal({
  isOpen,
  onClose,
  onCreateTask,
}: TaskCreateModalProps) {
  return (
    <Modal isOpen={isOpen} title="New task" onClose={onClose}>
      <TaskCreateForm
        embedded
        onCreateTask={(fields) => {
          onCreateTask(fields);
          onClose();
        }}
      />
    </Modal>
  );
}
