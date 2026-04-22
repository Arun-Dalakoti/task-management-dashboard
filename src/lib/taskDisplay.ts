import type { TaskPriority } from "../types/task";

/** Formats `YYYY-MM-DD` for display (locale-aware, short). */
export function formatDueDate(isoDate: string): string {
  if (!isoDate) return "—";
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  const date = new Date(y, m - 1, d);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function priorityBadgeClass(priority: TaskPriority): string {
  switch (priority) {
    case "low":
      return "bg-low-bg text-low-fg";
    case "medium":
      return "bg-medium-bg text-medium-fg";
    case "high":
      return "bg-high-bg text-high-fg";
    default:
      return "bg-neutral-chip-bg text-neutral-chip-fg";
  }
}

function taskCardPriorityBorder(priority: TaskPriority): string {
  switch (priority) {
    case "high":
      return "border-l-4 border-l-high-border";
    case "medium":
      return "border-l-4 border-l-medium-border";
    case "low":
      return "border-l-4 border-l-low-border";
    default:
      return "";
  }
}

/** List row: color + left accent so completed vs pending scans quickly. */
export function taskListRowClass(completed: boolean): string {
  return [
    "border-l-4 transition-colors",
    completed
      ? "border-l-success-accent bg-success-bg/25 dark:bg-success-bg/15"
      : "border-l-transparent",
  ].join(" ");
}

/** Card layout: priority accent + stronger complete vs pending visuals. */
export function taskCardBaseClass(
  completed: boolean,
  priority: TaskPriority,
  layout: "list" | "card",
): string {
  const base = [
    "rounded-xl border border-border bg-elevated transition-shadow",
    completed
      ? "border-success-border/60 bg-success-toast-bg/50 opacity-95 ring-1 ring-inset ring-success-accent/15 dark:border-success-border/40 dark:bg-success-toast-bg/30 dark:ring-success-accent/25"
      : "shadow-sm",
  ];
  if (layout === "card") {
    base.push(taskCardPriorityBorder(priority));
  }
  return base.join(" ");
}
