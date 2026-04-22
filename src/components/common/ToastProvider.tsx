import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type AnimationEvent,
  type ReactNode,
} from "react";

const VISIBLE_MS = 4200;

export type ToastKind = "success" | "destructive" | "default";

type Toast = {
  id: string;
  message: string;
  exiting: boolean;
  kind: ToastKind;
};

type ToastContextValue = {
  showToast: (message: string, kind?: ToastKind) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}

function exitAnimationNameOk(name: string): boolean {
  return name.toLowerCase().includes("toast-out");
}

function toastKindClasses(kind: ToastKind, exiting: boolean): string {
  const anim = exiting ? "toast-anim-out" : "toast-anim-in";
  const base =
    "pointer-events-auto relative w-full overflow-hidden rounded-xl p-2.5 pl-2.5 text-sm toast-surface " +
    anim;

  switch (kind) {
    case "success":
      return [
        base,
        "border border-emerald-200 border-l-4 border-l-emerald-500",
        "bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:border-l-emerald-500",
        "dark:bg-emerald-950 dark:text-emerald-300",
      ].join(" ");
    case "destructive":
      return [
        base,
        "border border-red-200 border-l-4 border-l-red-500",
        "bg-red-50 text-red-800 dark:border-red-800 dark:border-l-red-500",
        "dark:bg-red-950 dark:text-red-300",
      ].join(" ");
    default:
      return [
        base,
        "border border-l-4 border-l-zinc-500 border-zinc-800 bg-zinc-900 text-zinc-50",
        "dark:border-zinc-300 dark:border-l-zinc-400 dark:bg-zinc-100 dark:text-zinc-900",
      ].join(" ");
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, kind: ToastKind = "default") => {
      const id =
        globalThis.crypto?.randomUUID?.() ?? `toast-${Date.now()}-${Math.random()}`;

      setToasts((prev) => [...prev, { id, message, exiting: false, kind }]);

      window.setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
        );
      }, VISIBLE_MS);
    },
    []
  );

  const onToastAnimationEnd = useCallback(
    (e: AnimationEvent<HTMLDivElement>, toast: Toast) => {
      if (!toast.exiting || !exitAnimationNameOk(e.animationName)) return;
      if (e.target !== e.currentTarget) return;
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    },
    []
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed right-0 top-0 z-[100] flex max-h-dvh w-full flex-col items-end justify-start gap-2 p-4 sm:right-2 sm:top-2 sm:max-w-md sm:p-6"
        aria-live="polite"
        aria-relevant="additions"
      >
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            role="status"
            onAnimationEnd={(e) => onToastAnimationEnd(e, toast)}
            className={toastKindClasses(toast.kind, toast.exiting)}
            style={
              !toast.exiting
                ? { animationDelay: `${Math.min(index, 4) * 0.04}s` }
                : undefined
            }
          >
            {!toast.exiting &&
            (toast.kind === "success" || toast.kind === "destructive") ? (
              <div className="toast-sheen-wrap" aria-hidden>
                <div
                  className="toast-sheen-bar"
                  onAnimationEnd={(e) => e.stopPropagation()}
                />
              </div>
            ) : null}
            <p className="relative z-[1] text-pretty text-sm leading-snug">
              {toast.message}
            </p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
