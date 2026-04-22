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
        <ListIcon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
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
        <GridIcon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
        <span>Cards</span>
      </button>
    </div>
  );
}

function ListIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 3.75A2.25 2.25 0 0 1 15.75 6v2.25A2.25 2.25 0 0 1 13.5 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6a2.25 2.25 0 0 1 2.25-2.25H13.5ZM13.5 13.5a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-4.5Z"
      />
    </svg>
  );
}
