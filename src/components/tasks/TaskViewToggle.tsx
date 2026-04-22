import { GridViewIcon, ListViewIcon } from "../../icons";
import type { TaskViewMode } from "../../hooks/useTaskViewMode";

type TaskViewToggleProps = {
  value: TaskViewMode;
  onChange: (mode: TaskViewMode) => void;
  className?: string;
};

const baseBtn =
  "inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-violet-500 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm";

export function TaskViewToggle({
  value,
  onChange,
  className = "",
}: TaskViewToggleProps) {
  return (
    <div
      className={[
        "inline-flex w-auto shrink-0 rounded-lg border border-violet-200 bg-violet-50 p-0.5 dark:border-violet-800 dark:bg-violet-950/60",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="group"
      aria-label="Task layout"
    >
      <button
        type="button"
        onClick={() => onChange("list")}
        className={[
          baseBtn,
          value === "list"
            ? "bg-violet-600 text-white shadow-sm shadow-violet-600/25 dark:bg-violet-500 dark:shadow-violet-500/20"
            : "text-violet-900 hover:bg-violet-100/90 dark:text-violet-200 dark:hover:bg-violet-900/70",
        ].join(" ")}
        aria-pressed={value === "list"}
      >
        <ListViewIcon
          className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
          aria-hidden
        />
        <span>List</span>
      </button>
      <button
        type="button"
        onClick={() => onChange("card")}
        className={[
          baseBtn,
          value === "card"
            ? "bg-violet-600 text-white shadow-sm shadow-violet-600/25 dark:bg-violet-500 dark:shadow-violet-500/20"
            : "text-violet-900 hover:bg-violet-100/90 dark:text-violet-200 dark:hover:bg-violet-900/70",
        ].join(" ")}
        aria-pressed={value === "card"}
      >
        <GridViewIcon
          className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
          aria-hidden
        />
        <span>Cards</span>
      </button>
    </div>
  );
}
