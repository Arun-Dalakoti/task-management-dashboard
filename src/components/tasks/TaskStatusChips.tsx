import type { Task } from "../../types/task";
import { getTaskStatusCounts } from "../../lib/taskCounts";

type TaskStatusChipsProps = {
  tasks: Task[];
};

/** Compact inline stats for the “All tasks” row (saves a separate stats bar). */
export function TaskStatusChips({ tasks }: TaskStatusChipsProps) {
  const { total, pending, completed } = getTaskStatusCounts(tasks);

  return (
    <ul
      className="flex list-none flex-wrap items-center gap-1.5 p-0 sm:gap-2"
      aria-label={`Total ${total}, ${pending} pending, ${completed} completed`}
    >
      <li>
        <span className="inline-flex items-baseline gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs tabular-nums dark:bg-zinc-800">
          <span className="font-medium text-zinc-600 dark:text-zinc-300">
            Total
          </span>
          <span className="font-semibold text-zinc-600 dark:text-zinc-300">
            {total}
          </span>
        </span>
      </li>
      <li>
        <span className="inline-flex items-baseline gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs tabular-nums text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
          <span className="font-medium">Pending</span>
          <span className="font-semibold tabular-nums">{pending}</span>
        </span>
      </li>
      <li>
        <span className="inline-flex items-baseline gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-xs tabular-nums text-violet-700 dark:bg-violet-900/50 dark:text-violet-400">
          <span className="font-medium">Completed</span>
          <span className="font-semibold tabular-nums">{completed}</span>
        </span>
      </li>
    </ul>
  );
}
