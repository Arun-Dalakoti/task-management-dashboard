import {
  useEffect,
  useId,
  useRef,
  useState,
  type AnimationEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "../../icons";

export type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ isOpen, title, onClose, children }: ModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setExiting(false);
    } else if (mounted) {
      setExiting(true);
    }
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted || exiting) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, exiting, onClose]);

  useEffect(() => {
    if (!mounted || exiting || !isOpen || !panelRef.current) return;
    const el = panelRef.current.querySelector<HTMLElement>(
      'input:not([type="hidden"]), select, textarea, button:not([aria-hidden="true"])'
    );
    window.requestAnimationFrame(() => el?.focus());
  }, [mounted, exiting, isOpen]);

  const onPanelAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (exiting) {
      setMounted(false);
      setExiting(false);
    }
  };

  if (!mounted) return null;

  const backdropAnim = exiting ? "modal-backdrop-exit" : "modal-backdrop-enter";
  const shellAnim = exiting ? "modal-shell-exit" : "modal-shell-enter";

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
    >
      <button
        type="button"
        className={[
          "absolute inset-0 bg-overlay backdrop-blur-[1px]",
          backdropAnim,
        ].join(" ")}
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onAnimationEnd={onPanelAnimationEnd}
        className={[
          "relative z-10 flex max-h-[92dvh] w-full max-w-lg flex-col rounded-t-2xl border border-border bg-elevated shadow-2xl sm:max-h-[85dvh] sm:rounded-2xl",
          shellAnim,
        ].join(" ")}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-4 py-4 sm:px-6">
          <h2
            id={titleId}
            className="text-lg font-semibold text-fg"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-fg-subtle transition-colors hover:bg-close-hover hover:text-fg"
            aria-label="Close"
          >
            <CloseIcon className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
