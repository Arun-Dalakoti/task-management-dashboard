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
      return "bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400";
    case "medium":
      return "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400";
    case "high":
      return "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400";
    default:
      return "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200";
  }
}

function taskCardPriorityBorder(priority: TaskPriority): string {
  switch (priority) {
    case "high":
      return "border-l-4 border-l-red-400";
    case "medium":
      return "border-l-4 border-l-orange-400";
    case "low":
      return "border-l-4 border-l-sky-400";
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
    "rounded-xl border border-zinc-200 bg-white transition-shadow dark:border-zinc-800 dark:bg-zinc-900",
    completed
      ? "opacity-90"
      : "shadow-sm",
  ];
  if (layout === "card") {
    base.push(taskCardPriorityBorder(priority));
  }
  return base.join(" ");
}
