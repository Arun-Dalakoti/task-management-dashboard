import { useEffect, useState } from "react";
import type { NewTaskFields, Task } from "../types/task";
import {
  TASKS_STORAGE_KEY,
  addStoredTask,
  getStoredTasks,
  parseStoredTasks,
  removeStoredTask,
  toggleStoredTaskCompleted,
  updateStoredTask,
  type TaskPatch,
} from "../lib/taskStorage";

type UseTasksResult = {
  tasks: Task[];
  /** Persists to localStorage and updates state. */
  addTask: (fields: NewTaskFields) => Task;
  refresh: () => void;
  /** Flip **Completed** / **Pending** and persist. */
  toggleTaskCompleted: (id: string) => void;
  /** Merge fields into a task and persist. */
  updateTask: (id: string, patch: TaskPatch) => void;
  /** Remove a task and persist. */
  deleteTask: (id: string) => void;
};

/**
 * Tasks backed by localStorage. Listens for `storage` so other tabs stay in sync.
 */
export function useTasks(): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>(() => getStoredTasks());

  function refresh() {
    setTasks(getStoredTasks());
  }

  function addTask(fields: NewTaskFields) {
    const task = addStoredTask(fields);
    setTasks(getStoredTasks());
    return task;
  }

  function toggleTaskCompleted(id: string) {
    toggleStoredTaskCompleted(id);
    setTasks(getStoredTasks());
  }

  function updateTask(id: string, patch: TaskPatch) {
    updateStoredTask(id, patch);
    setTasks(getStoredTasks());
  }

  function deleteTask(id: string) {
    removeStoredTask(id);
    setTasks(getStoredTasks());
  }

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== TASKS_STORAGE_KEY) return;
      if (e.newValue === null) {
        setTasks([]);
        return;
      }
      try {
        setTasks(parseStoredTasks(JSON.parse(e.newValue) as unknown));
      } catch {
        setTasks([]);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { tasks, addTask, refresh, toggleTaskCompleted, updateTask, deleteTask };
}
