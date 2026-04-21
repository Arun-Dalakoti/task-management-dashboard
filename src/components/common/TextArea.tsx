import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { controlClassName } from "./styles";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ className = "", rows = 4, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={[controlClassName, "resize-y min-h-[5rem]", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  }
);
