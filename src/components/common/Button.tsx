import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-violet-600 text-white hover:bg-violet-700 focus-visible:outline-violet-500 dark:bg-violet-500 dark:hover:bg-violet-400",
  secondary:
    "border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800",
  danger:
    "border-transparent bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-500 dark:bg-red-600 dark:hover:bg-red-500",
};

export type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "inline-flex cursor-pointer items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50",
        variantClass[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
