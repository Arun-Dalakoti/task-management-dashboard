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

type Toast = {
  id: string;
  message: string;
  exiting: boolean;
};

type ToastContextValue = {
  showToast: (message: string) => void;
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

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string) => {
    const id =
      globalThis.crypto?.randomUUID?.() ?? `toast-${Date.now()}-${Math.random()}`;

    setToasts((prev) => [...prev, { id, message, exiting: false }]);

    window.setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
      );
    }, VISIBLE_MS);
  }, []);

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
            className={[
              "pointer-events-auto relative w-full overflow-hidden rounded-xl",
              "border border-zinc-200/90 bg-white/95 text-zinc-800",
              "dark:border-zinc-600/90 dark:bg-zinc-900/95 dark:text-zinc-100",
              "border-l-[3px] border-l-violet-500 pl-2.5 pr-3.5 dark:border-l-violet-400",
              "toast-surface p-2.5",
              toast.exiting ? "toast-anim-out" : "toast-anim-in",
            ].join(" ")}
            style={
              !toast.exiting
                ? { animationDelay: `${Math.min(index, 4) * 0.04}s` }
                : undefined
            }
          >
            {!toast.exiting ? (
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
