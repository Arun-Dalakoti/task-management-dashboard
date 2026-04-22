import type { NewTaskFields, Task, TaskPriority } from "../types/task";
import { TASK_PRIORITIES } from "../types/task";

/** localStorage key for persisted tasks (shared across the app). */
export const TASKS_STORAGE_KEY = "dashboard-tasks";

function isTaskPriority(value: unknown): value is TaskPriority {
  return (
    typeof value === "string" &&
    (TASK_PRIORITIES as readonly string[]).includes(value)
  );
}

function isTaskShape(o: Record<string, unknown>): boolean {
  return (
    typeof o.id === "string" &&
    typeof o.title === "string" &&
    typeof o.description === "string" &&
    isTaskPriority(o.priority) &&
    typeof o.dueDate === "string" &&
    typeof o.createdAt === "string" &&
    (o.completed === undefined ||
      typeof o.completed === "boolean")
  );
}

function toTask(value: unknown): Task | null {
  if (!value || typeof value !== "object") return null;
  const o = value as Record<string, unknown>;
  if (!isTaskShape(o)) return null;
  return {
    id: o.id as string,
    title: o.title as string,
    description: o.description as string,
    priority: o.priority as TaskPriority,
    dueDate: o.dueDate as string,
    createdAt: o.createdAt as string,
    completed: typeof o.completed === "boolean" ? o.completed : false,
  };
}

/** Parse JSON value into tasks; returns [] if invalid or corrupted. */
export function parseStoredTasks(raw: unknown): Task[] {
  if (!Array.isArray(raw)) return [];
  const out: Task[] = [];
  for (const item of raw) {
    const task = toTask(item);
    if (task) out.push(task);
  }
  return out;
}

/** Read tasks from localStorage. Safe in SSR: returns [] when `localStorage` is missing. */
export function getStoredTasks(): Task[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const json = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!json) return [];
    return parseStoredTasks(JSON.parse(json) as unknown);
  } catch {
    return [];
  }
}

/** Replace all tasks in localStorage. */
export function setStoredTasks(tasks: Task[]): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // QuotaExceededError or private mode — caller may surface UI if needed
  }
}

/** Build a task row without persisting (useful for tests or optimistic UI). */
export function createTask(fields: NewTaskFields): Task {
  return {
    ...fields,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    completed: false,
  };
}

/** Append a new task to the front of the list and persist. Returns the created task. */
export function addStoredTask(fields: NewTaskFields): Task {
  const task = createTask(fields);
  const next = [task, ...getStoredTasks()];
  setStoredTasks(next);
  return task;
}

export type TaskPatch = Partial<NewTaskFields & Pick<Task, "completed">>;

/** Update a task by id. Returns the updated task or null if not found. */
export function updateStoredTask(id: string, patch: TaskPatch): Task | null {
  const tasks = getStoredTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;
  const prev = tasks[index];
  const nextTask: Task = {
    ...prev,
    ...patch,
    id: prev.id,
    createdAt: prev.createdAt,
  };
  const next = [...tasks];
  next[index] = nextTask;
  setStoredTasks(next);
  return nextTask;
}

/** Toggle **Completed** / **Pending**. Returns updated task or null. */
export function toggleStoredTaskCompleted(id: string): Task | null {
  const tasks = getStoredTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  return updateStoredTask(id, { completed: !task.completed });
}

/** Remove a task by id. Returns true if something was removed. */
export function removeStoredTask(id: string): boolean {
  const tasks = getStoredTasks();
  const next = tasks.filter((t) => t.id !== id);
  if (next.length === tasks.length) return false;
  setStoredTasks(next);
  return true;
}

/** Remove every task from storage. */
export function clearStoredTasks(): void {
  setStoredTasks([]);
}
