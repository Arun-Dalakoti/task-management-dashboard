import type { Task } from "../../types/task";
import { TASK_PRIORITY_LABELS, getTaskStatusLabel } from "../../types/task";
import {
  formatDueDate,
  priorityBadgeClass,
  taskCardBaseClass,
} from "../../lib/taskDisplay";
import { Button, Checkbox } from "../common";

type TaskItemProps = {
  task: Task;
  onToggleCompleted: (id: string) => void;
  onEditTask: (task: Task) => void;
  onRequestDeleteTask: (task: Task) => void;
  variant: "list" | "card";
};

export function TaskItem({
  task,
  onToggleCompleted,
  onEditTask,
  onRequestDeleteTask,
  variant,
}: TaskItemProps) {
  const statusLabel = getTaskStatusLabel(task);

  const body = (
    <div className="flex gap-3">
      <Checkbox
        checked={task.completed}
        onChange={() => onToggleCompleted(task.id)}
        aria-label={
          task.completed ? "Mark task as pending" : "Mark task as completed"
        }
        className="mt-1"
      />
      <div className="min-w-0 flex-1">
        <h3
          className={[
            "text-base font-semibold text-zinc-900 dark:text-zinc-50",
            task.completed ? "line-through opacity-70" : "",
          ].join(" ")}
        >
          {task.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {task.description ? (
            task.description
          ) : (
            <span className="italic text-zinc-400 dark:text-zinc-500">
              No description
            </span>
          )}
        </p>
        <dl className="mt-3 flex flex-col gap-2 text-xs sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <dt className="sr-only">Priority</dt>
            <dd>
              <span
                className={[
                  "inline-flex items-center rounded-full px-2.5 py-0.5 font-medium",
                  priorityBadgeClass(task.priority),
                ].join(" ")}
              >
                {TASK_PRIORITY_LABELS[task.priority]}
              </span>
            </dd>
            <dt className="sr-only">Status</dt>
            <dd>
              <span
                className={[
                  "inline-flex items-center rounded-full px-2.5 py-0.5 font-medium",
                  task.completed
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
                ].join(" ")}
              >
                {statusLabel}
              </span>
            </dd>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
            <dt className="font-medium text-zinc-500 dark:text-zinc-500">
              Due
            </dt>
            <dd className="font-normal tabular-nums">
              {formatDueDate(task.dueDate)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );

  const editActions = (
    <>
      <Button
        type="button"
        variant="danger"
        aria-label="Delete task"
        className="size-9 shrink-0 p-0 text-base leading-none sm:size-auto sm:px-3 sm:py-2 sm:text-xs sm:font-medium sm:leading-normal"
        onClick={() => onRequestDeleteTask(task)}
      >
        <span className="sm:hidden" aria-hidden>
          ✕
        </span>
        <span className="hidden sm:inline">Delete</span>
      </Button>
      <Button
        type="button"
        variant="secondary"
        aria-label="Edit task"
        className="size-9 shrink-0 !border-sky-300 !bg-white p-0 text-base leading-none !text-sky-800 shadow-sm hover:!bg-sky-50 focus-visible:outline-sky-500 dark:!border-sky-700 dark:!bg-zinc-900 dark:!text-sky-300 dark:hover:!bg-sky-950/45 sm:size-auto sm:px-3 sm:py-2 sm:text-xs sm:font-medium sm:leading-normal"
        onClick={() => onEditTask(task)}
      >
        <span className="sm:hidden" aria-hidden>
          ✎
        </span>
        <span className="hidden sm:inline">Edit</span>
      </Button>
    </>
  );

  const editBar =
    variant === "card" ? (
      <div className="mt-auto w-full">
        <div className="mt-3 flex flex-nowrap items-center justify-end gap-1.5 border-t border-zinc-200 pt-3 dark:border-zinc-800 sm:gap-2">
          {editActions}
        </div>
      </div>
    ) : (
      <div className="mt-3 flex flex-nowrap items-center justify-end gap-1.5 sm:gap-2">
        {editActions}
      </div>
    );

  if (variant === "card") {
    return (
      <article
        className={[
          taskCardBaseClass(task.completed, task.priority, "card"),
          "flex h-full flex-col p-4 sm:p-5",
        ].join(" ")}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-0">
          {body}
          {editBar}
        </div>
      </article>
    );
  }

  return (
    <div className="py-1">
      {body}
      {editBar}
    </div>
  );
}
