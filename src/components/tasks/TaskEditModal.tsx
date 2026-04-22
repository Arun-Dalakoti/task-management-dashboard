import { useEffect, useState, type FormEvent } from "react";
import {
  Button,
  Checkbox,
  Field,
  Input,
  Modal,
  Select,
  TextArea,
} from "../common";
import type { Task, TaskPriority } from "../../types/task";
import {
  TASK_PRIORITIES,
  TASK_PRIORITY_LABELS,
} from "../../types/task";
import type { TaskPatch } from "../../lib/taskStorage";

export type TaskEditModalProps = {
  task: Task | null;
  onClose: () => void;
  onSave: (id: string, patch: TaskPatch) => void;
};

type EditValues = {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  completed: boolean;
};

type FormErrors = Partial<Record<keyof EditValues, string>>;

function taskToValues(task: Task): EditValues {
  return {
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate,
    completed: task.completed,
  };
}

function validate(values: EditValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.title.trim()) {
    errors.title = "Title is required";
  }
  if (!values.dueDate) {
    errors.dueDate = "Due date is required";
  }
  return errors;
}

export function TaskEditModal({ task, onClose, onSave }: TaskEditModalProps) {
  const [values, setValues] = useState<EditValues | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (task) {
      setValues(taskToValues(task));
      setErrors({});
    } else {
      setValues(null);
    }
  }, [task]);

  if (!task || !values) {
    return null;
  }

  const update = <K extends keyof EditValues>(key: K, value: EditValues[K]) => {
    setValues((v) => (v ? { ...v, [key]: value } : v));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    const patch: TaskPatch = {
      title: values.title.trim(),
      description: values.description.trim(),
      priority: values.priority,
      dueDate: values.dueDate,
      completed: values.completed,
    };
    onSave(task.id, patch);
    onClose();
  };

  return (
    <Modal isOpen title="Edit task" onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <Field label="Title" htmlFor="edit-task-title" error={errors.title}>
          <Input
            id="edit-task-title"
            name="title"
            value={values.title}
            onChange={(e) => update("title", e.target.value)}
            autoComplete="off"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "edit-task-title-error" : undefined}
          />
        </Field>

        <Field
          label="Description"
          htmlFor="edit-task-description"
          hint="Optional details or context"
        >
          <TextArea
            id="edit-task-description"
            name="description"
            value={values.description}
            onChange={(e) => update("description", e.target.value)}
            rows={4}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Priority" htmlFor="edit-task-priority">
            <Select
              id="edit-task-priority"
              name="priority"
              value={values.priority}
              onChange={(e) =>
                update("priority", e.target.value as TaskPriority)
              }
            >
              {TASK_PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {TASK_PRIORITY_LABELS[p]}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Due date" htmlFor="edit-task-due" error={errors.dueDate}>
            <Input
              id="edit-task-due"
              name="dueDate"
              type="date"
              value={values.dueDate}
              onChange={(e) => update("dueDate", e.target.value)}
              aria-invalid={Boolean(errors.dueDate)}
              aria-describedby={
                errors.dueDate ? "edit-task-due-error" : undefined
              }
            />
          </Field>
        </div>

        <Field label="Status" htmlFor="edit-task-completed">
          <div className="flex min-h-9 items-center gap-2.5 rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 dark:border-zinc-600 dark:bg-zinc-900">
            <Checkbox
              id="edit-task-completed"
              name="completed"
              checked={values.completed}
              onChange={(e) => update("completed", e.target.checked)}
            />
            <label
              htmlFor="edit-task-completed"
              className="text-sm text-zinc-700 dark:text-zinc-300"
            >
              Mark as completed
            </label>
          </div>
        </Field>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-full sm:w-auto">
            Save changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
