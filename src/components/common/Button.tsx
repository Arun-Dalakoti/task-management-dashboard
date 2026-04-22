import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-brand text-brand-on hover:bg-brand-hover focus-visible:outline-focus",
  secondary:
    "border-secondary-border bg-secondary-bg text-secondary-fg hover:bg-secondary-hover focus-visible:outline-focus",
  danger:
    "border-transparent bg-danger text-danger-on hover:bg-danger-hover focus-visible:outline-danger-focus",
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
