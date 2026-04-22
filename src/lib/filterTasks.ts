import type { Task, TaskPriority } from "../types/task";

export type TaskStatusFilter = "all" | "pending" | "completed";

export type TaskPriorityFilter = "all" | TaskPriority;

export type TaskFilterOptions = {
  search: string;
  status: TaskStatusFilter;
  priority: TaskPriorityFilter;
};

export function filterTasks(tasks: Task[], options: TaskFilterOptions): Task[] {
  const q = options.search.trim().toLowerCase();
  return tasks.filter((t) => {
    if (options.status === "pending" && t.completed) return false;
    if (options.status === "completed" && !t.completed) return false;
    if (options.priority !== "all" && t.priority !== options.priority)
      return false;
    if (q) {
      const title = t.title.toLowerCase();
      const desc = t.description.toLowerCase();
      if (!title.includes(q) && !desc.includes(q)) return false;
    }
    return true;
  });
}

export function hasActiveTaskFilters(options: TaskFilterOptions): boolean {
  return (
    options.search.trim() !== "" ||
    options.status !== "all" ||
    options.priority !== "all"
  );
}

/** How many of **status** and **priority** are not “all” (for a Filters button badge; search is separate). */
export function countDimensionFiltersActive(options: TaskFilterOptions): number {
  let n = 0;
  if (options.status !== "all") n += 1;
  if (options.priority !== "all") n += 1;
  return n;
}
