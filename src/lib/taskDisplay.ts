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
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300";
    case "medium":
      return "bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200";
    case "high":
      return "bg-rose-100 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200";
    default:
      return "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200";
  }
}

export function taskCardBaseClass(completed: boolean): string {
  return [
    "rounded-xl border bg-white transition-shadow dark:bg-zinc-900/40",
    completed
      ? "border-zinc-200 opacity-90 dark:border-zinc-800"
      : "border-zinc-200 shadow-sm dark:border-zinc-800",
  ].join(" ");
}
