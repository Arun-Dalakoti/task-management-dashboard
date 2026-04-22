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

/** List layout: no side accent. Card layout: left accent by task priority. */
export function taskCardBaseClass(
  completed: boolean,
  priority: TaskPriority,
  layout: "list" | "card",
): string {
  const base = [
    "rounded-xl border border-border bg-elevated transition-shadow",
    completed
      ? "opacity-90"
      : "shadow-sm",
  ];
  if (layout === "card") {
    base.push(taskCardPriorityBorder(priority));
  }
  return base.join(" ");
}
