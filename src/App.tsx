import { useEffect, useMemo, useState } from "react";
import { Button } from "./components/common/Button";
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
  type TaskPriorityFilter,
  type TaskStatusFilter,
} from "./lib/filterTasks";
import { useMinWidthSm } from "./hooks/useMinWidthSm";
import { useTaskViewMode } from "./hooks/useTaskViewMode";
import { useTasks } from "./hooks/useTasks";
import type { Task } from "./types/task";

function App() {
  const { tasks, addTask, toggleTaskCompleted, updateTask, deleteTask } =
    useTasks();
  const { mode, setMode } = useTaskViewMode();
  const isWideLayout = useMinWidthSm();
  const taskLayoutMode: "list" | "card" =
    isWideLayout && mode === "card" ? "card" : "list";
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskPendingDelete, setTaskPendingDelete] = useState<Task | null>(
    null,
  );
  const [filterSearch, setFilterSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<TaskStatusFilter>("all");
  const [filterPriority, setFilterPriority] =
    useState<TaskPriorityFilter>("all");
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [createFormKey, setCreateFormKey] = useState(0);

  const openCreateTaskModal = () => {
    setCreateFormKey((k) => k + 1);
    setCreateTaskOpen(true);
  };

  const filterOptions = useMemo(
    () => ({
      search: filterSearch,
      status: filterStatus,
      priority: filterPriority,
    }),
    [filterSearch, filterStatus, filterPriority],
  );

  const filteredTasks = useMemo(
    () => filterTasks(tasks, filterOptions),
    [tasks, filterOptions],
  );

  const filtersActive = hasActiveTaskFilters(filterOptions);

  const clearFilters = () => {
    setFilterSearch("");
    setFilterStatus("all");
    setFilterPriority("all");
  };

  useEffect(() => {
    if (
      editingTask &&
      !tasks.some((t) => t.id === editingTask.id)
    ) {
      setEditingTask(null);
    }
  }, [editingTask, tasks]);

  useEffect(() => {
    if (
      taskPendingDelete &&
      !tasks.some((t) => t.id === taskPendingDelete.id)
    ) {
      setTaskPendingDelete(null);
    }
  }, [taskPendingDelete, tasks]);

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-2 px-4 sm:h-16 sm:gap-3 sm:px-6">
          <h1 className="min-w-0 truncate text-base font-semibold tracking-tight text-zinc-900 sm:text-lg dark:text-zinc-50">
            Task Dashboard
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
                      className="text-base font-semibold text-zinc-900 dark:text-zinc-50"
                    >
                      All tasks
                    </h2>
                    {tasks.length > 0 ? (
                      <>
                        <span
                          className="select-none text-zinc-300 dark:text-zinc-600"
                          aria-hidden
                        >
                          ·
                        </span>
                        <p className="m-0 text-sm text-zinc-500 dark:text-zinc-400">
                          {filtersActive
                            ? `${filteredTasks.length} of ${tasks.length} shown`
                            : `${tasks.length} saved`}
                        </p>
                        <span
                          className="select-none text-zinc-300 dark:text-zinc-600"
                          aria-hidden
                        >
                          ·
                        </span>
                        <TaskStatusChips tasks={tasks} />
                      </>
                    ) : null}
                  </div>
                  {tasks.length === 0 ? (
                    <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                      Nothing to show yet
                    </p>
                  ) : null}
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
                    search={filterSearch}
                    onSearchChange={setFilterSearch}
                    status={filterStatus}
                    onStatusChange={setFilterStatus}
                    priority={filterPriority}
                    onPriorityChange={setFilterPriority}
                    onClearFilters={clearFilters}
                    hasActiveFilters={filtersActive}
                  />
                </div>
                {filteredTasks.length === 0 ? (
                  <TaskNoMatches onClearFilters={clearFilters} />
                ) : taskLayoutMode === "list" ? (
                  <TaskListView
                    tasks={filteredTasks}
                    onToggleCompleted={toggleTaskCompleted}
                    onEditTask={setEditingTask}
                    onRequestDeleteTask={setTaskPendingDelete}
                  />
                ) : (
                  <TaskCardView
                    tasks={filteredTasks}
                    onToggleCompleted={toggleTaskCompleted}
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
        isOpen={createTaskOpen}
        onClose={() => setCreateTaskOpen(false)}
        formKey={createFormKey}
        onCreateTask={addTask}
      />

      <TaskEditModal
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={(id, patch) => {
          updateTask(id, patch);
        }}
      />

      <ConfirmDialog
        isOpen={taskPendingDelete !== null}
        title="Delete this task?"
        description={
          taskPendingDelete ? (
            <>
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
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
          if (editingTask?.id === taskPendingDelete.id) {
            setEditingTask(null);
          }
        }}
      />
    </div>
  );
}

export default App;
