import type { CSSProperties } from "react";
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
  /** Card layout: entrance animation class (e.g. `task-card-enter`) + optional delay on `style`. */
  entranceClassName?: string;
  entranceStyle?: CSSProperties;
};

export function TaskItem({
  task,
  onToggleCompleted,
  onEditTask,
  onRequestDeleteTask,
  variant,
  entranceClassName = "",
  entranceStyle,
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
            "text-base font-semibold transition-colors",
            task.completed
              ? "text-fg-muted line-through decoration-fg-muted decoration-2 opacity-80"
              : "text-fg",
          ].join(" ")}
        >
          {task.title}
        </h3>
        <p
          className={[
            "mt-1.5 text-sm leading-relaxed transition-colors",
            task.completed
              ? "text-fg-subtle line-through decoration-fg-subtle/60 opacity-75"
              : "text-fg-muted",
          ].join(" ")}
        >
          {task.description ? (
            task.description
          ) : (
            <span
              className={[
                "italic",
                task.completed ? "text-fg-subtle/80" : "text-fg-subtle",
              ].join(" ")}
            >
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
                  "inline-flex items-center rounded-full px-2.5 py-0.5 font-medium transition-opacity",
                  priorityBadgeClass(task.priority),
                  task.completed ? "opacity-75" : "",
                ].join(" ")}
              >
                {TASK_PRIORITY_LABELS[task.priority]}
              </span>
            </dd>
            <dt className="sr-only">Status</dt>
            <dd>
              <span
                className={[
                  "inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ring-1 ring-inset transition-colors",
                  task.completed
                    ? "bg-success-bg text-success-fg ring-success-accent/35"
                    : "bg-warning-bg text-warning-fg ring-warning-fg/20",
                ].join(" ")}
              >
                {statusLabel}
              </span>
            </dd>
          </div>
          <div
            className={[
              "flex items-center gap-1.5 tabular-nums transition-opacity",
              task.completed ? "text-fg-subtle opacity-70" : "text-fg-muted",
            ].join(" ")}
          >
            <dt className="font-medium text-fg-subtle">Due</dt>
            <dd
              className={[
                "font-normal",
                task.completed ? "line-through decoration-fg-subtle/50" : "",
              ].join(" ")}
            >
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
        className="size-9 shrink-0 !border-info-border !bg-secondary-bg p-0 text-base leading-none !text-info-fg shadow-sm hover:!bg-info-hover focus-visible:outline-focus sm:size-auto sm:px-3 sm:py-2 sm:text-xs sm:font-medium sm:leading-normal"
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
        <div className="mt-3 flex flex-nowrap items-center justify-end gap-1.5 border-t border-border pt-3 sm:gap-2">
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
          "flex h-full min-h-0 flex-col p-4 sm:p-5",
          entranceClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        style={entranceStyle}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-0">
          {body}
          {editBar}
        </div>
      </article>
    );
  }

  return (
    <div className="min-w-0">
      {body}
      {editBar}
    </div>
  );
}
