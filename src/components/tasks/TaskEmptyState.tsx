import { EmptyListIllustration } from "../../icons";

export function TaskEmptyState() {
  return (
    <div
      className="rounded-xl border-2 border-dashed border-brand/50 bg-gradient-to-b from-brand-soft/90 to-canvas/50 px-4 py-8 text-center sm:px-8 sm:py-10"
      role="status"
      aria-live="polite"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-fg-soft">
        Task list
      </p>
      <div className="mt-3 sm:mt-4">
        <EmptyListIllustration className="mx-auto h-44 w-full max-w-md sm:h-52" />
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-fg sm:mt-5">
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
    <div className="rounded-xl border border-dashed border-border-strong bg-elevated/70 px-6 py-12 text-center">
      <p className="text-sm font-medium text-fg-label">
        No tasks match your filters
      </p>
      <p className="mt-2 text-sm text-fg-muted">
        Try a different search or adjust status and priority.
      </p>
      <button
        type="button"
        onClick={onClearFilters}
        className="mt-4 cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-brand hover:bg-segment-hover"
      >
        Clear all filters
      </button>
    </div>
  );
}
