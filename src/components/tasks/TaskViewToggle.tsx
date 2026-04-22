import { GridViewIcon, ListViewIcon } from "../../icons";
import type { TaskViewMode } from "../../hooks/useTaskViewMode";

type TaskViewToggleProps = {
  value: TaskViewMode;
  onChange: (mode: TaskViewMode) => void;
  className?: string;
};

const baseBtn =
  "inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors sm:gap-2 sm:px-4 sm:py-2 sm:text-sm";

export function TaskViewToggle({
  value,
  onChange,
  className = "",
}: TaskViewToggleProps) {
  return (
    <div
      className={[
        "inline-flex w-auto shrink-0 rounded-lg border border-zinc-200 bg-zinc-100/80 p-0.5 dark:border-zinc-700 dark:bg-zinc-900/80",
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
            ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
            : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
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
            ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
            : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
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
