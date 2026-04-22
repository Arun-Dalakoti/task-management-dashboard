import { useEffect, useState } from "react";

export const TASK_VIEW_STORAGE_KEY = "dashboard-task-view";

export type TaskViewMode = "list" | "card";

function readMode(): TaskViewMode {
  if (typeof localStorage === "undefined") return "list";
  const v = localStorage.getItem(TASK_VIEW_STORAGE_KEY);
  return v === "card" ? "card" : "list";
}

export function useTaskViewMode(): {
  mode: TaskViewMode;
  setMode: (mode: TaskViewMode) => void;
} {
  const [mode, setModeState] = useState<TaskViewMode>(() => readMode());

  const setMode = (next: TaskViewMode) => {
    setModeState(next);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(TASK_VIEW_STORAGE_KEY, next);
    }
  };

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== TASK_VIEW_STORAGE_KEY || e.newValue === null) return;
      setModeState(e.newValue === "card" ? "card" : "list");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { mode, setMode };
}
