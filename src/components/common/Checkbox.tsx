import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { CheckIcon } from "../../icons";

const boxClass = [
  "absolute inset-0 rounded border border-zinc-400 bg-white",
  "transition-[border-color,background-color,box-shadow] duration-150",
  "peer-focus-visible:ring-2 peer-focus-visible:ring-inset peer-focus-visible:ring-violet-500/50",
  "dark:border-zinc-500 dark:bg-zinc-900",
  "peer-checked:border-violet-600 peer-checked:bg-violet-600",
  "dark:peer-checked:border-violet-500 dark:peer-checked:bg-violet-500",
  "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
].join(" ");

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  /** Extra classes on the outer wrapper (e.g. alignment) */
  className?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { className = "", disabled, ...inputProps },
    ref,
  ) {
    return (
      <span
        className={["relative inline-flex h-4 w-4 shrink-0", className]
          .filter(Boolean)
          .join(" ")}
      >
        <input
          ref={ref}
          type="checkbox"
          disabled={disabled}
          className="peer absolute inset-0 z-10 m-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          {...inputProps}
        />
        <span
          className={boxClass}
          aria-hidden
        />
        <CheckIcon
          className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity duration-150 peer-checked:opacity-100"
          aria-hidden
        />
      </span>
    );
  },
);
