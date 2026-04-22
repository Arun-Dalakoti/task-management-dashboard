import type { ReactNode } from "react";
import { Label } from "./Label";

type FieldProps = {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: ReactNode;
};

export function Field({ label, htmlFor, hint, error, children }: FieldProps) {
  return (
    <div className="mb-4 last:mb-0">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && !error ? (
        <p className="mt-1.5 text-xs text-fg-subtle">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          className="mt-1.5 text-xs font-medium text-field-error"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
