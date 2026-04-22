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
        <span className="inline-flex items-baseline gap-1 rounded-full bg-neutral-chip-bg px-2 py-0.5 text-xs tabular-nums">
          <span className="font-medium text-neutral-chip-fg">
            Total
          </span>
          <span className="font-semibold text-neutral-chip-fg">
            {total}
          </span>
        </span>
      </li>
      <li>
        <span className="inline-flex items-baseline gap-1 rounded-full bg-warning-bg px-2 py-0.5 text-xs tabular-nums text-warning-fg">
          <span className="font-medium">Pending</span>
          <span className="font-semibold tabular-nums">{pending}</span>
        </span>
      </li>
      <li>
        <span className="inline-flex items-baseline gap-1 rounded-full bg-brand-soft px-2 py-0.5 text-xs tabular-nums text-brand-fg-muted">
          <span className="font-medium">Completed</span>
          <span className="font-semibold tabular-nums">{completed}</span>
        </span>
      </li>
    </ul>
  );
}
