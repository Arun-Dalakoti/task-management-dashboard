import { EmptyListIllustration } from "../../icons";

export function TaskEmptyState() {
  return (
    <div
      className="rounded-xl border-2 border-dashed border-violet-200/80 bg-gradient-to-b from-violet-50/90 to-zinc-50/50 px-4 py-8 text-center dark:border-violet-800/50 dark:from-violet-950/25 dark:to-zinc-900/30 sm:px-8 sm:py-10"
      role="status"
      aria-live="polite"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-violet-600/90 dark:text-violet-400/90">
        Task list
      </p>
      <div className="mt-3 sm:mt-4">
        <EmptyListIllustration className="mx-auto h-44 w-full max-w-md sm:h-52" />
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-zinc-900 sm:mt-5 dark:text-zinc-50">
        Your list is empty
      </h3>
    </div>
  );
}

type TaskNoMatchesProps = {
  onClearFilters: () => void;
};

export function TaskNoMatches({ onClearFilters }: TaskNoMatchesProps) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/80 px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-900/30">
      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        No tasks match your filters
      </p>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Try a different search or adjust status and priority.
      </p>
      <button
        type="button"
        onClick={onClearFilters}
        className="mt-4 cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-violet-600 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-950/40"
      >
        Clear all filters
      </button>
    </div>
  );
}
