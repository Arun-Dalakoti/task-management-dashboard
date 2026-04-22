import { useRef, useState } from "react";
import { Button } from "./components/common/Button";
import { useToast } from "./components/common";
import { ConfirmDialog } from "./components/common/ConfirmDialog";
import { ThemeToggle } from "./components/ThemeToggle";
import { TaskCardView } from "./components/tasks/TaskCardView";
import { TaskCreateModal } from "./components/tasks/TaskCreateModal";
import { TaskEditModal } from "./components/tasks/TaskEditModal";
import {
  TaskEmptyState,
  TaskNoMatches,
} from "./components/tasks/TaskEmptyState";
import { TaskFilters } from "./components/tasks/TaskFilters";
import { TaskListView } from "./components/tasks/TaskListView";
import { TaskStatusChips } from "./components/tasks/TaskStatusChips";
import { TaskViewToggle } from "./components/tasks/TaskViewToggle";
import {
  filterTasks,
  hasActiveTaskFilters,
  type TaskFilterOptions,
} from "./lib/filterTasks";
import { useMinWidthSm } from "./hooks/useMinWidthSm";
import { useTaskViewMode } from "./hooks/useTaskViewMode";
import { useTasks } from "./hooks/useTasks";
import type { NewTaskFields, Task } from "./types/task";

function App() {
  const { showToast } = useToast();
  const { tasks, addTask, toggleTaskCompleted, updateTask, deleteTask } =
    useTasks();
  const { mode, setMode } = useTaskViewMode();
  const isWideLayout = useMinWidthSm();

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskPendingDelete, setTaskPendingDelete] = useState<Task | null>(null);
  const [filters, setFilters] = useState<TaskFilterOptions>({
    search: "",
    status: "all",
    priority: "all",
  });
  const createModalKeySeq = useRef(0);
  const [createModalKey, setCreateModalKey] = useState<number | null>(null);

  const taskLayoutMode: "list" | "card" =
    isWideLayout && mode === "card" ? "card" : "list";

  const openCreateTaskModal = () => {
    createModalKeySeq.current += 1;
    setCreateModalKey(createModalKeySeq.current);
  };

  const filteredTasks = filterTasks(tasks, filters);

  const filtersActive = hasActiveTaskFilters(filters);

  const clearFilters = () => {
    setFilters({ search: "", status: "all", priority: "all" });
  };

  const handleAddTask = (fields: NewTaskFields) => {
    addTask(fields);
    showToast("Task created", "success");
  };

  const handleToggleCompleted = (id: string) => {
    const current = tasks.find((t) => t.id === id);
    const wasCompleted = current?.completed ?? false;
    toggleTaskCompleted(id);
    if (wasCompleted) {
      showToast("Task marked as pending", "default");
    } else {
      showToast("Task marked as complete", "success");
    }
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-header-border bg-header-bg backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-2 px-4 sm:h-16 sm:gap-3 sm:px-6">
          <h1 className="min-w-0 truncate text-base font-semibold tracking-tight text-fg sm:text-lg">
            Dashboard
          </h1>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              onClick={openCreateTaskModal}
              className="px-3 py-2 text-sm sm:px-4"
            >
              Add task
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-6 lg:gap-8">
          <section className="min-w-0" aria-labelledby="tasks-heading">
            <div className="mb-4 sm:mb-5">
              <div className="flex min-w-0 items-center justify-between gap-3">
                <div className="min-w-0 flex-1 pr-1">
                  <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5 [line-height:1.35]">
                    <h2
                      id="tasks-heading"
                      className="text-base font-semibold text-fg"
                    >
                      All tasks
                    </h2>
                    {tasks.length > 0 ? (
                      <TaskStatusChips tasks={tasks} />
                    ) : null}
                  </div>
                </div>
                {tasks.length > 0 && isWideLayout ? (
                  <TaskViewToggle value={mode} onChange={setMode} />
                ) : null}
              </div>
            </div>

            {tasks.length === 0 ? (
              <TaskEmptyState />
            ) : (
              <>
                <div className="mb-4 sm:mb-5">
                  <TaskFilters
                    search={filters.search}
                    onSearchChange={(value) =>
                      setFilters((f) => ({ ...f, search: value }))
                    }
                    status={filters.status}
                    onStatusChange={(value) =>
                      setFilters((f) => ({ ...f, status: value }))
                    }
                    priority={filters.priority}
                    onPriorityChange={(value) =>
                      setFilters((f) => ({ ...f, priority: value }))
                    }
                    onClearFilters={clearFilters}
                    hasActiveFilters={filtersActive}
                  />
                </div>
                {filteredTasks.length === 0 ? (
                  <TaskNoMatches onClearFilters={clearFilters} />
                ) : taskLayoutMode === "list" ? (
                  <TaskListView
                    tasks={filteredTasks}
                    onToggleCompleted={handleToggleCompleted}
                    onEditTask={setEditingTask}
                    onRequestDeleteTask={setTaskPendingDelete}
                  />
                ) : (
                  <TaskCardView
                    tasks={filteredTasks}
                    onToggleCompleted={handleToggleCompleted}
                    onEditTask={setEditingTask}
                    onRequestDeleteTask={setTaskPendingDelete}
                  />
                )}
              </>
            )}
          </section>
        </div>
      </main>

      <TaskCreateModal
        isOpen={createModalKey !== null}
        onClose={() => setCreateModalKey(null)}
        formKey={createModalKey ?? 0}
        onCreateTask={handleAddTask}
      />

      <TaskEditModal
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={(id, patch) => {
          updateTask(id, patch);
          showToast("Task updated", "success");
        }}
      />

      <ConfirmDialog
        isOpen={taskPendingDelete !== null}
        title="Delete this task?"
        description={
          taskPendingDelete ? (
            <>
              <span className="font-medium text-secondary-fg">
                {taskPendingDelete.title}
              </span>{" "}
              will be removed permanently from this browser. This cannot be
              undone.
            </>
          ) : null
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onCancel={() => setTaskPendingDelete(null)}
        onConfirm={() => {
          if (!taskPendingDelete) return;
          deleteTask(taskPendingDelete.id);
          showToast("Task deleted", "destructive");
          if (editingTask?.id === taskPendingDelete.id) {
            setEditingTask(null);
          }
        }}
      />
    </div>
  );
}

export default App;
