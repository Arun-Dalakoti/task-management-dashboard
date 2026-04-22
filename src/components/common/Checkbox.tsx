import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { CheckIcon } from "../../icons";

const boxClass = [
  "absolute inset-0 rounded border border-control-border bg-control-bg",
  "transition-[border-color,background-color,box-shadow] duration-150",
  "peer-focus-visible:ring-2 peer-focus-visible:ring-inset peer-focus-visible:ring-focus/50",
  "peer-checked:border-brand peer-checked:bg-brand",
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
          className="peer absolute inset-0 z-10 m-0 h-full w-full cursor-pointer opacity-0 accent-brand disabled:cursor-not-allowed"
          {...inputProps}
        />
        <span
          className={boxClass}
          aria-hidden
        />
        <CheckIcon
          className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-brand-on opacity-0 transition-opacity duration-150 peer-checked:opacity-100"
          aria-hidden
        />
      </span>
    );
  },
);
