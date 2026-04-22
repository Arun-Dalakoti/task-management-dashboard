import type { SVGProps } from "react";

/**
 * Layered “empty list” art: soft glow, fanned blank cards, floating sheet —
 * no numeric “0”, clearly reads as “nothing here yet.”
 */
function EmptyListIllustration({
  className = "",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <defs>
        <linearGradient
          id="empty-hero-glow"
          x1="80"
          y1="0"
          x2="320"
          y2="220"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="rgb(139, 92, 246)" stopOpacity="0.2" offset="0%" />
          <stop stopColor="rgb(99, 102, 241)" stopOpacity="0.05" offset="100%" />
        </linearGradient>
        <filter
          id="empty-card-soft"
          x="-8"
          y="-4"
          width="160"
          height="130"
        >
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="5"
            floodColor="#1e1b4b"
            floodOpacity="0.12"
          />
        </filter>
      </defs>
      <ellipse
        cx="200"
        cy="200"
        rx="150"
        ry="28"
        className="fill-violet-500/8 dark:fill-violet-400/10"
      />
      <rect
        x="40"
        y="0"
        width="320"
        height="200"
        rx="100"
        fill="url(#empty-hero-glow)"
      />
      <g
        className="stroke-violet-400/30 dark:stroke-violet-500/25"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      >
        <path
          d="M320 32c8 4 12 12 8 20l-8 20"
          strokeWidth="1.2"
        />
        <circle cx="334" cy="24" r="2" className="fill-violet-400/40" />
        <circle cx="88" cy="40" r="1.5" className="fill-violet-400/35" />
        <path
          d="M70 100c-6-2-8-8-2-12"
          strokeWidth="1"
        />
      </g>
      <g filter="url(#empty-card-soft)" transform="translate(100 32)">
        <g transform="translate(0 20) rotate(-7 100 50)">
          <rect
            x="0"
            y="0"
            width="200"
            height="112"
            rx="12"
            className="fill-white/90 stroke-violet-300/80 dark:fill-zinc-900/80 dark:stroke-violet-600/50"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            opacity="0.85"
          />
        </g>
        <g transform="translate(8 6) rotate(2 100 50)">
          <rect
            x="0"
            y="0"
            width="200"
            height="112"
            rx="12"
            className="fill-white dark:fill-zinc-900"
            stroke="rgb(139, 92, 246)"
            strokeWidth="1.2"
            strokeOpacity="0.35"
          />
        </g>
        <g transform="translate(18 0)">
          <rect
            x="0"
            y="0"
            width="200"
            height="112"
            rx="12"
            className="fill-violet-50/95 stroke-violet-500/70 dark:fill-violet-950/50 dark:stroke-violet-400/55"
            strokeWidth="1.5"
          />
          <line
            x1="36"
            y1="40"
            x2="64"
            y2="40"
            className="stroke-violet-400/60"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <line
            x1="36"
            y1="64"
            x2="60"
            y2="64"
            className="stroke-violet-400/60"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.7"
          />
          <g className="stroke-violet-500/50 dark:stroke-violet-400/45" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeWidth="1.3">
            <rect x="28" y="28" width="14" height="14" rx="2.5" />
            <line x1="50" y1="32" x2="90" y2="32" opacity="0.5" />
            <line x1="50" y1="35" x2="76" y2="35" opacity="0.4" />
            <rect x="28" y="50" width="14" height="14" rx="2.5" />
            <line x1="50" y1="54" x2="98" y2="54" opacity="0.5" />
            <line x1="50" y1="57" x2="84" y2="57" opacity="0.4" />
            <rect x="28" y="72" width="14" height="14" rx="2.5" />
            <line x1="50" y1="76" x2="94" y2="76" opacity="0.5" />
            <line x1="50" y1="79" x2="70" y2="79" opacity="0.4" />
          </g>
        </g>
      </g>
      <g transform="translate(258 8)">
        <path
          d="M16 0 L54 0 L62 8 L100 8 L100 64 L0 64 L0 8 Z"
          className="fill-violet-100/80 stroke-violet-300/50 dark:fill-violet-900/30 dark:stroke-violet-500/40"
          strokeWidth="1"
        />
        <path
          d="M10 8 L78 8 L84 4 L10 4 Z"
          className="fill-white/50 dark:fill-violet-950/30"
        />
        <line
          x1="14"
          y1="20"
          x2="40"
          y2="20"
          className="stroke-violet-400/30"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <line
          x1="14"
          y1="28"
          x2="32"
          y2="28"
          className="stroke-violet-400/25"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

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
      <p className="mx-auto mt-2 max-w-sm text-balance text-sm text-zinc-600 dark:text-zinc-400">
        You don’t have any tasks yet. Use{" "}
        <span className="font-semibold text-zinc-800 dark:text-zinc-200">
          Add task
        </span>{" "}
        in the header to create the first one.
      </p>
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
