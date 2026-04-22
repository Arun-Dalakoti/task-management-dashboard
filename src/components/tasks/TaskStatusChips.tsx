import { useMemo } from "react";
import type { Task } from "../../types/task";
import { getTaskStatusCounts } from "../../lib/taskCounts";

type TaskStatusChipsProps = {
  tasks: Task[];
};

/** Compact inline stats for the “All tasks” row (saves a separate stats bar). */
export function TaskStatusChips({ tasks }: TaskStatusChipsProps) {
  const { total, pending, completed } = useMemo(
    () => getTaskStatusCounts(tasks),
    [tasks],
  );

  return (
    <ul
      className="flex list-none flex-wrap items-center gap-1.5 p-0 sm:gap-2"
      aria-label={`Total ${total}, ${pending} pending, ${completed} completed`}
    >
      <li>
        <span className="inline-flex items-baseline gap-1 rounded-full border border-zinc-200 bg-zinc-50/90 px-2 py-0.5 text-xs tabular-nums dark:border-zinc-600 dark:bg-zinc-800/80">
          <span className="font-medium text-zinc-500 dark:text-zinc-400">
            Total
          </span>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {total}
          </span>
        </span>
      </li>
      <li>
        <span className="inline-flex items-baseline gap-1 rounded-full border border-amber-200/80 bg-amber-50/80 px-2 py-0.5 text-xs tabular-nums dark:border-amber-900/50 dark:bg-amber-950/30">
          <span className="font-medium text-amber-800/80 dark:text-amber-300/90">
            Pending
          </span>
          <span className="font-semibold text-amber-800 dark:text-amber-300">
            {pending}
          </span>
        </span>
      </li>
      <li>
        <span className="inline-flex items-baseline gap-1 rounded-full border border-violet-200/80 bg-violet-50/80 px-2 py-0.5 text-xs tabular-nums dark:border-violet-900/50 dark:bg-violet-950/35">
          <span className="font-medium text-violet-800/80 dark:text-violet-300/90">
            Completed
          </span>
          <span className="font-semibold text-violet-800 dark:text-violet-300">
            {completed}
          </span>
        </span>
      </li>
    </ul>
  );
}
