import { useEffect, useId, useRef, useState } from "react";
import {
  ChevronDownIcon,
  CloseIcon,
  FunnelIcon,
  SearchIcon,
} from "../../icons";
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
  "inline-flex w-full flex-wrap gap-1.5 rounded-lg border border-brand-track-border bg-brand-track p-0.5";

const segmentBtn = (active: boolean) =>
  [
    "rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus sm:px-3 sm:py-2 sm:text-sm",
    active
      ? "bg-brand text-brand-on shadow-sm shadow-brand"
      : "text-brand-fg-muted hover:bg-segment-hover",
  ].join(" ");

const filterGroupTitle =
  "mb-1.5 block text-xs font-medium text-fg-muted sm:text-sm";

const filtersBarSurface =
  "relative z-20 rounded-2xl border border-brand-track-border bg-gradient-to-br from-brand-track via-elevated to-elevated p-3 shadow-md shadow-black/[0.04] ring-1 ring-ring-subtle sm:p-3.5 dark:shadow-black/35";

const searchFieldShell =
  "group relative flex min-h-10 min-w-0 flex-1 items-center rounded-xl border border-brand-track-border/90 bg-elevated/95 shadow-[inset_0_1px_2px_rgb(0_0_0/0.04)] backdrop-blur-[2px] transition-[border-color,box-shadow] focus-within:border-focus focus-within:shadow-[inset_0_1px_2px_rgb(0_0_0/0.04),0_0_0_3px_rgb(139_92_246/0.18)] dark:border-brand-track-border dark:bg-elevated/75 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.25)] dark:focus-within:shadow-[inset_0_1px_2px_rgb(0_0_0/0.25),0_0_0_3px_rgb(167_139_250/0.22)]";

const searchInputClass =
  "border-0 bg-transparent py-2.5 pl-10 shadow-none ring-0 placeholder:text-placeholder focus:border-0 focus:shadow-none focus:ring-0 focus-visible:outline-none disabled:opacity-60";

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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: MouseEvent) => {
      const el = containerRef.current;
      if (el && !el.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={filtersBarSurface}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl bg-[radial-gradient(120%_80%_at_0%_-20%,rgb(124_58_237/0.08),transparent_55%)] dark:bg-[radial-gradient(120%_80%_at_0%_-20%,rgb(139_92_246/0.12),transparent_55%)]" />
      <div className="relative flex flex-col gap-2.5 sm:flex-row sm:items-stretch sm:gap-3">
        <div className={searchFieldShell}>
          <label htmlFor={searchId} className="sr-only">
            Search tasks
          </label>
          <SearchIcon
            className="pointer-events-none absolute left-3 top-1/2 h-[1.125rem] w-[1.125rem] -translate-y-1/2 text-fg-subtle transition-colors group-focus-within:text-brand sm:left-3.5"
            aria-hidden
          />
          <Input
            id={searchId}
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks…"
            autoComplete="off"
            aria-label="Search tasks by title or description"
            className={[
              searchInputClass,
              search.trim() ? "pr-10" : "pr-3",
            ].join(" ")}
          />
          {search.trim() ? (
            <button
              type="button"
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-fg-subtle transition-colors hover:bg-secondary-hover hover:text-fg"
              aria-label="Clear search"
              onClick={() => onSearchChange("")}
            >
              <CloseIcon className="h-4 w-4" aria-hidden />
            </button>
          ) : null}
        </div>
        <div className="flex shrink-0 gap-2 sm:items-center">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={[
              "inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border px-3 text-sm font-medium shadow-sm transition-[border-color,box-shadow,background-color] sm:w-auto",
              open
                ? "border-focus/50 bg-brand-track text-brand-fg-muted shadow-[inset_0_1px_2px_rgb(0_0_0/0.04),0_0_0_3px_rgb(139_92_246/0.15)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.2),0_0_0_3px_rgb(167_139_250/0.18)]"
                : "border-brand-track-border/90 bg-elevated/95 text-secondary-fg backdrop-blur-[2px] hover:border-brand-track-border hover:bg-secondary-hover dark:bg-elevated/75",
            ].join(" ")}
            aria-expanded={open}
            aria-controls={panelId}
            aria-haspopup="true"
            id={`${panelId}-trigger`}
          >
            <FunnelIcon
              className={[
                "h-4 w-4 shrink-0 transition-colors",
                open ? "text-brand" : "text-fg-subtle",
              ].join(" ")}
              aria-hidden
            />
            <span>Filters</span>
            {dimensionCount > 0 ? (
              <span className="inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-brand px-1.5 py-0.5 text-[0.7rem] font-semibold leading-none text-brand-on tabular-nums">
                {dimensionCount}
              </span>
            ) : null}
            <ChevronDownIcon
              className={[
                "h-4 w-4 shrink-0 text-fg-subtle transition-transform",
                open ? "rotate-180" : "",
              ].join(" ")}
              aria-hidden
            />
          </button>
        </div>
      </div>

      <div
        id={panelId}
        role="region"
        aria-label="Filter options"
        aria-hidden={!open}
        inert={!open}
        className={[
          "absolute left-0 right-0 top-full z-50 mt-2 max-h-[min(70vh,28rem)] origin-top overflow-y-auto rounded-2xl border border-brand-track-border bg-gradient-to-b from-brand-track/80 to-elevated p-1 shadow-xl shadow-black/10 ring-1 ring-ring-subtle transition-[transform,opacity,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-brand-track/50 dark:shadow-black/40 sm:left-auto sm:right-0 sm:w-96",
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible pointer-events-none -translate-y-2 scale-[0.98] opacity-0",
        ].join(" ")}
      >
          <div className="rounded-xl bg-elevated/90 p-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] dark:bg-elevated/95 dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.04)]">
            <p className="mb-3 border-b border-border pb-2 text-xs font-semibold uppercase tracking-wide text-fg-subtle">
              Refine results
            </p>
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
                className="w-full rounded-xl border border-border py-2.5 text-sm font-medium text-fg-label transition-colors hover:border-border-strong hover:bg-secondary-hover"
              >
                Clear all filters
              </button>
            ) : null}
          </div>
          </div>
        </div>
    </div>
  );
}
