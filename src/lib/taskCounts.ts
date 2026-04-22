import type { Task } from "../types/task";

export type TaskStatusCounts = {
  total: number;
  pending: number;
  completed: number;
};

export function getTaskStatusCounts(tasks: Task[]): TaskStatusCounts {
  let pending = 0;
  let completed = 0;
  for (const t of tasks) {
    if (t.completed) completed += 1;
    else pending += 1;
  }
  return { total: tasks.length, pending, completed };
}
