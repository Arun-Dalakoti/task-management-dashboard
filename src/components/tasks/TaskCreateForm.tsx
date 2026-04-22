import { useState, type FormEvent } from "react";
import { Button, Field, Input, Select, TextArea } from "../common";
import {
  TASK_PRIORITIES,
  TASK_PRIORITY_LABELS,
  type NewTaskFields,
  type TaskPriority,
} from "../../types/task";

export type TaskCreateFormProps = {
  onCreateTask?: (task: NewTaskFields) => void;
  /** When `true`, omit outer card and title (e.g. inside a modal that already has a title). */
  embedded?: boolean;
};

const emptyForm: NewTaskFields = {
  title: "",
  description: "",
  priority: "medium",
  dueDate: "",
};

type FormErrors = Partial<Record<keyof NewTaskFields, string>>;

function validate(values: NewTaskFields): FormErrors {
  const errors: FormErrors = {};
  if (!values.title.trim()) {
    errors.title = "Title is required";
  }
  if (!values.dueDate) {
    errors.dueDate = "Due date is required";
  }
  return errors;
}

export function TaskCreateForm({
  onCreateTask,
  embedded = false,
}: TaskCreateFormProps) {
  const [values, setValues] = useState<NewTaskFields>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const update = <K extends keyof NewTaskFields>(
    key: K,
    value: NewTaskFields[K]
  ) => {
    setValues((v) => ({ ...v, [key]: value }));
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
    onCreateTask?.({
      title: values.title.trim(),
      description: values.description.trim(),
      priority: values.priority,
      dueDate: values.dueDate,
    });
    setValues(emptyForm);
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={
        embedded
          ? "space-y-0"
          : "rounded-xl border border-border bg-elevated p-6 shadow-sm"
      }
      noValidate
    >
      {embedded ? null : (
        <h2 className="mb-6 text-lg font-semibold text-fg">
          New task
        </h2>
      )}

      <Field label="Title" htmlFor="task-title" error={errors.title}>
        <Input
          id="task-title"
          name="title"
          value={values.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="What needs to be done?"
          autoComplete="off"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "task-title-error" : undefined}
        />
      </Field>

      <Field
        label="Description"
        htmlFor="task-description"
        hint="Optional details or context"
      >
        <TextArea
          id="task-description"
          name="description"
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Add notes, links, or acceptance criteria…"
        />
      </Field>

      <Field label="Priority" htmlFor="task-priority">
        <Select
          id="task-priority"
          name="priority"
          value={values.priority}
          onChange={(e) => update("priority", e.target.value as TaskPriority)}
        >
          {TASK_PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {TASK_PRIORITY_LABELS[p]}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Due date" htmlFor="task-due" error={errors.dueDate}>
        <Input
          id="task-due"
          name="dueDate"
          type="date"
          value={values.dueDate}
          onChange={(e) => update("dueDate", e.target.value)}
          aria-invalid={Boolean(errors.dueDate)}
          aria-describedby={errors.dueDate ? "task-due-error" : undefined}
        />
      </Field>

      <div
        className={[
          "mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:flex-wrap",
          embedded ? "sm:justify-end" : "",
        ].join(" ")}
      >
        <Button
          type="button"
          variant="secondary"
          className="w-full sm:w-auto"
          onClick={() => {
            setValues(emptyForm);
            setErrors({});
          }}
        >
          Clear
        </Button>
        <Button type="submit" className="w-full sm:w-auto">
          Create task
        </Button>
      </div>
    </form>
  );
}
