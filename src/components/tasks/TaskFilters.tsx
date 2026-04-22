import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronDownIcon, FunnelIcon } from "../../icons";
import { Input } from "../common/Input";
import type { TaskPriority } from "../../types/task";
import { TASK_PRIORITIES, TASK_PRIORITY_LABELS } from "../../types/task";
import { countDimensionFiltersActive } from "../../lib/filterTasks";
import type {
  TaskFilterOptions,
  TaskPriorityFilter,
  TaskStatusFilter,
} from "../../lib/filterTasks";

export type TaskFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  status: TaskStatusFilter;
  onStatusChange: (value: TaskStatusFilter) => void;
  priority: TaskPriorityFilter;
  onPriorityChange: (value: TaskPriorityFilter) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
};

const segmentWrap =
  "inline-flex w-full flex-wrap gap-1.5 rounded-lg border border-zinc-200 bg-zinc-100/80 p-1 dark:border-zinc-700 dark:bg-zinc-900/80";

const segmentBtn = (active: boolean) =>
  [
    "rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:py-2 sm:text-sm",
    active
      ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
  ].join(" ");

const filterGroupTitle =
  "mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-300 sm:text-sm";

function filterOptionsToSnapshot(
  search: string,
  status: TaskStatusFilter,
  priority: TaskPriorityFilter,
): TaskFilterOptions {
  return { search, status, priority };
}

export function TaskFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  onClearFilters,
  hasActiveFilters,
}: TaskFiltersProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const panelId = `task-filters-panel-${id}`;
  const searchId = `task-search-${id}`;

  const filterSnapshot = filterOptionsToSnapshot(
    search,
    status,
    priority,
  );
  const dimensionCount = countDimensionFiltersActive(filterSnapshot);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onDown = (e: MouseEvent) => {
      const el = containerRef.current;
      if (el && !el.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open, close]);

  return (
    <div
      ref={containerRef}
      className="relative rounded-xl border border-zinc-200 bg-white p-2 dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-3"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-2">
        <div className="min-w-0 flex-1">
          <label htmlFor={searchId} className="sr-only">
            Search tasks
          </label>
          <Input
            id={searchId}
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks…"
            autoComplete="off"
            aria-label="Search tasks by title or description"
          />
        </div>
        <div className="flex shrink-0 gap-2 sm:items-center">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-800 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 sm:w-auto"
            aria-expanded={open}
            aria-controls={panelId}
            aria-haspopup="true"
            id={`${panelId}-trigger`}
          >
            <FunnelIcon
              className="h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400"
              aria-hidden
            />
            <span>Filters</span>
            {dimensionCount > 0 ? (
              <span className="inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-violet-600 px-1.5 py-0.5 text-[0.7rem] font-semibold leading-none text-white tabular-nums dark:bg-violet-500">
                {dimensionCount}
              </span>
            ) : null}
            <ChevronDownIcon
              className={[
                "h-4 w-4 shrink-0 text-zinc-500 transition-transform dark:text-zinc-400",
                open ? "rotate-180" : "",
              ].join(" ")}
              aria-hidden
            />
          </button>
        </div>
      </div>

      {open ? (
        <div
          id={panelId}
          role="region"
          aria-label="Filter options"
          className="absolute left-0 right-0 top-full z-30 mt-2 max-h-[min(70vh,28rem)] overflow-y-auto rounded-xl border border-zinc-200 bg-white p-3 shadow-lg ring-1 ring-black/5 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-white/5 sm:left-auto sm:right-0 sm:w-96"
        >
          <div className="grid gap-4">
            <div>
              <span className={filterGroupTitle} id={`${panelId}-status`}>
                Status
              </span>
              <div
                className={segmentWrap}
                role="group"
                aria-labelledby={`${panelId}-status`}
              >
                {(
                  [
                    ["all", "All"],
                    ["pending", "Pending"],
                    ["completed", "Completed"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className={segmentBtn(status === value)}
                    aria-pressed={status === value}
                    onClick={() => onStatusChange(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className={filterGroupTitle} id={`${panelId}-priority`}>
                Priority
              </span>
              <div
                className={segmentWrap}
                role="group"
                aria-labelledby={`${panelId}-priority`}
              >
                <button
                  type="button"
                  className={segmentBtn(priority === "all")}
                  aria-pressed={priority === "all"}
                  onClick={() => onPriorityChange("all")}
                >
                  All
                </button>
                {TASK_PRIORITIES.map((p: TaskPriority) => (
                  <button
                    key={p}
                    type="button"
                    className={segmentBtn(priority === p)}
                    aria-pressed={priority === p}
                    onClick={() => onPriorityChange(p)}
                  >
                    {TASK_PRIORITY_LABELS[p]}
                  </button>
                ))}
              </div>
            </div>

            {hasActiveFilters ? (
              <button
                type="button"
                onClick={() => {
                  onClearFilters();
                  setOpen(false);
                }}
                className="w-full rounded-lg border border-zinc-200 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Clear all filters
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
